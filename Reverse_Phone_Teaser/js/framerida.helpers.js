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
  };

  var profiles = ["facebook, linkedin, twitter, google"];


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

  H.registerHelper('socialCount', function(item){
    if (!this.available_data_counts) {
      return;
    }
    var count = this.available_data_counts.url;
    if (count === 0) {
      return "";
    } else if (count === 1) {
      return "1 Social media profile found.";
    } else {
      return count.toString() + " Social media profiles found.";
    }
  });

  H.registerHelper('emailCount', function(item){
    if (!this.available_data_counts) {
      return;
    }
    var count = this.available_data_counts.email;
    if (count === 0) {
      return "";
    } else if (count === 1) {
      return "1 E-mail address found.";
    } else {
      return count.toString() + " E-mail addresses found.";
    }
  });

  H.registerHelper('photoCount', function(item){

    if (!this.available_data_counts) {
      return;
    }
    var count = this.available_data_counts.image_url;
    if (count === 0) {
      return "";
    } else if (count === 1) {
      return "1 Photo found.";
    } else {
      return "Unlock " + count.toString() + " additional photos.";
    }
  });

  H.registerHelper('phoneCount', function(item){
    if (!this.available_data_counts) {
      return;
    }
    var count = this.available_data_counts.phone.total;
    if (count === 0) {
      return "";
    } else if (count === 1) {
      return "1 Additional phone number located";
    } else {
      return count.toString() + " Additional phone numbers located.";
    }
  });

  H.registerHelper('educationCount', function(item){
    if (!this.available_data_counts) {
      return;
    }

    var jobCount = this.available_data_counts.job,
        educationCount = this.available_data_counts.education;

    if ((jobCount + educationCount) < 1) {
      return "1 Career & Education Report!";
    } else {
      return (jobCount + educationCount) + " Career & Education Reports!"
    }
  });

  H.registerHelper('extraCount', function(item){
    if (!this.available_data_counts) {
      return;
    }
    var count = this.available_data_counts.job;
    if (count === 0) {
      return "";
    } else if (count === 1) {
      return "1 Job found.";
    } else {
      return count.toString() + " Jobs found.";
    }
  });

  H.registerHelper('totalJobEducation', function(item){
    if (!this.available_data_counts) {
      return;
    }

    return this.available_data_counts.education + this.available_data_counts.job;
  });

  H.registerHelper('totalRecordCount', function(item){
    if (!this.available_data_counts) {
      return "";
    }

    var counts = this.available_data_counts,
        totalCount = 0;

    Object.keys(counts).forEach(function(key){
      if (typeof counts[key] === "number") {
        totalCount += counts[key];
      } else if (key === "phone"){
        totalCount += counts[key].total;
      }
    });

    return totalCount;
  });

  H.registerHelper('hasLocation', function(item){
    var addresses = this.addresses;
    if (!addresses || _.isEmpty(addresses)) {
      return item.inverse(this);
    } else {
      return item.fn(this);
    }
  });

  H.registerHelper('hasAdditionalPhones', function(item){
    var phones = this.phones;
    if (!(this.phones) || (this.phones.length <= 1)) {
      return item.inverse(this);
    } else {
      return item.fn(this);
    }
  });

  H.registerHelper('firstLocation', function(item){
    var addresses = this.addresses;

    if (!addresses || _.isEmpty(addresses)) {
      return "";
    }

    if (addresses[0].parts.city === ""){
      return states[addresses[0].parts.state];
    } else {
      return addresses[0].full;
    }
  });

  H.registerHelper('remainingAddresses', function(item){
    var addresses = this.addresses;
    var addressCount = addresses.length;
  if (addressCount === 2) {
      return "1 additional address, including " + addresses[1].full;
    } else {
      return addressCount + " additional addresses, including " + addresses[1].full;
    }
  });

  H.registerHelper('additionalAddresses', function(item){
    var addresses = this.addresses;
    // debugger

    if (!addresses || !addresses[1]) {
      return item.inverse(this);
    }
    var addressCount = addresses.length;
    if (addressCount === 1) {
      return item.inverse(this);
    } else {
      return item.fn(this);
    }

  });

  H.registerHelper('moreThan3Phones', function(item){
    // debugger
    var phones = this.phones;
    if (!phones || !phones[1] || phones.length < 5){
      return item.inverse(this);
    } else {
      return item.fn(this);
    }
  });

  H.registerHelper('hasAdditionalPhones', function(item){
    var phones = this.phones;
    if (!(this.phones) || (this.phones.length <= 1)) {
      return item.inverse(this);
    } else {
      return item.fn(this);
    }
  });

  H.registerHelper('phoneList', function(item){
    var phones = this.phones;

    if (!phones || !phones[1]){
      return "";
    }
    var phoneList = [];
    for (var i = 1; i < phones.length; i++) {
      if (i === 4) {
        break;
      }
      var number = phones[i].number,
          formattedNumber = "(" + number.slice(0,3) + ") " + number.slice(3,6) + "-" + number.slice(6,10);

      if (formattedNumber) {
        phoneList.push(formattedNumber);
      }  else {
        phoneList.push(number);
      }
    }

    return phoneList.join(",\n");
  });

  H.registerHelper('remainingPhones', function(item){
    var phones = this.phones;

    if (!phones) {
      return "";
    } else {
      return phones.length - 4 ;
    }
  });

  H.registerHelper('hasEmails', function(item){
    var emails = this.emails;

    if (!emails || !emails[0]){
      return item.inverse(this);
    } else {
      return item.fn(this);
    }
  });

  H.registerHelper('emailList', function(item){
    // debugger
    var emails = this.emails;
    if (!emails || !emails[0]){
      return "";
    }

    var emailList = [];
    for (var i = 0; i < emails.length; i++) {
      if (i === 3) {
        break;
      }
      emailList.push(emails[i].email_address);
    }

    return emailList.join(",\n");
  });

  H.registerHelper('moreThan3', function(item){
    // debugger
    var emails = this.emails;
    if (!emails || !emails[0] || emails.length < 4){
      return item.inverse(this);
    } else {
      return item.fn(this);
    }
  });

  H.registerHelper('remainingEmails', function(item){
    var emails = this.emails;

    if (!emails) {
      return "";
    } else {
      return emails.length - 3 ;
    }
  });

  H.registerHelper('phoneOwner', function(item){

    var names = this.names;
    if (!names || !names[0]){
      return this.ownersName;
    } else {
      return names[0].parts.first_name + " " + names[0].parts.last_name;
    }
  });

  H.registerHelper('hasSocial', function(item){
    var urls = this.urls;

    if (!urls ||  _.isEmpty(urls)) {
      return item.inverse(this);
    } else {
      return item.fn(this);
    }
  });

  H.registerHelper('socialCount', function(item){
    var urls = this.urls;

    if (!urls || _.isEmpty(urls)){
      return '';
    }

    var types = [];
    urls.forEach(function(item){
      types.push(item.type);
    });
    // types = _.uniq(types);
    return types.length;
  });

  H.registerHelper('hasProfile', function(profile, item){
    if (!item) {
      return false;
    }
    var urls = this.urls;

    if (!urls || _.isEmpty(urls)){
      return item.inverse(this);
    }

    var types = [];
    urls.forEach(function(item){
      types.push(item.type);
    });

    if (types.indexOf(profile) > -1 ){
      return item.fn(this);
    } else {
      return item.inverse(this);
    }
  });

}(Handlebars));
