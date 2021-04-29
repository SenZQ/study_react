import React from "react";
import "./send.less";

import { Breadcrumb, Form, Input, Button, Radio, Select } from 'antd';

// 导航
import TopBar from "@/components/TopBar/TopBar.jsx";

// 将 外部给予的 store 注入，并进行观察
import { inject , observer } from "mobx-react";
@inject('store') @observer

class Send extends React.Component {

    // 组件挂载
    componentDidMount(){
		if( window.localStorage.getItem("testReactId") == undefined || window.localStorage.getItem("testReactId") == null || window.localStorage.getItem("testReactId") == "" ){
            this.props.history.push("/login");
        }
	}

    // 表单修改
    onFormLayoutChange(e){
        console.log(e);
    }

    // 提交发表信息
    onFinish = (values) => {
		console.log('Success:', values);
        var obj = {
            num: this.props.store.article.length+1,
            id: parseInt(window.localStorage.getItem("testReactId")),
            content: values.content,
            tag: values.tag,
            star: 0,
            part: parseInt(values.part),
            comment:[
            ]
        }
        this.props.store.pushArticle(obj);
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
                        <Breadcrumb.Item>发布</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                {/* 内容显示 */}
                <div className="send_container">
                    <Form labelCol={{span: 4,}} wrapperCol={{span: 18,}} layout="horizontal" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} initialValues={{ part:"1" }} onValuesChange={this.onFormLayoutChange} size="middle">
                        <Form.Item label="发布内容" name="content" wrapperCol={{span: 20}} rules={[{ required: true, message: '请输入内容',},]}>
                            <Input.TextArea rows={5} showCount maxLength={200} />
                        </Form.Item>
                        <Form.Item label="标签" name="tag" rules={[{ required: true, message: '请选择标签',},]}>
                            <Radio.Group>
                                <Radio value="英语">英语</Radio>
                                <Radio value="美食">美食</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="板块" name="part" wrapperCol={{span: 5}}>
                            <Select>
                                <Select.Option value="1">板块一</Select.Option>
                                <Select.Option value="2">板块二</Select.Option>
                                <Select.Option value="3">板块三</Select.Option>
                            </Select>
                        </Form.Item>
                        
                        <div style={{textAlign:"right"}}>
                            <Button type="primary" htmlType="submit">发布</Button>
                        </div>
                        
                    </Form>
                </div>

            </div>
        )
    }
}

export default Send;