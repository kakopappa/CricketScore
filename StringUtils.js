exports.getOnlyNumbers = function (str) {
  return str.replaceAll("[^0-9]", "");
}

exports.getNonNumeric = function (str) {
		return str.replaceAll("[*&0-9/]", "");
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/*String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};*/
