document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if(menuBtn.classList.contains('active')) {
                     menuBtn.classList.remove('active');
                }
            });
        });
    }

    // Carousel functionality for Fertility Centres
    const centresGrid = document.querySelector('.centres-grid');
    const prevBtn = document.querySelector('.centres-carousel .prev-btn');
    const nextBtn = document.querySelector('.centres-carousel .next-btn');
    const centreCards = document.querySelectorAll('.centre-card');

    if (centresGrid && prevBtn && nextBtn && centreCards.length > 0) {
        let currentIndex = 0;
        const totalCentres = centreCards.length; // 7 centres
        const visibleCentres = 3; // Show 3 at a time
        const maxIndex = totalCentres - visibleCentres; // Maximum index: 4 (for 7 centres showing 3)
        const gap = 30; // Gap between cards in pixels

        function calculateSlideDistance() {
            // Get the actual card width (handles responsive sizing)
            const cardWidth = centreCards[0].offsetWidth || 280; // Fallback to 280px if not available
            return cardWidth + gap;
        }

        function goToSlide(index) {
            // Handle infinite loop
            if (index > maxIndex) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = maxIndex;
            } else {
                currentIndex = index;
            }

            // Calculate translateX value
            const slideDistance = calculateSlideDistance();
            const translateX = -currentIndex * slideDistance;
            centresGrid.style.transform = `translateX(${translateX}px)`;
        }

        // Next button handler
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        // Previous button handler
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        // Handle window resize to recalculate positions
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                goToSlide(currentIndex);
            }, 250);
        });

        // Initialize carousel position
        goToSlide(0);
    }

    // Testimonial functionality
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevTestimonialBtn = document.querySelector('.testimonial-nav.prev-nav');
    const nextTestimonialBtn = document.querySelector('.testimonial-nav.next-nav');
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');

    if (testimonials.length > 0 && prevTestimonialBtn && nextTestimonialBtn) {
        let currentTestimonialIndex = 0;

        function showTestimonial(index) {
            // Remove active class from all
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            // Add active class to current
            testimonials[index].classList.add('active');
        }

        function nextTestimonial() {
            currentTestimonialIndex++;
            if (currentTestimonialIndex >= testimonials.length) {
                currentTestimonialIndex = 0;
            }
            showTestimonial(currentTestimonialIndex);
        }

        function prevTestimonial() {
            currentTestimonialIndex--;
            if (currentTestimonialIndex < 0) {
                currentTestimonialIndex = testimonials.length - 1;
            }
            showTestimonial(currentTestimonialIndex);
        }

        nextTestimonialBtn.addEventListener('click', nextTestimonial);
        prevTestimonialBtn.addEventListener('click', prevTestimonial);

        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        if (testimonialsWrapper) {
            testimonialsWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            testimonialsWrapper.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (diff > swipeThreshold) {
                // Swiped left - go to next
                nextTestimonial();
            } else if (diff < -swipeThreshold) {
                // Swiped right - go to previous
                prevTestimonial();
            }
        }
    }
});
