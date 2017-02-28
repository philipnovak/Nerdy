var operator = "*";
var locked;
var unlocked;

// TODO: consolidate operators, make variables lockable
function valuechange(element) {
	var var1 = document.getElementById("var1");
	var var2 = document.getElementById("var2");
	var product = document.getElementById("product");
	if(operator == "*") {
		switch(element.id) {
			case "var1": product.value = var1.value * var2.value; break;
			case "var2": product.value = var1.value * var2.value; break;
			case "product": var2.value = product.value / var1.value; break;
		}
	}
	else if(operator == "+") {
		switch(element.id) {
			case "var1": product.value = +var1.value + +var2.value; break;
			case "var2": product.value = +var1.value + +var2.value; break;
			case "product": var2.value = product.value - var1.value; break;
		}
	}
	else if(operator == "/") {
		switch(element.id) {
			case "var1": product.value = var1.value / var2.value; break;
			case "var2": product.value = var1.value / var2.value; break;
			case "product": var1.value = product.value * var2.value; break;
		}
	}
	else if(operator == "-") {
		switch(element.id) {
			case "var1": product.value = var1.value - var2.value; break;
			case "var2": product.value = var1.value - var2.value; break;
			case "product": var2.value = var1.value - product.value; break;
		}
	}
	console.log(var1.value + " " + operator + " " + var2.value);
}

function operatorchange(element) {
	operator = element.options[element.selectedIndex].value;
	valuechange(document.getElementById("var2"));
}

function keyinput(event, element) {
	if(/[*+/-]/.test(event.key)) {
		event.preventDefault();
		var operatorelement = document.getElementById("operator");
		operatorelement.value = event.key;
		operatorchange(operatorelement);
		document.getElementById("var2").select();
	}
}

function xscroll(event, element) {
	element.blur();
	if(event.wheelDelta >= 1) {
		if(event.shiftKey) element.value = +element.value + +10;
		else element.value++;
	}
	else {
		if(event.shiftKey) element.value -= 10;
		else element.value--;
	}
	valuechange(element);
}

function lockvar(element, lockid) {
	if(element.parentElement.className.indexOf("unlocked") > -1) {
		element.parentElement.className = "inputwrapper locked";
		locked = lockid;
	}
	else {
		element.parentElement.className = "inputwrapper unlocked";
		unlocked = lockid;
	}
}

$(function() {
	$(".inputwrapper").draggable();
});