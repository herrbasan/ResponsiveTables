// Convert all tables with class 'responsive-table' in a container to responsive grid divs
function convertTablesToGrids(containerSelector) {
  const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
  if (!container) return;
  const tables = container.querySelectorAll('table.responsive-table');
  tables.forEach(table => convertTableToGrid(table));
}

// Convert a single table with class 'responsive-table' to a responsive grid div
function convertTableToGrid(table) {
  if (!table || !table.classList.contains('responsive-table')) return;
  const grid = document.createElement('div');
  grid.className = 'responsive-grid';

  const ths = Array.from(table.querySelectorAll('thead th'));
  const headers = ths.map(th => th.textContent);

  const colWidths = ths.map(th => {
    const match = th.className && th.className.match(/col-(\d{1,3})/);
    if (match) return 'col-' + match[1];
    if (th.classList.contains('col-auto')) return 'col-auto';
    return '';
  });
  // Create header row if headers exist
  if (headers.length > 0) {
    const headerRow = document.createElement('div');
    headerRow.className = 'grid-header';
    headers.forEach((header, i) => {
      const headerCell = document.createElement('div');
      headerCell.className = 'grid-header-cell';
      if (colWidths[i]) {
        headerCell.classList.add(colWidths[i]);
      }
      headerCell.textContent = header;
      headerRow.appendChild(headerCell);
    });
    grid.appendChild(headerRow);
  }
  // Get rows
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  rows.forEach(row => {
    const cells = Array.from(row.children);
    const rowDiv = document.createElement('div');
    rowDiv.className = 'grid-row';
    cells.forEach((cell, i) => {
      const cellDiv = document.createElement('div');
      cellDiv.className = 'grid-cell';
      // Copy over all classes from the original cell (except col-XX, which is handled below)
      cell.classList.forEach(cls => {
        if (!/^col-\d{1,3}$/.test(cls) && cls !== 'col-auto') {
          cellDiv.classList.add(cls);
        }
      });
      // Add col-XX or col-auto class from header if present
      if (colWidths[i]) {
        cellDiv.classList.add(colWidths[i]);
      }
      // Copy all child nodes (including images, not just text)
      Array.from(cell.childNodes).forEach(node => {
        cellDiv.appendChild(node.cloneNode(true));
      });
      // For mobile: add data-label for CSS ::before only if headers exist
      if (headers[i]) {
        cellDiv.setAttribute('data-label', headers[i]);
      }
      rowDiv.appendChild(cellDiv);
    });
    grid.appendChild(rowDiv);
  });
  // Replace table with grid
  table.parentNode.replaceChild(grid, table);
}

// Convert all tables with class 'responsive-table' in a container to card grids
function convertTablesToCards(containerSelector) {
  const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
  if (!container) return;
  const tables = container.querySelectorAll('table.responsive-table');
  tables.forEach(table => convertTableToCards(table));
}

// Convert a table with class 'responsive-table' into a flex card grid
function convertTableToCards(table) {
  if (!table || !table.classList.contains('responsive-table')) return;
  const cardGrid = document.createElement('div');
  cardGrid.className = 'responsive-card-grid';

  // Get headers (if any)
  const ths = Array.from(table.querySelectorAll('thead th'));
  const headers = ths.map(th => th.textContent);

  // Get rows
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  rows.forEach(row => {
    const cells = Array.from(row.children);
    const card = document.createElement('div');
    card.className = 'card';
    cells.forEach((cell, i) => {
      const cardField = document.createElement('div');
      cardField.className = 'card-field';
      // Copy all classes from cell to cardField
      cell.classList.forEach(cls => cardField.classList.add(cls));
      // Add label if headers exist
      if (headers[i]) {
        const label = document.createElement('div');
        label.className = 'card-label';
        label.textContent = headers[i];
        cardField.appendChild(label);
      }
      // Copy all child nodes (including images, not just text)
      Array.from(cell.childNodes).forEach(node => {
        cardField.appendChild(node.cloneNode(true));
      });
      card.appendChild(cardField);
    });
    cardGrid.appendChild(card);
  });
  // Replace table with card grid
  table.parentNode.replaceChild(cardGrid, table);
}


