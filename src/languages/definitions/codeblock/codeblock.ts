import type { languages } from '../../../editor';

export const conf: languages.LanguageConfiguration = {
	comments: {
		lineComment: '//',
		blockComment: ['/*', '*/']
	},
	brackets: [
		['{', '}'],
		['[', ']'],
		['(', ')']
	],
	autoClosingPairs: [
		{ open: '{', close: '}' },
		{ open: '[', close: ']' },
		{ open: '(', close: ')' },
		{ open: "'", close: "'", notIn: ['string'] },
		{ open: '"', close: '"', notIn: ['string'] },
		{ open: '/*', close: ' */', notIn: ['string', 'comment'] }
	],
	surroundingPairs: [
		{ open: '{', close: '}' },
		{ open: '[', close: ']' },
		{ open: '(', close: ')' },
		{ open: "'", close: "'" },
		{ open: '"', close: '"' }
	]
};

export const language = <languages.IMonarchLanguage>{
	defaultToken: '',
	ignoreCase: true,
	tokenPostfix: '.codeblock',

	keywords: [
		'always', 'break', 'case', 'do', 'downto', 'else', 'end', 'endcase',
		'endif', 'exit', 'for', 'foreach', 'function', 'if', 'in', 'loop',
		'next', 'of', 'onerror', 'otherwise', 'repeat', 'startseq', 'stopseq',
		'then', 'to', 'until', 'while'
	],

	operators: ['and', 'or', 'xor'],

	constants: ['true', 'false', 'nil', 'null', 'not'],

	tokenizer: {
		root: [
			// whitespace
			{ include: '@whitespace' },

			// :: operator
			[/::/, 'keyword'],

			// .and. .or. .xor. — dotted logical operators
			[/\.(and|or|xor)\./, 'keyword.operator'],

			// .t. .f. .not. — dotted boolean constants
			[/\.(t|f|not)\./, 'constant.language'],

			// ! — boolean not shorthand
			[/!/, 'constant.language'],

			// function definition: highlight name after 'function' keyword
			[/\b(function)(\s+)(\w+(?:\.\w+)?)/, ['keyword', '', 'entity.name.function']],

			// function call: identifier immediately followed by (
			[/\w+(?:\.\w+)?(?=\s*\()/, 'support.function'],

			// | VariableBlock | — pipe-delimited variable block declaration
			[/\|/, 'delimiter.pipe', '@variable_block'],

			// numeric literals
			[/\b\d+\.?\d*\b/, 'number'],

			// strings
			[/"/, 'string', '@string_double'],
			[/'/, 'string', '@string_single'],

			// identifiers and keywords
			[/[a-zA-Z_]\w*/, {
				cases: {
					'@keywords': 'keyword',
					'@operators': 'keyword.operator',
					'@constants': 'constant.language',
					'result': 'variable.language',
					'@default': ''
				}
			}]
		],

		whitespace: [
			[/\s+/, ''],
			[/\/\/.*$/, 'comment'],
			[/\/\*/, 'comment', '@comment_block']
		],

		comment_block: [
			[/[^/*]+/, 'comment'],
			[/\*\//, 'comment', '@pop'],
			[/[/*]/, 'comment']
		],

		string_double: [
			[/[^"]+/, 'string'],
			[/"/, 'string', '@pop']
		],

		string_single: [
			[/''/, 'string.escape'],
			[/[^']+/, 'string'],
			[/'/, 'string', '@pop']
		],

		variable_block: [
			[/\s+/, ''],
			[/\w+(?:\.\w+)?/, 'variable'],
			[/\|/, 'delimiter.pipe', '@pop']
		]
	}
};
