/*
  Convenience helpers used in FrameRida.
*/

(function (H) {

  var states = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'DC': 'District of Columbia',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': "Tennessee",
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': "West Virginia",
    'WI': 'Wisconsin',
    'WY': 'Wymoing'
  }
  /*
    Check if the supplied argument is not 'all' or a falsy value.
    {{#validState state}} It's a state {{else}} All selected {{/validState}}
  */
  H.registerHelper('validState', function (stateValue, options) {
    var isValid = stateValue && (stateValue.toLowerCase() !== "all");
    return (isValid) ? options.fn(this) : options.inverse(this);
  });

  /*
    Uppercase a string.
    {{uppercase 'hello'}}
  */
  H.registerHelper('uppercase', function (item) {
    if (!item) return "";
    return item.toUpperCase();
  });

  /*
    To be used within an each statement. Returns iterated index starting at 1
    instead of 0.
  */
  H.registerHelper('index', function (item) {
    return item.data.index + 1;
  });

  H.registerHelper('fullState', function(item){
    return states[item];
  });

  H.registerHelper('phonify', function(item){
    if (!item) {
      return;
    }
    var justNumbers = item.replace(/\D/g, ""),
    phonified = "(" + justNumbers.slice(0,3) + ") " + justNumbers.slice(3,6) +"-" + justNumbers.slice(6,10);
    return phonified;
  });

  H.registerHelper('prettyCarrier', function(item){
    if (!item) {
      return;
    }

    var words = item.split(),
        prettied =[]
    words.forEach(function(word){
      var capitalized = word.toLowerCase().replace(/\b\w/g, function(l){ return l.toUpperCase()})
      prettied.push(capitalized);
    })
    return prettied;
  });

  H.registerHelper('prettyDataObject', function(){
    return JSON.stringify(this, null, 2);
  });

  H.registerHelper('moreThanFive', function(){
    var recordCount = parseInt(this.recordCount);

    if (recordCount <= 5) {
      return "";
    } else {
      var string = '<a href="https://www.knowthycustomer.com/lp/b56a8b/4/landing">Sign up</a> to see at least <span class="turn-blue">' + (recordCount - 5).toString() + "</span>" + ' more results for ' + '<span class="turn-blue">"' + this.searchedName + '"</span>';
      return new H.SafeString(string);
    }
  });


  // wasnt able to reupdate page on currentTeaser store change, framerida wasnt allowing each to be used to
  // iterate over 'teasers' in object. Got rid of iteration and added preview helpers to
  // instantly show change on page.

  H.registerHelper('previewName', function(){

    var names;
    if (!this.Names || !this.Names.Name){
      return;
    }
    if ($.type(this.Names.Name) !== 'array') {
      names = [this.Names.Name];
    } else if ($.type(this.Names.Name) === 'array') {
      names = this.Names.Name;
    }

    var fn = names[0].First,
        ln = names[0].Last;
    return (fn + " " + ln).nameize();

  });


  H.registerHelper('previewLocation', function(){
    // debugger
    var record = this,
        addresses = _previewAddresses(record);

    if (addresses && addresses.length !== 0) {
      var index = 0;
      while (addresses[index] === undefined) {
        index++;
      }
      return addresses[index].toUpperCase();
    } else {
      return [];
    }

  });

  H.registerHelper('previewDead', function(){
    if (this.hasDeadAge === '0'){
      return false;
    } else {
      return this.DODs.Item.DeadAge;
    }
  });

  H.registerHelper('previewAddresses', function(){
    // debugger
    var addresses = _previewAddresses(this);
      if (addresses.length <= 1){
        return false;
      } else {
        if (!addresses[1]){
          return false;
        }

        return new Handlebars.SafeString('<p><span class="blue-title">' +'Past Cities: </span>' + addresses[1] + ', +' + (addresses.length - 1).toString() + ' More!</p>');

      }
  });

  H.registerHelper('previewEmails', function(){
    // debugger
    if (this.teaserData.hasEmail === false) {
      return false;
    }

    var extraData = this.teaserData.extraData,
        emails = _.find(extraData, { 'type': 'emails' }).emailAddress,
        openingHtml = '<p><span class="blue-title">Emails: </span>';

    if (emails.length === 1){
      return new Handlebars.SafeString(openingHtml + emails[0]);
    } else {
      return new Handlebars.SafeString(openingHtml + emails[0] + ', +' + (emails.length - 1).toString() + ' More!</p>');
    }

  });

  H.registerHelper('previewPhones', function(){
    // debugger
    if (this.teaserData.hasPhone === false) {
      return false;
    }

    var extraData = this.teaserData.extraData,
        phoneNumbers = _.find(extraData, { 'type': 'phones' }).phoneNumber,
        openingHtml = '<p><span class="blue-title">Phone Numbers: </span>';

    if (phoneNumbers.length === 1){
      return new Handlebars.SafeString(openingHtml + phoneNumbers[0]);
    } else {
      return new Handlebars.SafeString(openingHtml + phoneNumbers[0] + ', +' + (phoneNumbers.length - 1).toString() + ' More!</p>');
    }
  });

  H.registerHelper('previewSocial', function(){
    // debugger
    if (this.teaserData.hasSocial === false) {
      return false;
    }

    var extraData = this.teaserData.extraData,
        profiles = _.find(extraData, { 'type': 'social' }).socialNetwork,
        openingHtml = '<p><span class="blue-title">Social Profiles: </span>';

    if (profiles.length <= 2){
      var profList = profiles.join(', ');
      return new Handlebars.SafeString(openingHtml + profList);
    } else {
      return new Handlebars.SafeString(openingHtml + profiles.slice(0,2).join(', ') + ', +' + (profiles.length - 2).toString() + ' More!</p>');
    }
  });

  H.registerHelper('previewRelatives', function(){
    // debugger
    if (this.teaserData.hasRelatives === false) {
      return false;
    }

    var extraData = this.teaserData.extraData,
        careers = _.find(extraData, { 'type': 'careers' }).socialNetwork,
        openingHtml = '<p><span class="blue-title">Social Profiles: </span>';

    if (profiles.length <= 2){
      var profList = profiles.join(', ');
      return new Handlebars.SafeString(openingHtml + profList);
    } else {
      return new Handlebars.SafeString(openingHtml + profiles.slice(0,2).join(', ') + ', +' + (profiles.length - 2).toString() + ' More!</p>');
    }
  });

  H.registerHelper('previewRelatives', function(){
    var relatives;
    if (this.Relatives === void 0){
      return false;
    }

    if ($.type(this.Relatives.Relative) !== 'array') {
      relatives = [this.Relatives.Relative];
    } else if ($.type(this.Relatives.Relative) === 'array') {
      relatives = this.Relatives.Relative;
    }

    var niceRelatives = _.chain(relatives).map(function(relative) {
      return _makeName(relative);
    }, this).filter(function(relative) {
      return relative !== null;
    }).map(function(relative) {
      return relative.nameize();
    }).uniq().value();

    var openingHtml = '<p><span class="blue-title">Relatives: </span>';

    if (niceRelatives.length <= 2){
      return new Handlebars.SafeString(openingHtml + niceRelatives.join(', '));
    } else {
      return new Handlebars.SafeString(openingHtml + niceRelatives.slice(0,2).join(', ') + ', +' + (niceRelatives.length - 2).toString() + ' More!</p>');
    }
  });

  H.registerHelper('previewImages', function(){
    if (this.teaserData.hasPhotos === false) {
      return false;
    }

    var extraData = this.teaserData.extraData,
        count = _.find(extraData, { 'type': 'photos' }).count;

    if (count < 1) {
      return false;
    }

    var openingHtml = '<p><span class="blue-title">Images: </span>';
    return new Handlebars.SafeString(openingHtml + count.toString());
  });

  H.registerHelper('previewPrettyRecord', function(){
    return JSON.stringify(this, null, 2);
  });











}(Handlebars));
