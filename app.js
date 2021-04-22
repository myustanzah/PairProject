const express = require(`express`)
const port = 8001
const session = require('express-session')
const path = require(`path`)
const home = require(`./routes/index.js`)
const app= express()
const fileupload = require(`express-fileupload`)
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
app.use(fileupload({}))
app.use(express.static(path.join(__dirname, 'upload')));
app.use(express.urlencoded({extended:true}))
app.set(`view engine`, `ejs`)
app.set(`views`, path.join(__dirname, `views`))
app.use(home)
app.listen(port, ()=>{
    console.log(port);
})

