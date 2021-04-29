import { observable, computed, action, makeObservable } from "mobx";

class Store {

    // 将 store 的变化渲染到 view 上
    constructor() {
        makeObservable(this);
    }

    // 用户
    @observable user = [
        {
            num: 1,
            name: "赵二",
            gender: "男",
            date: "2021-4-26",
            desc: "俺叫赵二",
            id: 13111111111,
            pass: 111111,
        },
        {
            num: 2,
            name: "张三",
            gender: "男",
            date: "2021-4-26",
            desc: "俺叫张三",
            id: 13222222222,
            pass: 222222,
        },
        {
            num: 3,
            name: "李四",
            gender: "男",
            date: "2021-4-26",
            desc: "俺叫李四",
            id: 13333333333,
            pass: 333333,
        },
    ]

    // 短文
    @observable article = [
        {
            num:1,
            id:13111111111,
            content:"（ 板块一 ）生活就像海洋，只有意志坚强的人，才能到达彼岸",
            tag:"英语",
            star:0,
            part:1,
            comment:[
                {
                    id:13222222222,
                    num:1,
                    content:"生活就像海洋",
                    reply:[
                        {
                            id:13111111111,
                            content:"只有意志坚强的人",
                            to:null
                        },
                        {
                            id:13222222222,
                            content:"才能到达彼岸",
                            to:13111111111
                        },
                    ]
                }
            ]
        },
        {
            num:2,
            id:13222222222,
            content:"（ 板块一 ）鸡扒饭好好吃",
            tag:"美食",
            star:0,
            part:1,
            comment:[
                {
                    id:13333333333,
                    num:1,
                    content:"阿叔人很好",
                    reply:[
                        {
                            id:13222222222,
                            content:"每次去都加鸡蛋",
                            to:null
                        },
                        {
                            id:13333333333,
                            content:"可惜很快就没得吃了",
                            to:13222222222
                        },
                    ]
                }
            ]
        },
        
        {
            num:3,
            id:13111111111,
            content:"（ 板块二 ）生活就像海洋，只有意志坚强的人，才能到达彼岸",
            tag:"英语",
            star:0,
            part:2,
            comment:[
                {
                    id:13222222222,
                    num:1,
                    content:"生活就像海洋",
                    reply:[
                        {
                            id:13111111111,
                            content:"只有意志坚强的人",
                            to:null
                        },
                        {
                            id:13222222222,
                            content:"才能到达彼岸",
                            to:13111111111
                        },
                    ]
                }
            ]
        },
        {
            num:4,
            id:13222222222,
            content:"（ 板块二 ）鸡扒饭好好吃",
            tag:"美食",
            star:0,
            part:2,
            comment:[
                {
                    id:13333333333,
                    num:1,
                    content:"阿叔人很好",
                    reply:[
                        {
                            id:13222222222,
                            content:"每次去都加鸡蛋",
                            to:null
                        },
                        {
                            id:13333333333,
                            content:"可惜很快就没得吃了",
                            to:13222222222
                        },
                    ]
                }
            ]
        },
        
        {
            num:5,
            id:13111111111,
            content:"（ 板块三 ）生活就像海洋，只有意志坚强的人，才能到达彼岸",
            tag:"英语",
            star:0,
            part:3,
            comment:[
                {
                    id:13222222222,
                    num:1,
                    content:"生活就像海洋",
                    reply:[
                        {
                            id:13111111111,
                            content:"只有意志坚强的人",
                            to:null
                        },
                        {
                            id:13222222222,
                            content:"才能到达彼岸",
                            to:13111111111
                        },
                    ]
                }
            ]
        },
        {
            num:6,
            id:13222222222,
            content:"（ 板块三 ）鸡扒饭好好吃",
            tag:"美食",
            star:0,
            part:3,
            comment:[
                {
                    id:13333333333,
                    num:1,
                    content:"阿叔人很好",
                    reply:[
                        {
                            id:13222222222,
                            content:"每次去都加鸡蛋",
                            to:null
                        },
                        {
                            id:13333333333,
                            content:"可惜很快就没得吃了",
                            to:13222222222
                        },
                    ]
                }
            ]
        },
    ]

    // 登陆写入
    @observable loginId = null

    // 登陆
    @action loginIn = (obj) => {
        var stat = false;
        this.user.map(item=>{
            if( obj.id == item.id && obj.pass == item.pass ){
                this.loginId = obj.id;
                stat = true;
            }
        });
        return stat;
    }

    // 点赞
    @action giveStar = (id) => {
        this.article.map(item=>{
            if( item.num == id ){
                item.star++
            }
        });
    }

    // 搜索用户
    @action SearchUser = (id) => {
        var stat = false;
        this.user.map(item=>{
            if( id == item.id ){
                stat = item;
            }
        });
        return stat;
    }

    // 搜索文章
    @action SearchArticle = (num) => {
        var stat = false;
        this.article.map(item=>{
            if( num == item.num ){
                stat = item;
            }
        });
        return stat;
    }

    // 发送评论
    @action sendComment = ( obj , num ) => {
        this.article.map(item=>{
            if( num == item.num ){
                item.comment.push( obj );
            }
        });
    }

    // 发送回复
    @action sendReply = ( obj , numA , numC ) => {
        console.log( obj , numA , numC );
        this.article.map(item=>{
            if( numA == item.num ){
                item.comment.map(com=>{
                    if( numC == com.num ){
                        com.reply.push(obj);
                    }
                });
            }
        });
    }

    // 发送文章
    @action pushArticle = ( obj ) => {
        this.article.push(obj);
        console.log( this.article );
    }

    // 修改用户信息
    @action changeInfo = ( obj ) => {
        this.user.map(item=>{
            if( item.id == obj.id ){
                item.name   = obj.name
                item.gender = obj.gender
                item.date   = obj.date
                item.desc   = obj.desc
            }
        });
        return true;
    }
}

var store = new Store();

export default store;