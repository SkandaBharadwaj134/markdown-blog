const express= require('express')
const app= express()
const articleRouter = require('./routes/articles.js')
const Articles = require('./models/article.js')
const mongoose= require('mongoose')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blogs')
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))


app.get('/',async(req,res)=>{
    const articles = await Articles.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index',{articles:articles})
})
app.use('/articles',articleRouter)
app.listen(process.env.PORT || 5000)