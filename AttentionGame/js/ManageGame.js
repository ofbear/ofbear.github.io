class ManageGame {
	constructor(time, number) {
		this.timeLimit = parseInt(document.querySelector(time).value) * 60 * 1000;
		this.number = parseInt(document.querySelector(number).value);
	}

	switchPage(page) {
		const divs = document.querySelectorAll("div");
		for( let i = 0; i < divs.length; i++) {
			divs[i].setAttribute( "style", "display: none;" );
		}
	
		const target = document.querySelector(page);
		target.setAttribute("style", "display: block;");

		const nav = document.querySelector("header nav");
		nav.setAttribute("style", "display: block;");
	}

	start() {
		this.switchPage("#game");

		const fs = new FixScreen("#game", "sleep-prevent-video");
		fs.on();
		setTimeout(
			() => {
				fs.off();
			},
			this.timeLimit
		);
	
		const ag = new AttentionGame("#game", "#rest", this.number, this.timeLimit, ()=>{fs.off();});
		ag.start();
	}
}