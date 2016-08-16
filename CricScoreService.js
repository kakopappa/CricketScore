var fetchDataService = require('./FetchDataService.js');
var memCacheService = require('./MemCacheService.js');
var objectGeneratorService = require('./ObjectGeneratorService.js');
var persistenceService = require('./PersistenceService.js');

exports.getMatches  = function (callback) {
    console.log("Geting matches ..");

    getMatchesFromCacheOrSource(function (error, livescore) {
      objectGeneratorService.getMatches(livescore, function(err, matches) {
          callback(err, matches);
      });
    });
}

exports.getScore  = function(id, callback) {
  console.log("Get score for game : " + id);

  var score = memCacheService.getSimpleScore(id);

  if(score == null) {
      console.log("Not in cache. Looking at storage ..");
      score = persistenceService.findSimpleScore(id);

      if (score == null) {
        console.log("Not in storage. Looking at source..");

				fetchSimpleScore(id, function (err, simpleScore) {
          if (err) {
              callback(err, null);
          }
          else {
              persistenceService.insertSimpleScore(simpleScore);
              memCacheService.putSimpleScore(id, simpleScore);

              callback(null, simpleScore);
          }
        });

			} else {

				if (!score.getDetail().toLowerCase().contains("match over")) {

            fetchSimpleScore(id, function (err, newScore) {
              if(err) {
                  callback(err, null);
              }
              else {
                if (isScoreUpdated(score,newScore)) {
                  persistenceService.updateSimpleScore(newScore);
                  memCacheService.putSimpleScore(newScore);

                  callback(null, newScore);
                }
            }});
				}
        else {
            callback(null, score);
        }
			}
  }
  else {
      callback(null, score);
  }
}

function isScoreUpdated(oldScore, newScore) {
		var updated = false;
		if(newScore != null	&& newScore.getSimple() != null && newScore.getDetail() != null
				&& (!newScore.getSimple().equals(oldScore.getSimple())
					|| !newScore.getDetail().equals(oldScore.getDetail()))){
				console.log("SimpleScore score is udpated");
				updated = true;
		}
		return updated;
}

function fetchSimpleScore(id, callback) {
   fetchDataService.getScore(id, function(err, detail) {
      //console.log("fetchSimpleScore #  detail:" + detail);

      getMatchesFromCacheOrSource(function (error, livescore) {
         //console.log("fetchSimpleScore #  livescore:" + livescore);

          objectGeneratorService.getScore(detail, livescore, id, function(err, simpleScore) {
              //console.log("fetchSimpleScore #  simpleScore:" + simpleScore);
              callback(err, simpleScore);
          });
      });
   });
}

function getMatchesFromCacheOrSource(callback) {
  console.log("Get matches from cache or source ..");

  var livescore = memCacheService.getLiveScore();

  if (livescore == null) {
    console.log("Cache is empty .. getting from source ..");

    fetchDataService.getMatches(function (error, livescore) {

      if(error) {
        callback(error, null);
      }
      else {
        memCacheService.setLiveScore(livescore, function(error) {
            callback(error, livescore);
        });
      }

    });
  }
  else {
    console.log("Got score from cache ..");
    callback(null, livescore);
  }

}
