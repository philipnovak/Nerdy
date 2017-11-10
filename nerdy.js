'use strict';

/* Initialize Algebra.js */
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

var expression,
	equation,
	inputs,
	operators,
	rightSide,
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
	expression = operatorMap[o2.value]('n3');

	equation = new Equation(expression, +rightSide.value);

	console.log(equation.toString());
}

function solveForSelected() {
	if (selected !== rightSide) {
		var evaluation = {};
		inputs.forEach(function(input) {
			if (input !== selected && input !== rightSide) {
				evaluation[input.id] = +input.value;
			}
		});
		console.log(evaluation);

		equation = new Equation(expression.eval(evaluation), +rightSide.value);
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
	console.log("Recalculating...");
	if (selected === this) {
		if (this !== rightSide) {
			select(rightSide);
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
	n3.valueChange();
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

	operators = document.querySelectorAll('select');
	operators.forEach(function(operator) {
		operator.onchange = operatorChange;
	})

	rightSide = n4;

	evaluateEquation();
}