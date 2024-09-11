// 检查用户是否已登录
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('register-button').style.display = 'none';
        document.getElementById('logout-button').style.display = 'block';

        // 移除所有链接的 disabled 类
        const disabledLinks = document.querySelectorAll('.nav-links a.disabled');
        disabledLinks.forEach(link => {
            link.classList.remove('disabled');
            link.removeAttribute('onclick');
        });
    } else {
        document.getElementById('login-button').style.display = 'block';
        document.getElementById('register-button').style.display = 'block';
        document.getElementById('logout-button').style.display = 'none';

        // 重新添加 disabled 类
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.add('disabled');
            link.setAttribute('onclick', 'requireLogin(event)');
        });
    }
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (users[username] === password) {
        localStorage.setItem('isLoggedIn', 'true');
        checkLoginStatus();
        closeModal('login');
    } else {
        alert('登录失败，请检查用户名和密码。');
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    checkLoginStatus();
}

function requireLogin(event) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        event.preventDefault();
        showModal('login');
    }
}

// 处理模态框的函数
function showModal(id) {
    document.getElementById(id + 'Modal').style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id + 'Modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('navbar-placeholder')) {
        checkLoginStatus();
    }
});
