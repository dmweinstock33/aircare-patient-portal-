// Dean Rosecrans Patient Portal - Firebase Authentication

// ============================================
// FIREBASE CONFIGURATION
// Replace these values with your Firebase project config
// Get this from: Firebase Console > Project Settings > Your Apps > Web App
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyA8LLWi2IV2zMaQo6-A5dRxu_uutKrffAU",
    authDomain: "aircare-by-deanr-portal.firebaseapp.com",
    projectId: "aircare-by-deanr-portal",
    storageBucket: "aircare-by-deanr-portal.firebasestorage.app",
    messagingSenderId: "763605607768",
    appId: "1:763605607768:web:6ed7800369117431c7f12d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ============================================
// DOM Elements
// ============================================
const loginView = document.getElementById('loginView');
const registerView = document.getElementById('registerView');
const resetView = document.getElementById('resetView');
const portalView = document.getElementById('portalView');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');

// Forms
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const resetForm = document.getElementById('resetForm');

// Error/Success Messages
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');
const resetError = document.getElementById('resetError');
const resetSuccess = document.getElementById('resetSuccess');

// Navigation Links
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const showReset = document.getElementById('showReset');
const backToLogin = document.getElementById('backToLogin');

// ============================================
// View Switching
// ============================================
function showView(view) {
    loginView.style.display = 'none';
    registerView.style.display = 'none';
    resetView.style.display = 'none';
    portalView.style.display = 'none';
    logoutBtn.style.display = 'none';

    // Clear errors
    loginError.classList.remove('show');
    registerError.classList.remove('show');
    resetError.classList.remove('show');
    resetSuccess.classList.remove('show');

    if (view === 'login') {
        loginView.style.display = 'block';
    } else if (view === 'register') {
        registerView.style.display = 'block';
    } else if (view === 'reset') {
        resetView.style.display = 'block';
    } else if (view === 'portal') {
        portalView.style.display = 'block';
        logoutBtn.style.display = 'block';
    }
}

// Navigation event listeners
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    showView('register');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    showView('login');
});

showReset.addEventListener('click', (e) => {
    e.preventDefault();
    showView('reset');
});

backToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    showView('login');
});

// ============================================
// Error Handling
// ============================================
function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

function getErrorMessage(errorCode) {
    const errors = {
        'auth/email-already-in-use': 'This email is already registered. Please log in.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/user-disabled': 'This account has been disabled. Please contact support.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
        'auth/invalid-credential': 'Invalid email or password. Please try again.'
    };
    return errors[errorCode] || 'An error occurred. Please try again.';
}

// ============================================
// Authentication Functions
// ============================================

// Register
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    registerError.classList.remove('show');

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if (password !== confirmPassword) {
        showError(registerError, 'Passwords do not match.');
        return;
    }

    if (password.length < 6) {
        showError(registerError, 'Password must be at least 6 characters.');
        return;
    }

    try {
        registerForm.classList.add('loading');
        await auth.createUserWithEmailAndPassword(email, password);
        // Auth state listener will handle the redirect
    } catch (error) {
        showError(registerError, getErrorMessage(error.code));
        registerForm.classList.remove('loading');
    }
});

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.classList.remove('show');

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        loginForm.classList.add('loading');
        await auth.signInWithEmailAndPassword(email, password);
        // Auth state listener will handle the redirect
    } catch (error) {
        showError(loginError, getErrorMessage(error.code));
        loginForm.classList.remove('loading');
    }
});

// Password Reset
resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    resetError.classList.remove('show');
    resetSuccess.classList.remove('show');

    const email = document.getElementById('resetEmail').value;

    try {
        resetForm.classList.add('loading');
        await auth.sendPasswordResetEmail(email);
        resetSuccess.textContent = 'Password reset email sent! Check your inbox.';
        resetSuccess.classList.add('show');
        resetForm.classList.remove('loading');
    } catch (error) {
        showError(resetError, getErrorMessage(error.code));
        resetForm.classList.remove('loading');
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Logout error:', error);
    }
});

// ============================================
// Auth State Listener
// ============================================
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        const displayName = user.email.split('@')[0];
        userName.textContent = displayName;
        showView('portal');

        // Clear forms
        loginForm.reset();
        registerForm.reset();
        loginForm.classList.remove('loading');
        registerForm.classList.remove('loading');
    } else {
        // User is signed out
        showView('login');
    }
});
