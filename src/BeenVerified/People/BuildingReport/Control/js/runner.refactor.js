; (function () {

  var getTeaserData = function (data, initiator) {
    var xhrData = window.bv.utils.getTeaserData(data);
    $.when(xhrData).done(function (result) {
      var teaserRecords;
      var xhrResult = result;

      teaserRecords = parseTeaser(xhrResult);

      var teaserDataObj = {
        recordCount: xhrResult.response.RecordCount,
        teasers: teaserRecords
      };

      if (!amplify.store('currentRecord')) {	// An user using Safari Incognito.
        var currentRecord = _.find((teaserRecords || []), { bvid: data.bvid });
        var parsedRecord = new TeaserRecord(currentRecord);
        /**
         * Workaround for framerida binding issued, because isn't display the fields (fullName & firstName)
         * Probably because those attributes are functions. 
         */
        currentRecord.fullName = parsedRecord.fullName();
        currentRecord.firstName = parsedRecord.firstName();
        amplify.store('currentRecord', currentRecord);
      }

      amplify.store('teaserData', teaserDataObj);
    });
  };
}());
