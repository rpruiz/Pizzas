// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#8C0221');

var main = Titanium.UI.createWindow({
	url: 'main_windows/main.js',
	height: Ti.Platform.displayCaps.platformHeight,
	width: Ti.Platform.displayCaps.platformWidth,
	fullscreen: true,
	navBarHidden: true
});

main.open();
