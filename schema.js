var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitterdb',function(err){
    if (err) throw err;
    console.log("successfully connected");
});

var Schema = mongoose.Schema;

var twitterSchema = new Schema({
    tweet: String,
    username: String,
    timestamps:{
      required:true
    }
  });
  var twitter = mongoose.model('twitter', twitterSchema);
  module.exports = twitter;

  var userSchema = new Schema({
    username: String,
    password: String
  });
  var user = mongoose.model('user', userSchema);
  module.exports = user;

  user.find({}, function(err, result){
    console.log(result);
  });