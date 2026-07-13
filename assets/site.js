(function () {
  function handleImgError(img, color) {
    const colors = {
      yellow: 'bg-yellow-600',
      amber: 'bg-amber-500',
      cyan: 'bg-cyan-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500'
    };

    const parent = img.parentNode;
    const placeholder = document.createElement('span');
    placeholder.className = `w-8 h-8 rounded-none ${colors[color] || 'bg-zinc-700'} border border-accent-pink/30 flex-shrink-0`;
    parent.replaceChild(placeholder, img);
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.remove('translate-y-10', 'opacity-0', 'pointer-events-none');
    window.setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0', 'pointer-events-none');
    }, 3000);
  }

  function updateClock() {
    const clockElement = document.getElementById('digital-clock');
    if (!clockElement) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  function setActiveNav() {
    const currentPage = document.body.dataset.page;
    if (!currentPage) return;

    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      const isActive = link.dataset.navLink === currentPage;
      link.className = isActive
        ? 'text-accent-pink border-b-2 border-accent-pink pb-1.5 px-2 transition-all duration-150 flex items-center gap-1.5 font-bold'
        : 'text-zinc-500 hover:text-accent-pink pb-1.5 px-2 transition-all duration-150 flex items-center gap-1.5 font-bold';
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function setupClock() {
    updateClock();
    window.setInterval(updateClock, 1000);
  }

  function setupLucide() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function setupCrtToggle() {
    const crtToggle = document.getElementById('crt-toggle');
    const scanlines = document.querySelector('.scanlines-hobby');
    if (!crtToggle || !scanlines) return;

    let crtEnabled = true;
    crtToggle.addEventListener('click', () => {
      crtEnabled = !crtEnabled;
      if (crtEnabled) {
        scanlines.style.display = 'block';
        crtToggle.innerHTML = '<i data-lucide="monitor" class="w-3.5 h-3.5 text-accent-pink"></i> CRT_MODE';
      } else {
        scanlines.style.display = 'none';
        crtToggle.innerHTML = '<i data-lucide="monitor-off" class="w-3.5 h-3.5 text-gray-500"></i> CRT_MODE';
      }
      setupLucide();
    });
  }

  function bootCommon() {
    setActiveNav();
    setupClock();
    setupLucide();
    setupCrtToggle();
  }

  window.CE = {
    handleImgError,
    showToast,
    updateClock,
    setActiveNav,
    setupCrtToggle,
    setupLucide,
    bootCommon
  };

  document.addEventListener('DOMContentLoaded', bootCommon);
})();
