
var BASE_URL = "http://www.espncricinfo.com/ci/engine/match/";
var LIVE_SCORE_URL = "http://static.espncricinfo.com/rss/livescores.xml";

var request = require('request');

exports.getScore = function (id, callback) {
  request(BASE_URL + id + '.html', function (error, response, body) {

    if (!error && response.statusCode == 200) {
        // Process the response body
        //console.log("getScore html body:" + body);
        callback(null, body);
    }
    else {
        callback(error, null);
    }
  })
};

exports.getMatches = function (callback) {
  request(LIVE_SCORE_URL, function (error, response, body) {

    if (!error && response.statusCode == 200) {
        // Process the response body
        //console.log("getMatches html body:" + body);
        callback(null, body);
    }
    else {
        callback(error, null);
    }
  })
};
