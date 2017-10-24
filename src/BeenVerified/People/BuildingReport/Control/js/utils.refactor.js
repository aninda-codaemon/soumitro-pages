(function () {
  window.bv = window.bv || {};
  window.bv.utils = window.bv.utils || {};

  var getRecordCountBucket = function (count) {
    count = parseInt(count, 10);
    if (count === 0) return '0';
    else if (count === 1) return '1';
    else if (count === 100) return '100';
    else if (count >= 1 && count <= 20) return '2-20';
    else if (count >= 21 && count <= 50) return '21-50';
    else if (count >= 51 && count <= 75) return '51-75';
    else if (count >= 76 && count <= 99) return '76-99';
    else return 'No Data';
  };

  function notifyRecordCount(eventType) {
    var teaserData = amplify.store('teaserData');
    var count = teaserData && teaserData.recordCount || 'No Count';
    var bucket = getRecordCountBucket(count);
    var eventName = eventType + ': ' + bucket;
    trackNL(eventName);
  }
  
  window.bv.utils = {
    notifyRecordCount: notifyRecordCount,
  };
}());
