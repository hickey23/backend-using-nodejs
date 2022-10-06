//注册新用户处理函数
//登录用户处理函数

const db  = require("../db/index.js")
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('../config.js')

//这里是用来写路由处理函数的文件夹
exports.regUser=(req,res)=>{
    const userinfo=req.body
    console.log('@:',userinfo)
    
    // 对表单中的数据进行合法校验
    // if(!userinfo.username||!userinfo.password){
    //     return res.send(
    //         {
    //             status:1,
    //             msg:'输入的用户名或者密码不合法'
    //         }
    //     )
    // }

    //定义SQL语句
    //注册用户
    const sqlstr1='select * from mydb_one.ev_users where username=?'
    db.query(sqlstr1,[userinfo.username],(error,results)=>{
        // console.log('error:',error);
        if(error){
            console.log('出现错误了！');
            return res.send({status:1,msg:error.message})
        }

        //判断用户名是否被占用
        //用select查询语句，会返回一个数组，必然包含一个值
        if(results.length>0){
            return res.send({status:1,msg:'用户名被占用.请更换其他用户名!'})
        }
        //用户名可以使用
        //调用bcrypt.hashSync()对函数进行加密
        console.log('加密前的密码:',userinfo)
        userinfo.password=bcryptjs.hashSync(userinfo.password,10)
        console.log('加密后的密码:',userinfo)
    })

    //插入用户信息
    const sqlstr2='insert into mydb_one.ev_users set ?'
    //在这里进行加密处理
    userinfo.password=bcryptjs.hashSync(userinfo.password,10)
    //在数据库中插入 
    db.query(sqlstr2,{id:userinfo.id,username:userinfo.username,password:userinfo.password},(error,results)=>{
        if(error){
            console.log('发送错误了！');
            return res.send({status:1,msg:error.message})
        }
        //登录正确
        //判断影响行数是否为1 
        if(results.affectedRows!==1){
            return res.send({status:1,msg:'注册用户失败！'})
        }
        
        res.send({status:0,msg:'注册成功'})
    })
}

/////////////////登录///////////////////////////////
exports.login=(req,res)=>{
    // res.send('login ok')
    //接收表单数
    console.log(1111111);
    const userinfo=req.body
    console.log('@@@@:',userinfo);
    
    //定义sql语句
    const sqlstr3='select * from ev_users where username=?'

    db.query(sqlstr3,userinfo.username,(error,results)=>{
        if(error){
            console.log('执行SQL语句失败了');
            return res.cc({status:1,msg:error.message})
        }
        //执行SQL语句成功，但是获取到的数据条数不等于1
        if(results.length!==1){
            console.log('执行SQL语句成功，但是获取到的数据条数不等于1',results.length)
            return res.send({status:1,msg:'登录失败'})
        }

        console.log('执行SQL语句成功，登录成功');
        // res.send('login ok')
        //判断密码是否正确


        //第一个参数是未加密的密码，第二个参数是加密的密码，results返回的是一个数组，索引为0的是用户信息
        const compareResult=bcryptjs.compareSync(userinfo.password,results[0].password)
        console.log('@@@compareResult:',compareResult)
        if(!compareResult){
            return res.cc('密码错误，登录失败！')

        }
        // alert('登录成功')
        console.log('验证密码成功，登录成功')

        //在服务端生成token字符串
        //生成jwt的token字符串
        //...类似于去掉外面的括号
        const user={...results[0],password:'',user_pic:''}
        console.log('@@@@results:',results)
        console.log('@@@@user:',user)
        // @@@@results: [
        //     RowDataPacket {
        //       id: 4,
        //       username: 'lj',
        //       password: '$2a$10$yNSezqUKmJFqcinqunW7iuTgWvuGBTSxiKBNeDiaA3aN9OxfEaDDq',
        //       nickname: null,
        //       email: null,
        //       user_pic: null
        //     }
        //   ]
        // ##################################################

        // @@@@user: {
        //     id: 4,
        //     username: 'lj',
        //     password: '$2a$10$yNSezqUKmJFqcinqunW7iuTgWvuGBTSxiKBNeDiaA3aN9OxfEaDDq',
        //     nickname: null,
        //     email: null,
        //     user_pic: null
        //   }

        //对用户信息进行加密，生成token字符串
        //第一个参数是要加密的用户对象，第二个参数是加密时候用到的secret秘钥值,第三个参数指定token有效期
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'})
        console.log('tokenStr:',tokenStr);
        //响应给客户端
        res.send({
            status:0,
            msg:'登录成功',
            token:'Bearer '+tokenStr,
        })
    })
}

exports.get=(req,res)=>{
    res.send('hello')
}