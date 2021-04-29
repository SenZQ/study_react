import React from 'react';
import "./Comment1.less";
import {withRouter} from "react-router-dom";
import PubSub from 'pubsub-js';

import { Avatar, Form, Button, Input, Divider, ConfigProvider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// 评论气泡组件 2
// import Comment2 from "@/components/Comment2/Comment2.jsx";
import Comment2 from "../Comment2/Comment2.jsx";

// 将 外部给予的 store 注入，并进行观察
import { inject , observer } from "mobx-react";
@inject('store') @observer



class Comment1 extends React.Component {

    // 定义表单对象
    formRef = React.createRef();

    state={
        user:{
            id:"",
            name:""
        },
        reply: false,
        open: false
    }

    // 组件挂载：注入 该评论气泡所属的 用户信息
    componentDidMount(){
        var user;
        this.props.store.user.map((item)=>{
            if( this.props.comment.id==item.id ){
                user = item;
            }
        });
        this.setState({
            user:user
        });
    }

    // 通过表单校检，提交评论
    onFinish = (values) => {
		console.log('Success:', values);
	};
    // 未通过表单校检
	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

    // 跳转 用户展示页
    toUserInfo(){
        this.props.history.push("/friend/"+this.state.user.id);
    }

    // 回复组件开关
    switchReply(){
        var stat;
        if( this.state.reply == true ){
            stat = false;
        }
        else{
            stat = true;
        }
        this.setState({
            reply:stat
        });
    }
    // 回复列表开关
    switchOpen(){
        var stat;
        if( this.state.open == true ){
            stat = false;
        }
        else{
            stat = true;
        }
        this.setState({
            open:stat
        });
    }

    // 通过表单验证，发布回复
    onFinish = (re) => {
        console.log(re.reply);
        var length , obj ;
        length = this.props.comment.reply.length + 1;
        obj = {
            id:parseInt( window.localStorage.getItem("testReactId") ),
            content: re.reply,
            to:null
        }
        this.props.store.sendReply( obj , this.props.articleNum , this.props.comment.num );
        this.formRef.current.resetFields();
    }



    render(){
        return(
            <div className="comment1">

                {/* 头像 & 用户名 */}
                <div className="user">
                    <div className="head" onClick={this.toUserInfo.bind(this)}>
                        <Avatar size={40} icon={<UserOutlined />} />
                    </div>
                    <div className="name">{ this.state.user.name }</div>
                </div>

                {/* 评论短文 */}
                <div className="comment1_content">{ this.props.comment.content }</div>

                {/* 功能栏，回复文本框开关、 回复列表开关*/}
                <div className="func_bar">
                    {
                        (this.state.reply == false )?(
                            <ConfigProvider autoInsertSpaceInButton = { false }> 
                                <Button type="primary" size="middle"><span style={{fontSize:"12px"}} onClick={this.switchReply.bind(this)}>回复</span></Button>&nbsp;&nbsp;
                            </ConfigProvider>
                        ):("")
                    }
                    {
                        (this.state.reply == true )?(
                            <ConfigProvider autoInsertSpaceInButton = { false }> 
                                <Button type="primary" size="middle"><span style={{fontSize:"12px"}} onClick={this.switchReply.bind(this)}>取消回复</span></Button>&nbsp;&nbsp;
                            </ConfigProvider>
                        ):("")
                    }
                    {
                        (this.state.open == false )?(
                            <ConfigProvider autoInsertSpaceInButton = { false }> 
                                <Button type="primary" size="middle"><span style={{fontSize:"12px"}} onClick={this.switchOpen.bind(this)}>{ this.props.comment.reply.length } 条回复</span></Button>&nbsp;&nbsp;
                            </ConfigProvider>
                        ):("")
                    }
                    {
                        (this.state.open == true )?(
                            <ConfigProvider autoInsertSpaceInButton = { false }> 
                                <Button type="primary" size="middle"><span style={{fontSize:"12px"}} onClick={this.switchOpen.bind(this)}>收起回复</span></Button>&nbsp;&nbsp;
                            </ConfigProvider>
                        ):("")
                    }
                </div>

                {/* 回复文本框 */}
                {(this.state.reply == true )?(
                <div className="comment_bar">
                    <Form ref={this.formRef} wrapperCol={{span: 28}} name="basic" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                        <div className="comment_input_line w85">
                            <Form.Item name="reply" rules={[{ required: true, message: '请输入内容',},]}>
                                <Input placeholder="请输入内容" maxLength="10" />
                            </Form.Item>
                        </div>
                        <div className="comment_input_line w15">
                            <Form.Item>
                                <ConfigProvider autoInsertSpaceInButton = { false }> 
                                    <Button type="primary" htmlType="submit">回复</Button>
                                </ConfigProvider>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                ):("")}

                {/* 回复列表 */}
                {(this.state.open == true )?(
                <div className="comment_list">
                    <Divider orientation="left"><span style={{color:"#CCC",fontSize:"14px"}}>回复列表</span></Divider>

                    {
                        this.props.comment.reply.map((item,index)=>{
                            return(
                                <Comment2 key={index} reply={item} articleNum={this.props.articleNum} commentNum={this.props.comment.num}></Comment2>
                            )
                        })
                    }

                    

                </div>
                ):("")}

                

            </div>
        )
    }
}

export default withRouter(Comment1);