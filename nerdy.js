"use strict";

var inputs;

var mathTable = {
	"*": {
		"n1": function() { return  n3.value / n2.value  },
		"n2": function() { return  n3.value / n1.value  },
		"n3": function() { return  n1.value * n2.value  }
	},
	"+": {
		"n1": function() { return  n3.value - n2.value  },
		"n2": function() { return  n3.value - n1.value  },
		"n3": function() { return +n1.value + +n2.value }
	},
	"/": {
		"n1": function() { return  n3.value * n2.value  },
		"n2": function() { return  n1.value / n3.value  },
		"n3": function() { return  n1.value / n2.value  }
	},
	"-": {
		"n1": function() { return +n3.value + +n2.value },
		"n2": function() { return  n1.value - n3.value  },
		"n3": function() { return  n1.value - n2.value  }
	}
}

function valueChange() {
	for (var i = 0; i < inputs.length; i++) {
		var input = inputs[i];
		if (this === input || input.isLocked()) {
			continue;
		}
		else {
			input.value = mathTable[o1.value][input.id]();
			break;
		}
	}
}

function keyInput() {
	if (/[*+/-]/.test(event.key)) {
		event.preventDefault();
		o1.value = event.key;
		n2.select();
	}
}

function wheelSpin() {
	event.preventDefault();
	this.blur();
	if (event.wheelDelta >= 1) {
		if (event.ctrlKey && event.shiftKey) this.value = +this.value + +1000;
		else if (event.ctrlKey) this.value = +this.value + +100;
		else if (event.shiftKey) this.value = +this.value + +10;
		else if (event.altKey) this.value *= 2;
		else this.value++;
	}
	else {
		if (event.ctrlKey && event.shiftKey) this.value -= 1000;
		else if (event.ctrlKey) this.value -= 100;
		else if (event.shiftKey) this.value -= 10;
		else if (event.altKey) this.value /= 2;
		else this.value--;
	}
	this.valueChange();
}

function lockNum() {
	event.preventDefault();
	this.classList.toggle("locked");
}

function isLocked() {
	return this.classList.contains("locked");
}

window.onload = function() {
	inputs = [n3, n1, n2];

	inputs.forEach(function(input) {
		input.valueChange = valueChange;
		input.onkeypress = keyInput;
		input.oninput = valueChange;
		input.onwheel = wheelSpin;
		input.oncontextmenu = lockNum;
		input.isLocked = isLocked;
	});

	o1.onchange = valueChange;
}