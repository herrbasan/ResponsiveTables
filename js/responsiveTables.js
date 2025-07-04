// Convert all tables with class 'responsive-table' in a container to responsive grid divs with a single header row
function convertTablesToGrids(containerSelector) {
  const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
  if (!container) return;
  const tables = container.querySelectorAll('table.responsive-table');
  tables.forEach(table => {
    const grid = document.createElement('div');
    grid.className = 'responsive-grid';
    // Get headers and th classes/widths
    const ths = Array.from(table.querySelectorAll('thead th'));
    const headers = ths.map(th => th.textContent);
    // Get width from class (col-XX) or style/width attribute
    const colWidths = ths.map(th => {
      // Check for col-XX class
      const match = th.className && th.className.match(/col-(\d{1,3})/);
      if (match) return match[1] + '%';
      // Check for width attribute
      if (th.hasAttribute('width')) return th.getAttribute('width');
      // Check for style width
      if (th.style && th.style.width) return th.style.width;
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
          headerCell.setAttribute('data-col-width', colWidths[i]);
          headerCell.style.width = colWidths[i];
          headerCell.style.flex = `0 0 ${colWidths[i]}`;
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
        // Also copy col-XX and col-auto classes for width utility
        cell.classList.forEach(cls => {
          if (/^col-\d{1,3}$/.test(cls) || cls === 'col-auto') {
            cellDiv.classList.add(cls);
          }
        });
        if (colWidths[i]) {
          cellDiv.setAttribute('data-col-width', colWidths[i]);
          cellDiv.style.width = colWidths[i];
          cellDiv.style.flex = `0 0 ${colWidths[i]}`;
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
  });
}
