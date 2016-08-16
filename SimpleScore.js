function SimpleScore(simple, detail, id) {
    this._simple = simple;
    this._detail = detail;
    this._id = id;
    this._timestamp = Date.now();
    this._key = 'SimpleScore_' + id;
}


SimpleScore.prototype.getId = function() {
		return this._id;
}

SimpleScore.prototype.getSimple = function() {
	return this._simple;
}

SimpleScore.prototype.getDetail = function() {
	return this._detail;
}

SimpleScore.prototype.getTimestamp = function() {
	return this._timestamp;
}

SimpleScore.prototype.getKey = function() {
	return this._key;
}

SimpleScore.prototype.setKey = function(key) {
	this._key = key;
}

SimpleScore.prototype.setId = function(id) {
	this._id = id;
}

SimpleScore.prototype.setSimple = function(simple) {
	this._simple = simple;
}

SimpleScore.prototype.setDetail = function(detail) {
	this._detail = detail;
}

SimpleScore.prototype.setTimestamp = function(timestamp) {
	this._timestamp = timestamp;
}

SimpleScore.prototype.toJson = function() {
  var batman = {
      simple: this._simple,
      detail: this._detail,
      id: this._id
  };

  return batman;
}


module.exports = SimpleScore;
