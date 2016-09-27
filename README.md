# ConditionsJS

A small jQuery plugin for handling showing and hiding things conditionally based on input - typically groups of form fields. This plugin is different from the majority of conditional form field plugins in that it does not use data attributes to process the conditional fields.  This allows for seeing the data in one place and also scales really nicely.

ConditionsJS supports the following form field types:
- Checkboxes
- Radio buttons
- Selects
- Text input (text, email, phone, password, etc)
- Textarea

# Usage
Using ConditionsJS is simple!  To start, simply use a jQuery selector with the elements you want to use to show/hide other elements and pass in an array or object of arguments to trigger the conditions.  Note: all elements that are used to trigger conditional elements MUST include a name attribute.

Lets say you have a checkbox and hidden element that looks like this:

```html
<input type="checkbox" name="example1" value="1">
<div class="example1">Sample Text Here</div>
```

You can then initialize the conditions like this:

```js
// Using an object
$( 'input[name=example1]' ).conditions( {
	show:        'div.example1',
	hide:        'div.example1',
	startHidden: true,
	effect:      'fade'
} );
```

On page load, this will hide the example div, and when the checkbox is selected, will then fade it in using a basic jQuery effect. When the checkbox is unchecked, the div will then fade out.  This method also works for conditonal text fields.  The only thing extra you need is to add in a `value` attribute that will be used to match against the user input.

Radio buttons and select boxes work a little differently.  Since they can have multiple values (more than 2), you will need to define each option separately.  For example:

```html
<select name="example2">
	<option value="">Select an Option</option>
	<option value="1">Option 1</option>
	<option value="2">Option 2</option>
</select>
<div class="example2-value1">Sample text here</div>
<div class="example2-value2">Sample text here</div>
```

Then use the following code:

```js
// Using an array of objects
$( 'select[name=example2]' ).conditions( [
	{
		conditions: {
			element:	$('select[name=example2]'),
			type:		'value',
			operator:	'=',
			condition:	'1'
		},
		actions: {
			if: [
				{
					element:	'.example2-value1',
					action:		'show'
				},
				{
					element:	'.example2-value2',
					action:		'hide'
				}
			]
		}
	},
	{
		conditions: {
			element:	$('select[name=example2]'),
			type:		'value',
			operator:	'=',
			condition:	'2'
		},
		actions: {
			if: [
				{
					element:	'.example2-value2',
					action:		'show'
				},
				{
					element:	'.example2-value1',
					action:		'hide'
				}
			]
		}
	}
] );

```

## Options

Option  | Input | Description
:---: | --- | ---
`name`  | checkbox, radio, select, text | This differentiates between different elements if using a selector that includes a lot of different form elements.
`value` | radio, select, text | Use this to tell ConditionsJS which value to use to trigger the conditions.  This is not used for checkboxes.
`show` | checkbox, radio, select, text | This is a list of elements to show when the condition is triggered.
`hide` | checkbox, radio, select, text | This is a list of elements to hide when the condition is triggered.
`effect` | checkbox, radio, select, text | Default effect is `slide`. You can also use `appear` or `fade`.
`reverse` | checkbox, text | This reverses the way that the condition is met.  On a checkbox, it will show the elements when the checkbox is UNchecked rather than when it is checked.
`startHidden` | checkbox, radio, select, text | Forces the elements in `hide` to be hidden and does not show anything on page load. This works even if `reverse` is in use.  You will need to use this option even if you are using CSS to hide your elements as the JS will show hidden elements if the conditons are met.