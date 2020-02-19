window.onload = () => {
	const ms = new ManageSystem("#start", "#input");
	const start = document.querySelector("#start");
	start.addEventListener(
		'click',
		() => {
			ms.start();
		}
	);
}
