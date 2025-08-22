document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            navLinks.classList.toggle('show');
            console.log('Menu toggle clicked');
            
            // Force repaint to ensure menu displays
            setTimeout(() => {
                document.body.style.zoom = '99.99%';
                setTimeout(() => {
                    document.body.style.zoom = '100%';
                }, 10);
            }, 5);
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('show') && 
            !event.target.closest('nav')) {
            navLinks.classList.remove('show');
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
    });
    
    // Form validation enhancement
    const bookingForm = document.querySelector('.contact-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // In a real implementation, this would send the form data to a server
            alert('Thank you for booking! We will contact you shortly to confirm your appointment.');
            bookingForm.reset();
        });
    }
    
    // Gallery carousel functionality
    const galleryCarousel = document.querySelector('.gallery-carousel');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    if (galleryCarousel && prevBtn && nextBtn) {
        const itemWidth = 300 + 24; // Item width + gap
        let currentPosition = 0;
        
        nextBtn.addEventListener('click', () => {
            const maxScroll = galleryCarousel.scrollWidth - galleryCarousel.clientWidth;
            currentPosition = Math.min(currentPosition + itemWidth, maxScroll);
            galleryCarousel.scrollTo({
                left: currentPosition,
                behavior: 'smooth'
            });
        });
        
        prevBtn.addEventListener('click', () => {
            currentPosition = Math.max(currentPosition - itemWidth, 0);
            galleryCarousel.scrollTo({
                left: currentPosition,
                behavior: 'smooth'
            });
        });
    }
    
    // Lazy load images
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        let active = false;
        
        const lazyLoad = function() {
            if (active === false) {
                active = true;
                
                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== 'none') {
                            lazyImage.src = lazyImage.dataset.src;
                            if (lazyImage.dataset.srcset) {
                                lazyImage.srcset = lazyImage.dataset.srcset;
                            }
                            lazyImage.classList.remove('lazy');
                            
                            lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                            });
                            
                            if (lazyImages.length === 0) {
                                document.removeEventListener('scroll', lazyLoad);
                                window.removeEventListener('resize', lazyLoad);
                                window.removeEventListener('orientationchange', lazyLoad);
                            }
                        }
                    });
                    
                    active = false;
                }, 200);
            }
        };
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }
});
