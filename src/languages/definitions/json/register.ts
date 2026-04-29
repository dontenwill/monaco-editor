import { registerLanguage } from '../_.contribution';

registerLanguage({
	id: 'json',
	extensions: ['.json', '.jsonc'],
	aliases: ['JSON', 'json'],
	mimetypes: ['application/json'],
	loader: () => import('./json')
});
