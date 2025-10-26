// === Tema almashtirish ===
const toggleBtn = document.getElementById('toggle-btn');
const body = document.body;
let rotation = 0;

// Oldingi holatni tiklash
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.classList.replace('fa-sun', 'fa-moon');
}

// Tugma bosilganda tema o‘zgaradi
toggleBtn.addEventListener('click', () => {
  rotation += 360;
  toggleBtn.style.transform = `rotate(${rotation}deg)`;
  toggleBtn.style.transition = 'transform 0.6s ease';
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
  } else {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
  }
});

// === Loader animatsiyasi ===
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 1500);
    }, 500); // 2.5 soniya davomida loader ko‘rinadi
  }
});

// === Sahifa o‘tish effekti ===
function pageTransition(targetUrl) {
  document.body.classList.add('page-exit');
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 1000);
}
