import { registerLanguage } from '../_.contribution';

registerLanguage({
	id: 'bcp',
	extensions: ['.bcp'],
	aliases: ['bcp (business express)', 'bcp'],
	loader: () => import('./bcp')
});
