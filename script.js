document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('show') && 
            !event.target.closest('nav')) {
            navLinks.classList.remove('show');
        }
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
});
