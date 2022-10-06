//导入数据库操作模块
const db=require('../db/index.js')
const bcryptjs=require('bcryptjs')

var Data={}
//这个暴露的是一个对象
exports.getUserInfo=(req,res)=>{
    // res.send('ok')
    const sqlstr='select id,username,nickname,email,user_pic from ev_users where id=?'
    //只要身份认证成功就会在req上挂载一个属性user
    //express-jwt，7以上的版本会挂载到req.auth

    //执行SQL语句失败
    db.query(sqlstr,req.user.id,(error,results)=>{
        if(error){
            return res.cc(error)
        }
        //执行SQL语句成功但results.length!==1
        if(results.length!==1){
            return res.cc('SQL语句获取用户信息失败')
        }
        Data=results[0]
        res.send({
            status:0,
            msg:'获取用户信息成功',
            //results第一个索引返回的是用户信息
            data:results[0],
        })
    })
}

//更新用户信息处理函数
exports.updateUserInfo=(req,res)=>{
    // res.send('ok')
    const sql='update ev_users set ? where id=?'
    db.query(sql,[req.body,req.body.id],(error,results)=>{
        if(error){
            return res.cc(error)
        }
        if(results.affectedRows!==1){
            return res.cc('SQL语句获取用户信息失败')
        }
        //获取数据成功
        console.log(results)
        //这个是打印出来的results
        // OkPacket {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 0,
        //     serverStatus: 2,
        //     warningCount: 0,
        //     message: '(Rows matched: 1  Changed: 0  Warnings: 0',
        //     protocol41: true,
        //     changedRows: 0
        //   }
        // getUserInfo1()
        res.send({
            status:0,
            msg:'更新用户成功',
            data:Data,
        })
    })
}


//
exports.updatepassword=(req,res)=>{
    // res.send('ok')
    //更加id查询用户信息
    const sqlstr1='select * from ev_users where id=?'
    db.query(sqlstr1,req.user.id,(error,results)=>{
        if(error){
            return res.cc(error)
        }
        if(results.length!==1){
            return res.send('sql语句获取用户信息失败,用户不存在')
        }
        //判断密码是否正确
        const compareResult=bcryptjs.compareSync(req.body.oldpwd,results[0].password)
        if(!compareResult){
            return res.cc('旧密码错误')
        }
        // res.send('ok')
        //更新数据库
        const sqlstr2='update ev_users set password=? where id=?'

        const newpwd=bcryptjs.hashSync(req.body.newpwd,10)
        db.query(sqlstr2,[newpwd,req.user.id],(error,results)=>{
            if(error){
                return res.cc(error)
            }
            if(results.affectedRows!==1){
                return res.cc('SQL更新用户信息失败')
            }
            res.send({
                status:0,
                msg:'更新密码成功'
            })

        })
        

    })

}

//更换头像处理函数
exports.updateAvatar=(req,res)=>{
    // res.send('ok')
    const sqlstr='update ev_users set user_pic=? where id=?'
    db.query(sqlstr,[req.body.avatar,req.user.id],(error,results)=>{
        if(!error){
            return res.cc(error)
        }
        if(results.affectedRows!==1){
            return res.cc('SQL语句更换头像信息失败')
        }
        res.send({status:0,msg:'更换头像成功'})
    })
}