var activeScreen = document.getElementById("results");

/**
 * Switches the active screen.
 * @param {String} screen - The id of the new screen.
 */
function switchScreen(screen) {
	let e = document.getElementById(screen);
	if (e) {
		activeScreen.style.filter = "opacity(0%)";
		setTimeout(() => {
			activeScreen.style.display = "none";
			e.style.display = "block";
			setTimeout(() => {
				e.style.filter = "opacity(100%)";
				activeScreen = e;
			}, 50); // Allows for the screen to fade in
		}, 100);
	}
}
