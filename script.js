// Header path: subfolder pages load from site root (works for www.drivenbydata.pro and local :port)
function headerFetchPath() {
    if (window.location.pathname.includes('/writings/') || window.location.pathname.includes('/private/')) {
        return '/header.html';
    }
    return 'header.html';
}

// Header loading function
function loadHeader() {
    fetch(headerFetchPath())
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Configure header based on current page
            const currentPage = document.body.getAttribute('data-page');
            configureHeader(currentPage);
            
            // Re-initialize navigation functionality after header is loaded
            initializeNavigation();
        })
        .catch(error => console.error('Error loading header:', error));
}

// Configure header for specific pages
function configureHeader(currentPage) {
    const logoText = document.getElementById('logo-text');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (currentPage === 'index') {
        // For index page, links are anchor-based
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                // Keep as is for index page
                link.setAttribute('href', href);
            }
        });
    } else if (currentPage === 'story' || currentPage === 'resume' || currentPage === 'article' || currentPage === 'my-work') {
        // For subpages, hash links should go back to index.html with anchors.
        // Articles under /writings/ or /private/ need ../ for assets; root-level writing pages do not.
        const inArticleSubfolder = window.location.pathname.includes('/writings/') || window.location.pathname.includes('/private/');
        const prefix = currentPage === 'article' && inArticleSubfolder ? '/' : '';
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                link.setAttribute('href', prefix + 'index.html' + href);
            } else if (href === 'resume.html' && currentPage === 'article' && inArticleSubfolder) {
                link.setAttribute('href', '/resume.html');
            } else if (href === 'story.html' && currentPage === 'article' && inArticleSubfolder) {
                link.setAttribute('href', '/story.html');
            } else if (href === 'my-work.html' && currentPage === 'article' && inArticleSubfolder) {
                link.setAttribute('href', '/my-work.html');
            }
        });
    }
}

// Initialize navigation functionality (to be called after header loads)
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Add smooth scrolling for index page only
    const currentPage = document.body.getAttribute('data-page');
    if (currentPage === 'index') {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    if (href === '#writings') {
                        const writingsTabBtn = document.querySelector('.tab-button[data-tab="writings"]');
                        if (writingsTabBtn) {
                            writingsTabBtn.click();
                        }
                    }
                    smoothScroll(href);
                }
            });
        });
    }

    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        function updateNavbarBackground() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(26, 32, 44, 0.98)';
            } else {
                navbar.style.background = 'rgba(26, 32, 44, 0.95)';
            }
        }
        window.addEventListener('scroll', updateNavbarBackground);
    }
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
});

// Smooth scrolling function
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Tab functionality for Projects section
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function activateTabByName(name) {
        const btn = document.querySelector('.tab-button[data-tab="' + name + '"]');
        if (btn) {
            btn.click();
        }
    }

    function applyHashTab() {
        if (window.location.hash === '#writings') {
            activateTabByName('writings');
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding panel
            const targetPanel = document.getElementById(targetTab + '-tab');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    applyHashTab();
    window.addEventListener('hashchange', applyHashTab);
});

// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.vision-card, .project-card, .skill-category, .writing-card');
    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// Active navigation highlighting based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
});

// Add typing effect to hero title (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Use plain text with \n for line breaks
        const text = "Architecting Data.\nEngineering Resilience.";
        heroTitle.innerHTML = '';
        
        let index = 0;
        function typeWriter() {
            if (index <= text.length) {
                heroTitle.innerHTML = text.substring(0, index).replace(/\n/g, '<br>');
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after initial animation delay
        setTimeout(typeWriter, 1000);
    }
});

// Add parallax effect to hero background (subtle)
document.addEventListener('DOMContentLoaded', function() {
    const heroBackground = document.querySelector('.hero-background');
    
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${parallax}px)`;
        }
    }

    window.addEventListener('scroll', parallaxEffect);
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4FD1C5, #ED8936);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    function updateProgressBar() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateProgressBar);
});

// Add smooth reveal animations for sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
});

// Add hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click-to-copy functionality for email
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Show temporary feedback
                const originalText = this.textContent;
                this.textContent = 'Email copied!';
                this.style.color = '#4FD1C5';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            }).catch(() => {
                // Fallback: open email client
                window.location.href = this.href;
            });
        });
    }
});

// Add keyboard navigation support
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(e) {
        // Navigate with arrow keys
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const currentSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom > 100;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                let targetIndex;
                
                if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                    targetIndex = currentIndex + 1;
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    targetIndex = currentIndex - 1;
                }
                
                if (targetIndex !== undefined) {
                    smoothScroll('#' + sections[targetIndex].id);
                }
            }
        }
    });
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading overlay after page loads
    setTimeout(() => {
        document.body.style.overflow = 'visible';
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '1';
        }
    }, 100);
});

// Performance optimization: Throttle scroll events
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
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(function() {
    // Scroll event handlers here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

function downloadResumePDF() {
    const link = document.createElement('a');
    link.href = 'resume/Subu - Data Quality and Data Governance Leader One-Pager CV.pdf';
    link.download = 'Subu-Data-Quality-and-Data-Governance-Leader-One-Pager-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', function() {
    const openResumePdfBtn = document.getElementById('btn-open-resume-pdf');
    if (openResumePdfBtn) {
        openResumePdfBtn.addEventListener('click', function() {
            window.open('resume/Subu - Data Quality and Data Governance Leader One-Pager CV.pdf', '_blank');
        });
    }

    const readFullStoryBtn = document.getElementById('btn-read-full-story');
    if (readFullStoryBtn) {
        readFullStoryBtn.addEventListener('click', function() {
            window.location.href = 'story.html';
        });
    }

    document.querySelectorAll('.js-nav-index-contact').forEach(function(btn) {
        btn.addEventListener('click', function() {
            window.location.href = 'index.html#contact';
        });
    });

    const resumeDownloadPdf = document.getElementById('resume-download-pdf');
    if (resumeDownloadPdf) {
        resumeDownloadPdf.addEventListener('click', function() {
            downloadResumePDF();
        });
    }
});
