// Sample reviews data
const reviewsData = [
    {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        comment: "The Dal Tadka is absolutely incredible! Perfectly seasoned and reminds me of home-cooked meals. The delivery was super quick and the food arrived hot. Highly recommend!",
        dish: "dal-tadka",
        dishName: "Dal Tadka",
        date: "2024-01-15",
        verified: true,
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
        helpful: 23
    },
    {
        id: 2,
        name: "Rajesh Kumar",
        rating: 5,
        comment: "Outstanding quality and taste! The steamed rice was perfectly cooked and the variety of dishes available is impressive. Great value for money.",
        dish: "steamed-rice",
        dishName: "Steamed Rice",
        date: "2024-01-12",
        verified: true,
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
        helpful: 18
    },
    {
        id: 3,
        name: "Anita Patel",
        rating: 4,
        comment: "Love the healthy options and the freshness of ingredients. The portion sizes are generous and the packaging is eco-friendly. Will definitely order again!",
        dish: "vegetable-curry",
        dishName: "Vegetable Curry",
        date: "2024-01-10",
        verified: true,
        avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
        helpful: 15
    },
    {
        id: 4,
        name: "Mohammed Hassan",
        rating: 5,
        comment: "Exceptional service and delicious food! The flavors are authentic and the delivery team is very professional. Food Fusion has become our go-to for daily meals.",
        dish: "mixed-thali",
        dishName: "Mixed Thali",
        date: "2024-01-08",
        verified: true,
        avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150",
        helpful: 31
    },
    {
        id: 5,
        name: "Sneha Reddy",
        rating: 5,
        comment: "The paneer curry is divine! Creamy, flavorful, and just the right amount of spice. The presentation is also beautiful. Keep up the excellent work!",
        dish: "paneer-curry",
        dishName: "Paneer Curry",
        date: "2024-01-05",
        verified: true,
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
        helpful: 27
    },
    {
        id: 6,
        name: "Vikram Singh",
        rating: 4,
        comment: "Really good food quality and taste. The delivery timing could be improved slightly, but overall a great experience. The dal tadka and rice combo is perfect.",
        dish: "dal-tadka",
        dishName: "Dal Tadka",
        date: "2024-01-03",
        verified: true,
        avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
        helpful: 12
    },
    {
        id: 7,
        name: "Kavya Nair",
        rating: 5,
        comment: "Absolutely love the variety and taste! Every dish feels like it's made with love. The healthy options are perfect for my diet. Highly satisfied customer!",
        dish: "mixed-thali",
        dishName: "Mixed Thali",
        date: "2024-01-01",
        verified: true,
        avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150",
        helpful: 19
    },
    {
        id: 8,
        name: "Arjun Mehta",
        rating: 3,
        comment: "Food is decent but could use more flavor in some dishes. The service is good and delivery is on time. Would like to see more spicy options.",
        dish: "vegetable-curry",
        dishName: "Vegetable Curry",
        date: "2023-12-28",
        verified: true,
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
        helpful: 8
    }
];

// Global variables
let displayedReviews = [];
let currentFilter = { rating: 'all', dish: 'all' };
let reviewsPerPage = 6;
let currentPage = 1;
let savedReviews = JSON.parse(localStorage.getItem('savedReviews')) || [];

// DOM Elements
const reviewsGrid = document.getElementById('reviewsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const ratingFilter = document.getElementById('ratingFilter');
const dishFilter = document.getElementById('dishFilter');
const reviewModal = document.getElementById('reviewModal');
const reviewForm = document.getElementById('reviewForm');
const starRating = document.getElementById('starRating');
const ratingValue = document.getElementById('ratingValue');
const successMessage = document.getElementById('successMessage');
const themeToggle = document.getElementById('themeToggle');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartContent = document.getElementById('cartContent');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeRatingBars();
    loadReviews();
    setupEventListeners();
    setupStarRating();
    initializeTheme();
    updateCartCount();
    renderCartItems();
});

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
}

// Theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Cart functionality
function toggleCart() {
    const isOpen = cartSidebar.classList.contains('open');
    if (isOpen) {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    } else {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function addToCart(reviewId) {
    const review = reviewsData.find(r => r.id === reviewId);
    if (review && !savedReviews.find(r => r.id === reviewId)) {
        savedReviews.push(review);
        localStorage.setItem('savedReviews', JSON.stringify(savedReviews));
        updateCartCount();
        renderCartItems();
        showNotification('Review saved to cart!');
        
        // Update bookmark button
        const bookmarkBtn = document.querySelector(`[onclick="addToCart(${reviewId})"]`);
        if (bookmarkBtn) {
            bookmarkBtn.classList.add('bookmarked');
            bookmarkBtn.textContent = '🔖';
            bookmarkBtn.setAttribute('onclick', `removeFromCart(${reviewId})`);
        }
    }
}

function removeFromCart(reviewId) {
    savedReviews = savedReviews.filter(r => r.id !== reviewId);
    localStorage.setItem('savedReviews', JSON.stringify(savedReviews));
    updateCartCount();
    renderCartItems();
    showNotification('Review removed from cart');
    
    // Update bookmark button
    const bookmarkBtn = document.querySelector(`[onclick="removeFromCart(${reviewId})"]`);
    if (bookmarkBtn) {
        bookmarkBtn.classList.remove('bookmarked');
        bookmarkBtn.textContent = '🔖';
        bookmarkBtn.setAttribute('onclick', `addToCart(${reviewId})`);
    }
}

function clearCart() {
    if (savedReviews.length > 0) {
        if (confirm('Are you sure you want to clear all saved reviews?')) {
            savedReviews = [];
            localStorage.setItem('savedReviews', JSON.stringify(savedReviews));
            updateCartCount();
            renderCartItems();
            showNotification('Cart cleared');
            
            // Update all bookmark buttons
            document.querySelectorAll('.bookmark-btn.bookmarked').forEach(btn => {
                btn.classList.remove('bookmarked');
                btn.textContent = '🔖';
            });
        }
    }
}

function updateCartCount() {
    cartBtn.textContent = `🛒 CART (${savedReviews.length})`;
}

function renderCartItems() {
    if (savedReviews.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <p>No reviews saved yet. Click the bookmark icon on reviews to save them here!</p>
            </div>
        `;
    } else {
        cartContent.innerHTML = savedReviews.map(review => `
            <div class="cart-item">
                <div class="cart-item-header">
                    <img src="${review.avatar}" alt="${review.name}" class="cart-item-avatar">
                    <div class="cart-item-info">
                        <h5>${review.name}</h5>
                        <div class="cart-item-dish">${review.dishName}</div>
                    </div>
                </div>
                <div class="cart-item-rating">
                    ${generateStars(review.rating)}
                </div>
                <div class="cart-item-comment">${review.comment.substring(0, 100)}${review.comment.length > 100 ? '...' : ''}</div>
                <div class="cart-item-actions">
                    <button class="remove-from-cart" onclick="removeFromCart(${review.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize rating bars animation
function initializeRatingBars() {
    setTimeout(() => {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const percentage = bar.dataset.percentage;
            bar.style.width = percentage + '%';
        });
    }, 500);
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Filter event listeners
    ratingFilter.addEventListener('change', handleFilterChange);
    dishFilter.addEventListener('change', handleFilterChange);
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreReviews);
    
    // Review form submission
    reviewForm.addEventListener('submit', handleReviewSubmission);
    
    // Modal close on overlay click
    reviewModal.addEventListener('click', function(e) {
        if (e.target === reviewModal) {
            closeReviewForm();
        }
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (reviewModal.classList.contains('active')) {
                closeReviewForm();
            }
            if (cartSidebar.classList.contains('open')) {
                toggleCart();
            }
        }
    });
}

// Setup star rating functionality
function setupStarRating() {
    const stars = starRating.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            highlightStars(index + 1);
        });
        
        star.addEventListener('click', () => {
            selectRating(index + 1);
        });
    });
    
    starRating.addEventListener('mouseleave', () => {
        const currentRating = parseInt(ratingValue.value) || 0;
        highlightStars(currentRating);
    });
}

function highlightStars(rating) {
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

function selectRating(rating) {
    ratingValue.value = rating;
    highlightStars(rating);
}

// Filter reviews based on selected criteria
function filterReviews() {
    let filteredReviews = [...reviewsData];
    
    // Filter by rating
    if (currentFilter.rating !== 'all') {
        filteredReviews = filteredReviews.filter(review => 
            review.rating === parseInt(currentFilter.rating)
        );
    }
    
    // Filter by dish
    if (currentFilter.dish !== 'all') {
        filteredReviews = filteredReviews.filter(review => 
            review.dish === currentFilter.dish
        );
    }
    
    return filteredReviews;
}

// Handle filter changes
function handleFilterChange() {
    currentFilter.rating = ratingFilter.value;
    currentFilter.dish = dishFilter.value;
    currentPage = 1;
    loadReviews();
}

// Load and display reviews
function loadReviews() {
    const filteredReviews = filterReviews();
    displayedReviews = filteredReviews.slice(0, reviewsPerPage * currentPage);
    renderReviews();
    updateLoadMoreButton(filteredReviews.length);
}

// Load more reviews
function loadMoreReviews() {
    currentPage++;
    loadReviews();
}

// Render reviews to the grid
function renderReviews() {
    reviewsGrid.innerHTML = '';
    
    displayedReviews.forEach((review, index) => {
        const reviewCard = createReviewCard(review);
        reviewCard.style.animationDelay = `${index * 0.1}s`;
        reviewCard.classList.add('fade-in');
        reviewsGrid.appendChild(reviewCard);
    });
}

// Create a review card element
function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    const starsHtml = generateStars(review.rating);
    const formattedDate = formatDate(review.date);
    const isBookmarked = savedReviews.find(r => r.id === review.id);
    
    card.innerHTML = `
        <div class="review-header">
            <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
            <div class="reviewer-info">
                <h4>
                    ${review.name}
                    ${review.verified ? '<span class="verified-badge">Verified</span>' : ''}
                </h4>
                <div class="dish-name">${review.dishName}</div>
            </div>
        </div>
        <div class="review-rating">
            <div class="review-stars">${starsHtml}</div>
            <span class="review-date">${formattedDate}</span>
        </div>
        <div class="review-comment">${review.comment}</div>
        <div class="review-actions">
            <button class="helpful-btn" onclick="markHelpful(${review.id})">
                👍 Helpful (${review.helpful})
            </button>
            <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
                    onclick="${isBookmarked ? `removeFromCart(${review.id})` : `addToCart(${review.id})`}">
                🔖
            </button>
        </div>
    `;
    
    return card;
}

// Generate star rating HTML
function generateStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        const starClass = i <= rating ? 'star filled' : 'star';
        starsHtml += `<span class="${starClass}">★</span>`;
    }
    return starsHtml;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Update load more button visibility
function updateLoadMoreButton(totalFilteredReviews) {
    if (displayedReviews.length >= totalFilteredReviews) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Mark review as helpful
function markHelpful(reviewId) {
    const review = reviewsData.find(r => r.id === reviewId);
    if (review) {
        review.helpful++;
        loadReviews(); // Refresh to show updated count
        showNotification('Thanks for your feedback!');
    }
}

// Open review form modal
function openReviewForm() {
    reviewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close review form modal
function closeReviewForm() {
    reviewModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
}

// Reset form fields
function resetForm() {
    reviewForm.reset();
    ratingValue.value = '';
    const stars = starRating.querySelectorAll('.star');
    stars.forEach(star => star.classList.remove('selected'));
}

// Handle form submission
function handleReviewSubmission(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showNotification('Please fill in all required fields');
        return;
    }
    
    // Get form data
    const reviewData = {
        id: reviewsData.length + 1,
        name: document.getElementById('reviewerName').value,
        email: document.getElementById('reviewerEmail').value,
        rating: parseInt(ratingValue.value),
        comment: document.getElementById('reviewText').value,
        dish: document.getElementById('dishName').value,
        dishName: document.getElementById('dishName').options[document.getElementById('dishName').selectedIndex].text,
        date: new Date().toISOString().split('T')[0],
        verified: false,
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
        helpful: 0
    };
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Submitting...';
    
    setTimeout(() => {
        // Add new review to data
        reviewsData.unshift(reviewData);
        
        // Close modal and show success message
        closeReviewForm();
        showSuccessMessage();
        
        // Refresh reviews
        loadReviews();
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Submit Review';
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    successMessage.classList.add('active');
    setTimeout(() => {
        successMessage.classList.remove('active');
    }, 3000);
}

// Form validation
function validateForm() {
    const requiredFields = reviewForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    if (!ratingValue.value) {
        starRating.classList.add('error');
        isValid = false;
    } else {
        starRating.classList.remove('error');
    }
    
    return isValid;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
setTimeout(() => {
    const elementsToAnimate = document.querySelectorAll('.review-card, .stat-card, .rating-summary');
    elementsToAnimate.forEach(el => observer.observe(el));
}, 100);

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);