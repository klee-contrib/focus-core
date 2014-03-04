module.exports = {
	"virtualMachine": {
		"name": {
			"domain": "DO_TEXTE_50",
			"required": true
		},
		"nbCpu": {
			"domain": "DO_ENTIER",
			"required": true
		},
		"osId": {
			"domain": "DO_ID",
			"required": true
		},
		"memory": {
			"domain": "DO_ENTIER",
			"required": true
		},
		"diskCapacity": {
			"domain": "DO_ENTIER",
			"required": true
		},
		"users": {
			"domain": "DO_LISTE",
			"required": true
		},
		"startDate": {
			"domain": "DO_DATE",
			"required": true
		},
		"endDate": {
			"domain": "DO_DATE"
		}
	},
	"virtualMachineSearch": {
		"name": {
			"domain": "DO_TEXTE_30",
			"required": true
		}
	},
	"reference": {
		"id": {
			"domain": "DO_ID",
			"required": true
		},
		"name": {
			"domain": "DO_TEXTE_30",
			"required": true
		},
		"translationKey": {
			"domain": "DO_TEXTE_30",
			"required": true
		}
	},
	"nantissement": {
		"critereRecherchePret": {
			"isTopListeRouge": {
			    "domain": "DO_BOOLEEN"
                
			},
			"isTopConvention": {
				"domain": "DO_BOOLEEN"
			},
			"isNanti": {
				"domain": "DO_BOOLEEN"
			},
			"identificationUESLPret": {
				"domain": "DO_TEXTE_30"
			},
			"identificationCILPret": {
				"domain": "DO_TEXTE_30"
			},
			"montantNominalMin": {
				"domain": "DO_DEVISE"
			},
			"montantNominalMax": {
				"domain": "DO_DEVISE"
			},
			"dateContratMin":{
				"domain": "DO_DATE"
			},
			"dateContratMax":{
				"domain": "DO_DATE"
			},
			"dateDerniereEcheanceMin":{
				"domain": "DO_DATE"
			},
			"dateDerniereEcheanceMax":{
				"domain": "DO_DATE"
			}
		}
	}

};