var cricScoreService = require("./CricScoreService.js");

cricScoreService.getMatches(function(err, matches) {

      for (var key in matches) {
          var obj = matches[key];

            console.log("------------------------------------------------------");
            console.log("Geting match score for match id :" + obj.getMatchId());

            cricScoreService.getScore(obj.getMatchId(), function (err, score) {
                console.log("score :" + score.getSimple());
            });

          //  break;
      }

});
