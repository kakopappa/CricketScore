function Match(teamOne, teamTwo, matchId) {
    this._teamOne = teamOne;
    this._teamTwo = teamTwo;
    this._matchId = matchId;
}

Match.prototype.getTeamOne = function() {
    return this._teamOne;
};

Match.prototype.getTeamTwo = function() {
		return this._teamTwo;
};

Match.prototype.getMatchId = function() {
	return this._matchId;
};

module.exports = Match;
