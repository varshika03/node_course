const express = require('express');
const hbs =  require('hbs');
const fs = require('fs');
var app = express();


hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
	return  new Date().getFullYear();
});
hbs.registerHelper('screamIt',((text)=>{
	return text.toUpperCase();
}));
app.set('view engine','hbs');
app.use(express.static( __dirname + '/public'))
app.get('/',(req,res)=>{
	res.render('about.hbs',{

	});
	//the user will get this string

});

app.use((req,res,next) =>{
	var now = new Date().toString();
	var log= `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err)
		{
			console.log('Unable to append to server.log');
		}
	});

// app.use((req,res,next)=>{
// 	res.render('maintainence.hbs');
// });

next();
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page',
		welcome:"Welcome to my page"
		
	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorMEssage: "Unable to handle request"
	})
});

//app.get tells what to send back to the user making that request
//app.get(url,function)
//function(request,response)

app.listen(3000,()=>
	{
		console.log("Server is up");
	});