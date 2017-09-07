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
	conditions: {
		element:  'input[name=example1]',
		type:     'checked',
		operator: 'is'
	},
	actions: {
		if: {
			element: 'div.example1',
			action:  'show'
		},
		else: {
			element: 'div.example1',
			action:  'hide'
		}
	},
	effect: 'fade'
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
			element:   'select[name=example2]',
			type:      'value',
			operator:  '=',
			condition: '1'
		},
		actions: {
			if: [
				{
					element: '.example2-value1',
					action:  'show'
				},
				{
					element: '.example2-value2',
					action:  'hide'
				}
			]
		},
		effect: 'appear'
	},
	{
		conditions: {
			element:   'select[name=example2]',
			type:      'value',
			operator:  '=',
			condition: '2'
		},
		actions: {
			if: [
				{
					element: '.example2-value2',
					action:  'show'
				},
				{
					element: '.example2-value1',
					action:  'hide'
				}
			]
		},
		effect: 'slide'
	}
] );
```

New in version 1.0.1 you can now match against multiple values, as in a select box that has the ability to check against multiple values. This doesn't change any functionality unless you want to match against ALL values. For example:

```js
$( 'select[name=example2]' ).conditions( {
	conditions: {
		element:   'select[name=example2]',
		type:      'value',
		operator:  'array',
		condition: [ '1', '2' ],
		multiple:  'all'
	},
	actions: {
		if: [
			{
				element: '.example2-value1',
				action:  'show'
			},
			{
				element: '.example2-value2',
				action:  'hide'
			}
		]
	},
	effect: 'appear'
} );
```

This example would require both a `1` AND a `2` value to be present in the values array to trigger the action.

## Effects

You can send in an `effect` property to change the effect of show/hide.  Currently supported: `appear`, `slide` and `fade`.  The default option is `fade`.

## Condition Options

Option | Example | Description
:---: | :---: | ---
`element` | `'#id, select, [name=test]'` | Any jQuery element will do, this can be a select box, text field, checkbox, radio button, etc.
`type` | `value` | Supported: `value`, `checked`. If set to value it will try to match the value of the element, if set to checked it will check if the element is selected.
`operator` | `===` | The supported operators are dependent on the type you are using.  For `value`: `===`, `!==`, `array`, `!array`. For `checked`: `is`, `!is`.
`condition` | `test_value` | If the type is `value`, you can set a string here that matches based on the operator.  If using `checked`, this option is not applicable.

## Actions Options

Option | Description
:---: | ---
`if` | This is an object or array of objects which each have two properties: `element` and `action`.  Set the element to another jQuery selector that will be shown or hidden based on the action when the condition is met.  Set the action to `show` or `hide`.
`else` | Similar to `if`, except it will be triggered if the condition is NOT met.