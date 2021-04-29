import React from "react";
import "./index.less";

import { Menu, Input, Space, Avatar, Button, Pagination } from "antd";
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';

// 导航
import TopBar from "@/components/TopBar/TopBar.jsx";
// 气泡
import Bubbles from "@/components/Bubbles/Bubbles.jsx";

// 将 外部给予的 store 注入，并进行观察
import { inject , observer } from "mobx-react";
@inject('store') @observer

class Index extends React.Component {

    state = {
        current:"0",
        search:"",
        article:this.props.store.article,
        page:{
            size:5,
            current:1,
            length:this.props.store.article.length,
        }
    }

    // 组件挂载
    componentDidMount(){
        // 检查是否有登陆记录
		if( window.localStorage.getItem("testReactId") == undefined || window.localStorage.getItem("testReactId") == null || window.localStorage.getItem("testReactId") == "" ){
            this.props.history.push("/login");
        }
        // 装载 / 更新  需要加载的 Article
        var newPage = Object.assign(this.state.page,{["length"]:this.props.store.article.length});
        this.setState({
            article:this.props.store.article,
            page:newPage
        });
	}

    // 切换 显示板块
    handleClick = (e) => {
        // 根据需要显示的板块，装载数据
        var arr = [];
        if( e.key == 0 ){
            arr = this.props.store.article;
        }
        else{
            this.props.store.article.map((item)=>{
                if( e.key==item.part ){
                    arr.push(item);
                }
            });
        }
        // 更新状态
        this.setState({ 
            current: e.key,
            search:"",
            article:arr,
            page:{
                size:5,
                current:1,
                length:arr.length,
            }
        });
    }

    // 搜索内容
    onSearch = (val) => {

        if( val != "" ){
            // 将符合检索条件的内容搜索出来
            var arr = [];
            this.props.store.article.map((item)=>{
                if( item.content.indexOf(val)>-1 ){
                    arr.push(item);
                }
            });
            // 更新状态
            this.setState({
                search:val,
                article:arr,
                page:{
                    size:5,
                    current:1,
                    length:arr.length,
                }
            });
        }
    }

    // 跳转至 send 页面
    toSend(){
        this.props.history.push("/send");
    }

    // 改变显示的页
    onPagination = (num) => {
        console.log(num);
        
        /*
            更替里面 state 内部的对象的某一属性，需要用 Object.assign 重构一个新对象写入
        */
        var newPage = Object.assign(this.state.page,{["current"]:num});
        this.setState({ 
            page: newPage
        });
    }

    render(){
        return(
            <div className="win">

                {/* 导航栏 */}
                <TopBar></TopBar>

                {/* 左边板块栏 */}
                <div className="side_bar">
                    <Menu style={{ width: 250 }} selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)} mode="vertical" theme="dark">
                        <Menu.Item icon={<AppstoreOutlined/>} key="0">全部板块</Menu.Item>
                        <Menu.Item icon={<AppstoreOutlined/>} key="1">板块一</Menu.Item>
                        <Menu.Item icon={<AppstoreOutlined/>} key="2">板块二</Menu.Item>
                        <Menu.Item icon={<AppstoreOutlined/>} key="3">板块三</Menu.Item>
                    </Menu>
                </div>

                {/* 右边个人栏 */}
                <div className="info_area">
                    <div className="info_block">

                        <Space direction="vertical">
                            <Input.Search placeholder="请输入内容" onSearch={this.onSearch.bind(this)} style={{ width: 250 }} enterButton/>
                        </Space>

                        <div className="info_bar">
                            <div className="head_bar">
                                <Avatar size={ 90 } icon={<UserOutlined />} />
                                <p>USER</p>
                                <Button type="primary" shape="round" size="large" onClick={this.toSend.bind(this)}>发东西</Button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 中部显示内容 */}
                <div className="content">

                    {/* 渲染内容 */
                        this.state.article.map((item,index)=>{
                            if( index<=this.state.page.current*this.state.page.size-1&&index>this.state.page.current*this.state.page.size-1-this.state.page.size ){
                                return(
                                    <Bubbles key={item.num} userid={item.id} articleid={item.num}>
                                        <span key="text">{item.content}</span>
                                        <span key="tag">{item.tag}</span>
                                        <span key="star">{item.star}</span>
                                    </Bubbles>
                                )
                            }
                        })
                    }

                    {/* 分页器 */}
                    <div className="pagination">
                        <Pagination pageSize={this.state.page.size} onChange={this.onPagination.bind(this)} current={this.state.page.current} total={this.state.page.length} hideOnSinglePage={true} />
                    </div>
                </div>

                <div className="bottom_bar" style={{height:"200px"}}></div>

            </div>
        )
    }
}

export default Index;