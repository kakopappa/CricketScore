var cache = require('memory-cache');
var LIVESCORE  = "LIVESCORE";
var TIMEOUT_SECONDS = 5000; // Time in ms

exports.getSimpleScore = function(key) {
  return cache.get(key);
}

exports.putSimpleScore = function(id, score) {
		if(score == null || id == null) {
			  console.log("score or id is null");
			  return;
		}

	  cache.put(id, score);
}

exports.getLiveScore  = function () {
    return cache.get(LIVESCORE)
}

exports.setLiveScore  = function (livescore, callback) {
    if(livescore == null){
      console.log("Livescore is null");
      callback("Livescore is null");
    }
    else {
      cache.put(LIVESCORE, livescore, TIMEOUT_SECONDS, function(key, value) {
          //console.log(key + ' did ' + value);
          callback(null);
      });
    }
}
