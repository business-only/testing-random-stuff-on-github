// Simplified French-only website functionality



// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Form handling
function initResultsLink() {
    document.body.addEventListener('click', function(e) {
        // Handle results button clicks
        const target = e.target.closest('.results-btn-merged');
        
        if (target) {
            e.preventDefault();
            showToast('Redirection vers vos résultats...', 'success');
            
            // Replace with actual results retrieval logic
            setTimeout(() => {
                // Using location.href instead of window.open for better security
                window.location.href = 'https://www.servlab.tn/';
            }, 1500);
        }
    });
}

// Smooth scroll functionality
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileNav = document.getElementById('mobileNav');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    // Safer DOM manipulation instead of innerHTML
                    mobileMenuBtn.textContent = '';
                    const icon = document.createElement('i');
                    icon.className = 'fas fa-bars';
                    mobileMenuBtn.appendChild(icon);
                }
            }
        });
    });
}

// Clean URL from hosting provider parameters
function cleanURL() {
    if (window.location.search.includes('?i=1') || window.location.search.includes('&i=1')) {
        const cleanUrl = window.location.origin + window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
    }
}

// Set current year in footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Clean the URL first
    cleanURL();
    
    // Set current year in footer
    setCurrentYear();
    
    // Initialize results link
    initResultsLink();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add loading state to map
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.classList.add('loading');
        
        // Remove loading state once map is initialized
        setTimeout(() => {
            mapElement.classList.remove('loading');
        }, 1000);
    }
    
    // Initialize map
    if (typeof initMap === 'function') {
        initMap();
    }
});
