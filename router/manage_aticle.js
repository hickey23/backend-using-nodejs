const  express=require('express')

const router=express.Router()


//导入发布文章路由处理函数
const addArticle_handle=require('../router_handle/manage_article.js')


router.post('/add',addArticle_handle.addArticle)



module.exports=router