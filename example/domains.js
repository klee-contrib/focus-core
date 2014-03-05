module.exports = {
	"DO_ENTIER": {
		"type": "number",
		"validation": [{
			"type": "number"
		}],
	},
	"DO_DATE": {
		"type": "date"
	},
	"DO_TEXTE_50": {
		"type": "text",
		"validation": [{
			"type": "string",
			"options": {
				"maxLength": 50
			}
		}],
		"style": ["cssClassDomain1", "cssClassDomain2"]
	},
	"DO_LISTE": {
		"type": "number",
	},
	"DO_ID": {
		"type": "text"
	},
	"DO_TEXTE_30": {
		"type": "text",
		"validation": [{
			"type": "string",
			"options": {
				"maxLength": 30
			}
		}]
	},
	"DO_EMAIL": {
		"type": "email",
		"validation": [{
			"type": "email"
		}, {
			"type": "string",
			"options": {
				"minLength": 4
			}
		}]
	},
	"DO_BOOLEEN":{
		"type": "boolean"
	},
	"DO_DEVISE":{
		"type": "number",
		"validation":{
			"type": "number",
			"options":{"min": 0}
		},
		"formatter": "devise"
	}

};