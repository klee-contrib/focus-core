module.exports = {
	"DO_TEXT": {
		style: "do_text",
		type: "text",
		component: "PapaSinge",
		validation: [{
			type: "function",
			value: function() {
				return false;
			}
		}]
	},
	"DO_EMAIL": {
		style: "do_email",
		type: "email",
		component: "PapaMail",
		validation: [{
			type: "function",
			value: function() {
				return true;
			}
		}]
	}
};
