var cricScoreService = require("./CricScoreService.js");

cricScoreService.getMatches(function(err, matches) {

      console.log("Matches ...");

      for (var key in matches) {
          var obj = matches[key];

          console.log("Geting match score for match id :" + obj.getMatchId());

          if(obj._teamOne != undefined && obj._teamTwo) {
              console.log(obj._teamOne + " vs " + obj._teamTwo);
          }


          //  console.log("------------------------------------------------------");
          //  console.log("Geting match score for match id :" + obj.getMatchId());

          //  cricScoreService.getScore(obj.getMatchId(), function (err, score) {
          //      console.log("score :" + score.getSimple());
          //  });

          //  break;
      }

});


Array.prototype.contains = function ( needle ) {
   for (i in this) {
      if (this[i] == needle) return true;
   }
   return false;
}
