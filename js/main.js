'use strict';

import { ut, enhanceAllTables } from './responsiveTables.js';

let g = {};

checkSetTheme('#theme-toggle-button');
function checkSetTheme(toggle_element) {
	const root = document.documentElement;
	const setTheme = mode => {
		const action = mode === 'dark' ? 'setAttribute' : mode === 'light' ? 'setAttribute' : 'removeAttribute';
		root[action]('data-theme', mode === 'dark' ? 'dark' : 'light');
		mode ? localStorage.setItem('theme', mode) : localStorage.removeItem('theme');
	};
	const getPreferredTheme = () => localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	window.toggleTheme = () => setTheme(getPreferredTheme() === 'dark' ? 'light' : 'dark');
	setTheme(getPreferredTheme());
	if(ut.el(toggle_element)) {
		ut.el(toggle_element).addEventListener('click', window.toggleTheme);
	}
}


document.addEventListener('DOMContentLoaded', function () {
	enhanceAllTables('main section');
});
