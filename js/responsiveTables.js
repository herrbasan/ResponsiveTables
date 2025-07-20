'use strict';

let g = {};
let ut = initUtilities();

g.TABLE_TO_ENHANCE = 'responsive-table-enhance';
g.TABLE_ENHANCED = 'enhanced-table';

function enhanceTable(table) {
	if (!table || !table.classList.contains(g.TABLE_TO_ENHANCE)) { ut.log('Table not found or already enhanced'); return; }
	table.classList.remove(g.TABLE_TO_ENHANCE);
	table.classList.add(g.TABLE_ENHANCED);
	const ths = Array.from(table.querySelectorAll('thead th'));
	const headers = ths.map(th => th.textContent);
	const rows = Array.from(table.querySelectorAll('tbody tr'));
	rows.forEach(row => {
		const cells = Array.from(row.children);
		cells.forEach((cell, i) => {
			if (headers[i]) {
				cell.header_label = headers[i];
				cell.setAttribute('data-label', headers[i]);
			}
		});
	});
}

// Utility to apply data-labels to all tables in a container
function enhanceAllTables(containerSelector) {
	const container = ut.el(containerSelector);
	if (!container) { ut.log('Container not found'); return; }
	const tables = ut.els('.' + g.TABLE_TO_ENHANCE, container);
	ut.log(`Enhancing ${tables.length} tables in container: ${containerSelector}`);
	tables.forEach(table => enhanceTable(table));
}

function initUtilities() {
	let utils = {};
	utils.el = function (s, context = document) { if (s instanceof Element) { return s; } else { return context.querySelector(s); } }
	utils.els = function (s, context = document) { return context.querySelectorAll(s); }
	utils.log = console.log.bind(console);
	return utils;
}

export { ut, enhanceTable, enhanceAllTables };