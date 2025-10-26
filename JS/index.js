// === Tema almashtirish (Dark / Light) ===
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

// === Swiper sozlamalari ===
const swiper = new Swiper('.mySwiper', {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  breakpoints: {
    768: { slidesPerView: 5 },
    600: { slidesPerView: 4 },
    550: { slidesPerView: 3 },
    1: { slidesPerView: 2 },
  },
});

// // === Yuklanish animatsiyasi (Loader) ===
// window.addEventListener('load', () => {
//   const loader = document.getElementById('loading-screen');
//   if (loader) {
//     loader.classList.add('hidden');
//     setTimeout(() => loader.remove(), 5000);
//   }
// });

// === “Get Start” tugmasi bosilganda silliq sahifa o‘tish ===
const getStartBtn = document.getElementById('getStartBtn');
if (getStartBtn) {
  getStartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(() => {
      window.location.href = './Pages/books.html';
    }, 500);
  });
}
