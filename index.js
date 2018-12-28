const express = require('express');
const app = express();
//const schema = require("./schema.js")
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var name;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitterdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});

app.get('/', function(req,res){
    res.sendFile(__dirname+ '/home.html');
});

var Schema = mongoose.Schema;

// var twitterSchema = new Schema({
//     tweet: String,
//     username: String,
//     timestamps:{
//       required:true
//     }
//   });
//   var twitter = mongoose.model('twitter', twitterSchema, 'twitters');
//   module.exports = twitter;

  var userSchema = new Schema({
    username: String,
    password: String
  });

  var user = mongoose.model('user', userSchema, 'users');
  module.exports = user;

  app.post('/auth', function(req,res){
        var username = (req.body.Username);
        var password = (req.body.Password);
        var s = req.body.submit;

        

        console.log(username, password);
        user.find({}, (err, result)=>{
         if (err) throw err;
            console.log(result);
        result.forEach((element) => {
                console.log(element.username)
                console.log(element.password);
                if((element.username==username)&&(element.password==password)) 
                    res.sendFile(__dirname + '/twitter.html');   
                else 
                    console.log("error");
        });
        name=username;
    });
});

var twitterSchema = new Schema({
    tweet: String,
    username: String,
    date: {type:Date, default:Date.now}
  });
  var twitter = mongoose.model('twitter', twitterSchema);
  module.exports = twitter;

  app.post('/save', function(req,res){
    //var username = username;
    var tweet = req.body.tweet;
    console.log( name,tweet);
    var newTweet = new twitter({
        tweet: tweet,
        username: name
    });
    newTweet.save(function(err){
        if (err) throw err;
        console.log("tweet added");
        twitter.find({}, function(err, result){
            if (err) throw err;
            else
            var tweets="";
                for(var i=0;i<result.length;i++){
                    tweets += result[i].tweet + "</br>" + result[i].username + "  " + result[i].date + "</br></br>";
                }


                res.send(tweets);
        });
    });

});




var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port);
});