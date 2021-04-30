var activeScreen = document.getElementById("results");

/**
 * Switches the active screen.
 * @param {String} screen - The id of the new screen.
 */
function switchScreen(screen) {
	let e = document.getElementById(screen);
	if (e) {
		activeScreen.style.display = "none";
		activeScreen = e;
		activeScreen.style.display = "block";
	}
}
