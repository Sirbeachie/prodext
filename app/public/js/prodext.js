function minify() {
	$('#nav-header').removeClass('full');
	$('#nav-header').addClass('minified');

	$('.navbar-header').css('margin-left', '0px');
	$('.sidebar').css('min-width', '0px');
	$('.sidebar').css('width', '0px');

	$('.content-wrapper').css('margin-left', '0px');
	$('.sidebar').children().hide();
	$('.sidebar').children().fadeOut();
}

function expand_() {
	$('#nav-header').removeClass('minified');
	$('#nav-header').addClass('full');

	$('.content-wrapper').css('margin-left', 'var(--sidebar-width)');
	$('.navbar-header').css('margin-left', 'var(--navbar-margin)');
	$('.sidebar').css('min-width', 'var(--sidebar-width)');
	$('.sidebar').css('width', 'var(--sidebar-width)');
	$('.sidebar').children().fadeIn();
}

$(document).ready(function(){
	$('body').children().hide();

	$('#navbar-toggle').on('click', function() {
		if ($('#nav-header').hasClass('full')) {
			minify();
		} else if ($('#nav-header').hasClass('minified')) {
			expand_();
		};
	});

	var sidebar_menu = $('.sidebar-menu-items');
	var list_items = sidebar_menu.find('li');

	/*
	*	This is here so we don't add event listeners to the children <li> elements, aka the dropdown menu elements.
	*	We only want to minimize/expand the dropdown when we click on the main <li> elements.
	*
	*/
	$('.sub-menu-container').click(function(event) {
		event.stopPropagation();
	});

	list_items.each(function() {
		var item = $(this);

		var dropdown = item.find('.sidebar-menu-dropdown');
		dropdown.hide();

		item.click(function() {
			if (dropdown.is(":visible")) {
				dropdown.slideUp();
			} else {
				dropdown.slideDown();
			}
		});
	});

	$('body').children().fadeIn();
});