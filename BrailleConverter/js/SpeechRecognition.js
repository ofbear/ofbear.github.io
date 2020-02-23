class SpeechRecognition {
	constructor(status, target) {
		this.status = document.querySelector(status);
		this.target = document.querySelector(target);

		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!window.SpeechRecognition) {
			this.enable = false;
			return;
		}
		this.enable = true;

		this.recog = new window.SpeechRecognition();
		this.recog.lang = 'ja-JP';
		this.recog.addEventListener(
			'error',
			(e) => {
				this.error(e);
			}
		);
		this.recog.addEventListener(
			'result',
			(e) => {
				this.result(e);
			}
		);
		this.recog.addEventListener(
			'end',
			(e) => {
				this.end(e);
			}
		);
	}

	get is_enable() {
		return this.enable;
	}

	start() {
		this.status.classList.add('loading');

		this.recog.start();
	}

	error(e) {
		if (e.error != 'no-speech') {
			console.error('ERROR:' + e.error);
		}
	}

	result(e) {
		const txt = e.results[0][0].transcript;
		this.target.value += txt + "\r\n";
		this.target.onchange();
	}

	end(e) {
		this.status.classList.remove('loading');
	}
}