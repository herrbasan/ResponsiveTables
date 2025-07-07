// Infuse table cells with data-label attributes for mobile-friendly display
function addDataLabelsToTableCells(table) {
  if (!table || !table.classList.contains('responsive-table')) return;
  table.classList.add('enhanced-table');
  const ths = Array.from(table.querySelectorAll('thead th'));
  const headers = ths.map(th => th.textContent);
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  rows.forEach(row => {
    const cells = Array.from(row.children);
    cells.forEach((cell, i) => {
      if (headers[i]) {
        cell.setAttribute('data-label', headers[i]);
      }
    });
  });
}

// Utility to apply data-labels to all tables in a container
function addDataLabelsToAllTables(containerSelector) {
  const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
  if (!container) return;
  const tables = container.querySelectorAll('table.responsive-table');
  tables.forEach(table => addDataLabelsToTableCells(table));
}

