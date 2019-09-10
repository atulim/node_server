const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('viewengine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err)
    console.log('Unable to append to server log.');
  });
  next();
});

app.get('/',(req,res) =>{

  res.render('home.hbs',{
    pageTitle: ' Home' ,
    currentYear: new Date().getFullYear()
  });
});
app.get('/about', (req,res) => {

  res.render('about.hbs',{
    pageTitle: 'Yes',
    currentYear: new Date().getFullYear()
  });
});
app.listen(port, () => {
  console.log(`erver is up on port ${port}`);
});
