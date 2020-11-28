const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const init_passport = require('./passport-conf')
const flash = require('express-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const app = express()

init_passport(passport)

const PORT = process.env.PORT || 5000
const MongoURI = `${process.env.MONGO_URI}`

mongoose.connect(MongoURI, {useNewUrlParser: true}).
    then(console.log("Connected to database")).
    catch(err => console.log(err))

app.set('view-engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next)=>{
    res.locals.user = req.user
    next()
})

app.use('/account', require('./routes/accounts'))
app.use('/links', require('./routes/links'))
app.use('/', require('./routes/index'))

app.use((req, res, next)=>{
    res.status(404).render('404.ejs ')
})  

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))