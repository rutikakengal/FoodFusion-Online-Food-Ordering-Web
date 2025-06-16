// Order History Page JavaScript

// Sample order data (in a real application, this would come from a backend API)
let orders = JSON.parse(localStorage.getItem('orders')) || []; // Load orders from localStorage
console.log('Orders loaded in order-history.js:', orders); // Debugging log

// Function to escape HTML and prevent XSS
function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') {
        unsafe = String(unsafe || ''); // Convert to string, use empty string if null/undefined
    }
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to format currency
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

// Function to render order items
function renderOrderItems(items) {
    return items.map(item => 
        `${escapeHtml(item.name)} (${item.quantity}x)`
    ).join(', ');
}

// Function to render order status
function renderOrderStatus(status) {
    const statusClasses = {
        completed: 'status-completed',
        pending: 'status-pending',
        cancelled: 'status-cancelled'
    };
    
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    return `<span class="order-status ${statusClasses[status]}">${statusText}</span>`;
}

// Function to render orders
function renderOrders(ordersToRender) {
    console.log('renderOrders called with:', ordersToRender);
    const orderListContainer = document.querySelector('.order-list');
    const noOrders = document.getElementById('no-orders');
    
    if (!orderListContainer) return; // Ensure container exists

    if (ordersToRender.length === 0) {
        console.log('No orders to render, displaying "No orders found".');
        orderListContainer.innerHTML = ''; // Clear any existing content
        noOrders.style.display = 'block';
        return;
    }
    
    noOrders.style.display = 'none';
    orderListContainer.innerHTML = ordersToRender.map(order => {
        const orderItemsHtml = order.items.map(item => `
            <div class="order-item">
                <img src="img/food/${escapeHtml(item.image || 'default.jpg')}" alt="${escapeHtml(item.name)}">
                <div class="item-details">
                    <h4>${escapeHtml(item.name)}</h4>
                    <p>$${item.price.toFixed(2)} x <span class="item-quantity-display">${item.quantity}</span></p>
                </div>
                <div class="item-actions">
                    <div class="quantity-controls">
                        <button class="btn-quantity" data-action="decrease" data-order-id="${escapeHtml(order.id || '')}" data-item-id="${escapeHtml(item.id || '')}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="btn-quantity" data-action="increase" data-order-id="${escapeHtml(order.id || '')}" data-item-id="${escapeHtml(item.id || '')}">+</button>
                    </div>
                    <button class="add-to-cart-btn" 
                            data-id="${escapeHtml(item.id || '')}"
                            data-name="${escapeHtml(item.name)}"
                            data-price="${item.price}"
                            data-image="${escapeHtml(item.image || 'default.jpg')}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div class="order-card">
                <div class="order-header">
                    <h3>Order #${escapeHtml(order.id || 'N/A')}</h3>
                    <p>Date: ${formatDate(order.date)}</p>
                    <p>Status: ${renderOrderStatus(order.status)}</p>
                </div>
                <div class="order-items">
                    ${orderItemsHtml}
                </div>
                <div class="order-footer">
                    <div class="order-summary">
                        <p>Total: <strong>${formatCurrency(order.total)}</strong></p>
                        ${order.customer && order.customer.address ? `<p>Delivery Address: ${escapeHtml(order.customer.address)}</p>` : ''}
                    </div>
                    <button class="reorder-full-btn" data-order-id="${escapeHtml(order.id || '')}">
                        Reorder Entire Order
                    </button>
                </div>
            </div>
        `;
    }).join('');
    console.log('Generated HTML for orders:', orderListContainer.innerHTML); // Debugging log
}

// Function to filter orders
function filterOrders() {
    const searchTerm = document.getElementById('order-search').value.toLowerCase();
    const dateFilter = document.getElementById('date-filter').value;
    
    let filteredOrders = orders;
    
    // Sort orders by date in descending order (latest first)
    filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Apply search filter
    if (searchTerm) {
        filteredOrders = filteredOrders.filter(order => 
            (order.id && order.id.toLowerCase().includes(searchTerm)) ||
            order.items.some(item => item.name.toLowerCase().includes(searchTerm))
        );
    }
    
    // Apply date filter
    if (dateFilter) {
        filteredOrders = filteredOrders.filter(order => 
            order.date.startsWith(dateFilter)
        );
    }
    
    renderOrders(filteredOrders);
}

// Function to handle reorder (for individual items and full order)
function handleReorder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    // Clear current cart before adding reordered items
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Add all items from the reordered order to the cart
    order.items.forEach(item => {
        addToCart({
            id: item.id || '',
            name: item.name,
            price: item.price,
            image: item.image || 'default.jpg',
            quantity: item.quantity // Use original quantity for reorder
        });
    });
    
    // Redirect to order page
    window.location.href = 'order.html';
}

// Add a new function for adding individual items to cart from order history
function addToCartFromOrderHistory(itemData, quantity) {
    const itemToAdd = {
        id: itemData.id || '',
        name: itemData.name,
        price: parseFloat(itemData.price),
        image: itemData.image || 'default.jpg',
        quantity: quantity // Use the quantity from the control
    };
    addToCart(itemToAdd);
    // Provide visual feedback or update cart badge here if needed without full page reload
    alert(`${itemToAdd.quantity}x ${itemToAdd.name} added to cart!`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Sort orders by date in descending order (latest first) for initial render
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Initial render
    renderOrders(orders);
    
    // Search input event
    document.getElementById('order-search').addEventListener('input', filterOrders);
    
    // Date filter event
    document.getElementById('date-filter').addEventListener('change', filterOrders);
    
    // Initialize jQuery UI Datepicker on the date filter input
    $('#date-filter').datepicker({
        dateFormat: 'yy-mm-dd', // Set the desired date format
        onSelect: function() {
            filterOrders(); // Re-filter orders when a date is selected
        }
    });

    // Event delegation for all buttons within order cards
    document.querySelector('.order-list').addEventListener('click', (e) => {
        // Reorder full order button
        if (e.target.classList.contains('reorder-full-btn')) {
            const orderId = e.target.dataset.orderId;
            handleReorder(orderId);
        }
        // Individual item quantity controls
        else if (e.target.classList.contains('btn-quantity')) {
            const orderId = e.target.dataset.orderId;
            const itemId = e.target.dataset.itemId;
            const action = e.target.dataset.action;

            const order = orders.find(o => o.id === orderId);
            if (!order) return;

            const item = order.items.find(i => i.id === itemId);
            if (!item) return;

            if (action === 'increase') {
                item.quantity++;
            } else if (action === 'decrease') {
                item.quantity--;
                if (item.quantity <= 0) {
                    // Optionally remove item from order history card, but not from actual historical data
                    // For simplicity, we'll just prevent quantity from going below 1 visually
                    item.quantity = 1; // Keep minimum quantity at 1 in display
                }
            }
            // Update the displayed quantity
            e.target.closest('.quantity-controls').querySelector('.quantity-value').textContent = item.quantity;
        }
        // Individual item Add to Cart button
        else if (e.target.classList.contains('add-to-cart-btn')) {
            const itemData = e.target.dataset;
            const quantity = parseInt(e.target.closest('.item-actions').querySelector('.quantity-value').textContent);
            addToCartFromOrderHistory(itemData, quantity);
        }
    });
}); 