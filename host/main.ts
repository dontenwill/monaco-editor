import * as monaco from 'monaco-editor-core';

declare global {
	interface Window {
		MonacoEnvironment?: monaco.Environment;
		chrome?: {
			webview?: {
				addEventListener(type: 'message', listener: (event: { data: unknown }) => void): void;
			};
		};
	}
}

window.MonacoEnvironment = {
	getWorkerUrl: () => ''
};

const params = new URLSearchParams(window.location.search);

const theme: 'vs-dark' | 'vs-light' | 'hc-black' | 'hc-light' = (() => {
	const t = params.get('theme');
	if (t === 'vs-dark' || t === 'vs-light' || t === 'hc-black' || t === 'hc-light') return t;
	return 'vs-light';
})();

const minimap = params.get('minimap') === 'true';

const container = document.getElementById('container');
if (!container) throw new Error('container element missing');

const editor = monaco.editor.create(container, {
	value: '',
	language: 'plaintext',
	readOnly: true,
	theme,
	automaticLayout: true,
	minimap: { enabled: minimap },
	scrollBeyondLastLine: false,
	fontSize: 13,
	fontFamily: 'Consolas, "Courier New", monospace'
});

editor.addCommand(monaco.KeyCode.F1, () => {});
editor.addCommand(
	monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP,
	() => editor.trigger('', 'editor.action.quickCommand', null)
);

interface BeMessage {
	code?: string;
	language?: string;
}

window.chrome?.webview?.addEventListener('message', (event) => {
	const data = event.data;
	let msg: BeMessage;
	if (typeof data === 'string') {
		try {
			msg = JSON.parse(data);
		} catch {
			return;
		}
	} else if (data !== null && typeof data === 'object') {
		msg = data as BeMessage;
	} else {
		return;
	}
	if (msg.code === undefined) return;
	const model = editor.getModel();
	if (!model) return;
	monaco.editor.setModelLanguage(model, msg.language ?? 'plaintext');
	editor.setValue(msg.code);
	editor.setScrollPosition({ scrollTop: 0 });
});
