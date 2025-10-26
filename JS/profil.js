document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll("#booksBody tr");
  const showMoreBtn = document.getElementById("showMoreBtn");
  let visibleCount = 5;

  // dastlab faqat 5 ta qatorni ko'rsatamiz
  rows.forEach((row, i) => {
    if (i >= visibleCount) row.style.display = "none";
  });

  showMoreBtn.addEventListener("click", () => {
    // Loading spinner qo'shamiz
    const originalText = showMoreBtn.innerHTML;
    showMoreBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yuklanmoqda...';
    showMoreBtn.disabled = true;
    
    // Simulyatsiya qilish uchun kichik kechikish
    setTimeout(() => {
      visibleCount += 5;
      rows.forEach((row, i) => {
        if (i < visibleCount) row.style.display = "table-row";
      });

      // Agar hammasi ochilgan bo'lsa tugmani yashiramiz
      if (visibleCount >= rows.length) {
        showMoreBtn.style.display = "none";
      } else {
        // Tugmani qayta faollashtirish
        showMoreBtn.innerHTML = originalText;
        showMoreBtn.disabled = false;
      }
    }, 800); // 800ms loading
  });
});
