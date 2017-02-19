var operator = "mult";

// TODO: consolidate operators, make variables lockable
function valuechange(element) {
	var var1 = document.getElementById("var1");
	var var2 = document.getElementById("var2");
	var product = document.getElementById("product");
	if(operator == "mult") {
		switch(element.id) {
			case "var1": product.value = var1.value * var2.value; break;
			case "var2": product.value = var1.value * var2.value; break;
			case "product": var2.value = product.value / var1.value; break;
		}
	}
	else if(operator == "div") {
		switch(element.id) {
			case "var1": product.value = var1.value / var2.value; break;
			case "var2": product.value = var1.value / var2.value; break;
			case "product": var1.value = product.value * var2.value; break;
		}
	}
	else if(operator == "add") {
		switch(element.id) {
			case "var1": product.value = +var1.value + +var2.value; break;
			case "var2": product.value = +var1.value + +var2.value; break;
			case "product": var2.value = product.value - var1.value; break;
		}
	}
	else if(operator == "sub") {
		switch(element.id) {
			case "var1": product.value = var1.value - var2.value; break;
			case "var2": product.value = var1.value - var2.value; break;
			case "product": var2.value = var1.value - product.value; break;
		}
	}
}

function operatorchange(element) {
	operator = element.options[element.selectedIndex].value;
	valuechange(document.getElementById("var2"));
}

function xscroll(event, element) {
	if(event.wheelDelta >= 120) {
		element.value++;
	}
	else {
		element.value--;
	}
	valuechange(element);
}