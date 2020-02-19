window.onload = () => {
	const mg = new ManageGame("#time", "#number");
	const button = document.querySelector("#button");
	button.addEventListener(
		'click',
		() => {
			mg.start();
		}
	);
}
