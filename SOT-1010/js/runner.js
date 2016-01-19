/* mobile detect */
(function(a) {
  ($.browser = $.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|dolphin|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);

/* HTML5 Placeholder jQuery Plugin - v2.1.2
 * Copyright (c)2015 Mathias Bynens
 * 2015-06-09
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(a){function b(b){var c={},d=/^jQuery\d+$/;return a.each(b.attributes,function(a,b){b.specified&&!d.test(b.name)&&(c[b.name]=b.value)}),c}function c(b,c){var d=this,f=a(d);if(d.value==f.attr("placeholder")&&f.hasClass(m.customClass))if(f.data("placeholder-password")){if(f=f.hide().nextAll('input[type="password"]:first').show().attr("id",f.removeAttr("id").data("placeholder-id")),b===!0)return f[0].value=c;f.focus()}else d.value="",f.removeClass(m.customClass),d==e()&&d.select()}function d(){var d,e=this,f=a(e),g=this.id;if(""===e.value){if("password"===e.type){if(!f.data("placeholder-textinput")){try{d=f.clone().prop({type:"text"})}catch(h){d=a("<input>").attr(a.extend(b(this),{type:"text"}))}d.removeAttr("name").data({"placeholder-password":f,"placeholder-id":g}).bind("focus.placeholder",c),f.data({"placeholder-textinput":d,"placeholder-id":g}).before(d)}f=f.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id",g).show()}f.addClass(m.customClass),f[0].value=f.attr("placeholder")}else f.removeClass(m.customClass)}function e(){try{return document.activeElement}catch(a){}}var f,g,h="[object OperaMini]"==Object.prototype.toString.call(window.operamini),i="placeholder"in document.createElement("input")&&!h,j="placeholder"in document.createElement("textarea")&&!h,k=a.valHooks,l=a.propHooks;if(i&&j)g=a.fn.placeholder=function(){return this},g.input=g.textarea=!0;else{var m={};g=a.fn.placeholder=function(b){var e={customClass:"placeholder"};m=a.extend({},e,b);var f=this;return f.filter((i?"textarea":":input")+"[placeholder]").not("."+m.customClass).bind({"focus.placeholder":c,"blur.placeholder":d}).data("placeholder-enabled",!0).trigger("blur.placeholder"),f},g.input=i,g.textarea=j,f={get:function(b){var c=a(b),d=c.data("placeholder-password");return d?d[0].value:c.data("placeholder-enabled")&&c.hasClass(m.customClass)?"":b.value},set:function(b,f){var g=a(b),h=g.data("placeholder-password");return h?h[0].value=f:g.data("placeholder-enabled")?(""===f?(b.value=f,b!=e()&&d.call(b)):g.hasClass(m.customClass)?c.call(b,!0,f)||(b.value=f):b.value=f,g):b.value=f}},i||(k.input=f,l.value=f),j||(k.textarea=f,l.value=f),a(function(){a(document).delegate("form","submit.placeholder",function(){var b=a("."+m.customClass,this).each(c);setTimeout(function(){b.each(d)},10)})}),a(window).bind("beforeunload.placeholder",function(){a("."+m.customClass).each(function(){this.value=""})})}});

/*!
 * Validator v0.9.0 for Bootstrap 3, by @1000hz
 * Copyright 2015 Cina Saffary
 * Licensed under http://opensource.org/licenses/MIT
 *
 * https://github.com/1000hz/bootstrap-validator
 */

+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),f=d.data("bs.validator");(f||"destroy"!=b)&&(f||d.data("bs.validator",f=new c(this,e)),"string"==typeof b&&f[b]())})}var c=function(b,d){this.$element=a(b),this.options=d,d.errors=a.extend({},c.DEFAULTS.errors,d.errors);for(var e in d.custom)if(!d.errors[e])throw new Error("Missing default error message for custom validator: "+e);a.extend(c.VALIDATORS,d.custom),this.$element.attr("novalidate",!0),this.toggleSubmit(),this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator",a.proxy(this.validateInput,this)),this.$element.on("submit.bs.validator",a.proxy(this.onSubmit,this)),this.$element.find("[data-match]").each(function(){var b=a(this),c=b.data("match");a(c).on("input.bs.validator",function(){b.val()&&b.trigger("input.bs.validator")})})};c.INPUT_SELECTOR=':input:not([type="submit"], button):enabled:visible',c.DEFAULTS={delay:500,html:!1,disable:!0,custom:{},errors:{match:"Does not match",minlength:"Not long enough"},feedback:{success:"glyphicon-ok",error:"glyphicon-remove"}},c.VALIDATORS={"native":function(a){var b=a[0];return b.checkValidity?b.checkValidity():!0},match:function(b){var c=b.data("match");return!b.val()||b.val()===a(c).val()},minlength:function(a){var b=a.data("minlength");return!a.val()||a.val().length>=b}},c.prototype.validateInput=function(b){var c=a(b.target),d=c.data("bs.validator.errors");if(c.is('[type="radio"]')&&(c=this.$element.find('input[name="'+c.attr("name")+'"]')),this.$element.trigger(b=a.Event("validate.bs.validator",{relatedTarget:c[0]})),!b.isDefaultPrevented()){var e=this;this.runValidators(c).done(function(f){c.data("bs.validator.errors",f),f.length?e.showErrors(c):e.clearErrors(c),d&&f.toString()===d.toString()||(b=f.length?a.Event("invalid.bs.validator",{relatedTarget:c[0],detail:f}):a.Event("valid.bs.validator",{relatedTarget:c[0],detail:d}),e.$element.trigger(b)),e.toggleSubmit(),e.$element.trigger(a.Event("validated.bs.validator",{relatedTarget:c[0]}))})}},c.prototype.runValidators=function(b){function d(a){return b.data(a+"-error")||b.data("error")||"native"==a&&b[0].validationMessage||g.errors[a]}var e=[],f=a.Deferred(),g=this.options;return b.data("bs.validator.deferred")&&b.data("bs.validator.deferred").reject(),b.data("bs.validator.deferred",f),a.each(c.VALIDATORS,a.proxy(function(a,c){if((b.data(a)||"native"==a)&&!c.call(this,b)){var f=d(a);!~e.indexOf(f)&&e.push(f)}},this)),!e.length&&b.val()&&b.data("remote")?this.defer(b,function(){var c={};c[b.attr("name")]=b.val(),a.get(b.data("remote"),c).fail(function(a,b,c){e.push(d("remote")||c)}).always(function(){f.resolve(e)})}):f.resolve(e),f.promise()},c.prototype.validate=function(){var a=this.options.delay;return this.options.delay=0,this.$element.find(c.INPUT_SELECTOR).trigger("input.bs.validator"),this.options.delay=a,this},c.prototype.showErrors=function(b){var c=this.options.html?"html":"text";this.defer(b,function(){var d=b.closest(".form-group"),e=d.find(".help-block.with-errors"),f=d.find(".form-control-feedback"),g=b.data("bs.validator.errors");g.length&&(g=a("<ul/>").addClass("list-unstyled").append(a.map(g,function(b){return a("<li/>")[c](b)})),void 0===e.data("bs.validator.originalContent")&&e.data("bs.validator.originalContent",e.html()),e.empty().append(g),d.addClass("has-error"),f.length&&f.removeClass(this.options.feedback.success)&&f.addClass(this.options.feedback.error)&&d.removeClass("has-success"))})},c.prototype.clearErrors=function(a){var b=a.closest(".form-group"),c=b.find(".help-block.with-errors"),d=b.find(".form-control-feedback");c.html(c.data("bs.validator.originalContent")),b.removeClass("has-error"),d.length&&d.removeClass(this.options.feedback.error)&&d.addClass(this.options.feedback.success)&&b.addClass("has-success")},c.prototype.hasErrors=function(){function b(){return!!(a(this).data("bs.validator.errors")||[]).length}return!!this.$element.find(c.INPUT_SELECTOR).filter(b).length},c.prototype.isIncomplete=function(){function b(){return"checkbox"===this.type?!this.checked:"radio"===this.type?!a('[name="'+this.name+'"]:checked').length:""===a.trim(this.value)}return!!this.$element.find(c.INPUT_SELECTOR).filter("[required]").filter(b).length},c.prototype.onSubmit=function(a){this.validate(),(this.isIncomplete()||this.hasErrors())&&a.preventDefault()},c.prototype.toggleSubmit=function(){if(this.options.disable){var b=a('button[type="submit"], input[type="submit"]').filter('[form="'+this.$element.attr("id")+'"]').add(this.$element.find('input[type="submit"], button[type="submit"]'));b.toggleClass("disabled",this.isIncomplete()||this.hasErrors())}},c.prototype.defer=function(b,c){return c=a.proxy(c,this),this.options.delay?(window.clearTimeout(b.data("bs.validator.timeout")),void b.data("bs.validator.timeout",window.setTimeout(c,this.options.delay))):c()},c.prototype.destroy=function(){return this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"),this.$element.find(c.INPUT_SELECTOR).off(".bs.validator").removeData(["bs.validator.errors","bs.validator.deferred"]).each(function(){var b=a(this),c=b.data("bs.validator.timeout");window.clearTimeout(c)&&b.removeData("bs.validator.timeout")}),this.$element.find(".help-block.with-errors").each(function(){var b=a(this),c=b.data("bs.validator.originalContent");b.removeData("bs.validator.originalContent").html(c)}),this.$element.find('input[type="submit"], button[type="submit"]').removeClass("disabled"),this.$element.find(".has-error").removeClass("has-error"),this};var d=a.fn.validator;a.fn.validator=b,a.fn.validator.Constructor=c,a.fn.validator.noConflict=function(){return a.fn.validator=d,this},a(window).on("load",function(){a('form[data-toggle="validator"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery);


$(document).ready(function() {

  $(".tab_content").hide();
  $(".tab_content:first").show();

  // active testimonials tab in mobile
  if (document.documentElement.clientWidth < 767) {
    $('ul.tabs li.active').removeClass('active');
    $('ul.tabs li:last').addClass('active');

    $('.tab_content').hide();
    $('.tab_content:last').show();
  }

  $("ul.tabs li").click(function() {
    $("ul.tabs li").removeClass("active");
    $(this).addClass("active");
    $(".tab_content").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();
  });

  $('.show').click(function() {
    $('.cutomer_feedback ~ .cutomer_feedback').slideToggle();
    $(this).text(this.textContent == 'Show More Feedback...' ? 'Less...' : 'Show More Feedback...');
    return (false);
  });

  $('.left_details span a').click(function() {
    $(this).parent().prev().find('.hidden_text').slideToggle();
    $(this).text(this.textContent == 'Read More...' ? 'Less...' : 'Read More...');
    return (false);
  });

  $(".navbar-toggle").click(function() {
    $(".collapse").slideToggle();
    return (false);
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 275) {
      $('.share_this').addClass('fixed');
    } else {
      $('.share_this').removeClass('fixed').removeAttr('style');
    }
  });

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
       $('.share_this').hide();
    } else {
      $('.share_this').show();
    }
  });

});


(function($) {

  /* Collapse article content */
  var collapseContent = function() {
    var hiddenTextDiv = $("#hidden-text").html();
    var $contents = $('.content-text');

    $contents.each(function(idx, content) {
      var $pTags = $(content).find("p"),
        pTagsLen = $pTags.length;

      if (pTagsLen > 12) {
        var $hiddenTextDiv = $(hiddenTextDiv);
        $hiddenTextDiv.insertAfter($($pTags[2]));
        var $slice = $pTags.slice(3).detach();
        $hiddenTextDiv.html($slice);
      }
    });

  };

  var insertReadMores = function() {
    var readMoreHTML = $("#hidden-readmore").html();
    $(readMoreHTML).insertAfter($(".content-text"));
  };

  /* Insert the banner into each of the content divs */
  var insertBanner = function() {
    var banner = $('#hidden-banner').clone(),
      $banner = $(banner),
      bannerHTML = $banner.html();

    $('.content').each(function(idx, elem) {
      var firstPTag = $(elem).find('.content-text').find('p').first();
      $(bannerHTML).insertAfter(firstPTag);
    });
  };

  /* Make the content with the given contentId visible */
  var changeContentTo = function(contentId) {
    if (!contentId) return;
    var $targetContent = $(contentId);
    $('.active-content').removeClass('active-content');
    $targetContent.addClass('active-content');
    $(".content-link").parent().removeClass('active');
    $("a[href=" + contentId + "]").parent().addClass('active');
    if ($('.content.active-content').attr('id').indexOf('phone') >= 0) {
      $('#searchbar').html($('#search-phone').html());
    } else {
      $('#searchbar').html($('#search-people').html());
    }
    if (typeof heap !== "undefined" && heap.track) {
      heap.track("PR Page right sidebar - " + contentId);
    }
    initFormValidation();
  };

  var browseToHashContent = function() {
    var targetHash = document.location.hash;
    if (targetHash && targetHash !== "#") {
      changeContentTo(targetHash);
      // Add active state to the correct tab
      $(".content-link").parent().removeClass('active');
      $("a[href=" + targetHash + "]").parent().addClass('active');
    }
  };

  var scrollHandler = function() {
    var scrolled = $(window).scrollTop();
    if (scrolled >= 275) {
      $('.search').show().addClass('stuck');
    } else {
      $('.search').hide().removeClass('stuck')
    }
  };

  $.fn.shuffle = function() {
    var allElems = this.get(),
      getRandom = function(max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function() {
        var random = getRandom(allElems.length),
          randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });

    this.each(function(i) {
      $(this).replaceWith($(shuffled[i]));
    });

    return $(shuffled);
  };

  /* Change the active state on content-links when clicked */
  $(".content-link").on('click', function(evt) {
    $(".content-link").parent().parent().removeClass('hidden');
    $(this).parent().parent().addClass('hidden');
    $('.right-sidebar .side-article').shuffle();
  });

  $(".img-link").on('click', function(evt) {
    $(".img-link").parent().removeClass('hidden');
    $(this).parent().addClass('hidden');
    $('.right-sidebar .side-article').shuffle();
  });

  /* Observe changes in the anchor hashes */
  $(window).on('hashchange', function(evt) {
    window.scrollTo(0, 0);
    var contentId = document.location.hash;
    changeContentTo(contentId);
  });

  var onGeoSuccess = function(location) {

    var geocountry = location.address.countryCode,
      //geocity = location.address.city,
      geostate = location.address.region,
      georegioncode = location.address.regionCode,
      geodemonym = "American",
      geoimageregion = "nws";

    var regions = {
      "AL": [{
        "name": "Alabama",
        "demonym": "Alabamian",
        "region": "sou"
      }],
      "AK": [{
        "name": "Alaska",
        "demonym": "Alaskan",
        "region": "mtn"
      }],
      "AS": [{
        "name": "American Samoa",
        "demonym": "American Samoans",
        "region": "pac"
      }],
      "AZ": [{
        "name": "Arizona",
        "demonym": "Arizonan",
        "region": "sws"
      }],
      "AR": [{
        "name": "Arkansas",
        "demonym": "Arkansan",
        "region": "sou"
      }],
      "CA": [{
        "name": "California",
        "demonym": "Californian",
        "region": "nws"
      }],
      "CO": [{
        "name": "Colorado",
        "demonym": "Coloradan",
        "region": "mtn"
      }],
      "CT": [{
        "name": "Connecticut",
        "demonym": "Connecticuter",
        "region": "new"
      }],
      "DE": [{
        "name": "Delaware",
        "demonym": "Delawarean",
        "region": "mid"
      }],
      "DC": [{
        "name": "Washington, D.C.",
        "demonym": "Washingtonian",
        "region": "crt"
      }],
      "FM": [{
        "name": "Federated States Of Micronesia",
        "demonym": "Micronesian",
        "region": "pac"
      }],
      "FL": [{
        "name": "Florida",
        "demonym": "Floridian",
        "region": "fla"
      }],
      "GA": [{
        "name": "Georgia",
        "demonym": "Georgian",
        "region": "sou"
      }],
      "GU": [{
        "name": "Guam",
        "demonym": "",
        "region": "pac"
      }],
      "HI": [{
        "name": "Hawaii",
        "demonym": "Hawaii resident",
        "region": "pac"
      }],
      "ID": [{
        "name": "Idaho",
        "demonym": "Idahoan",
        "region": "mtn2"
      }],
      "IL": [{
        "name": "Illinois",
        "demonym": "Illinoisan",
        "region": "chi"
      }],
      "IN": [{
        "name": "Indiana",
        "demonym": "Indianan",
        "region": "mws"
      }],
      "IA": [{
        "name": "Iowa",
        "demonym": "Iowan",
        "region": "htl"
      }],
      "KS": [{
        "name": "Kansas",
        "demonym": "Kansan",
        "region": "htl"
      }],
      "KY": [{
        "name": "Kentucky",
        "demonym": "Kentuckian",
        "region": "app"
      }],
      "LA": [{
        "name": "Louisiana",
        "demonym": "Louisianan",
        "region": "nla"
      }],
      "ME": [{
        "name": "Maine",
        "demonym": "Mainer",
        "region": "new"
      }],
      "MH": [{
        "name": "Marshall Islands",
        "demonym": "Marshall Islander",
        "region": "pac"
      }],
      "MD": [{
        "name": "Maryland",
        "demonym": "Marylander",
        "region": "mid"
      }],
      "MA": [{
        "name": "Massachusetts",
        "demonym": "Massachusettsan",
        "region": "new"
      }],
      "MI": [{
        "name": "Michigan",
        "demonym": "Michigander",
        "region": "mws"
      }],
      "MN": [{
        "name": "Minnesota",
        "demonym": "Minnesotan",
        "region": "htl"
      }],
      "MS": [{
        "name": "Mississippi",
        "demonym": "Mississippian",
        "region": "sou"
      }],
      "MO": [{
        "name": "Missouri",
        "demonym": "Missourian",
        "region": "htl"
      }],
      "MT": [{
        "name": "Montana",
        "demonym": "Montanan",
        "region": "mtn"
      }],
      "NE": [{
        "name": "Nebraska",
        "demonym": "Nebraskan",
        "region": "htl"
      }],
      "NV": [{
        "name": "Nevada",
        "demonym": "Nevadan",
        "region": "sws"
      }],
      "NH": [{
        "name": "New Hampshire",
        "demonym": "New Hampshirite",
        "region": "nhm"
      }],
      "NJ": [{
        "name": "New Jersey",
        "demonym": "New Jerseyan",
        "region": "nyc"
      }],
      "NM": [{
        "name": "New Mexico",
        "demonym": "New Mexican",
        "region": "sws"
      }],
      "NY": [{
        "name": "New York",
        "demonym": "New Yorker",
        "region": "nyc"
      }],
      "NC": [{
        "name": "North Carolina",
        "demonym": "North Carolinian",
        "region": "app"
      }],
      "ND": [{
        "name": "North Dakota",
        "demonym": "North Dakotan",
        "region": "htl"
      }],
      "MP": [{
        "name": "N. Mariana Islands",
        "demonym": "North Mariana Islander",
        "region": "pac"
      }],
      "OH": [{
        "name": "Ohio",
        "demonym": "Ohioan",
        "region": "mws"
      }],
      "OK": [{
        "name": "Oklahoma",
        "demonym": "Oklahoman",
        "region": "htl"
      }],
      "OR": [{
        "name": "Oregon",
        "demonym": "Oregonian",
        "region": "nws"
      }],
      "PW": [{
        "name": "Palau",
        "demonym": "Palauan",
        "region": "pac"
      }],
      "PA": [{
        "name": "Pennsylvania",
        "demonym": "Pennsylvanian",
        "region": "mid"
      }],
      "PR": [{
        "name": "Puerto Rico",
        "demonym": "Puerto Rican",
        "region": "pac"
      }],
      "RI": [{
        "name": "Rhode Island",
        "demonym": "Rhode Islander",
        "region": "new"
      }],
      "SC": [{
        "name": "South Carolina",
        "demonym": "South Carolinian",
        "region": "sou"
      }],
      "SD": [{
        "name": "South Dakota",
        "demonym": "South Dakotan",
        "region": "mtn2"
      }],
      "TN": [{
        "name": "Tennessee",
        "demonym": "Tennessean",
        "region": "app"
      }],
      "TX": [{
        "name": "Texas",
        "demonym": "Texan",
        "region": "tex"
      }],
      "UT": [{
        "name": "Utah",
        "demonym": "Utahn",
        "region": "mtn"
      }],
      "VT": [{
        "name": "Vermont",
        "demonym": "Vermonter",
        "region": "nhm"
      }],
      "VI": [{
        "name": "Virgin Islands",
        "demonym": "Virgin Islander",
        "region": "pac"
      }],
      "VA": [{
        "name": "Virginia",
        "demonym": "Virginian",
        "region": "app"
      }],
      "WA": [{
        "name": "Washington",
        "demonym": "Washingtonian",
        "region": "mtn"
      }],
      "WV": [{
        "name": "West Virginia",
        "demonym": "West Virginian",
        "region": "app"
      }],
      "WI": [{
        "name": "Wisconsin",
        "demonym": "Wisconsinite",
        "region": "mws"
      }],
      "WY": [{
        "name": "Wyoming",
        "demonym": "Wyomingite",
        "region": "mtn"
      }]
    };

    if (typeof(location) !== 'undefined' && regions.hasOwnProperty(georegioncode)) {
      geoimageregion = regions[georegioncode][0].region;
      geodemonym = regions[georegioncode][0].demonym;

      if (typeof(geostate) === 'undefined') {
        geostate = regions[georegioncode][0].name;
      }
    }

    if (typeof georegioncode !== 'undefined' && georegioncode !== null && georegioncode != "null") {
      $("select[name='state']").val(georegioncode);
    } else {
      $("select[name='state']").val("All");
    }

    if (geocountry === "US") {

      if (typeof geostate !== 'undefined' && geostate.length > 0) {
        $('span.geostate').each(function() {
          $(this).html(" " + $(this).attr("data-prep") + " " + geostate);
        });
      }

      $('span.geodemonym').each(function() {
        $(this).html(geodemonym + "s ");
      })

    }
  }

  var findStateByIP = function() {
    $.ajax({
      type: "GET",
      url: "//www.beenverified.com/internal/api/state_for_ip",
      dataType: "json",
      success: function(location, textStatus) {
        location.address = {};
        location.source = 'int';
        location.address.countryCode = 'US';
        location.address.regionCode = location.state;
        onGeoSuccess(location);
      }
    });
  };

  var dupeSearchBar = function() {
    $('#search-people').html($('#searchbar').html());

  }

  var initFormValidation = function() {
    $('.record_search_form').validator();

  }

  /* Initialization called on pageload */
  var initialize = function() {
    dupeSearchBar();
    insertBanner();
    collapseContent();
    insertReadMores();
    browseToHashContent();
    findStateByIP();
    initFormValidation();
  };

  /* Run */

  initialize();

}(jQuery));
