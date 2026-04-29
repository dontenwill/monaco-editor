import { registerLanguage } from '../_.contribution';

registerLanguage({
	id: 'codeblock',
	extensions: ['.dwp'],
	aliases: ['codeblock (business express)', 'codeblock'],
	loader: () => import('./codeblock')
});
