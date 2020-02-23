class ManageSystem {
	constructor(status, target) {
		this.status = status;
		this.target = target;

		this.sr = new SpeechRecognition(this.status, this.target);
	}

	start() {
		if (!this.sr.is_enable) {
			alert('お使いのブラウザではご利用できません。');
		}

		sr.start();
	}

}