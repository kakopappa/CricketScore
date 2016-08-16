var storage = require('node-persist');
var SimpleScore = require("./SimpleScore.js");

storage.initSync();

exports.findSimpleScore  = function (id) {
  var item = storage.getItem('id');

  if(item != null) {
    var simpleScore = new SimpleScore(item.simple, item.detail, item.id);
    return simpleScore;
  }
  else {
    return null;
  }
}

exports.updateSimpleScore = function(score){
	if(score == null){
		console.log("Invalid simple score to update");
		return;
	}

  storage.setItem(score.getId(), score.toJson());

	console.log("Updated " + score);
}

exports.insertSimpleScore = function(score){
	if(score == null){
		console.log("Invalid simple score to insert");
		return;
	}

  storage.setItem(score.getId(), score.toJson());
	console.log("score Inserted");
}
