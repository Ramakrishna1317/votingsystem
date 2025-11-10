// Main Authentication and Routing Script

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        initLoginPage();
    }
});

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Validate inputs
        if (!username || !password) {
            Utils.showError('errorMessage', 'Please enter both username and password');
            return;
        }

        // Authenticate user
        const user = window.dataManager.getUserByUsername(username);
        
        if (!user) {
            Utils.showError('errorMessage', 'Invalid username or password');
            Utils.logAction('LOGIN_FAILED', { username, reason: 'User not found' });
            return;
        }

        // Check password (in production, this would compare hashed passwords)
        if (user.password !== password) {
            Utils.showError('errorMessage', 'Invalid username or password');
            Utils.logAction('LOGIN_FAILED', { username, reason: 'Invalid password' });
            return;
        }

        // Check role
        if (user.role !== role) {
            Utils.showError('errorMessage', `This account is not registered as ${role}`);
            Utils.logAction('LOGIN_FAILED', { username, reason: 'Role mismatch' });
            return;
        }

        // Successful login
        Utils.setSession(user);
        Utils.logAction('LOGIN_SUCCESS', { username, role });

        // Redirect based on role
        if (user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'voter.html';
        }
    });

    // Clear any existing session on login page
    Utils.clearSession();
}

// Logout function (used across pages)
function logout() {
    const user = Utils.getSession();
    if (user) {
        Utils.logAction('LOGOUT', { username: user.username });
    }
    Utils.clearSession();
    window.location.href = 'index.html';
}

// Make logout available globally
window.logout = logout;