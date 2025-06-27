// Tab functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Handle tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // First, activate the corresponding tab
                const tabButton = document.querySelector(`[data-tab="${targetId}"]`);
                if (tabButton) {
                    tabButton.click();
                }

                // Then scroll to the content
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });

    // Animation for special cards on scroll
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

    // Observe all cards for animation
    const cards = document.querySelectorAll('.special-card, .event-card, .promotion-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Dynamic day highlighting for specials
    const today = new Date().getDay();
    const days = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
    const currentDay = days[ today ];

    const todaySpecial = document.querySelector(`[data-day="${currentDay}"]`);
    if (todaySpecial) {
        todaySpecial.style.border = '3px solid #ff6b35';
        todaySpecial.style.boxShadow = '0 15px 35px rgba(255, 107, 53, 0.3)';

        // Add "Today's Special" badge
        const badge = document.createElement('div');
        badge.innerHTML = "Today's Special!";
        badge.style.cssText = `
            position: absolute;
            top: -10px;
            left: 20px;
            background: linear-gradient(135deg, #ff6b35, #ff8f5a);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            z-index: 10;
        `;
        todaySpecial.style.position = 'relative';
        todaySpecial.appendChild(badge);
    }

    // Interactive reserve buttons
    const reserveButtons = document.querySelectorAll('.reserve-btn');
    reserveButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Simulate booking process
            const originalText = button.textContent;
            button.textContent = 'Processing...';
            button.disabled = true;
            button.style.opacity = '0.7';

            setTimeout(() => {
                button.textContent = 'Reserved!';
                button.style.background = 'linear-gradient(135deg, #28a745, #34ce57)';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.opacity = '1';
                    button.style.background = 'linear-gradient(135deg, #ff6b35, #ff8f5a)';
                }, 2000);
            }, 1500);
        });
    });

    // Parallax effect for background
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const backgroundImage = document.querySelector('.background-image');

        if (backgroundImage) {
            const speed = 0.5;
            const yPos = -(scrollTop * speed);
            backgroundImage.style.transform = `translateY(${yPos}px)`;
        }

        lastScrollTop = scrollTop;
    });

    // Auto-rotate specials (optional feature)
    let currentSpecialIndex = 0;
    const specialCards = document.querySelectorAll('.special-card');

    function highlightSpecial() {
        specialCards.forEach((card, index) => {
            card.style.transform = index === currentSpecialIndex ? 'scale(1.05)' : 'scale(1)';
            card.style.zIndex = index === currentSpecialIndex ? '10' : '1';
        });

        currentSpecialIndex = (currentSpecialIndex + 1) % specialCards.length;
    }

    // Highlight specials every 5 seconds when on specials tab
    setInterval(() => {
        const specialsTab = document.getElementById('specials');
        if (specialsTab && specialsTab.classList.contains('active')) {
            highlightSpecial();
        }
    }, 5000);

    // Loading animation for page
    window.addEventListener('load', () => {
        const contentOverlay = document.querySelector('.content-overlay');
        contentOverlay.style.opacity = '0';
        contentOverlay.style.transform = 'translateY(50px)';

        setTimeout(() => {
            contentOverlay.style.transition = 'opacity 1s ease, transform 1s ease';
            contentOverlay.style.opacity = '1';
            contentOverlay.style.transform = 'translateY(0)';
        }, 100);
    });

    // Enhanced hover effects for promotion cards
    const promotionCards = document.querySelectorAll('.promotion-card');
    promotionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Time-based greetings
    const currentTime = new Date().getHours();
    let greeting = '';

    if (currentTime < 12) {
        greeting = 'Good Morning! Start Your Day with Our Special Breakfast Menu';
    } else if (currentTime < 17) {
        greeting = 'Good Afternoon! Check Out Our Lunch Specials';
    } else {
        greeting = 'Good Evening! Discover Our Dinner Delights';
    }

    // Add dynamic greeting (optional)
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        const greetingElement = document.createElement('p');
        greetingElement.textContent = greeting;
        greetingElement.style.cssText = `
            color: #ff6b35;
            font-weight: 500;
            font-size: 1rem;
            margin-top: 0.5rem;
            opacity: 0;
            animation: fadeIn 1s ease 0.5s forwards;
        `;
        pageHeader.appendChild(greetingElement);
    }
});

// Utility function for smooth animations
function animateElement(element, animationClass, duration = 1000) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

// Enhanced reservation system (can be extended with backend integration)
class ReservationSystem {
    constructor() {
        this.reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    }

    makeReservation(eventTitle, guestName, guestEmail) {
        const reservation = {
            id: Date.now(),
            eventTitle,
            guestName,
            guestEmail,
            timestamp: new Date().toISOString(),
            status: 'confirmed'
        };

        this.reservations.push(reservation);
        this.saveReservations();
        return reservation;
    }

    saveReservations() {
        localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }

    getReservations() {
        return this.reservations;
    }
}

// Initialize reservation system
const reservationSystem = new ReservationSystem();

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ReservationSystem };
}

