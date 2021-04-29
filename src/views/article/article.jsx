import React from 'react';
import "./article.less";
import PubSub from 'pubsub-js';

import { PageHeader, Avatar, Tag, Form, Button, Input, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// 导航
import TopBar from "@/components/TopBar/TopBar.jsx";
// 评论气泡组件 1
import Comment1 from "@/components/Comment1/Comment1.jsx";

// 将 外部给予的 store 注入，并进行观察
import { inject , observer } from "mobx-react";
@inject('store') @observer

class Article extends React.Component {

    // 定义表单对象
    formRef = React.createRef();

    state = {
        user:{
            id:"",
            name:""
        },
        article:{
            num:"",
            id:"",
            content:"",
            tag:"",
            star:"",
            part:"",
            comment:[
                {
                    id:"",
                    num:"",
                    content:"",
                    reply:[
                        {
                            id:"",
                            content:"",
                            to:""
                        }
                    ]
                }
            ]
        },
        form:null
    }

    // 组件挂载
    componentDidMount(){
        // 检查是否有登陆记录
		if( window.localStorage.getItem("testReactId") == undefined || window.localStorage.getItem("testReactId") == null || window.localStorage.getItem("testReactId") == "" ){
            this.props.history.push("/login");
        }
        else{
            // 检查页面是否带有 索引信息，以及索引信息中的用户确实存在
            if( this.props.match.params.num != "" && this.props.match.params.num != undefined && this.props.match.params.num != null ){
                if( this.props.store.SearchArticle( parseInt(this.props.match.params.num) ) ){

                    var article , user ;
                    // 拉取文章信息
                    this.props.store.article.map((item)=>{
                        if( parseInt(this.props.match.params.num)==item.num ){
                            article = item;
                        }
                    });
                    // 拉取用户信息
                    this.props.store.user.map((item)=>{
                        if( article.id==item.id ){
                            user = item;
                        }
                    });
                    // 更新状态
                    this.setState({
                        user:user,
                        article:article
                    });

                }
                else{
                    this.props.history.goBack();
                }
            }
            else{
                this.props.history.goBack();
            }
        }

        // 接受监听事件
        this.token = PubSub.subscribe("sendMsg",( MsgName , data )=>{
			console.log(MsgName,data);
            this.updateArtice();
		});
	}

    // 跳转去用户详细页
    toUserInfo(){
        this.props.history.push("/friend/"+this.state.article.id);
    }

    // 强制更新文章
    updateArtice = () => {
        var article;
        this.props.store.article.map((item)=>{
            if( parseInt(this.props.match.params.num)==item.num ){
                article = item;
            }
        });
        this.setState({
            article: article
        });
    }

    // 发送评论
    onFinish = (com) => {
        console.log(com.comment);
        var length , obj ;
        length = this.state.article.comment.length + 1;
        obj = {
            id:parseInt( window.localStorage.getItem("testReactId") ),
            num: length,
            content: com.comment,
            reply:[]
        }
        this.props.store.sendComment( obj , this.state.article.num );
        this.formRef.current.resetFields();
    }

    /*
        要在外部通过 JS 控制 AntDesign 表单的方法

        首先再组件中定义 formRef = React.createRef();

        将 formRef 绑定到 <Form> 中, <Form form={ this.formRef }>

        在函数中使用 this.formRef.current. 控制 AntDesign表单
    */

    render(){
        return(
            <div className="win container">

                {/* 导航栏 */}
                <TopBar></TopBar>

                {/* 面包屑 */}
                <div className="href_level">
                    <PageHeader className="site-page-header" onBack={() => this.props.history.goBack()} title="返回" subTitle="详情页面"/>
                </div>

                {/* 内容 */}
                <div className="article_container">
                    {/* 头像 & 用户名 */}
                    <div className="user">
                        <div className="head" onClick={this.toUserInfo.bind(this)}>
                            <Avatar size={40} icon={<UserOutlined />} />
                        </div>
                        <div className="name">{ this.state.user.name }</div>
                    </div>
                    {/* 标签 */}
                    <div className="tag">
                        <Tag color="processing">{ this.state.article.tag }</Tag>
                    </div>
                    {/* 正文 */}
                    <div className="article_content">{ this.state.article.content }</div>
                    {/* 评论文本框 */}
                    <div className="send_comment">
                        <div className="head">
                            <Avatar size={40} icon={<UserOutlined />} />
                        </div>
                        <div className="send_comment_input">
                            <Form ref={this.formRef} wrapperCol={{span: 28}} name="basic" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                                <div className="send_comment_input_line w85">
                                    <Form.Item name="comment" rules={[{ required: true, message: '请输入内容',},]}>
                                        <Input placeholder="请输入内容" maxLength="10" />
                                    </Form.Item>
                                </div>
                                <div className="send_comment_input_line w15">
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">评论</Button>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <Divider orientation="left"><span style={{fontSize:"14px"}}>评论列表</span></Divider>

                    {/* 评论列表 */}
                    <div className="comment_list">

                        {
                            this.state.article.comment.map(item=>{
                                return(
                                    <Comment1 key={ item.num } comment={ item } articleNum={ this.state.article.num }></Comment1>
                                )
                            })
                        }
                        
                    </div>

                </div>

            </div>
        )
    }
}

export default Article;