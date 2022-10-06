//负责用户登录注册的模块路由
const express=require('express')
const router=express.Router()


//导入用户路由处理函数对应的模块
const user_handle=require('../router_handle/user.js')

//导入验证数据的中间件
const expressJoi=require('@escook/express-joi')

//导入需要的验证规则对象
const {reg_login_schema, update_password}=require('../schema/user.js')

//导入更新用户信息需要验证的规则对象
// const {update_schema}=require('../schema/user.js')


//路由模块只负责路由规则
router.post('/reguser',expressJoi(reg_login_schema),user_handle.regUser)
//登录模块
router.post('/login',expressJoi(reg_login_schema),user_handle.login)



module.exports=router