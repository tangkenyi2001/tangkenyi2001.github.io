// theme-toggle.js
const toggleBtn = document.getElementById("theme-toggle");
const menuBtn = document.getElementById("theme-toggle");
const htmlEl = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
  htmlEl.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
  htmlEl.classList.toggle("dark");
  const isDark = htmlEl.classList.contains("dark");
  console.log("After toggle - Has dark class?", isDark);
  localStorage.setItem(
    "theme",
    htmlEl.classList.contains("dark") ? "dark" : "light"
  );
});

// Mobile Menu Toggle Script
// Place this file in your js folder (e.g., js/mobile-menu.js)

document.addEventListener('DOMContentLoaded', function() {
    // Get the mobile menu button and menu elements
    const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Get the menu icons (hamburger and close)
    const menuOpenIcon = mobileMenuButton.querySelector('.block');
    const menuCloseIcon = mobileMenuButton.querySelector('.hidden');
    
    if (!mobileMenuButton || !mobileMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    // Initialize menu state
    let isMenuOpen = false;
    
    // Function to toggle menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Update aria-expanded attribute
        mobileMenuButton.setAttribute('aria-expanded', isMenuOpen.toString());
        
        // Toggle menu visibility
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('block');
        } else {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        }
        
        // Toggle icons if they exist
        if (menuOpenIcon && menuCloseIcon) {
            if (isMenuOpen) {
                menuOpenIcon.classList.remove('block');
                menuOpenIcon.classList.add('hidden');
                menuCloseIcon.classList.remove('hidden');
                menuCloseIcon.classList.add('block');
            } else {
                menuOpenIcon.classList.remove('hidden');
                menuOpenIcon.classList.add('block');
                menuCloseIcon.classList.remove('block');
                menuCloseIcon.classList.add('hidden');
            }
        }
    }
    
    // Function to close menu
    function closeMenu() {
        if (isMenuOpen) {
            toggleMenu();
        }
    }
    
    // Add click event listener to the button
    mobileMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
            mobileMenuButton.focus(); // Return focus to button
        }
    });
    
    // Close menu when window is resized to larger screen
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && isMenuOpen) { // Adjust breakpoint as needed
            closeMenu();
        }
    });
    
    // Handle focus trap for accessibility
    function trapFocus(e) {
        if (!isMenuOpen) return;
        
        const focusableElements = mobileMenu.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
    
    document.addEventListener('keydown', trapFocus);
    
    // Initialize menu as hidden
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
    }
});

// Export functions for external use if needed
window.MobileMenu = {
    init: function() {
        // Re-initialize if needed
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
    }
};