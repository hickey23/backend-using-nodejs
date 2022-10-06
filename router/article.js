//这是文章分类的路由
const express=require('express')

const router=express.Router()
const article_handle=require('../router_handle/article_handle.js')


//导入验证数据中间件
const expressjoi=require('@escook/express-joi')
//导入需要验证的规则
const {add_cate_schema}=require('../schema/article.js')

const {delete_article}=require('../schema/article.js')

const {get_article_cates}=require('../schema/article.js')

const{update_article_cates}=require('../schema/article.js')



//获取文章数据接口
router.get('/cates',article_handle.getArticleCates)
//
//新增文章分类接口
router.post('/addcates',expressjoi(add_cate_schema),article_handle.addArticleCates)

//根据id删除文章分类的路由
router.get('/deletecate/:id',expressjoi(delete_article),article_handle.deleteArticle)

//根据id获取文章分类的路由
router.get('/cates/:id',expressjoi(get_article_cates),article_handle.getArticleById)


//根据id更新文章内容
router.post('/updatecate',expressjoi(update_article_cates),article_handle.updateById)


module.exports=router