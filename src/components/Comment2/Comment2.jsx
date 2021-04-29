import React from 'react';
import "./Comment2.less";
import {withRouter} from "react-router-dom";
import PubSub from 'pubsub-js';

import { Avatar, Form, Button, Input, Divider, ConfigProvider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// 将 外部给予的 store 注入，并进行观察
import { inject , observer } from "mobx-react";
@inject('store') @observer

class Comment2 extends React.Component {

    // 定义表单对象
    formRef = React.createRef();

    state = {
        user:{
            id:"",
            name:""
        },
        toUserName:"",
        toUser:null,
        reply: false
    }

    // 组件挂载：注入 该评论气泡所属的 用户信息，以及回复对象的信息
    componentDidMount(){
        var user , toUserName="",toUser;
        // 用户信息
        this.props.store.user.map((item)=>{
            if( this.props.reply.id==item.id ){
                user = item;
            }
        });
        // 回复对象信息
        this.props.store.user.map((item)=>{
            if( this.props.reply.to!=null&&this.props.reply.to==item.id ){
                toUserName = item.name;
                toUser = item;
            }
        });
        this.setState({
            user:user,
            toUserName:toUserName,
            toUser:toUser
        },()=>{
            console.log(this.state.toUser);
        });
    }

    // 跳转至 用户展示页
    toUserInfo(){
        this.props.history.push("/friend/"+this.state.user.id);
    }

    // 回复文本框开关
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

    // 通过表单验证，发送回复
    onFinish = (re) => {
        console.log(re.reply);
        var length , obj ;
        // length = this.props.comment.reply.length + 1;
        obj = {
            id:parseInt( window.localStorage.getItem("testReactId") ),
            content: re.reply,
            to: (this.state.toUser!=null&&this.state.toUser!=undefined&&this.state.toUser!="")?parseInt(this.state.toUser.id):null
        }
        this.props.store.sendReply( obj , this.props.articleNum , this.props.commentNum );
        this.formRef.current.resetFields();
    }

    render(){
        return(
            <div className="comment2">

                {/* 头像 & 用户名 */}
                <div className="user">
                    <div className="head" onClick={this.toUserInfo.bind(this)}>
                        <Avatar size={28} icon={<UserOutlined />} />
                    </div>
                    {/* <div className="name">{ this.state.user.name } {(this.state.toUserName!="")?"@"+this.state.toUserName:""}</div> */}
                    <div className="name">{ this.state.user.name } {(this.state.toUser!=null&&this.state.toUser!=undefined&&this.state.toUser!="")?"@"+this.state.toUser.name:""}</div>
                </div>

                {/* 回复内容 */}
                <div className="reply_content">
                    <p>{ this.props.reply.content }</p>
                </div>

                {/* 回复文本框开关 */}
                <div className="func_bar">
                    {
                        (this.state.reply == false )?(
                            <ConfigProvider autoInsertSpaceInButton = { false }> 
                                <Button type="text" size="small" onClick={this.switchReply.bind(this)}><span style={{fontSize:"12px",color:"#1890ff"}}>回复</span></Button>&nbsp;&nbsp;
                            </ConfigProvider>
                        ):("")
                    }
                    {
                        (this.state.reply == true )?(
                            <ConfigProvider autoInsertSpaceInButton = { false }> 
                                <Button type="text" size="small" onClick={this.switchReply.bind(this)}><span style={{fontSize:"12px",color:"#1890ff"}}>取消回复</span></Button>&nbsp;&nbsp;
                            </ConfigProvider>
                        ):("")
                    }
                </div>

                {/* 回复文本框 */}
                {(this.state.reply == true )?(
                <div className="comment_bar">
                    <Form ref={this.formRef} wrapperCol={{span: 28}} name="basic" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                        <div className="comment_input_line w85">
                            <Form.Item name="reply" size="small" rules={[{ required: true, message: '请输入内容',},]}>
                                <Input placeholder="请输入内容" maxLength="10" />
                            </Form.Item>
                        </div>
                        <div className="comment_input_line w15">
                            <Form.Item>
                                <ConfigProvider autoInsertSpaceInButton = { false }> 
                                    <Button type="primary" size="middle" htmlType="submit">回复</Button>
                                </ConfigProvider>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                ):("")}

                <Divider></Divider>

            </div>
        )
    }
}

export default withRouter(Comment2);