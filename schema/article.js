//这里是验证规则模块
const joi=require('joi')
//定义name和alias的规则

const name= joi.string().required()

const alias=joi.string().alphanum().required()

//共享验证对象
exports.add_cate_schema={
    body:{
        name:name,
        alias:alias,
    }
}


//定义更具id删除文章的校验规则
const id=joi.number().integer().min(1).required()

exports.delete_article={
    params:{
        id:id,
    }
}


//更具id获取文章分类的验证规则
const Id=joi.number().integer().min(1).required()
exports.get_article_cates={
    params:{
        id:Id,
    }
}



//定义根据id更新文章内容的规则
const ID=joi.number().integer().min(1).required()
exports.update_article_cates={
    body:{
        id:ID,
        name:name,
        alias:alias,
    }
}
