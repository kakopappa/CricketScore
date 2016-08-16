var xmlreader = require('xmlreader');
var SimpleScore = require("./SimpleScore.js");
var StringUtils = require("./StringUtils.js");
var Match = require("./Match.js");

exports.getMatches = function (xmlRecords, callback) {

  var matches = [];

  xmlreader.read(xmlRecords, function (err, res){
    if(err)  {
      console.log(err);
      callback(err, null);
    }

    for(var i = 0; i < res.rss.channel.item.count(); i++){
          var title = res.rss.channel.item.at(i).title.text();
          var guid = res.rss.channel.item.at(i).guid.text();
          var matchId = StringUtils.getOnlyNumbers(getCharacterDataFromElement(guid));
          var detail = getCharacterDataFromElement(title);
          var teams = detail.split(" v ");

          console.log("matchId: " + matchId + ", title: " + title);

          var match = new Match(StringUtils.getNonNumeric(teams[0]).trim(),
                                  StringUtils.getNonNumeric(teams[1]).trim(),
                                  matchId);
          matches.push(match);
    }

    callback(null, matches);

  });

    //var simpleScore = new SimpleScore();
}

exports.getScore = function(detail, livescore, id, callback) {
    //console.log( "detail: " + detail );
    //console.log( "livescore: " + livescore );
    //console.log( "id: " + id );

		getSimpleString(livescore, id, function (err, simple) {
     
      if(simple) {
          var simpleScore = new SimpleScore(simple, detail, id);
          callback(err, simpleScore);
      } else {
          callback(err, null);
      }
    });
};

function getSimpleString(livescore, id, callback) {

  xmlreader.read(livescore, function (err, res){

    if(err)  {
      console.log(err);
      callback(err, null);
      return;
    }

    // use .text() to get the content of a node:
    //console.log( res.response.text() );

    var detail = null;

    for(var i = 0; i < res.rss.channel.item.count(); i++) {
          var guid = res.rss.channel.item.at(i).guid.text();
          var matchId = StringUtils.getOnlyNumbers(getCharacterDataFromElement(guid));

          if (matchId.toString().trim() != id.toString().trim()) {
					    continue;
				  }

          var title = res.rss.channel.item.at(i).title.text();
          detail = getCharacterDataFromElement(title);
    }

    console.log("Simple return from the RSS " + detail);
    callback(null, detail);
  });
};


function getCharacterDataFromElement(element) {
		return element.trim().replaceAll("\\s+", " ");
};
