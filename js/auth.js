// Check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem('userToken');
    const currentPage = window.location.pathname;
    const publicPages = ['/login.html', '/signup.html', '/forgot-password.html', '/reset-password.html'];
    
    // If we're on index.html and there's no token, redirect to login
    if (currentPage.endsWith('index.html') && !token) {
        window.location.href = 'login.html';
        return false;
    }
    
    // For all other protected pages
    if (!publicPages.some(page => currentPage.endsWith(page)) && !token) {
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Update navigation based on auth status
function updateNavigation() {
    const token = localStorage.getItem('userToken');
    const userName = localStorage.getItem('userName');
    
    const authSection = document.getElementById('authSection');
    const userSection = document.getElementById('userSection');
    
    if (token && userName) {
        if (authSection) authSection.style.display = 'none';
        if (userSection) {
            userSection.style.display = 'block';
            const userNameSpan = document.getElementById('userName');
            if (userNameSpan) userNameSpan.textContent = userName;
        }
    } else {
        if (authSection) authSection.style.display = 'block';
        if (userSection) userSection.style.display = 'none';
    }
}

// Logout function
function handleLogout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    updateNavigation();
}); 