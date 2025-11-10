// Utility Functions Module

class Utils {
    // Session management
    static setSession(user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('sessionToken', this.generateToken());
        sessionStorage.setItem('loginTime', new Date().toISOString());
    }

    static getSession() {
        const userStr = sessionStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    static clearSession() {
        sessionStorage.clear();
    }

    static isAuthenticated() {
        return sessionStorage.getItem('currentUser') !== null;
    }

    static requireAuth(requiredRole = null) {
        const user = this.getSession();
        if (!user) {
            window.location.href = 'index.html';
            return false;
        }
        if (requiredRole && user.role !== requiredRole) {
            alert('Access denied. Insufficient permissions.');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }

    // Token generation (simple implementation)
    static generateToken() {
        return 'token_' + Math.random().toString(36).substr(2) + Date.now().toString(36);
    }

    // CSRF token simulation
    static generateCSRFToken() {
        const token = 'csrf_' + Math.random().toString(36).substr(2);
        sessionStorage.setItem('csrfToken', token);
        return token;
    }

    static validateCSRFToken(token) {
        return token === sessionStorage.getItem('csrfToken');
    }

    // Input validation and sanitization
    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        return input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePassword(password) {
        // At least 6 characters
        return password.length >= 6;
    }

    static validateUsername(username) {
        // 3-20 characters, alphanumeric and underscore only
        const re = /^[a-zA-Z0-9_]{3,20}$/;
        return re.test(username);
    }

    // Date formatting
    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    static formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    static formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Election status helpers
    static getElectionStatus(election) {
        const now = new Date();
        const start = new Date(election.startDate);
        const end = new Date(election.endDate);

        if (election.status !== 'active') {
            return election.status;
        }

        if (now < start) {
            return 'upcoming';
        } else if (now > end) {
            return 'ended';
        } else {
            return 'active';
        }
    }

    static getStatusBadgeClass(status) {
        const statusMap = {
            'active': 'badge-success',
            'upcoming': 'badge-warning',
            'ended': 'badge-danger',
            'draft': 'badge-primary'
        };
        return statusMap[status] || 'badge-primary';
    }

    // UI helpers
    static showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.classList.add('show');
            setTimeout(() => {
                element.classList.remove('show');
            }, 5000);
        }
    }

    static showSuccess(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.classList.add('show');
            setTimeout(() => {
                element.classList.remove('show');
            }, 5000);
        }
    }

    static showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
        }
    }

    static hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
        }
    }

    static confirmAction(message) {
        return confirm(message);
    }

    // Audit logging helper
    static logAction(action, details = {}) {
        const user = this.getSession();
        if (user && window.dataManager) {
            window.dataManager.addAuditLog({
                userId: user.id,
                username: user.username,
                action: action,
                details: details
            });
        }
    }

    // Export data
    static exportToJSON(data, filename) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Calculate time remaining
    static getTimeRemaining(endDate) {
        const now = new Date();
        const end = new Date(endDate);
        const diff = end - now;

        if (diff <= 0) {
            return 'Ended';
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} remaining`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
        } else {
            return 'Less than 1 hour remaining';
        }
    }
}

// Make Utils available globally
window.Utils = Utils;