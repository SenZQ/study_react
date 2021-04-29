import React from "react";
import "./info.less";

import { Breadcrumb, Avatar, Form, Input, Button, Radio, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

// 导航
import TopBar from "@/components/TopBar/TopBar.jsx";

// 将 外部给予的 store 注入，并进行观察
import { inject , observer } from "mobx-react";
@inject('store') @observer

class Info extends React.Component {

    // 定义表单对象
    formRef = React.createRef();

    state = {
        user:{}
    }

    // 组件挂载
    componentDidMount(){
        // 检查是否有登陆记录
		if( window.localStorage.getItem("testReactId") == undefined || window.localStorage.getItem("testReactId") == null || window.localStorage.getItem("testReactId") == "" ){
            this.props.history.push("/login");
        }
        else{
            // 抓取用户原有的信息
            var user;
            this.props.store.user.map(item=>{
                if( item.id == parseInt(window.localStorage.getItem("testReactId")) ){
                    user = item;
                }
            });
            // 更新状态，将用户原有的信息 注入 表单
            this.setState({
                user:user
            },()=>{
                this.formRef.current.setFieldsValue({
                    "name": this.state.user.name,
                    "gender": this.state.user.gender,
                    "date": moment( this.state.user.date ),
                    "desc": this.state.user.desc,
                });
            });
        }
	}

    // 表单修改
    onFormLayoutChange(e){
        console.log(e);
    }

    // 提交修改信息，返回主页
    onFinish = (values) => {
		console.log('Success:', values);
        var obj = {
            name: values.name,
            gender: values.gender,
            date: values.date._d.getFullYear()+"-"+(values.date._d.getMonth()+1)+"-"+values.date._d.getDate(),
            desc: values.desc,
            id: parseInt(window.localStorage.getItem("testReactId"))
        }
        if( this.props.store.changeInfo(obj) == true ){
            this.props.history.push("/");
        }
	};
    // 无法通过表单校验
	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

    render(){
        return(
            <div className="win">

                {/* 导航栏 */}
                <TopBar></TopBar>

                {/* 面包屑 */}
                <div className="href_level">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a onClick={()=>this.props.history.push("/")}>首页</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>个人信息</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                {/* 内容显示 */}
                <div className="info_container">
                    <Avatar size={120} icon={<UserOutlined />} />
                    <p className="tips">图片格式：jpg / png</p>
                    <Form ref={this.formRef} labelCol={{span: 4,}} wrapperCol={{span: 18,}} layout="horizontal" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} initialValues={{ }} onValuesChange={this.onFormLayoutChange} size="middle">
                        <Form.Item label="用户名称" name="name" wrapperCol={{span: 10}} rules={[{ required: true, message: '请输入名称',},]}>
                            <Input maxLength={10} />
                        </Form.Item>
                        <Form.Item label="性别" name="gender" rules={[{ required: true, message: '请选择性别',},]}>
                            <Radio.Group>
                                <Radio value="男">男</Radio>
                                <Radio value="女">女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="出生日期" name="date" rules={[{ required: true, message: '请输入出生日期',},]}>
                            <DatePicker placeholder="请选择日期" />
                        </Form.Item>
                        <Form.Item label="个人介绍" name="desc" wrapperCol={{span: 20}}>
                            <Input.TextArea rows={3} showCount maxLength={200} />
                        </Form.Item>
                        <div style={{textAlign:"right"}}>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </div>
                        
                    </Form>
                </div>

            </div>
        )
    }
}

export default Info;