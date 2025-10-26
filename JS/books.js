// Theme toggle
const toggleBtn = document.getElementById('toggle-btn');
const body = document.body;
let rotation = 0;

// Restore theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.classList.replace('fa-sun', 'fa-moon');
}

// Toggle theme
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

// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 1500);
    }, 500);
  }
});

// Book search
const searchInput = document.getElementById('book-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    document.querySelectorAll('.book-card').forEach(card => {
      const text = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = text.includes(filter) ? 'block' : 'none';
    });
  });
}

// Book rendering
document.addEventListener('DOMContentLoaded', () => {
  const booksGrid = document.getElementById('books-grid');
  if (!booksGrid) return;

  function renderBooks(books) {
    booksGrid.innerHTML = ''; // eski kartalarni tozalash
    books.forEach(book => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <div class="card_title">
          <h4>${book.title.length > 20 ? book.title.slice(0, 20) + '…' : book.title}</h4>
          <p>${book.author.length > 15 ? book.author.slice(0, 15) + '…' : book.author}</p>
          <button><a href="./book_info.html">Read now</a></button>


        </div>
        <i class="fa-solid fa-heart fa-hearts"></i>
      `;
      booksGrid.appendChild(card);
    });
  }

  fetch('../books.json')
    .then(response => response.json())
    .then(books => renderBooks(books))
    .catch(error => console.error('Error loading books:', error));
});
