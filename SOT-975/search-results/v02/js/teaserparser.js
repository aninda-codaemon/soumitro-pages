var root = window;

root.parseTeaser = function(data, textStatus, jqXHR) {
  var recordCount, records;
  recordCount = parseInt(data["response"]["RecordCount"]);
  $(".record_count").html(data["response"]["RecordCount"]);
  if (recordCount > 1 || recordCount === 0) {
    $(".record_count_plural").html('results');
  }
  if (recordCount === 1) {
    $(".record_count_plural").html('result');
  }
  if (recordCount > 0) {
    $("#top-banner").show();
  }
  if (recordCount === 0) {
    $("#results-wrapper-searching").fadeOut(100, function() {
      return $("#no-results").fadeIn(100);
    });
    return false;
  }
  if (recordCount === 1) {
    records = [data["response"]["Records"]['Record']];
  } else {
    records = data["response"]["Records"]['Record'];
  }
  return records;
};

root.parseExtraTeaser = function(data, textStatus, jqXHR) {
  var recordCount, records;
  recordCount = ($.type(data) !== 'array' ? 1 : 0);

  if (recordCount === 0) {
    return false;
  }
  if (recordCount === 1) {
    records = data;
  }
  return records;
};

root.teaserSorter = function(records) {
  records = _.chain(records).sortBy(function(record) {
    var decimal, sortAge;
    if (_not_blank(record.age)) {
      sortAge = parseInt(record.age);
    } else {
      sortAge = 200;
    }
    decimal = 999;
    if (record.addresses().length > 0) {
      decimal -= record.addresses().length;
    }
    if (record.relatives().length > 0) {
      decimal -= record.relatives().length;
    }
    return parseFloat("" + sortAge + "." + decimal);
  }, this).value();
  return records;
};
