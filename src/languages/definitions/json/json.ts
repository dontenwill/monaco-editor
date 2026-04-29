import type { languages } from '../../../editor';

export const conf: languages.LanguageConfiguration = {
	comments: {
		lineComment: '//'
	},
	brackets: [
		['{', '}'],
		['[', ']']
	],
	autoClosingPairs: [
		{ open: '{', close: '}' },
		{ open: '[', close: ']' },
		{ open: '"', close: '"', notIn: ['string'] }
	],
	surroundingPairs: [
		{ open: '{', close: '}' },
		{ open: '[', close: ']' },
		{ open: '"', close: '"' }
	]
};

export const language = <languages.IMonarchLanguage>{
	defaultToken: 'invalid',
	tokenPostfix: '.json',

	tokenizer: {
		root: [
			{ include: '@value' }
		],

		value: [
			[/\s+/, ''],
			[/\{/, 'delimiter.bracket', '@object'],
			[/\[/, 'delimiter.bracket', '@array'],
			// object key: string immediately followed by colon
			[/"(?:[^"\\]|\\.)*"(?=\s*:)/, 'variable'],
			// string value
			[/"/, 'string', '@string'],
			[/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/, 'number'],
			[/\b(?:true|false|null)\b/, 'keyword']
		],

		object: [
			[/\s+/, ''],
			[/\}/, 'delimiter.bracket', '@pop'],
			[/,/, 'delimiter'],
			// object key: string immediately followed by colon
			[/"(?:[^"\\]|\\.)*"(?=\s*:)/, 'variable'],
			[/:/, 'delimiter'],
			{ include: '@value' }
		],

		array: [
			[/\s+/, ''],
			[/\]/, 'delimiter.bracket', '@pop'],
			[/,/, 'delimiter'],
			{ include: '@value' }
		],

		string: [
			[/[^\\"]+/, 'string'],
			[/\\./, 'string.escape'],
			[/"/, 'string', '@pop']
		]
	}
};
