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
  // records = _.chain(records).map(function(record) {
  //   return new window.TeaserRecord(record);
  // }, this).sortBy(function(record) {
  //   var decimal, sortAge;
  //   if (_not_blank(record.age)) {
  //     sortAge = parseInt(record.age);
  //   } else {
  //     sortAge = 200;
  //   }
  //   decimal = 999;
  //   if (record.addresses().length > 0) {
  //     decimal -= record.addresses().length;
  //   }
  //   if (record.relatives().length > 0) {
  //     decimal -= record.relatives().length;
  //   }
  //   return parseFloat("" + sortAge + "." + decimal);
  // }, this).value();

  return records;

  // root.records = records;


  // _.each(records, function(record, index) {
  //   var html;
  //   record.setIndex(index);
  //   html = $(Mustache.to_html($('#list_item_template').html(), record));
  //   html.addClass("list_item_animated");
  //   html.appendTo($("#results")).slideDown(200);
  //   return html.animate({
  //     "opacity": "1"
  //   }, 200);
  // }, this);
  // if (Cookie.read('lead_created') !== 't') {
  //   $(".row-form").on("submit", function() {
  //     return false;
  //   });
  // }
  // setupModalScroll(records);
  // $('.refine-modal-trigger').click(function() {
  //   return $('#refine-modal').modal();
  // });
  // if (Cookie.read("lead_created") === "t") {
  //   return activateRowsDirect(records);
  // } else {
  //   return activateRowsModal(records);
  // }
};
