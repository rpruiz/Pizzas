var win = Ti.UI.currentWindow;

// Scrollview for toppings list, maximum toppings, numToppings for reference
var scrollView = Ti.UI.createScrollView();
var maxToppings = 6;
var numToppings = 0;

// These are the toppings. Title is the label, path is the image path and
// the container will hold the view when selected
var toppings = [
    {title:'Bacon Bits', path:'../images/toppings/bacon_bits.png', container:null},
    {title:'Beef', path:'../images/toppings/beef.png', container:null},
    {title:'Grilled Chicken', path:'../images/toppings/grilled_chicken.png', container:null},
    {title:'Ham', path:'../images/toppings/ham.png', container:null},
    {title:'Italian Sausage (Crumbled)', path:'../images/toppings/italian_sausage_crumbled.png', container:null},
    {title:'Italian Sausage (Sliced)', path:'../images/toppings/italian_sausage_sliced.png', container:null},
    {title:'Jalapenos', path:'../images/toppings/jalapenos.png', container:null},
    {title:'Mushrooms', path:'../images/toppings/mushrooms.png', container:null},
    {title:'Black Olives',path:'../images/toppings/olives_black.png',container:null},  
    {title:'Green Olives',path:'../images/toppings/olives_green.png',container:null},  
    {title:'Red Onions',path:'../images/toppings/onions_red.png',container:null},  
    {title:'White Onions',path:'../images/toppings/onions_white.png',container:null},  
    {title:'Pepperoni',path:'../images/toppings/pepperoni.png',container:null},  
    {title:'Banana Peppers',path:'../images/toppings/peppers_banana.png',container:null},  
    {title:'Green Peppers',path:'../images/toppings/peppers_green.png',container:null},  
    {title:'Red Peppers',path:'../images/toppings/peppers_red.png',container:null},  
    {title:'Pineapple',path:'../images/toppings/pineapple.png',container:null},  
    {title:'Pork',path:'../images/toppings/pork.png',container:null},  
    {title:'Diced Tomatoes',path:'../images/toppings/tomatoes_diced.png',container:null},  
    {title:'Marinated Tomatoes',path:'../images/toppings/tomatoes_marinated.png',container:null},  
    {title:'Roma Tomatoes',path:'../images/toppings/tomatoes_roma.png',container:null}  
];

// Toppings title
var toppingsTitle = Ti.UI.createLabel({
	text: '2. Choose your toppings',
	font: {
		fontFamily:'Verdana',
		fontWwight:'bold',
		fontSize:22
	},
	color:'#A90329',
	shadowColor:'#333',
	shadowOffset: {x:1, y:1},
	textAlign:'left',
	width:Ti.Platform.displayCaps.platformWidth,
	height:58,
	left:10
});

// Toppings title background
var toppingsTitleView = Ti.UI.createView({
	width:328,
	height:58,
	backgroundImage:'../images/crustHeaderBg.png',
	top:100,
	left:-6,
	opacity:0
});
toppingsTitleView.add(toppingsTitle);

// Holds the pizza image
var pizza = Ti.UI.createView({
	top:270,
	width:216,
	height:156,
	backgroundImage:win.path
});

// This will hold all the selected toppings
var toppingsHolder = Ti.UI.createView({
	width:216,
	height:156
});

pizza.add(toppingsHolder);
win.add(pizza);
win.add(toppingsTitleView);

// Details button
var details = Ti.UI.createButton({
	width:137,
	height:75,
	backgroundImage:'../images/details.png',
	top:385,
	left:165,
	opacity:0
});

// Cancel button
var cancel = Ti.UI.createButton({
	width:137,
	height:75,
	backgroundImage:'../images/cancel.png',
	top:385,
	left:10,
	opacity:0
});

// If android use image property instead of background
if (Ti.Platform.osname == 'android') {
	details.image = '../images/details.png';
	cancel.image = '../images/cancel.png';
	pizza.image = win.path;
} else {
	pizza.opacity = 0;
}

win.add(details);
win.add(cancel);

// Cancel click event goes back to the crust window and passes the current crust
cancel.addEventListener('click', function(e){
	Ti.App.fireEvent('cancelToppings', {crust:win.crust});
});
details.addEventListener('click', function(e){
});

// fade the views and buttons
toppingsTitleView.animate({  
    opacity:1,  
    duration:500  
});  

pizza.animate({  
    opacity:1,  
    duration:500  
});
  
details.animate({  
    opacity:1,  
    duration:500  
});
  
cancel.animate({  
    opacity:1,  
    duration:500  
});

details.addEventListener('click', function(e){
	var pizzaInfo = [];
	for (var i = 0; i < toppings.length; i++){
		if(toppings[i].container != null){
			pizzaInfo.push(toppings[i].title);
		}
	}
	Ti.App.fireEvent('details', {crust:win.crust, path:win, toppings:pizzaInfo});
});

function toppingListClick(e){
	if (e.source.selected){
		e.source.selected = true;
		e.source.backgroundImage = '../images/checkbox_no.png';
		numToppings -= 1;
		if (toppings[e.source.toppingID].container != null){
			toppingsHolder.remove(toppings[e.source.toppingID].container);
			toppings[e.source.toppingID].container = null;
		}
	} else {
		// If numToppings is less than maxToppings, add the new topping, else alert
		if (numToppings < maxToppings){
			e.source.selected = true;
			e.source.backgroundImage = '../images/checkbox_yes.png';
			var aTopping = Ti.UI.createView({
				backgroundImage:toppings[e.source.toppingID].path
			});
			if (Ti.Platform.osname == 'android'){
				aTopping.image = toppings[e.source.toppingID].path;
			} else {
				aTopping.opacity = 0;
				aTopping.animate ({
					opacity:1,
					duration:500
				});
			}
			toppingsHolder.add(aTopping);
			toppings[e.source.toppingID].container = aTopping;
			numToppings += 1;
		} else{
			alert ("6 Toppings max")
		}
	}
}

function createToppingsList(){
	scrollView.opacity = 0;
	scrollView.top = 155;
	scrollView.height = 120;
	scrollView.contentWidth = Ti.Platform.displayCaps.platformWidth;
	scrollView.contentHeight = 'auto';
	scrollView.showVerticalScrollIndicator = true;
	win.add(scrollView);
	
	for(i = 0; i < toppings.length; i++){
		var toppingLabel = Ti.UI.createLabel({
			text:toppings[i].title,
			font:{
				fontFamily:'Verdana',
				fontWeight:'bold',
				fontSize:14
			},
			color:'#fff',
			shadowColor:'#333',
			shadowOffset:{x:1,y:1},
			textAlign:'left',
			width:Ti.Platform.displayCaps.platformWidth - 10,
			left:10
		});
		// Add a custom property 'selected' to the checkbox view
		var checkbox = Ti.UI.createView({
			width:340,
			height:16,
			backgroundImage:'../images/checkbox_no.png',
			selected:false,
			toppingID:1
		});
		
		//-- If the user hits cancel in the details window, we go back and reposition
		if (win.returnToppings){
			for( j = 0; j < win.returnToppings.length; j++){
				if (win.returnToppings[j] == toppings[i].title){
                    var aTopping = Ti.UI.createView({
                        backgroundImage:toppings[i].path
                    });
                    if (Ti.Platform.osname == 'android'){
                        aTopping.image = toppings[i].path;
                    } else {
                        aTopping.opacity = 0;
                        aTopping.animate({
                            opacity:1,
                            duration:500
                        });
                    }
                    toppingsHolder.add(aTopping);
                    toppings[i].container = aTopping;
                    checkbox.backgroundImage = '../images/checkbox_yes.png';
                    checkbox.selected = true;
                    numToppings += 1;
                }
			}
		}
		
		var toggler = Ti.UI.createView({
			width:Ti.Platform.displayCaps.platformWidth,
			height:20,
			top: i * 20			
		});
		// Use the singletap event rather than click since it is a scrollable view
		checkbox.addEventListener('singletap', toppingListClick);
		toggler.add(toppingLabel);
		toggler.add(checkbox);
		scrollView.add(toggler);
	}
	scrollView.animate({
		opacity:1,
		duration:500
	});
}
createToppingsList();