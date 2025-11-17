// Initialize Lucide icons
if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
} else {
    console.warn('Lucide non è caricato correttamente.');
}

// Navigation functionality
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// Smooth scrolling and active link highlighting
function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// About section image slider
class ImageSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        console.log(`Slides found: ${this.slides.length}, Indicators found: ${this.indicators.length}`);
        
        this.init();
    }

    init() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.startAutoSlide();
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.remove('active');
        }
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }
        
        this.resetAutoSlide();
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    previousSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 10000);
    }

    resetAutoSlide() {
        clearInterval(this.slideInterval);
        this.startAutoSlide();
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
    new ProjectCardManager();
    
    setTimeout(() => {
        const sliderNavIcons = document.querySelectorAll('.slider-nav i, .slider-nav svg');
        sliderNavIcons.forEach(icon => {
            icon.style.color = '#667eea';
            icon.style.stroke = '#667eea';
        });
    }, 100);
    
    // Force refresh Lucide icons for FAQ
    setTimeout(() => {
        lucide.createIcons();
    }, 200);
});

// Projects expand/collapse functionality
class ProjectCardManager {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            const toggleBtn = card.querySelector('.card-toggle-btn');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!this.isAnimating) {
                        this.toggleCard(card);
                    }
                });
            }
        });
    }

    toggleCard(card) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const isExpanded = card.classList.contains('expanded');
        
        const currentScrollPosition = window.pageYOffset;
        
        if (isExpanded) {
            this.closeCard(card);
        } else {
            this.expandCard(card);
        }
        
        setTimeout(() => {
            window.scrollTo(0, currentScrollPosition);
            this.isAnimating = false;
        }, 100);
    }

    expandCard(card) {
        card.classList.add('expanded');
        const toggleBtn = card.querySelector('.card-toggle-btn');
        const btnText = toggleBtn.querySelector('.btn-text');
        
        if (btnText) btnText.textContent = 'Close';
        
        const existingIcon = toggleBtn.querySelector('.btn-icon');
        if (existingIcon) {
            existingIcon.remove();
        }
        
        const closeIcon = document.createElement('i');
        closeIcon.setAttribute('data-lucide', 'x');
        closeIcon.className = 'btn-icon';
        toggleBtn.appendChild(closeIcon);
        
        lucide.createIcons();
    }

    closeCard(card) {
        card.classList.remove('expanded');
        const toggleBtn = card.querySelector('.card-toggle-btn');
        const btnText = toggleBtn.querySelector('.btn-text');
        const btnIcon = toggleBtn.querySelector('.btn-icon');
        
        if (btnText) btnText.textContent = 'Explore';
        if (btnIcon) {
            btnIcon.remove();
        }
        
        lucide.createIcons();
    }
}

// Projects hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('expanded')) {
            // Animation handled by CSS
        }
    });

    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('expanded')) {
            // Animation handled by CSS  
        }
    });
});

// FAQ functionality
class FAQ {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleFAQ(item));
        });
        
        // Force refresh icons after initialization
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }

    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
        
        // Refresh icons after toggle
        setTimeout(() => {
            lucide.createIcons();
        }, 50);
    }
}

// Initialize FAQ
document.addEventListener('DOMContentLoaded', () => {
    new FAQ();
});

// Smooth reveal animations for elements
const revealElements = document.querySelectorAll('.hero-text, .about-text, .project-card, .competence-category, .contact-item, .faq-item');

const revealObserver = new IntersectionObserver((entries) => {
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

revealElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.8s ease, transform 0.8s ease`;
    revealObserver.observe(element);
});

// About description paragraphs animation
const aboutParagraphs = document.querySelectorAll('.about-description p:not(:first-child)');

const paragraphObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

aboutParagraphs.forEach((paragraph, index) => {
    paragraph.style.transitionDelay = `${index * 0.2}s`;
    paragraphObserver.observe(paragraph);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    });
    
    const mobileNavLinks = navMenu.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        });
    });
    
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    });
}

// Profile image flip animation
const profileImg = document.querySelector('.profile-img');
const magicWandBtn = document.querySelector('.info-btn');
let isFlipped = false;

if (profileImg && magicWandBtn) {
    magicWandBtn.addEventListener('click', () => {
        if (!isFlipped) {
            profileImg.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                profileImg.src = 'images/photo_profilo_con_camicia_crop.png';
                isFlipped = true;
            }, 400);
        } else {
            profileImg.style.transform = 'rotateY(0deg)';
            setTimeout(() => {
                profileImg.src = 'images/photo_profilo_nexi_crop.jpg';
                isFlipped = false;
            }, 400);
        }
    });
}

// Project Timeline Animation
class ProjectTimeline {
    constructor() {
        this.timeline = document.querySelector('.timeline');
        this.timelineContainer = document.querySelector('.project-timeline-container');
        this.points = document.querySelectorAll('.timeline-point');
        this.progress = document.querySelector('.timeline-progress');
        this.currentStep = 1;
        this.maxSteps = this.points.length;
        this.isScrolling = false;
        this.isTimelineActive = false;
        
        if (this.timeline && this.timelineContainer) {
            this.init();
        }
    }

    init() {
        this.updateTimeline();
        
        const projectCard = this.timelineContainer.closest('.project-card');
        if (projectCard) {
            projectCard.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        }
    }

    isTimelineVisible() {
        const rect = this.timelineContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const timelineHeight = rect.height;
        const visibilityPercentage = visibleHeight / timelineHeight;
        
        return visibilityPercentage >= 0.6;
    }

    handleWheel(e) {
        const projectCard = this.timelineContainer.closest('.project-card');
        if (!projectCard || !projectCard.classList.contains('expanded')) {
            return;
        }

        const rect = this.timelineContainer.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        if (mouseX >= rect.left && mouseX <= rect.right && 
            mouseY >= rect.top && mouseY <= rect.bottom) {
            
            if (!this.isTimelineVisible()) {
                this.isTimelineActive = false;
                return;
            }
            
            if (!this.isTimelineActive) {
                this.isTimelineActive = true;
            }
            
            if (this.isScrolling) {
                e.preventDefault();
                return;
            }
            
            const canScrollDown = this.currentStep < this.maxSteps;
            const canScrollUp = this.currentStep > 1;
            
            if (e.deltaY > 0) {
                if (canScrollDown) {
                    e.preventDefault();
                    this.isScrolling = true;
                    this.currentStep++;
                    this.updateTimeline();
                    
                    setTimeout(() => {
                        this.isScrolling = false;
                    }, 400);
                } else {
                    this.isTimelineActive = false;
                    return;
                }
            } else {
                if (canScrollUp) {
                    e.preventDefault();
                    this.isScrolling = true;
                    this.currentStep--;
                    this.updateTimeline();
                    
                    setTimeout(() => {
                        this.isScrolling = false;
                    }, 400);
                } else {
                    this.isTimelineActive = false;
                    return;
                }
            }
            
        } else {
            this.isTimelineActive = false;
        }
    }

    updateTimeline() {
        let progressPercentage;
        
        switch(this.currentStep) {
            case 1:
                progressPercentage = 0;
                break;
            case 2:
                progressPercentage = 33.33;
                break;
            case 3:
                progressPercentage = 66.66;
                break;
            case 4:
                progressPercentage = 100;
                break;
            default:
                progressPercentage = 0;
        }
        
        this.progress.style.width = `${progressPercentage}%`;
        
        this.points.forEach((point, index) => {
            const step = index + 1;
            point.classList.remove('active', 'completed');
            
            if (step < this.currentStep) {
                point.classList.add('completed');
            } else if (step === this.currentStep) {
                point.classList.add('active');
            }
        });
    }
}

// Initialize Timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectTimeline();
});

// Add typing effect to hero title
class TypingEffect {
    constructor(element, text, speed = 25) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name-highlight');
    if (nameElement) {
        const originalText = nameElement.textContent;
        
        setTimeout(() => {
            nameElement.style.opacity = '1';
            
            const typingEffect = new TypingEffect(nameElement, originalText, 50);
            typingEffect.start();
            
            animateStats();
        }, 1000);
    }
});

// Animate stats sequentially
function animateStats() {
    const stats = document.querySelectorAll('.stat');
    
    setTimeout(() => {
        if (stats[0]) {
            stats[0].classList.add('show');
        }
    }, 500);
    
    setTimeout(() => {
        if (stats[1]) {
            stats[1].classList.add('show');
        }
    }, 750);
    
    setTimeout(() => {
        if (stats[2]) {
            stats[2].classList.add('show');
        }
    }, 1000);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<div class="scroll-arrow-up"></div>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 40px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    box-shadow: var(--shadow-medium);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', scrollToTop);

const floatingContactBtn = document.getElementById('floatingContactBtn');
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    const footer = document.querySelector('.footer');
    const footerRect = footer.getBoundingClientRect();
    const isAtFooter = footerRect.top <= window.innerHeight;
    
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
        floatingContactBtn.classList.add('show');
        
        // Hide buttons when reaching footer
        if (isAtFooter) {
            scrollToTopBtn.classList.add('hide-at-footer');
            floatingContactBtn.classList.add('hide-at-footer');
            if (scrollIndicator) scrollIndicator.classList.add('hide-at-footer');
        } else {
            scrollToTopBtn.classList.remove('hide-at-footer');
            floatingContactBtn.classList.remove('hide-at-footer');
            if (scrollIndicator) scrollIndicator.classList.remove('hide-at-footer');
        }
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        floatingContactBtn.classList.remove('show');
    }
});

// Floating Contact Button
class FloatingContactManager {
    constructor() {
        this.floatingBtn = document.getElementById('floatingContactBtn');
        this.isExpanded = false;
        this.init();
    }

    init() {
        if (!this.floatingBtn) return;

        this.floatingBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleExpansion();
        });

        const contactTrigger = document.querySelector('.contact-trigger');
        if (contactTrigger) {
            contactTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
                
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    setTimeout(() => {
                        if (!this.isExpanded) {
                            this.expand();
                        }
                    }, 1000);
                }
            });
        }

        document.addEventListener('click', (e) => {
            if (!this.floatingBtn.contains(e.target) && this.isExpanded) {
                this.collapse();
            }
        });

        const floatingContactItems = this.floatingBtn.querySelectorAll('.floating-contact-item');
        floatingContactItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    toggleExpansion() {
        if (this.isExpanded) {
            this.collapse();
        } else {
            this.expand();
        }
    }

    expand() {
        this.isExpanded = true;
        this.floatingBtn.classList.add('expanded');
    }

    collapse() {
        this.isExpanded = false;
        this.floatingBtn.classList.remove('expanded');
    }
}

// Initialize Floating Contact Button
document.addEventListener('DOMContentLoaded', () => {
    new FloatingContactManager();
});

// Image Modal functionality for first project
class ImageModal {
    constructor() {
        this.modal = null;
        this.init();
    }

    init() {
        // Create modal element
        this.createModal();
        
        // Get first project card image
        const firstProjectCard = document.querySelector('.project-card[data-project="1"]');
        if (firstProjectCard) {
            const projectImage = firstProjectCard.querySelector('.project-image');
            const img = projectImage.querySelector('img');
            
            if (projectImage && img) {
                // Add clickable class
                projectImage.classList.add('clickable');
                
                // Add click event
                projectImage.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openModal(img.src, img.alt);
                });
            }
        }
    }

    createModal() {
        // Create modal structure
        this.modal = document.createElement('div');
        this.modal.className = 'image-modal';
        this.modal.innerHTML = `
            <div class="image-modal-content">
                <button class="image-modal-close">
                    <i data-lucide="x"></i>
                </button>
                <img src="" alt="">
            </div>
        `;
        
        document.body.appendChild(this.modal);
        
        // Add close event listeners
        const closeBtn = this.modal.querySelector('.image-modal-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeModal();
        });
        
        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
        
        // Initialize Lucide icons for close button
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }

    openModal(imageSrc, imageAlt) {
        const img = this.modal.querySelector('.image-modal-content img');
        img.src = imageSrc;
        img.alt = imageAlt;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Refresh Lucide icons
        setTimeout(() => {
            lucide.createIcons();
        }, 50);
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear image after transition
        setTimeout(() => {
            const img = this.modal.querySelector('.image-modal-content img');
            img.src = '';
        }, 300);
    }
}

// Initialize Image Modal
document.addEventListener('DOMContentLoaded', () => {
    new ImageModal();
});