// Theme toggling logic for Responsive Tables
(function() {
  const root = document.documentElement;
  function setTheme(mode) {
    if (mode === 'dark') {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else if (mode === 'light') {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    }
  }
  function getPreferredTheme() {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  window.toggleTheme = function() {
    const current = getPreferredTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  };
  // Set theme on page load
  setTheme(getPreferredTheme());
})();
