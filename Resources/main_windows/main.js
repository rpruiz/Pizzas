var win = Ti.UI.currentWindow;

// Subwindows

var crusts = Ti.UI.createWindow();
var toppings = Ti.UI.createWindow();
var details = Ti.UI.createWindow();

win.backgroundImage = '../images/bg_main.png';
Ti.include('../includes/clock.js');

// Closes de crusts/detail window and opens the toppings window
function openToppings(e) {
	crusts.close();
	toppings.url = 'toppings.js';
	toppings.crust = e.crust;
	toppings.path  = e.path;
	toppings.returnToppings = e.toppings;
	toppings.open();
}

// This function closes the toppings window and opens the crust window
function openCrust(e) {
	toppings.close();
	if (e.crust){
		crusts.crust = e.crust;
	}
	crusts.url = 'crusts.js';
	crusts.open();
}

Ti.App.addEventListener('toppings', openToppings);
Ti.App.addEventListener('cancelToppings', openCrust);
openCrust({});
