'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Force dark mode permanently
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    
    // Remove any stored light theme preference
    localStorage.setItem('theme', 'dark');
});
