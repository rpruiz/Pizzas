var win = Ti.UI.currentWindow;

var orderReq = Titanium.Network.createHTTPClient();

//- Name text field
var names = Titanium.UI.createTextField({
	color:'#336699',
	top:100,
	left:10,
	width:300,
	height:40,
	hintText:'Name',
	backgroundImage:'../images/textfield.png',
	paddingLeft:8,
	paddingRight:8,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	suppressReturn:false
});

//-- Address Text Field
var address1 = Titanium.UI.createTextField({
	color:'#336699',
	top:140,
	left:10,
	width:300,
	height:40,
	hintText:'Address 1',
	backgroundImage:'../images/textfield.png',
	paddingLeft:8,
	paddingRight:8,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	suppressReturn:false
});

//-- Address Text Field 2
var address2 = Titanium.UI.createTextField({
	color:'#336699',
	top:180,
	left:10,
	width:300,
	height:40,
	hintText:'City, State, Zip Code',
	backgroundImage:'../images/textfield.png',
	paddingLeft:8,
	paddingRight:8,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT
});

//-- Listen for the next click on the keyboard
names.addEventListener('return', function(){address1.focus();});
address1.addEventListener('return', function(){address2.focus();});
win.add(names);
win.add(address1);
win.add(address2);

//-- This method creates a formatted order's summary
function getFormattedPizza(){
	var text = win.crust + ' pizza with:\n';
	if (win.toppings.length == 0){
		text += ' &bull; Plain (cheese pizza)\n';
	} else {
		for (var i = 0; i < win.toppings.length; i++){
			text += ' &bull; ' + win.toppings[i] + '\n';
		}
	}
	return text;
}

var pizzaInfoText = Ti.UI.createLabel({
	text:getFormattedPizza(),
	font:{
		fontFamily:'Verdana',
		fontSize:14
	},
	color:'#fff',
	shadowColor:'#333',
	shadowOffset:{x:1, y:1},
	textAlign:'left',
	width:Ti.Platform.displayCaps.platformWidth,
	height:160,
	top:210,
	left:10
});
win.add(pizzaInfoText);

//-- Order button
var order = Ti.UI.createButton({
	width:137,
	height:75,
	backgroundImage:'../images/order.png',
	top:385,
	left:165,
	opacity:0
});

//-- Cancel button
var cancel = Ti.UI.createButton({
	width:137,
	height:75,
	backgroundImage:'../images/cancel.png',
	top:385,
	left:10,
	opacity:0
});

//-- If android OS, use the image property
if(Ti.Platform.osname == 'android'){
	order.image = '../images/order.png';
	cancel.image = '../images/cancel.png';
}
win.add(order);
win.add(cancel);

//-- Fade the order button in
order.animate({
	opacity:1,
	duration:500
});

//-- Fade the cancel button in
cancel.animate({
	opacity:1,
	duration:500
});

//-- Cancel button event. Goes back to the topping window and remembers the user choices
cancel.addEventListener('click', function(){
	Ti.App.fireEvent('cancelDetails', {crust:win.crust, path:win.path, toppings:win.toppings})
});
