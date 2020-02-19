class AttentionGame {
	constructor(target, rest, number, time, func) {
		this.target = target;
		this.rest = rest;

		this.number = number;

		this.heightEnd = document.querySelector(this.target).getBoundingClientRect().height;
		this.heightChunk = this.heightEnd / this.number;
//		this.heightLine = this.heightChunk / this.timeEnd;
		this.heightLine = 1;

		this.timeEnd = 5 * 60 * 1000;
		this.timeInterval = 5000;
		this.timeLimit = time;
		this.timeStart = (new Date()).getTime();
		this.timeNow = 0;
		this.timeOld = 0;

		this.status = new Array(this.number);
		this.height = new Array(this.number);

		this.color = ["red", "blue", "purple", "pink"];

		this.func = func;
	}

	start() {
		for(let i = 0; i < this.number; i++) {
			const chunk = document.createElement("span");
			chunk.setAttribute("id", "chunk"+i);
			chunk.style.backgroundColor = this.color[i];
			chunk.style.height = this.heightChunk + "px";
			chunk.addEventListener(
				'click',
				() => {
					this.switch(i)
				}
			);
	
			const game = document.querySelector(this.target);
			game.appendChild(chunk);
		}

		this.timerInterval = setInterval(
			() => {
				this.manage();
				this.elapsed();
			},
			1000
		);
		this.timerTimeout = setTimeout(
			() => {
				this.end();
			},
			this.timeLimit
		);
	}

	switch(target) {
		if((this.timeNow - this.timeOld) < this.timeInterval) {
			return;
		}
	
		for(let i = 0; i < this.number; i++) {
			this.status[i] = -1;
		}
		this.status[target] = 1;
	
		this.timeOld = this.timeNow;
	}

	elapsed() {
		const rest = document.querySelector(this.rest);
		rest.innerHTML = ((this.timeStart + this.timeLimit) - this.timeNow) / 1000 | 0;
	}

	manage() {
		this.timeNow = (new Date()).getTime();

		for(let i = 0; i < this.number; i++) {
			const chunk = document.querySelector("#chunk"+i);
			const heightNow = chunk.getBoundingClientRect().height;
			if(this.status[i] < 0) {
				chunk.style.height = (heightNow - this.heightLine) + "px";
			} else if(this.status[i] > 0) {
				chunk.style.height = (heightNow + (this.heightLine * (this.number - 1))) + "px";
			}
	
			if( heightNow >= this.heightEnd) {
				this.end();
			}
		}
	}

	end() {
		clearInterval(this.timerInterval);
		clearTimeout(this.timerTimeout);
		this.func();

		let heightMax = 0;
		let playerMax = 0;
		for(let i = 0; i < this.number; i++) {
			const chunk = document.querySelector("#chunk"+i);
			const heightNow = chunk.getBoundingClientRect().height;
			
			if( heightNow >= heightMax) {
				heightMax = heightNow;
				playerMax = i;
			}
		}

		alert('winner:' + this.color[playerMax]);
	}
}