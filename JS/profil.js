document.addEventListener('DOMContentLoaded', () => {
  // ------------------ Toast function ------------------
  function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      background: rgba(0,0,0,0.8); color: #fff; padding: 10px 20px;
      border-radius: 8px; font-size: 14px; z-index: 10001;
      opacity: 0; transition: opacity 0.3s ease;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
  }

  // ------------------ UI ELEMENTS ------------------
  const authBtn = document.getElementById('logoutBtn'); // login / logout
  const userNameEl = document.querySelector('.user_name span');
  const userEmailEl = document.querySelector('.user_email span');
  const userPhoneEl = document.querySelector('.user_phone span');

  // ------------------ CHECK LOCAL STORAGE ------------------
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    userNameEl.textContent = storedUser.username;
    userEmailEl.textContent = storedUser.email;
    userPhoneEl.textContent = storedUser.phone;
    authBtn.textContent = 'Log Out';
  } else {
    authBtn.textContent = 'Log In';
  }

  // ------------------ CREATE MODAL FUNCTION ------------------
  function createModal(id, titleText, contentHTML, footerHTML = '') {
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal';
    modal.style.cssText = `
      display:none; position:fixed; top:0; left:0;
      width:100%; height:100%; background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px); z-index:10000;
    `;
    const box = document.createElement('div');
    box.style.cssText = `
      background: var(--navbar-bg); width: 90%; max-width: 400px;
      margin: 5% auto; border-radius: 15px; overflow:hidden;
    `;
    const header = document.createElement('div');
    header.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:15px; background:var(--bg-color1);';
    const title = document.createElement('h2');
    title.textContent = titleText;
    title.style.cssText = 'margin:0; color: var(--text-color); font-size:18px;';
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'close';
    closeBtn.style.cssText = 'cursor:pointer; font-size:22px; color:var(--text-color);';
    header.append(title, closeBtn);

    const body = document.createElement('div');
    body.style.cssText = 'padding:20px;';
    body.innerHTML = contentHTML;

    const footer = document.createElement('div');
    footer.style.cssText = 'display:flex; justify-content:flex-end; gap:10px; padding:15px; background: var(--bg-color1);';
    footer.innerHTML = footerHTML;

    box.append(header, body, footer);
    modal.appendChild(box);
    document.body.appendChild(modal);
    return modal;
  }

  // ------------------ AUTH MODAL ------------------
  const authModal = createModal(
    'authModal',
    'Authentication',
    `<div style="display:flex; gap:10px; margin-bottom:15px;">
      <button id="loginTab" style="flex:1; padding:10px; cursor:pointer;">Login</button>
      <button id="registerTab" style="flex:1; padding:10px; cursor:pointer;">Register</button>
    </div>
    <div id="authContent">
      <form id="loginForm">
        <div style="margin-bottom:10px;"><label>Username:</label><input type="text" id="loginUsername" style="width:100%; padding:8px;"></div>
        <div style="margin-bottom:10px;"><label>Email:</label><input type="email" id="loginEmail" style="width:100%; padding:8px;"></div>
        <div style="margin-bottom:10px;"><label>Phone:</label><input type="tel" id="loginPhone" style="width:100%; padding:8px;"></div>
      </form>
    </div>`,
    `<button class="btn-cancel">Cancel</button><button class="btn-auth">Log In</button>`
  );

  let authContent = document.getElementById('authContent');
  const authBtnFooter = authModal.querySelector('.btn-auth');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');

  // ----- LOGIN / REGISTER SWITCH -----
  function showLogin() {
    authContent.innerHTML = `
      <form id="loginForm">
        <div style="margin-bottom:10px;"><label>Username:</label><input type="text" id="loginUsername" style="width:100%; padding:8px;"></div>
        <div style="margin-bottom:10px;"><label>Email:</label><input type="email" id="loginEmail" style="width:100%; padding:8px;"></div>
        <div style="margin-bottom:10px;"><label>Phone:</label><input type="tel" id="loginPhone" style="width:100%; padding:8px;"></div>
      </form>
    `;
    authBtnFooter.textContent = 'Log In';
  }

  function showRegister() {
    authContent.innerHTML = `
      <form id="registerForm">
        <div style="margin-bottom:10px;"><label>Username:</label><input type="text" id="regUsername" style="width:100%; padding:8px;"></div>
        <div style="margin-bottom:10px;"><label>Email:</label><input type="email" id="regEmail" style="width:100%; padding:8px;"></div>
        <div style="margin-bottom:10px;"><label>Phone:</label><input type="tel" id="regPhone" style="width:100%; padding:8px;"></div>
        <div style="margin-bottom:10px;"><label>Password:</label><input type="password" id="regPassword" style="width:100%; padding:8px;"></div>
      </form>
    `;
    authBtnFooter.textContent = 'Register';
  }

  loginTab.addEventListener('click', showLogin);
  registerTab.addEventListener('click', showRegister);

  // ----- OPEN AUTH MODAL -----
  authBtn.addEventListener('click', () => {
    if(authBtn.textContent === 'Log In') {
      authModal.style.display = 'block';
      showLogin();
    } else {
      logoutModal.style.display = 'block';
    }
  });

  // ----- EDIT PROFILE MODAL -----
  const editProfileModal = createModal(
    'editProfileModal',
    'Edit Profile',
    `<form id="editForm">
      <div style="margin-bottom:10px;"><label>Username:</label><input type="text" id="editUsername" style="width:100%; padding:8px;"></div>
      <div style="margin-bottom:10px;"><label>Email:</label><input type="email" id="editEmail" style="width:100%; padding:8px;"></div>
      <div style="margin-bottom:10px;"><label>Phone:</label><input type="tel" id="editPhone" style="width:100%; padding:8px;"></div>
    </form>`,
    `<button class="btn-cancel">Cancel</button><button class="btn-auth" id="saveProfileBtn">Save</button>`
  );

  const editBtn = document.getElementById('editProfilBtn');
  editBtn.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      document.getElementById('editUsername').value = user.username;
      document.getElementById('editEmail').value = user.email;
      document.getElementById('editPhone').value = user.phone;
    }
    editProfileModal.style.display = 'block';
  });

  document.getElementById('saveProfileBtn').addEventListener('click', () => {
    const username = document.getElementById('editUsername').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const phone = document.getElementById('editPhone').value.trim();
    if(!username || !email || !phone){ showToast('Iltimos barcha maydonlarni to‘ldiring!'); return; }
    localStorage.setItem('user', JSON.stringify({username,email,phone}));
    userNameEl.textContent = username;
    userEmailEl.textContent = email;
    userPhoneEl.textContent = phone;
    editProfileModal.style.display = 'none';
    showToast('Profile saqlandi!');
  });

  // ----- LANGUAGE MODAL -----
  const languageModal = createModal(
    'languageModal',
    'Select Language',
    `<div style="display:flex; flex-direction:column; gap:10px;">
      <button class="lang-btn" data-lang="uz">Uzbek</button>
      <button class="lang-btn" data-lang="en">English</button>
      <button class="lang-btn" data-lang="ru">Russian</button>
    </div>`,
    `<button class="btn-cancel">Cancel</button>`
  );

  const langBtns = languageModal.querySelectorAll('.lang-btn');
  langBtns.forEach(btn=>{
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('lang', lang);
      languageModal.style.display = 'none';
      showToast('Language changed to: ' + lang);
    });
  });

  document.getElementById('languageBtn').addEventListener('click', ()=> languageModal.style.display='block');

  // ----- LOGOUT MODAL -----
  const logoutModal = createModal(
    'logoutModal',
    'Log Out',
    `<p>Siz rostdan ham chiqmoqchimisiz?</p>`,
    `<button class="btn-cancel">Cancel</button><button class="btn-auth" id="confirmLogoutBtn">Log Out</button>`
  );

  document.getElementById('confirmLogoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    authBtn.textContent = 'Log In';
    userNameEl.textContent = 'John Carter';
    userEmailEl.textContent = 'johncarter@gmail.com';
    userPhoneEl.textContent = '+998 90 123 45 67';
    logoutModal.style.display='none';
    showToast('Siz tizimdan chiqdingiz!');
  });

  // ----- CLOSE MODALS -----
  document.addEventListener('click', e => {
    if(e.target.classList.contains('close') || e.target.classList.contains('btn-cancel')){
      const modals = document.querySelectorAll('.modal');
      modals.forEach(m => { if(m.style.display==='block') m.style.display='none'; });
    }
  });
  window.addEventListener('click', e => {
    if(e.target.classList.contains('modal')) e.target.style.display='none';
  });

  // ----- AUTH SUBMIT -----
  authBtnFooter.addEventListener('click', () => {
    if(authBtnFooter.textContent === 'Log In'){
      const username = document.getElementById('loginUsername').value.trim();
      const email = document.getElementById('loginEmail').value.trim();
      const phone = document.getElementById('loginPhone').value.trim();
      if(!username || !email || !phone){ showToast('Iltimos barcha maydonlarni to‘ldiring!'); return; }
      localStorage.setItem('user', JSON.stringify({username,email,phone}));
      userNameEl.textContent = username;
      userEmailEl.textContent = email;
      userPhoneEl.textContent = phone;
      authBtn.textContent = 'Log Out';
      showToast('Tizimga kirdingiz!');
    } else {
      const username = document.getElementById('regUsername').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const pass = document.getElementById('regPassword').value.trim();
      if(!username || !email || !phone || !pass){ showToast('Iltimos barcha maydonlarni to‘ldiring!'); return; }
      localStorage.setItem('user', JSON.stringify({username,email,phone}));
      userNameEl.textContent = username;
      userEmailEl.textContent = email;
      userPhoneEl.textContent = phone;
      authBtn.textContent = 'Log Out';
      showToast('Ro‘yxatdan muvaffaqiyatli o‘tdingiz!');
    }
    authModal.style.display='none';
  });

});
show