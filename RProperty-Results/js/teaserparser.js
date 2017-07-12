var root = window;

root.parseTeaser = function(data, textStatus, jqXHR) {
  var properties = _.get(data, 'entities.properties') || [];
  return properties && properties.length > 0 ? properties[0] : {};
};

root.teaserSorter = function(records) {
  return records;
};