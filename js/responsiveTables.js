// Utility config objects for grid and card layouts
const GRID_LAYOUT_CLASSES = {
  container: 'responsive-grid',
  headerRow: 'grid-header',
  headerCell: 'grid-header-cell',
  row: 'grid-row',
  cell: 'grid-cell',
  field: null,
  label: null
};

// Entry point utility functions for grid and card layouts
function tablesToGrid(containerSelector) {
  convertTablesToLayout(containerSelector, GRID_LAYOUT_CLASSES);
}

// Generalized function to convert a table to a custom layout using nested ul/li
function convertTableToCustomLayout(table, layout) {
  if (!table || !table.classList.contains('responsive-table')) return;
  const classes = typeof layout === 'function' ? layout() : layout;
  const containerUl = document.createElement('ul');
  containerUl.className = classes.container;

  const ths = Array.from(table.querySelectorAll('thead th'));
  const headers = ths.map(th => th.textContent);
  const colWidths = ths.map(th => {
    const match = th.className && th.className.match(/col-(\d{1,3})/);
    if (match) return 'col-' + match[1];
    if (th.classList.contains('col-auto')) return 'col-auto';
    return '';
  });

  // Header row (for grid only)
  if (classes.headerRow && headers.length > 0) {
    const headerRow = document.createElement('li');
    headerRow.className = classes.headerRow;
    const headerUl = document.createElement('ul');
    headers.forEach((header, i) => {
      const headerCellLi = document.createElement('li');
      headerCellLi.className = classes.headerCell;
      if (colWidths[i]) headerCellLi.classList.add(colWidths[i]);
      headerCellLi.textContent = header;
      headerUl.appendChild(headerCellLi);
    });
    headerRow.appendChild(headerUl);
    containerUl.appendChild(headerRow);
  }

  // Get rows
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  rows.forEach(row => {
    const cells = Array.from(row.children);
    const rowLi = document.createElement('li');
    rowLi.className = classes.row;
    const cellUl = document.createElement('ul');
    cells.forEach((cell, i) => {
      const cellLi = document.createElement('li');
      cellLi.className = classes.cell;
      // Copy all classes from the original cell except col-x/col-auto (handled below)
      cell.classList.forEach(cls => {
        if (!/^col-\d{1,3}$/.test(cls) && cls !== 'col-auto') {
          cellLi.classList.add(cls);
        }
      });
      // Add col-x or col-auto class from header if present (for grid)
      if (colWidths[i] && classes.headerRow) {
        cellLi.classList.add(colWidths[i]);
      }
      // For card layout, add label if headers exist
      if (classes.label && headers[i]) {
        cellLi.setAttribute('data-label', headers[i]);
      }
      // For grid layout, add data-label for mobile if headers exist
      if (classes.headerRow && headers[i]) {
        cellLi.setAttribute('data-label', headers[i]);
      }
      // Accessibility: add visually hidden label span
      if (headers[i]) {
        const srLabel = document.createElement('span');
        srLabel.className = 'sr-only';
        srLabel.textContent = headers[i] + ': ';
        cellLi.appendChild(srLabel);
      }
      // Copy all child nodes
      Array.from(cell.childNodes).forEach(node => {
        cellLi.appendChild(node.cloneNode(true));
      });
      cellUl.appendChild(cellLi);
    });
    rowLi.appendChild(cellUl);
    containerUl.appendChild(rowLi);
  });

  table.parentNode.replaceChild(containerUl, table);
}

// Generalized function to convert all tables in a container to a custom layout
function convertTablesToLayout(containerSelector, layoutClasses) {
  const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
  if (!container) return;
  const tables = container.querySelectorAll('table.responsive-table');
  tables.forEach(table => convertTableToCustomLayout(table, layoutClasses));
}

