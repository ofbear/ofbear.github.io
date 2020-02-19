class ManageSystem {
	constructor(status, target) {
		this.status = status;
		this.target = target;
	}

	start() {
		const sr = new SpeechRecognition(this.status, this.target);
		if (!sr.is_enable) {
			alert('お使いのブラウザではご利用できません。');
			return false;
		}

		sr.start();
		return true;
	}

}