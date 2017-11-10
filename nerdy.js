'use strict';

/* Initialize Algebra.js */
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

var expression,
	equation,
	inputs,
	selected;

// var leftSide = {
// 	inputs: [n1, n2],
// 	expression: 'n1n2'
// }

// var rightSide = {
// 	inputs: [n3],
// 	expression: 'n3'
// }

var operatorMap = {
	'*': function(n) { return expression.multiply(n) },
	'+': function(n) { return expression.add(n) },
	'/': function(n) { return expression.divide(n) },
	'-': function(n) { return expression.subtract(n) }
}

function evaluateEquation() {
	expression = new Expression('n1');
	expression = operatorMap[o1.value]('n2');

	equation = new Equation(expression, +n3.value);

	console.log(equation.toString());
}

function solveForSelected() {
	if (selected !== n3) {               //    .---- This will need to be refactored
		var evaluation = {};             //    |    to only iterate through expression1
		inputs.forEach(function(input) { //    v
			if (input !== selected && input !== n3) {
				evaluation[input.id] = +input.value;
			}
		});
		console.log(evaluation);

		equation = new Equation(expression.eval(evaluation), +n3.value);
		console.log(equation.toString());

		var solution = equation.solveFor(selected.id).toString();
		console.log(selected.id + ' = ' + solution);

		selected.value = eval(solution);
	}
	else {
		var evaluation = {};
		inputs.forEach(function(input) {
			if (input !== selected) {
				evaluation[input.id] = +input.value;
			}
		});
		console.log(evaluation);

		var solution = expression.eval(evaluation);
		console.log(selected.id + ' = ' + solution);

		selected.value = eval(solution);
	}
}

function valueChange() {
	if (selected === this) {
		if (this !== n3) {
			select(n3);
			this.valueChange();
		}
		else {
			select(n1);
			this.valueChange();
		}
	}
	else {
		solveForSelected();
	}
}

function operatorChange() {
	evaluateEquation();
	n2.valueChange();
}

function wheelSpin() {
	event.preventDefault();
	this.blur();
	if (event.wheelDelta >= 1) {
		this.value = 
			event.ctrlKey &&
			event.shiftKey ? +this.value + 1000 :
			event.ctrlKey  ? +this.value + 100  :
			event.shiftKey ? +this.value + 10   :
			event.altKey   ?  this.value * 2    :
			                 +this.value + 1    ;
	}
	else {
		this.value = 
			event.ctrlKey &&
			event.shiftKey ? this.value - 1000 :
			event.ctrlKey  ? this.value - 100  :
			event.shiftKey ? this.value - 10   :
			event.altKey   ? this.value / 2    :
			                 this.value - 1    ;
	}
	this.valueChange();
}

function select(input) {
	if (!input.isSelected()) {
		selected.classList.remove('selected');
		selected = input;
		selected.classList.add('selected');
		solveForSelected();
	}
}

function isSelected(id) {
	if (this instanceof HTMLInputElement) {
		return this === selected;
	}
	if (id) {
		return id === selected.id;
	}
	console.warn("Invalid argument or context supplied for function isSelected");
}

window.onload = function() {
	inputs = document.querySelectorAll('input');

	inputs.forEach(function(input) {
		input.valueChange = valueChange;
		input.oninput = valueChange;
		input.onwheel = wheelSpin;
		input.isSelected = isSelected;
		input.onclick = function() { select(this) };
	});

	selected = document.querySelector('.selected');

	o1.onchange = operatorChange;

	evaluateEquation();
}