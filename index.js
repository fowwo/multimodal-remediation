var activeScreen = document.getElementById("results");
var cart = {
	fushigi: -1,
	tracy: -1,
	nivea: -1,
	frosted: -1,
	butter: -1
};

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

/**
 * Handles all events when adding an item to the cart.
 * @param {String} item - The id of the item.
 */
function buyItem(item) {
	if (cart[item] !== undefined) {
		let listing = document.getElementById(`${item}-listing`);
		let add = document.getElementById(`${item}-add`);
		let ignore = document.getElementById(`${item}-ignore`);
		let panel = document.getElementById(`${item}-panel`);
		listing.classList.add("bought");
		listing.classList.remove("ignored");
		add.classList.add("bought");
		add.classList.remove("ignored");
		ignore.classList.add("bought");
		ignore.classList.remove("ignored");
		panel.classList.add("bought");
		panel.classList.remove("ignored");
		cart[item] = 1;
	}
}

/**
 * Handles all events when ignoring an item.
 * @param {String} item - The id of the item.
 */
function ignoreItem(item) {
	if (cart[item] !== undefined) {
		let listing = document.getElementById(`${item}-listing`);
		let add = document.getElementById(`${item}-add`);
		let ignore = document.getElementById(`${item}-ignore`);
		let panel = document.getElementById(`${item}-panel`);
		listing.classList.remove("bought");
		listing.classList.add("ignored");
		add.classList.remove("bought");
		add.classList.add("ignored");
		ignore.classList.remove("bought");
		ignore.classList.add("ignored");
		panel.classList.remove("bought");
		panel.classList.add("ignored");
		cart[item] = 0;
	}
}
