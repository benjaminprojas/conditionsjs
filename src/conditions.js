/**
 * jQuery Conditions 1.0.0
 *
 * Copyright 2016 Bejamin Rojas
 * @license Released under the MIT license.
 * http://jquery.org/license
 */
(function($) {
	"use strict";

	var ConditionsJS = function(index, element, defaults, args) {
		var that = this;
		that.index		= index;
		that.element	= $(element);
		that.defaults	= defaults;
		that.settings	= {};
		that._init		= false;

		if($.isArray(args)) {
			// multiple elements
			$.each(args, function(i, v) {
				v = $.extend({}, that.defaults, v);

				if(!v.name) {
					v.name = that.element.attr('name');
				}

				if($.isEmptyObject(that.settings[that.index])) {
					that.settings[that.index] = {};
				}
				if($.isEmptyObject(that.settings[that.index][v.name])) {
					that.settings[that.index][v.name] = {};
				}
				that.settings[that.index][v.name][v.value] = v;
			});
		}
		else {
			// one element
			var v = $.extend({}, that.defaults, args);

			if(!v.name) {
				v.name = that.element.attr('name');
			}

			if($.isEmptyObject(that.settings[that.index])) {
				that.settings[that.index] = {};
			}
			if($.isEmptyObject(that.settings[that.index][v.name])) {
				that.settings[that.index][v.name] = {};
			}
			that.settings[that.index][v.name][v.value] = v;
		}

	};

	ConditionsJS.prototype.init = function() {
		var that = this;
		that._init = true;
		// Set up event listener
		$(that.element).on('change', function() {
			that.showAndHide();
		});

		$(that.element).on('keyup', function() {
			that.showAndHide();
		});
		
		//Show based on current value on page load
		that.showAndHide(true);
	};

	ConditionsJS.prototype.showAndHide = function(init) {

		var that = this;
		if(!init) {
			that._init = false;
		}

		$.each(this.settings[that.index], function(ind, val) {
			
			$.each(val, function(i, v) {

				if(v.name === that.element.attr('name')) {

					if(that.element.is(':checkbox')) {
						that.checkboxShowHide(v);
					}
					else if(that.element.is(':radio')) {
						that.radioShowHide(v);
					}
					else if(that.element.is('select')) {
						that.selectShowHide(v);
					}
					else if(that.element.is('input') || that.element.is('textarea')) {
						that.inputShowHide(v);
					}

				}

			});
			
		});

	};

	ConditionsJS.prototype.checkboxShowHide = function(v) {
		var that = this;
		if(!v.reverse) {
			if(that.element.is(':checked')) {
				if(v.show && (!v.startHidden || (!that._init))) {
					$(v.show).each(function() {
						that._show($(this), v.effect);
					});
				}
				else if(that._init && v.hide) {
					$(v.hide).each(function() {
						that._hide($(this), v.effect);
					});
				}
			}
			else {
				if(v.hide) {
					$(v.hide).each(function() {
						that._hide($(this), v.effect);
					});
				}
			}
		}
		else {
			if(that.element.is(':checked')) {
				if(v.hide) {
					$(v.hide).each(function() {
						that._hide($(this), v.effect);
					});
				}
				else if(that._init && v.show && !v.startHidden) {
					$(v.show).each(function() {
						that._show($(this), v.effect);
					});
				}
			}
			else {
				if(v.show) {
					$(v.show).each(function() {
						that._show($(this), v.effect);
					});
				}
				if(that._init && v.hide && v.startHidden) {
					$(v.hide).each(function() {
						that._hide($(this), v.effect);
					});
				}
			}
		}
	};

	ConditionsJS.prototype.radioShowHide = function(v) {
		var that = this;
		if(v.value === that.element.val() && that.element.is(':checked')) {
			if(v.show && (!v.startHidden || (!that._init))) {
				$(v.show).each(function() {
					that._show($(this), v.effect);
				});
			}
			if(v.hide) {
				$(v.hide).each(function() {
					that._hide($(this), v.effect);
				});
			}
		}
		else if(v.value === that.element.val() && !that.element.is(':checked')) {
			if(v.show && (!v.startHidden || (!that._init))) {
				$(v.show).each(function() {
					that._show($(this), v.effect);
				});
			}
			if(v.hide) {
				$(v.hide).each(function() {
					that._hide($(this), v.effect);
				});
			}
		}
	};

	ConditionsJS.prototype.selectShowHide = function(v) {
		var that = this;
		if(v.value === that.element.val()) {
			if(v.show && (!v.startHidden || (!that._init))) {
				$(v.show).each(function() {
					that._show($(this), v.effect);
				});
			}
			if(v.hide) {
				$(v.hide).each(function() {
					that._hide($(this), v.effect);
				});
			}
		}
	};

	ConditionsJS.prototype.inputShowHide = function(v) {
		var that = this;
		if(!v.reverse) {
			if(v.value === that.element.val()) {
				if(v.show && (!v.startHidden || (!that._init))) {
					$(v.show).each(function() {
						that._show($(this), v.effect);
					});
				}
				else if(that._init && v.hide) {
					$(v.hide).each(function() {
						that._hide($(this), v.effect);
					});
				}
			}
			else {
				if(v.hide) {
					$(v.hide).each(function() {
						that._hide($(this), v.effect);
					});
				}
			}
		}
		else {
			if(v.value === that.element.val()) {
				if(v.hide) {
					$(v.hide).each(function() {
						that._hide($(this), v.effect);
					});
				}
				else if(that._init && v.show && !v.startHidden) {
					$(v.show).each(function() {
						that._show($(this), v.effect);
					});
				}
			}
			else {
				if(v.show) {
					$(v.show).each(function() {
						that._show($(this), v.effect);
					});
				}
				if(that._init && v.hide && v.startHidden) {
					$(v.hide).each(function() {
						that._hide($(this), v.effect);
					});
				}
			}
		}
	};

	ConditionsJS.prototype._show = function(element, effect) {
		var that = this;
		if(that._init) {
			element.show();
		}
		else {
			switch(effect) {
				case 'appear':
					element.show();
					break;
				case 'slide':
					element.slideDown();
					break;
				case 'fade':
					element.fadeIn( 300 );
					break;
			}
		}
	};

	ConditionsJS.prototype._hide = function(element, effect) {
		var that = this;
		if(that._init) {
			element.hide();
		}
		else {
			switch(effect) {
				case 'appear':
					element.hide();
					break;
				case 'slide':
					element.slideUp();
					break;
				case 'fade':
					element.fadeOut( 300 );
					break;
			}
		}
	};

	$.fn.conditions = function(args) {
		return this.each( function(index, element) {
			var conditions = new ConditionsJS(index, element, $.fn.conditions.defaults, args);
			conditions.init();
		});
	};

	$.fn.conditions.defaults = {
		name:			null,
		value:			null,
		show:			null,
		hide:			null,
		effect:			'fade',
		startHidden:	false,
		reverse:		false
	};
}(jQuery));