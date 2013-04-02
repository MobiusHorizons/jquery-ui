/*!
 * jQuery UI Effects Explode @VERSION
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/explode-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
(function( $, undefined ) {

$.effects.effect.dissolve = function( o, done ) {

	var	el = $( this ),
		mode = $.effects.setMode( el, o.mode || "hide" ),
		show = mode === "show",

		// show and then visibility:hidden the element before calculating offset
		offset = el.show().css( "visibility", "hidden" ).offset(),

		// width and height of a piece
		width = o.collumns ? Math.ceil( el.outerWidth() / cells ): //if collumns
			o.rows ? Math.ceil( el.outerHeight()/o.rows) :     // elsif rows
				 Math.ceil(el.outerWidth()/ 25),     // else default value

		height = o.rows ? Math.ceil( el.outerHeight() / o.rows ): width,
		rows = Math.ceil(el.outerHeight()/height),
		collumns = Math.ceil(el.outerWidth()/width),

		pieces = [],

		// loop
		i, j, left, top;

	console.log(width+"x"+height+", "+collumns+"x"+rows);
	// children animate complete:
	function childComplete() {
		pieces.push( this );
		if ( pieces.length === rows * collumns ) {
			animComplete();
		}
	}

	// clone the element for each row and cell.
	for( i = 0; i < rows ; i++ ) { // ===>
		top = offset.top + i * height;

		for( j = 0; j < collumns ; j++ ) { // |||
			left = offset.left + j * width;

			// Create a clone of the now hidden main element that will be absolute positioned
			// within a wrapper div off the -left and -top equal to size of our pieces
			el
				.clone()
				.appendTo( "body" )
				.wrap( "<div></div>" )
				.css({
					position: "absolute",
					visibility: "visible",
					left: -j * width,
					top: -i * height
				})

			// select the wrapper - make it overflow: hidden and absolute positioned based on
			// where the original was located +left and +top equal to the size of pieces
				.parent()
				.addClass( "ui-effects-dissolve" )
				.css({
					position: "absolute",
					overflow: "hidden",
					width: width,
					height: height,
					left: left ,
					top: top ,
					opacity: show ? 0 : 1
				})
				.delay(Math.random() * o.duration||500)
				.animate({
					opacity: show ? 1 : 0
				}, 1, o.easing, childComplete );
		}
	}

	function animComplete() {
		el.css({
			visibility: "visible"
		});
		$( pieces ).remove();
		if ( !show ) {
			el.hide();
		}
		done();
	}
};

})(jQuery);
