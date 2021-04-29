// import './App.css';

// 引入 React
import React from "react";

// 页面
import Login from "./views/login/login.jsx";
import Index from "./views/index/index.jsx";
import Info from "./views/info/info.jsx";
import Send from "./views/send/send.jsx";
import Friend from "./views/friend/friend.jsx";
import Aricle from "./views/article/article.jsx";

import {Route,Switch,Redirect} from "react-router-dom";

// 改到这里引入 less
import "./App.less";

// 将 外部给予的 store 注入，并进行观察
// import { inject , observer } from "mobx-react";
// @inject('store') @observer

// 引入 less
// import "./App.less";
 
class App extends React.Component{
    render(){
		return(
			<div className="App">
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/info" component={Info}></Route>
					<Route path="/send" component={Send}></Route>
					<Route path="/friend/:id" component={Friend}></Route>
					<Route path="/article/:num" component={Aricle}></Route>
					<Route path="/" component={Index}></Route>
				</Switch>
			</div>
		)
    }
}

export default App;