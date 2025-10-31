// Primary Care of Shelton - Enhanced JavaScript
// Beautiful interactions and accessibility features

(function() {
    'use strict';

    // DOM elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const skipLink = document.querySelector('.skip-link');
    const ctaButtons = document.querySelectorAll('.cta-button');

    // Initialize the application
    function init() {
        setupMobileMenu();
        setupNavigation();
        setupSkipLink();
        setupAccessibility();
        setupSmoothScrolling();
        setupAnimations();
        setupFormValidation();
        setupExternalLinks();
        setupScrollEffects();
        setupButtonEffects();
    }

    // Enhanced Mobile Menu
    function setupMobileMenu() {
        if (!mobileMenuToggle || !nav) return;

        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle nav visibility with animation
            nav.classList.toggle('active');
            
            // Add body scroll lock when menu is open
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
                // Focus first nav link
                const firstNavLink = nav.querySelector('.nav-link');
                if (firstNavLink) {
                    setTimeout(() => firstNavLink.focus(), 100);
                }
            } else {
                document.body.style.overflow = '';
                mobileMenuToggle.focus();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(closeMobileMenu, 100);
            });
        });
    }

    function closeMobileMenu() {
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            mobileMenuToggle.focus();
        }
    }

    // Enhanced Navigation - Scroll-based with active link highlighting
    function setupNavigation() {
        // Smooth scroll to sections (only for hash links on current page)
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                const href = this.getAttribute('href');
                
                // Only prevent default for hash links that exist on this page
                if (href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        event.preventDefault();
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                // For external links or links to other pages, allow default behavior
            });
        });

        // Update active nav link on scroll (only on pages with sections)
        if (pageSections && pageSections.length > 0) {
            let ticking = false;
            
            function updateActiveNavLink() {
                const scrollPosition = window.pageYOffset + 100;
                
                pageSections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        const sectionId = section.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            const linkHref = link.getAttribute('href');
                            if (linkHref === '#' + sectionId) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
                
                ticking = false;
            }
            
            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(updateActiveNavLink);
                    ticking = true;
                }
            }
            
            window.addEventListener('scroll', requestTick);
            
            // Set initial active state
            updateActiveNavLink();
        }
    }

    // Skip link functionality
    function setupSkipLink() {
        if (skipLink) {
            skipLink.addEventListener('click', function(event) {
                event.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.focus();
                    mainContent.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Enhanced Accessibility
    function setupAccessibility() {
        // Add ARIA labels to interactive elements
        ctaButtons.forEach(button => {
            if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
                button.setAttribute('aria-label', 'Action button');
            }
        });

        // Ensure all images have alt text
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.getAttribute('alt')) {
                img.setAttribute('alt', '');
            }
        });

        // Add role attributes where needed
        const cards = document.querySelectorAll('.feature-card, .service-card, .team-member, .contact-card');
        cards.forEach(card => {
            if (!card.getAttribute('role')) {
                card.setAttribute('role', 'article');
            }
        });

        // Enhanced focus management
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                handleTabNavigation(event);
            }
        });

        // Add focus visible class for better focus indicators
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    function handleTabNavigation(event) {
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }

    // Smooth scrolling for anchor links
    function setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update focus for accessibility
                    target.focus();
                }
            });
        });
    }

    // Enhanced Animations
    function setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.feature-card, .service-card, .team-member, .philosophy-point');
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .feature-card, .service-card, .team-member, .philosophy-point {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .feature-card.animate-in, .service-card.animate-in, 
            .team-member.animate-in, .philosophy-point.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .keyboard-navigation *:focus {
                outline: 2px solid var(--color-border-focus) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Button Effects
    function setupButtonEffects() {
        ctaButtons.forEach(button => {
            // Add ripple effect
            button.addEventListener('click', function(event) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = event.clientX - rect.left - size / 2;
                const y = event.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .cta-button {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    // Scroll Effects
    function setupScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header');
            
            if (scrolled > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
        
        // Add scroll CSS
        const scrollStyle = document.createElement('style');
        scrollStyle.textContent = `
            .header {
                transition: all 0.3s ease;
            }
            
            .header.scrolled {
                background: rgba(255, 252, 252, 0.95);
                backdrop-filter: blur(20px);
                box-shadow: 0 4px 20px rgba(29, 47, 111, 0.1);
            }
        `;
        document.head.appendChild(scrollStyle);
    }

    // Form validation (if forms are added later)
    function setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(event) {
                if (!validateForm(this)) {
                    event.preventDefault();
                }
            });
        });
    }

    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showFieldError(field, 'This field is required');
            } else {
                clearFieldError(field);
            }
        });

        // Email validation
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !isValidEmail(field.value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('error');
    }

    function clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.removeAttribute('aria-invalid');
        field.classList.remove('error');
    }

    // External link handling
    function setupExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            // Ensure external links open in new tab
            if (!link.getAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
            
            // Add visual indicator for external links
            if (!link.querySelector('.external-link-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-link-icon';
                icon.setAttribute('aria-label', 'Opens in new tab');
                icon.textContent = '↗';
                link.appendChild(icon);
            }
        });
    }

    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Handle window resize
    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    }

    window.addEventListener('resize', debounce(handleResize, 250));

    // Handle scroll events
    function handleScroll() {
        // Additional scroll-based functionality can be added here
    }

    window.addEventListener('scroll', throttle(handleScroll, 100));

    // Error handling
    window.addEventListener('error', function(event) {
        console.error('JavaScript error:', event.error);
        // Could send error reports to analytics service
    });

    // Performance monitoring
    function measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }, 0);
            });
        }
    }

    measurePerformance();

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose utility functions globally if needed
    window.MedicalPractice = {
        closeMobileMenu: closeMobileMenu,
        validateForm: validateForm,
        debounce: debounce,
        throttle: throttle
    };

})();