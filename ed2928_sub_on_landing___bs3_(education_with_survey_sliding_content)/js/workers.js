(function () { "use strict";

    var reportHeap = function (evt, opt) {
        if (typeof window.heap !== "undefined" && heap.track) {
            try {
            heap.track(evt, opt);
        	} catch (err) { }
      	}
    };
              
    // Test for Safari private browsing mode
    try { localStorage.test = 2; } catch (e) {
      reportHeap("Safari Private Browsing");
    }

    var REQUEST_DELAY = 300; // ms


    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        windowSmall = 752,
        windowMedium = 992,

        $headerSearch = $('#header-search'),
        $btnSearchDropdown = $('#btn-search-dropdown'),
        $breadCrumbsWrapper = $('#bread-crumbs-wrapper'),
        $breadCrumbsWrapperSm = $('#bread-crumbs-wrapper-sm'),
        breadCrumbsTemp = $('#bread-crumbs-wrapper').html(),
        $menuDropdown = $('#menu-dropdown'),
        $linkWrap = $('#link-wrap'),
        $btnNavDropdown = $('#btn-nav-dropdown'),
        $listGroup = $('.list-group'),
        $contactForm = $('#contact-us-form'),
        $headerSearchPhone = $('#header-search-phone'),
        $headerSearchEmail = $('#header-search-email'),
        $headerSearchProperty = $('#header-search-property'),
        $homeCarousel = $('#home-search-carousel'),
        $yVideo = $('#youtube'),
        $stateSelects = $('select[name=state]');

        if ($headerSearchPhone.length !== 0) {

            $headerSearchPhone.validate({
                validClass: "success",

                rules: {
                  phone: "required"
                },
                messages: {
                  phone: "Please enter a phone number. e.g., 2125556789"
                },

                onkeyup: false,
                onclick: false,
                onsubmit: true,
                submitHandler: function (form) {
                    reportHeap("Submitted Search Form - Phone");
                    window.setTimeout(function () {
                        form.submit();
                    }, REQUEST_DELAY);
                }
            });

        };

        if ($headerSearchEmail.length !== 0) {

            $headerSearchEmail.validate({
                validClass: "success",

                rules: {
                    "email-search": {
                        required: true,
                        email: true
                    },
                },
                messages: {
                  "email-search": "Please enter an Email Address"
                },

                onkeyup: false,
                onclick: false,
                onsubmit: true,
                submitHandler: function (form) {
                    reportHeap("Submitted Search Form - Email");
                    window.setTimeout(function () {
                        form.submit();
                    }, REQUEST_DELAY);
                }
            });

        };

        if ($headerSearchProperty.length !== 0) {

            $headerSearchProperty.validate({
                validClass: "success",

                rules: {
                  address: "required"
                },
                messages: {
                  address: "Please enter a street address"
                },

                onkeyup: false,
                onclick: false,
                onsubmit: true,
                submitHandler: function (form) {
                    reportHeap("Submitted Search Form - Property");
                    window.setTimeout(function () {
                        form.submit();
                    }, REQUEST_DELAY);
                }
            });

        };

        if ($contactForm.length !== 0) {

            $contactForm.validate({
                validClass: "success",

                rules: {
                  'contact[from_name]':"required",
                  'contact[from_email]': "required",
                  'contact[message]': "required"
                },
                messages: {
                  'contact[from_name]':"Please provide a name",
                  'contact[from_email]': "Please enter an email address",
                  'contact[message]': "Please write a message"
                },

                onkeyup: false,
                onclick: false,
                onsubmit: true
            });

        };


    var startValidation = function () {

        $headerSearch.validate({
            validClass: "success",

            rules: {
              fn: "required",
              ln: "required"
            },
            messages: {
              fn: "Please enter a first name",
              ln: "Please enter a last name"
            },

            onkeyup: false,
            onclick: false,
            onsubmit: true,
            submitHandler: function (form) {
                reportHeap("Submitted Search Form - People");
                window.setTimeout(function () {
                    form.submit();
                }, REQUEST_DELAY);
            }
        });

        $("#signup-form form").validate({
            validClass: "success",

            rules: {
              'lead[first_name]': "required",
              'lead[last_name]': "required",
              'lead[email]': {
                required: true,
                email: true
              }
            },
            messages: {
              'lead[first_name]': "Please enter a first name",
              'lead[last_name]': "Please enter a last name",
              'lead[email]': "Please enter a valid email"
            },

            onkeyup: false,
            onclick: false,
            onsubmit: true
        });

    };

    var showHeader = function () {
        $linkWrap.show();
        $headerSearch.show();
        $listGroup.show();
    };

    var hideHeader = function() {
        $linkWrap.hide();
        $listGroup.hide();
        
        if (!$headerSearch.hasClass('no-hide-header')) {
            $headerSearch.hide();
        };

    }

    var determineLayoutState = function () {
        if (windowWidth <= windowSmall) {
            hideHeader();
            $('#bread-crumbs-wrapper-sm').html(breadCrumbsTemp);
        }
        else if (windowWidth <= windowMedium) {
            showHeader();
            $('#bread-crumbs-wrapper-sm').html(breadCrumbsTemp);
        }
        else {
            showHeader();
        }
    };

    // Selects user state based on IP
    var selectState = function (state) {
        if (typeof state === "string" && state !== "") {
            state = state.toUpperCase();
        } else {
            state = "All";
        }

        var $opt = $stateSelects.find("option[value=" + state + "]");
        $opt.attr("selected", "selected");
    };

    var findStateByIP = function () {
        $.ajax({
          type: "GET",
          url: "//www.beenverified.com/internal/api/state_for_ip",
          dataType: "json",
          success: function (data, textStatus) {
            selectState(data['state']);
          }
        });
    };

    var selectCurrentYear = function () {
        var currentDate = new Date(),       
            currentYear = currentDate.getFullYear(),
            $currentYear = $('.current-year');
        $currentYear.html(currentYear);
    };

    var initializeCarousels = function () {
        $('#home-test-carousel').carousel({
            interval: 7000
        });

        $('#home-dd-carousel').carousel({
            interval: 6000
        });
    };

    //switch img with youtube video
    var playVideo = function () {
        $('#youtube').click(function(){
            var video = '<iframe src="'+ $(this).attr('data-video') +'"></iframe>';
            $(this).replaceWith(video);
        });
    };    

    $menuDropdown.on('click' , function (evt) {
        evt.preventDefault();
        $linkWrap.slideToggle('fast');
    });

    $btnSearchDropdown.on('click' , function (evt) {
        evt.preventDefault();
        $headerSearch.slideToggle('fast');
    });

    $btnNavDropdown.on('click' , function (evt) {
        evt.preventDefault();
        $btnNavDropdown.blur();
        $listGroup.slideToggle('fast');
        $('#btn-nav-dropdown span').toggleClass('glyphicon-chevron-down');
    });

    $(window).on('resize' , function () {
        var currentWidth = $(this).width();
        var resizeHappened = false;

        if (currentWidth !== windowWidth) {
            windowWidth = currentWidth;
            resizeHappened = true;
        }

        // Fix for IE8 reporting fake window resizing when the document dimensions change. 

        if (!resizeHappened) return;
        determineLayoutState();
    });

    var initialize = function () {
        //startValidation();
        determineLayoutState();
        findStateByIP();
        selectCurrentYear();
        //initializeCarousels();

        //Placeholder fix for older browsers
        $('input, textarea').placeholder();
        $('.focus-me').focus();
        $('.tooltipThis').tooltip();

        if ($yVideo.length !== 0) {
            playVideo();
        };
    };

    initialize();
}());