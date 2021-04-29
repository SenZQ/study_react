import React from "react";
import "./friend.less";

import { PageHeader, Avatar, Tabs, Pagination } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// 导航
import TopBar from "@/components/TopBar/TopBar.jsx";
// 气泡
import Bubbles from "@/components/Bubbles/Bubbles.jsx";

// 将 外部给予的 store 注入，并进行观察
import { inject , observer } from "mobx-react";
@inject('store') @observer

class Friend extends React.Component {

    state = {
        user:{
            name:"",
            date:"",
            desc:"",
        },

        article:[],

        page:{
            size:5,
            current:1,
            length:0,
        }
    }

    // 组件挂载
    componentDidMount(){
        // 检查是否有登陆记录
		if( window.localStorage.getItem("testReactId") == undefined || window.localStorage.getItem("testReactId") == null || window.localStorage.getItem("testReactId") == "" ){
            this.props.history.push("/login");
        }
        else{
            // 检查页面是否带有 索引信息，以及索引信息中的用户确实存在
            if( this.props.match.params.id != "" && this.props.match.params.id != undefined && this.props.match.params.id != null ){
                if( this.props.store.SearchUser( parseInt(this.props.match.params.id) ) ){
                    // 用户信息
                    var obj = this.props.store.SearchUser( parseInt(this.props.match.params.id) );
                    var arr = [];
                    // 将该用户的文章推送到该组件的状态
                    this.props.store.article.map((item)=>{
                        if( parseInt(this.props.match.params.id)==item.id ){
                            arr.push(item);
                        }
                    });
                    // 更新状态
                    this.setState({
                        user:{
                            name: obj.name,
                            date: obj.date,
                            desc: obj.desc,
                        },
                        article:arr,
                        page:{
                            size:5,
                            current:1,
                            length:arr.length,
                        }
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
        
	}

    // 改变 Tab 栏
    onChangeTab(e){
        console.log(e);
    }

    // 换页
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
            <div className="win container">
                
                {/* 导航栏 */}
                <TopBar></TopBar>

                 {/* 面包屑 */}
                <div className="href_level">
                    <PageHeader className="site-page-header" onBack={() => this.props.history.goBack()} title="返回" subTitle="个人首页"/>
                </div>

                 {/* 内容栏 */}
                <div className="self_container">

                    {/* 头像 & 用户名 */}
                    <div className="self_info">
                        <div className="head">
                            <Avatar size={100} icon={<UserOutlined />} />
                        </div>
                        <div className="name">{ this.state.user.name }</div>
                    </div>

                    {/* 用户短文 & 用户信息 */}
                    <div className="tab_bar">
                        <Tabs defaultActiveKey="1" onChange={this.onChangeTab}>
                            <Tabs.TabPane tab="短文" key="1">

                                {
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

                                <div className="pagination">
                                    <Pagination pageSize={this.state.page.size} onChange={this.onPagination.bind(this)} defaultCurrent={this.state.page.current} total={this.state.page.length} hideOnSinglePage={true} />
                                </div>

                            </Tabs.TabPane>
                            <Tabs.TabPane tab="个人信息" key="2">
                                
                                <br/>
                                <p>{ this.state.user.name }</p>
                                <br/>
                                <p>{ this.state.user.date }</p>
                                <br/>
                                <p>{ this.state.user.desc }</p>
                                
                            </Tabs.TabPane>
                        </Tabs>
                    </div>

                </div>

                <div className="bottom_bar" style={{height:"1px"}}></div>

            </div>
        )
    }
}

export default Friend;