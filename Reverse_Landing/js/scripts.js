$(function() {
	// $('.off-canvas-nav-toggle').click(function() {
	//     $('.off-canvas').removeClass('open-form').toggleClass('open');
	//     return false;
	// });
	// $('.search-toggle').click(function() {
	//     $('.off-canvas').removeClass('open').toggleClass('open-form');
	//     return false;
	// });

	$.validator.addMethod("phoneUS", function(phone_number, element) {
      phone_number = phone_number.replace(/\s+/g, "");
      return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/);
  }, "Please specify a valid phone number");

  $('#phoneForm').validate({
      validClass: "success",
      rules: {
          "phone": {
              required: true,
              phoneUS: true
          }
      },
      messages: {
          phone: "Please enter a phone number. e.g. (212) 555-6789"
      },
	});

	$("#phone-number").mask('(000) 000-0000');

});
