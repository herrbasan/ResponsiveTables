// Convert all tables with class 'responsive-table' in a container to responsive grid divs with a single header row
function convertTablesToGrids(containerSelector) {
  const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
  if (!container) return;
  const tables = container.querySelectorAll('table.responsive-table');
  tables.forEach(table => {
    const grid = document.createElement('div');
    grid.className = 'responsive-grid';
    // Get headers and th classes
    const ths = Array.from(table.querySelectorAll('thead th'));
    const headers = ths.map(th => th.textContent);
    const colClasses = ths.map(th => th.className || '');
    // Create header row if headers exist
    if (headers.length > 0) {
      const headerRow = document.createElement('div');
      headerRow.className = 'grid-header';
      headers.forEach((header, i) => {
        const headerCell = document.createElement('div');
        headerCell.className = 'grid-header-cell';
        if (colClasses[i]) headerCell.classList.add(...colClasses[i].split(/\s+/));
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
        if (colClasses[i]) cellDiv.classList.add(...colClasses[i].split(/\s+/));
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
  });
}
