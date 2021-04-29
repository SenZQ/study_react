import React from "react";
import {withRouter} from "react-router-dom";
import "./TopBar.less";

import { Button , Avatar , Menu  } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class TopBar extends React.Component {

    state = {
        current: '',
    };

    // 跳转至 用户展示页
    toUserInfo(){
        this.props.history.push("/friend/"+window.localStorage.getItem("testReactId"));
    }

    // 跳转至 修改用户信息
    toSetInfo(){
        this.props.history.push("/info");
    }

    // 退出登录
    unLogin = () => {
        window.localStorage.setItem("testReactId","");
        this.props.history.push("/login");
    }
    
    // 导航栏选择事件
    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    render(){
        return(
            <div className="top_bar">

                <span>广东机电职教集团产教融合信息服务平台</span>

                <div className="btn_list">
                    {/* 跳转至用户展示页 */}
                    <Button type="link"><span style={{fontSize:"16px"}} onClick={this.toUserInfo.bind(this)}>简历</span></Button>
                    {/* 头像 */}
                    <div className="head">
                        <Avatar size="middle" icon={<UserOutlined />} />
                    </div>
                    {/* 导航栏：修改个人信息、退出登录 */}
                    <div className="menu">
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} theme="dark" mode="horizontal" triggerSubMenuAction="hover">
                            <Menu.SubMenu key="SubMenu" title="我的工作台">
                                <Menu.Item key="info" onClick={this.toSetInfo.bind(this)}>个人信息</Menu.Item>
                                <Menu.Item key="unlogin" onClick={this.unLogin.bind(this)}>退出登录</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(TopBar);