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
    // debugger
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
    var count = this.available_data_counts.image_url;
    if (count === 0) {
      return "";
    } else if (count === 1) {
      return "1 Photo found.";
    } else {
      return count.toString() + " Photos found.";
    }
  });

  H.registerHelper('phoneCount', function(item){
    var count = this.available_data_counts.phone.total;
    if (count === 0) {
      return "";
    } else if (count === 1) {
      return "1 Additional phone number located";
    } else {
      return count.toString() + " Additional phone numbers located.";
    }
  });

  H.registerHelper('extraCount', function(item){
    var count = this.available_data_counts.job;
    if (count === 0) {
      return "";
    } else if (count === 1) {
      return "1 Job found.";
    } else {
      return count.toString() + " Jobs found.";
    }
  });

}(Handlebars));
