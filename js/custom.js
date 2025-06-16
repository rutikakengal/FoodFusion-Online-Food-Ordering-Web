let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartBadge() {
    const badge = document.querySelector('.shopping-cart .badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

function updateCartContent() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
        totalAmount.textContent = '0.00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <img src="img/food/${item.image || 'default.jpg'}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-quantity" data-action="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-quantity" data-action="increase" data-id="${item.id}">+</button>
                    <button class="btn-remove" data-id="${item.id}">&times;</button>
                </div>
            </div>
        `;
    }).join('');

    totalAmount.textContent = total.toFixed(2);
}

function updateOrderTable() {
    const orderTable = document.querySelector('.order table');
    if (!orderTable) return;

    const tbody = orderTable.querySelector('tbody');
    const totalRow = document.getElementById('order-page-total-row');

    if (cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No items in cart</td></tr>';
        if (totalRow) {
            totalRow.querySelector('th:last-child').textContent = '$0.00';
        }
        return;
    }

    let total = 0;
    tbody.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <tr>
                <td>${index + 1}</td>
                <td><img src="img/food/${item.image || 'default.jpg'}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-controls">
                        <button class="btn-quantity" data-action="decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn-quantity" data-action="increase" data-id="${item.id}">+</button>
                    </div>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="btn-delete" data-id="${item.id}">&times;</button></td>
            </tr>
        `;
    }).join('');

    if (totalRow) {
        totalRow.querySelector('th:last-child').textContent = `$${total.toFixed(2)}`;
    }
}

function handleQuantityChange(itemId, action) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;

    if (action === 'increase') {
        cart[itemIndex].quantity++;
    } else if (action === 'decrease') {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    updateCartContent();
    updateOrderTable();
}

function handleItemRemove(itemId) {
    console.log('handleItemRemove called for ID:', itemId);
    console.log('Current cart before filter:', JSON.parse(JSON.stringify(cart)));
    cart = cart.filter(item => item.id !== itemId);
    console.log('Cart after filter:', JSON.parse(JSON.stringify(cart)));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    updateCartContent();
    updateOrderTable();
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push({
            ...item
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    updateCartContent();
    updateOrderTable();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    updateCartContent();
    updateOrderTable();

    const cartToggle = document.getElementById('shopping-cart');
    const cartContent = document.getElementById('cart-content');

    if (cartToggle && cartContent) {
        cartToggle.addEventListener('click', () => {
            cartContent.classList.toggle('show');
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-quantity')) {
            const itemId = e.target.dataset.id;
            const action = e.target.dataset.action;
            console.log(`Quantity change for item: ${itemId}, action: ${action}`);
            handleQuantityChange(itemId, action);
        } else if (e.target.classList.contains('btn-delete') || e.target.classList.contains('btn-remove')) {
            const itemId = e.target.dataset.id;
            console.log(`Attempting to remove item with ID: ${itemId}`);
            handleItemRemove(itemId);
        } else if (e.target.classList.contains('add-to-cart')) {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);
            const image = e.target.dataset.image;

            const quantityInput = document.querySelector(`.food-quantity[data-food-id="${id}"]`);
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

            const item = { id, name, price, image, quantity };
            console.log('Adding to cart:', item);
            addToCart(item);
        }
    });

    const orderForm = document.querySelector('.order .form');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Order form submitted.');

            if (cart.length === 0) {
                alert('Your cart is empty!');
                console.log('Cart is empty, not proceeding with order.');
                return;
            }

            const formData = new FormData(orderForm);
            const orderData = {
                id: 'ORD' + Date.now(),
                customer: {
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    address: formData.get('address')
                },
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                date: new Date().toISOString(),
                status: 'pending'
            };

            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(orderData);
            localStorage.setItem('orders', JSON.stringify(orders));
            console.log('Order saved to localStorage:', orderData);

            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Cart cleared.');

            updateCartBadge();
            updateCartContent();
            updateOrderTable();

            alert('Order placed successfully!');
            orderForm.reset();
            console.log('Attempting redirection...');
            window.location.href = 'order-history.html';
            console.log('Redirection line executed.');
        });
    }

    // Back-To-Top Button JS - Native JS equivalent
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Main Menu JS - Native JS equivalent
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY < 50) {
            nav.classList.remove('site-top-nav');
            if (backToTopButton) {
                backToTopButton.style.display = 'none';
            }
        } else {
            nav.classList.add('site-top-nav');
            if (backToTopButton) {
                backToTopButton.style.display = 'block';
            }
        }
    });
});
