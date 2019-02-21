var express = require('express');
var bodyParser = require('body-parser')


var app = express();

var path = require('path');





//data 
var person = [
{
name:'Pizza Hut',
image:"http://4.bp.blogspot.com/_Lhw9tVnn1As/SxkWHiTCL3I/AAAAAAAABf4/ykgThfuXkpc/s400/pizzay3W.jpg",
price:10,
ind:0
},
{
name:'califlower',
image:"https://media1.popsugar-assets.com/files/thumbor/StJZeKMPQzUufgPV_7r816a_BO4/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2015/01/06/898/n/1922729/70371c0c98d38d04_thumb_temp_image13464971420446840/i/Low-Carb-Cauliflower-Crust-Pizza-Recipe.jpg",
price:15,
ind:1
},
{
name:'Domino Pizza',
image:"http://www.spy.my/penang/images/Dominos-Pizza-Extravaganza.jpg",
price:7,
ind:2
},


{
name:'Pizza1',
image:"https://i0.wp.com/thepointsguy.com/wp-content/uploads/2017/08/pizzahutfeast.jpg?fit=1176,784px&amp;ssl=1",
price:17,
ind:3
},
{
name:'Pizza2',
image:"https://thestudentchannel.files.wordpress.com/2011/10/pizza_slice-60140003.jpg",
price:7,
ind:4
},
{
name:'Pizza3',
image:"https://www.silviocicchi.com/pizzachef/wp-content/uploads/2015/02/c-evid2.jpg",
price:5,
ind:5
},
{
name:'Pizza4',
image:"https://tse1.explicit.bing.net/th?id=OIP.jNBBwAsgiValAdOzxG-E-AHaE9&pid=Api",
price:11,
ind:6
},
{
name:'Pizza5',
image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Pizza_marinara.jpg/1200px-Pizza_marinara.jpg",
price:13,
ind:7
}







];

/////////////////
//midlewares 
/////////////////
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))


//api building
//////////////////////////////////
//routes
/////////////////////////////////
app.get('/lister/:pizza', pizzaLister);
app.post('/lister/', pizzaListerPost);

app.post('/find/:ind/', pizzaFinderPost);
app.get('/rand/', pizzaRand);
app.get('/find/:name/', pizzaExact);



app.get('/search/:pizza', getPizza);
app.get('/searchNumb/:pizza', getPizzaNumb);

app.get('/json/', function(req, res) {
    res.json(person);
});

app.get('/gallery/', function(req, res) {
    //show the response in the gallery 
    console.log(res);
});

app.get('/', function(req, res) {
    res.render('index');
});


/////////////////////////////////
//views
///////////////////////////////////
 function getPizza(req, res) {

	var data = req.params;
var count = Object.keys(person).length;
var rrr = []
	///if () +data.pizza
for (var i=0;i<count;i++){
if (person[i].name === data.pizza){
rrr.push(person[i]);
}

}
   res.send(rrr  );
}

//
 function getPizzaNumb(req, res) {

	var data = req.params;
var count = Object.keys(person).length;
var rrr = []
	///if () +data.pizza
for (var i=0;i<count;i++){
if (Number(person[i].price) < Number(data.pizza)){
rrr.push(person[i]);
}

}
   res.send(rrr  );
}
//show ---------------------------------
 function pizzaLister(req, res) {

	var data = req.params;
var count = Object.keys(person).length;
var rrr = []
	///if () +data.pizza
for (var i=0;i<count;i++){
if (Number(person[i].price) < Number(data.pizza)){
rrr.push(person[i]);
}

}
   res.render('lister',{'person':rrr});
}

//---------------post
 function pizzaListerPost(req, res) {

	var data = req.body.numb;
var count = Object.keys(person).length;
var rrr = []

for (var i=0;i<count;i++){
if (Number(person[i].price) < Number(data)){
rrr.push(person[i]);
}

}

   res.render('lister',{'person':rrr});
}

//finder
 function pizzaFinderPost(req, res) {

	var data = req.body.numb;
var count = Object.keys(person).length;
var rrr = []

for (var i=0;i<count;i++){
if (Number(person[i].ind) === Number(data)){
rrr.push(person[i]);
}

}

   res.render('detailUnic',{'person':rrr});
}


//end route view

//
 function pizzaRand(req, res) {

var count = Object.keys(person).length;
   res.render('detailRand',{'person':person[Math.floor(Math.random() * count)]});
}


 function pizzaExact(req, res) {

	var data = req.params.name;

var count = Object.keys(person).length;
var rrr = []

for (var i=0;i<count;i++){
if (person[i].name === data){
rrr.push(person[i]);
}

}

   res.render('detailUnic',{'person':rrr});
}
//



/*
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/', function (req, res) {
  res.send('Hello World!<br><b>I love pizzas, From now on, every meal should be a pizza </b><br><img src="https://recipes.timesofindia.com/photo/53110049.cms">');
});
*/

app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
