//这是路由处理函数
const db=require('../db/index.js')


exports.getArticleCates=(req,res)=>{
    // res.send('ok')
    const sql='select * from article where isdelete=0 order by id'
    db.query(sql,(error,results)=>{
        if(error){
            return res.cc(error)
        }
        res.send({
            status:0,
            message:'获取文章数据成功',
            data:results[0],
        })
    })
}


//
exports.addArticleCates=(req,res)=>{
    const sql='select * from article where name=? or alias=?'
    db.query(sql,[req.body.name,req.body.alias],(error,results)=>{
        if(error){
            return res.cc(error)
        }
        if(results.length==2){
            return res.cc('分类名称和分类别名被占用，请更换后重试')
        }
        if(results.length==1&&results[0].name==req.body.name&&results[0].alias==req.body.alias){
            return res.cc('分类名称和分类别名被占用，请更换后重试')
        }
        if(results.length==1&&results[0].name==req.body.name){
            return res.cc('分类名称被占用')
        }
        if(results.length==1&&results[0].alias==req.body.alias){
            return res.cc('分类别名被占用')
        }
        ////////
        //查询成功！
        //req.body是整个请求体
        const Sql='insert into article set ?'
        db.query(Sql,req.body,(error,results)=>{
            if(error){
                return res.cc(error)
            }
            if(results.affectedRows!==1){
                return res.cc('sql语句执行失败，新增文章分类失败')
            }
            res.send({
                status:0,
                msg:'新增文章分类成功'
            })

        })
 
    })
}

//根据id删除文章分类
exports.deleteArticle=(req,res)=>{
    // res.send('ok')
    const sql='update article set isdelete=1 where id=?'
    db.query(sql,req.params.id,(error,results)=>{
        if(error){
            return res.cc(error)
        }
        if(results.affectedRows!==1){
            return res.cc('SQL语句执行失败，删除文章分类失败')
        }
        res.send({
            status:0,
            msg:'删除文章成功！'
        })
    })
}



//
exports.getArticleById=(req,res)=>{
    // res.send('ok')
    const sql='select * from article where id=?'
    db.query(sql,req.params.id,(error,results)=>{
        if(error){
            return res.cc(error)
        }
        if(results.affectedRows!==1){
            return res.cc('sql语句执行失败，根据id获取文章数据失败')
        }
        res.send({
            status:0,
            msg:'获取文章数据成功',
            data:results[0],
        })
    })

}



//更菊id更新文章内容
exports.updateById=(req,res)=>{
    // res.send('ok')
    //与不等于提交过来的id进行比较，看name和alias是否有已经存在的
    const Sql='select * from article where id<>? and (name=? or alias=?)'
    db.query(Sql,[req.body.id,req.body.name,req.body.alias],(error,results)=>{
        if(error){
            return res.cc(error)
        }
        //名称和别名占用的4种情况
        //当出现name和alias都被占用时候
        if(results.length==2){
            return res.cc('查询失败name和alias都被占用')
        }
        if(results.length==1&&results[0].name==req.body.name&&results[0].name==req.body.alias){
            return res.cc('名称name与别名alias都被占用')
        }
        if(results.length==1&&results[0].name==req.body.name){
            return res.cc('分类名称name被占用，请更换后重试')
        }
        if(results.length==1&&results[0].alias==req.body.alias){
            return res.cc('分类别名alias被占用，请更换后重试')
        }
        // res.send('ok')
    })

    const sql='update article set ? where id=?'
    db.query(sql,[req.body,req.body.id],(error,results)=>{
        if(error){
            return res.cc(error)
        }
        if(results.affectedRows!==1){
            return res.cc('SQL语句执行失败，更新文章分类失败')
        }
        res.send({
            status:0,
            msg:'更新文章成功',
            data:results[0],
        })
    })
}