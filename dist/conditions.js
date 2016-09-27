/**
 * jQuery Conditions 1.0.0
 *
 * Copyright 2016 Bejamin Rojas
 * @license Released under the MIT license.
 * http://jquery.org/license
 */
(function($) {
	"use strict";

	$.fn.conditions = function(conditions) {
		return this.each( function(index, element) {
			var CJS = new ConditionsJS(element, conditions, $.fn.conditions.defaults);
			CJS.init();
		});
	};

	$.fn.conditions.defaults = {
		condition:	null,
		actions:	{},
		effect:		'fade'
	};

	var ConditionsJS = function(element, conditions, defaults) {
		var that = this;

		that.element	= $(element);
		that.defaults	= defaults;
		that.conditions	= conditions;
		that._init		= false;

		if(!$.isArray(that.conditions)) {
			that.conditions = [that.conditions];
		}

		$.each(that.conditions, function(i, v) {

			v = $.extend({}, that.defaults, v);

			that.conditions[i] = v;

		});

	};

	ConditionsJS.prototype.init = function() {
		var that = this;
		that._init = true;
		// Set up event listener
		$(that.element).on('change', function() {
			that.matchConditions();
		});

		$(that.element).on('keyup', function() {
			that.matchConditions();
		});
		
		//Show based on current value on page load
		that.matchConditions(true);
	};

	ConditionsJS.prototype.matchConditions = function(init) {
		var that = this;

		if(!init) {
			that._init = false;
		}

		$.each(that.conditions, function(ind, cond) {

			var condition_matches = false, all_conditions_match = true;

			if(!$.isArray(cond.conditions)) {
				cond.conditions = [cond.conditions];
			}

			$.each(cond.conditions, function(i, c) {

				c.element = $(c.element);

				switch(c.type) {
					case 'value':
					case 'val':
						switch(c.operator) {
							case '===':
							case '==':
							case '=':
								condition_matches = c.element.val() === c.condition;
								break;
							case '!==':
							case '!=':
								condition_matches = c.element.val() !== c.condition;
								break;
							case 'array':
								condition_matches = $.inArray( c.element.val(), c.condition ) !== -1;
								break;
							case '!array':
								condition_matches = $.inArray( c.element.val(), c.condition ) === -1;
								break;
						}
						break;
					case 'checked':
						switch(c.operator) {
							case 'is':
								condition_matches = c.element.is(':checked');
								break;
							case '!is':
								condition_matches = !c.element.is(':checked');
								break;
						}
				}

				if(!condition_matches && all_conditions_match) {
					all_conditions_match = false;
				}

			});

			if(all_conditions_match) {

				if(!$.isEmptyObject(cond.actions.if)) {

					if(!$.isArray(cond.actions.if)) {
						cond.actions.if = [cond.actions.if];
					}

					$.each(cond.actions.if, function(i, condition) {
						that.showAndHide(condition, cond.effect);
					});

				}

			}
			else {

				if(!$.isEmptyObject(cond.actions.else)) {

					if(!$.isArray(cond.actions.else)) {
						cond.actions.else = [cond.actions.else];
					}
					
					$.each(cond.actions.else, function(i, condition) {
						that.showAndHide(condition, cond.effect);
					});

				}

			}

		});

	};

	ConditionsJS.prototype.showAndHide = function(condition, effect) {
		var that = this;

		switch(condition.action) {
			case 'show':
				that._show($(condition.element), effect);
				break;
			case 'hide':
				that._hide($(condition.element), effect);
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

}(jQuery));