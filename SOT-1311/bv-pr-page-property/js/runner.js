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

  // search scrubbing
  var removeDiacritics = function(str) {
      var defaultDiacriticsRemovalMap = [
        {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
        {'base':'AA','letters':/[\uA732]/g},
        {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
        {'base':'AO','letters':/[\uA734]/g},
        {'base':'AU','letters':/[\uA736]/g},
        {'base':'AV','letters':/[\uA738\uA73A]/g},
        {'base':'AY','letters':/[\uA73C]/g},
        {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
        {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
        {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
        {'base':'DZ','letters':/[\u01F1\u01C4]/g},
        {'base':'Dz','letters':/[\u01F2\u01C5]/g},
        {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
        {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
        {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
        {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
        {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
        {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
        {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
        {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
        {'base':'LJ','letters':/[\u01C7]/g},
        {'base':'Lj','letters':/[\u01C8]/g},
        {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
        {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
        {'base':'NJ','letters':/[\u01CA]/g},
        {'base':'Nj','letters':/[\u01CB]/g},
        {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
        {'base':'OI','letters':/[\u01A2]/g},
        {'base':'OO','letters':/[\uA74E]/g},
        {'base':'OU','letters':/[\u0222]/g},
        {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
        {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
        {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
        {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
        {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
        {'base':'TZ','letters':/[\uA728]/g},
        {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
        {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
        {'base':'VY','letters':/[\uA760]/g},
        {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
        {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
        {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
        {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
        {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
        {'base':'aa','letters':/[\uA733]/g},
        {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
        {'base':'ao','letters':/[\uA735]/g},
        {'base':'au','letters':/[\uA737]/g},
        {'base':'av','letters':/[\uA739\uA73B]/g},
        {'base':'ay','letters':/[\uA73D]/g},
        {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
        {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
        {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
        {'base':'dz','letters':/[\u01F3\u01C6]/g},
        {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
        {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
        {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
        {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
        {'base':'hv','letters':/[\u0195]/g},
        {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
        {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
        {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
        {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
        {'base':'lj','letters':/[\u01C9]/g},
        {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
        {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
        {'base':'nj','letters':/[\u01CC]/g},
        {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
        {'base':'oi','letters':/[\u01A3]/g},
        {'base':'ou','letters':/[\u0223]/g},
        {'base':'oo','letters':/[\uA74F]/g},
        {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
        {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
        {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
        {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
        {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
        {'base':'tz','letters':/[\uA729]/g},
        {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
        {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
        {'base':'vy','letters':/[\uA761]/g},
        {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
        {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
        {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
        {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
      ];

      for(var i=0; i<defaultDiacriticsRemovalMap.length; i++) {
        str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
      }

      return str;

  };

  var cleanSearchValues = function(mapval) {
      return removeDiacritics(mapval).replace(/[^A-Za-z'-\s]/gi, '');
  };

  var parseMiddleInitial = function(data) {
      var parsed_mi = data.fn.match(/^.*\s([A-Za-z])$/);
      if (parsed_mi) {
        if (!data.mi || data.mi.length === 0) {
          data.mi = parsed_mi[1];
        }
        data.fn = data.fn.replace(/\s[A-Za-z]$/, '').replace(/\s+/g, '');
      } else {
        data.fn = data.fn.replace(/\s+/g, '');
      }
      return data;
  };

  var initFormValidation = function() {
    $('.record_search_form').validator().on('submit', function(e) {
      if (e.isDefaultPrevented()) {
        // handle custom errors (if you want)
      } else {
        dataArray = $(form).serializeArray();
        var formVals = {};

        _.forEach(dataArray, function(v, k) {
          formVals[v.name] = v.value;
        });

        var data = _.mapValues(formVals, cleanSearchValues);
        data = parseMiddleInitial(data);

        // form.submit();
        window.location.href = $(form).attr('action') + '?' + $.param(data);

        return false;
      }
    });

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
