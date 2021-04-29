import React from "react";
import "./login.less";

import { Form, Input, Button, Checkbox, Modal } from 'antd';

// 将 外部给予的 store 注入，并进行观察
import { inject , observer } from "mobx-react";
@inject('store') @observer



class Login extends React.Component{

	state = {
		isModalVisible: false
	}

	// 组件挂载：检查是否有登陆记录
	componentDidMount(){
		if( (window.localStorage.getItem("testReactId") != undefined || window.localStorage.getItem("testReactId") != null) && window.localStorage.getItem("testReactId") != "" ){
			this.props.history.push("/");
		}
	}

	// 关闭警示弹窗
	onhandleOk = () => {
		this.setState({
			isModalVisible: false
		});
	}

	// 通过表单验证，并成功提交表单
	onFinish = (values) => {
		console.log('Success:', values);
		if( this.props.store.loginIn(values) ){
			console.log("成功登陆");
			window.localStorage.setItem("testReactId", parseInt(values.id) );
			this.props.history.push("/");
		}
		else{
			console.log("登录失败");
			this.setState({
				isModalVisible: true
			});
		}
	};

	// 表单验证失败
	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

    render(){
        return(
            <div className="win">
                <div className="container_re">
                    <h1>广东机电职教集团产教融合信息服务平台</h1>
                    <div className="login_container">

						{/*
							labelCol={{span: 8}}                  控制标签宽度

							wrapperCol={{
								offset: 8,                        控制组件向左的偏移量
								span: 16                          控制组件宽度
							}}               

							initialValues={{ remember: true, }}   控制该表单中内元素默认值

							onFinish={this.onFinish}              提交时，表单顺利通过校检之后执行的事件
							
							onFinishFailed={this.onFinishFailed}  提交时，表单不通过校检抛出错误的事件

								rules={[
									{ required: true, message: '请输入您的账号',},  // 校检规则
								]}

									htmlType="submit"  // 元素动作类型
						*/}

						{/*
							<button onClick={ this.onFinish }></button>

							在 元素绑定的方法中，onFinish内部，如果有使用 React 原生的方法
							eg: this.props.history.push("/")

							则必须在外部 bind(this)，以防 this 的指向会丢失

							<button onClick={ this.onFinish.bind(this) }></button>
							<button onClick={ (e)=> this.onFinish(e) }></button>
						*/}
                        
						<Form labelCol={{span: 8}} wrapperCol={{span: 16}} name="basic" onFinish={(e)=>this.onFinish(e)} onFinishFailed={this.onFinishFailed}>
							
							<Form.Item label="账号" name="id" rules={[{ required: true, message: '请输入您的账号',},]}>
								<Input />
							</Form.Item>

							<Form.Item label="密码" name="pass" rules={[{ required: true, message: '请输入您的密码',},]}>
								<Input.Password />
							</Form.Item>

							{/* <Form.Item wrapperCol={{offset: 8,span: 16}} name="remember" valuePropName="checked">
								<Checkbox>记住密码</Checkbox>
							</Form.Item> */}

							<Form.Item wrapperCol={{offset: 8,span: 16}}>
								<Button type="primary" htmlType="submit">提交</Button>
							</Form.Item>
						</Form>

						<Modal title="登陆失败" visible={this.state.isModalVisible} footer={[
							<Button key="close" type="primary" onClick={this.onhandleOk}>确认</Button>]}>
							<p>用户名或密码错误</p>
							<p>请检查！</p>
						</Modal>

                    </div>
                </div>

				

            </div>
        )
    }
}

export default Login;