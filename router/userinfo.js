const express= require('express')
// const app=express()

const router=express.Router()


const uer_info_handle=require('../router_handle/userinfo.js')

//导入验证数据的中间件
const expressJoi=require('@escook/express-joi')
//导入更新用户信息需要验证的规则对象
const {update_schema}=require('../schema/user.js')
const{update_password}=require('../schema/user.js')
const{update_avatar}=require('../schema/user.js')

//挂载路由
router.get('/userinfo',uer_info_handle.getUserInfo)

//更新用户信息路由
router.post('/userinfo',expressJoi(update_schema),uer_info_handle.updateUserInfo)

//更新密码的路由
//这个也要携带token去发送请求
router.post('/updatepwd',expressJoi(update_password),uer_info_handle.updatepassword)

//更新头像的路由
router.post('/update/avatar',expressJoi(update_avatar),uer_info_handle.updateAvatar)

module.exports=router


