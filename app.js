
//配置服务器
const express=require('express')
const joi=require('joi')
const app=express()

// const { expressJWT } = require('express-jwt');
// const { expressJWT:expressJWT } = require("express-jwt")



//导入并且配置cors
const cors=require('cors')
app.use(cors())

//配置解析表单的中间件,只能解析application/ x-weww-form-urlencoded格式的中间件
app.use(express.urlencoded({extend:false})) 

//在路由之前封装res.cc函数
app.use((req,res,next)=>{
    //status默认值是1，表示失败情况
    //error值是一个错误的对象，也可能是一个错误的描述字符串
    res.cc=function(error,status=1){
        res.send({
            status,
            message:error instanceof Error ? error.message :error,
        })

    }
    next()
})

//一定要在路由之前配置解析
const expressJWT=require('express-jwt')
const config=require('./config.js')
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))



//导入路由模块router
const userRouter=require('./router/router.js')
app.use('/api',userRouter)

//导入用户信息模块
const userinfoRouter=require('./router/userinfo.js')
//以my开头的接口都是有权限的接口，需要token验证
app.use('/my',userinfoRouter)


//导入并使用文章分类的路由模块
const articleRouter=require('./router/article.js')
app.use('/my/article',articleRouter)


//导入发布文章模块的路由
const articleAddRouter=require('./router/manage_aticle.js')
app.use('/my/article',articleAddRouter)




//定义错误级别中间件
app.use((error,req,res,next)=>{
    //验证失败导致的错误
    if(error instanceof joi.ValidationError){
        // console.log('--------------------');
        return res.cc(error)
    }
    //身份认证失败错误
    // console.log(111111);
    if(error.name=='UnauthorizedError'){
        // console.log('@@@@',error);
        return res.cc('身份认证失败1111111')
    }
    // res.cc('成功')
    //未知错误
    res.cc(error)
})


app.get('/get',(req,res)=>{
    res.send('123')
})

app.listen('8080',()=>{
    console.log('服务器启动，监听8080端口')
})