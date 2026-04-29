import type { languages } from '../../../editor';

export const conf: languages.LanguageConfiguration = {
	comments: {
		lineComment: '//'
	}
};

export const language = <languages.IMonarchLanguage>{
	defaultToken: '',
	ignoreCase: true,
	tokenPostfix: '.bcp',

	// key= properties
	keywords: [
		'type=', 'folder=', 'name=', 'bez=', 'id=', 'use_mask=', 'use_popt=',
		'report_id=', 'report_nr=', 'report_typ=', 'report_pr=', 'beleg_art=',
		'archiv=', 'dialog=', 'arctyp=', 'option=', 'version='
	],

	// value constants
	constants: [
		'prog', 'mask', 'brow', 'menue', 'stdmask', 'layout', 'beleg', 'grid', 'options'
	],

	tokenizer: {
		root: [
			{ include: '@whitespace' },

			// key=value keywords (contain =, matched literally before identifier rule)
			[/(?:type|folder|name|bez|id|use_mask|use_popt|report_id|report_nr|report_typ|report_pr|beleg_art|archiv|dialog|arctyp|option|version)=/, 'keyword'],

			// entry separator
			[/;/, 'delimiter'],

			// identifiers / constants
			[/[a-zA-Z_]\w*/, {
				cases: {
					'@constants': 'constant.language',
					'@default': ''
				}
			}]
		],

		whitespace: [
			[/\s+/, ''],
			[/\/\/.*$/, 'comment']
		]
	}
};
