const joi=require('joi')

//定义验证用户名和密码规则
const username=joi.string().alphanum().min(1).max(10).required()
const password=joi.string().pattern(/^[\S]{6,12}$/).required()

//定义验证注册和登录表单数据的规则对象
exports.reg_login_schema={
    body:{
        username,
        password,
    },
}

//定义id，nickname,email的验证规则
const id=joi.number().integer().min(1).required()
const nickname=joi.string().required()
const email=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


//定义验证avatar头像的验证规则
const avatar=joi.string().dataUri().required()


//定义验证规则对象，更新用户信息
exports.update_schema={
    //对req.body里面的数据进行验证
    body:{
        id:id,
        nickname:nickname,
        email:email,

    }
}

//更新密码的验证规则
exports.update_password={
    body:{
        oldpwd:password,
        newpwd:joi.not(joi.ref('oldpwd')).concat(password)
    }

}

//更换头像的验证规则
exports.update_avatar={
    body:{
        avatar:avatar,
    }
}