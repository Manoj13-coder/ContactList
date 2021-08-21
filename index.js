const express = require('express');
const path = require('path');
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
//static files
app.use(express.static(path.join(__dirname,'./styling')));
//middleware
app.use(express.urlencoded());
//middleware
app.use((req,res,next)=>{
    console.log("Middleware called");
    next();
});
var contactList = [
    {
        name : "Manoj Kumar",
        phone : "1111111111"
    },
    {
        name: "Jordan",
        phone: "222222222"
    },
    {
        name: "Michael",
        phone : "333333333"
    }
]
app.get('/',(req,res)=>{
    return res.render('home',{
        title:'Contact List',
        contacts: contactList
    });
});
app.get('/delete/',(req,res)=>{
    let phone = req.query.phone;
    let Index = contactList.findIndex((contact)=>{
        return contact.phone == phone;
    });
    if(Index != -1){
        contactList.splice(Index,1);
    }
    return res.redirect('/');
});
app.post('/create',(req,res)=>{
    const {Name,Number} = req.body;
    contactList.push({
        name: Name,
        phone: Number
    });
    return res.redirect('/');
});
app.get('*',(req,res)=>{
    return res.status(400).send("<h1>Error</h1>");
});
app.listen(3000,()=>{
    console.log("Running sever at port 3000");
});