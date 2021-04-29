import React from "react";
import "./Bubbles.less";

// 非 页面组件 需要用这个绑定路由
import {withRouter} from "react-router-dom";

import { Avatar, Button, Tag  } from "antd";
import { StarOutlined,UserOutlined } from '@ant-design/icons';

// 将 外部给予的 store 注入，并进行观察
import { inject , observer } from "mobx-react";
@inject('store') @observer

class Bubbles extends React.Component {

    // 跳转去 用户展示页
    toUserInfo(){
        this.props.history.push("/friend/"+this.props.userid);
    }
    // 跳转去 文章详情页
    toArticleInfo(){
        this.props.history.push("/article/"+this.props.articleid);
    }

    // 点赞
    giveStar(){
        this.props.store.giveStar( this.props.articleid );
    }

    render(){

        console.log(this.props);

        return(
            <div className="bubbles_item">

                {/* 头像 */}
                <div className="head_img" onClick={this.toUserInfo.bind(this)}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </div>

                {/* 短文 */}
                <div className="content_area">
                    {/* 短文 文本 */}
                    <p className="text" onClick={this.toArticleInfo.bind(this)}>{this.props.children[0]}</p>
                    {/* 标签 */}
                    <p className="tag">
                        <span>
                            <Tag color="processing">{this.props.children[1]}</Tag>
                        </span>
                    </p>
                    {/* 点赞 */}
                    <div className="func_bar">
                        <Button type="default" onClick={this.giveStar.bind(this)} icon={<StarOutlined />} shape="round" size="middle"><span style={{fontSize:"13px"}}>赞 {this.props.children[2]}</span></Button>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Bubbles);