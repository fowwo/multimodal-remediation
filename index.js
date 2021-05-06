var activeScreen = document.getElementById("results");
var cart = {
	fushigi: -1,
	tracy: -1,
	nivea: -1,
	frosted: -1,
	butter: -1
};
let cartActive = false;
var ended = false;

/**
 * Switches the active screen.
 * @param {String} screen - The id of the new screen.
 */
function switchScreen(screen) {
	let e = document.getElementById(screen);
	if (e && e !== activeScreen) {
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
		document.getElementById("item-count").innerHTML = getItemCount();
		document.getElementById("cart-total").innerHTML = `$${totalCost().toFixed(2)}`;
		document.getElementById(`cart-${item}`).style.display = "";

		if (allChecked()) checkoutReady();
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
		document.getElementById("item-count").innerHTML = getItemCount();
		document.getElementById("cart-total").innerHTML = `$${totalCost().toFixed(2)}`;
		document.getElementById(`cart-${item}`).style.display = "none";

		if (allChecked()) checkoutReady();
	}
}

/**
 * Toggles the shopping cart interface.
 */
function toggleCart() {
	let container = document.getElementById("container");
	let cartContainer = document.getElementById("shopping-cart-container");
	if (cartActive) {
		cartActive = false;
		container.classList.remove("cart-active");
		cartContainer.classList.remove("active");
		document.body.classList.remove("cart-active");
	} else {
		cartActive = true;
		container.classList.add("cart-active");
		cartContainer.classList.add("active");
		document.body.classList.add("cart-active");
	}
}

/**
 * Updates the shopping cart item count.
 */
function getItemCount() {
	let sum = 0;
	if (cart.fushigi !== -1) sum += cart.fushigi;
	if (cart.tracy !== -1) sum += cart.tracy;
	if (cart.nivea !== -1) sum += cart.nivea;
	if (cart.frosted !== -1) sum += cart.frosted;
	if (cart.butter !== -1) sum += cart.butter;
	return sum;
}

/**
 * Gets the total cost of all items in shopping cart.
 */
function totalCost() {
	let sum = 0;
	if (cart.fushigi !== -1) sum += 19.99 * cart.fushigi;
	if (cart.tracy !== -1) sum += 79.99 * cart.tracy;
	if (cart.nivea !== -1) sum += 12.97 * cart.nivea;
	if (cart.frosted !== -1) sum += 2.88 * cart.frosted;
	if (cart.butter !== -1) sum += 22.90 * cart.butter;
	return sum;
}

/**
 * Checks if every item is either added to the shopping cart
 * or marked as ignored.
 */
function allChecked() {
	return cart.fushigi !== -1 &&
		cart.tracy !== -1 &&
		cart.nivea !== -1 &&
		cart.frosted !== -1 &&
		cart.butter !== -1;
}

/**
 * Handles all events to allow checkout.
 */
function checkoutReady() {
	let proceed = document.getElementById("proceed");
	proceed.classList.add("ready");
	proceed.onclick = () => {
		document.getElementById("grand-total").innerHTML = `$${totalCost().toFixed(2)}`;
		setEndText();
		switchScreen("screen-end");
		toggleCart();
		document.getElementById("shopping-cart").classList.remove("ready");
		ended = true;
	};
	document.getElementById("proceed-message").style.display = "none";
	if(!ended) document.getElementById("shopping-cart").classList.add("ready");
}

/**
 * Sets the end screen text based on the total cost.
 */
function setEndText() {
	let cost = totalCost();
	if (cost == 0) {
		document.getElementById("grand-total-text").innerHTML = "You didn't feel like buying anything, but maybe that was for the better.";
	} else if (getItemCount() == 1) {
		document.getElementById("grand-total-text").innerHTML = "You found something to buy, but not everything was for you.";
	} else if (getItemCount() == 5) {
		document.getElementById("grand-total-text").innerHTML = "Woah! That's a lot of money!";
	} else {
		document.getElementById("grand-total-text").innerHTML = "You found a few things to buy, but not everything was for you.";
	}
}
