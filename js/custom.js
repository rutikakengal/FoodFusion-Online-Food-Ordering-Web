// Initialize cart as a global variable
let cart = JSON.parse(localStorage.getItem('foodFusionCart')) || [];
let cartCount = 0;

$(function () {
  // Calculate cart count from loaded cart
  cartCount = calculateCartCount();
  loadCartFromStorage();
  updateCartBadge();
  updateTotal();
  
  // Main Menu JS
  $(window).scroll(function () {
    if ($(this).scrollTop() < 50) {
      $("nav").removeClass("site-top-nav");
      $("#back-to-top").fadeOut();
    } else {
      $("nav").addClass("site-top-nav");
      $("#back-to-top").fadeIn();
    }
  });

  // Shopping Cart Toggle JS
  $("#shopping-cart").on("click", function () {
    $("#cart-content").toggle("blind", "", 500);
  });

  // Back-To-Top Button JS
  $("#back-to-top").click(function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
  
  // Add to Cart JS
  $(document).on("submit", ".food-menu-box form", function(event) {
    event.preventDefault();
    
    // Play sound effect
    if (typeof cartSound !== 'undefined') {
      cartSound.currentTime = 0;
      cartSound.play();
    }
    
    const form = $(this);
    const foodBox = form.closest('.food-menu-box');
    const foodName = foodBox.find('h4').text();
    const foodPrice = foodBox.find('.food-price').text().replace('$', '');
    const quantity = parseInt(foodBox.find('input[type="number"]').val());
    const foodImg = foodBox.find('img').attr('src');
    const total = (parseFloat(foodPrice) * quantity).toFixed(2);
    
    // Check if item already exists in cart array
    let itemExists = false;
    let itemIndex = -1;
    
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === foodName) {
        itemExists = true;
        itemIndex = i;
        break;
      }
    }
    
    // Update cart array
    if (itemExists) {
      // Update existing item
      cart[itemIndex].quantity += quantity;
      cart[itemIndex].total = (parseFloat(cart[itemIndex].price) * cart[itemIndex].quantity).toFixed(2);
    } else {
      // Add new item
      cart.push({
        image: foodImg,
        name: foodName,
        price: foodPrice,
        quantity: quantity,
        total: total
      });
    }
    
    // Save to localStorage
    localStorage.setItem('foodFusionCart', JSON.stringify(cart));
    
    // Update DOM
    loadCartFromStorage();
    cartCount = calculateCartCount();
    updateCartBadge();
    updateTotal();
    
    // Change button text temporarily
    const btn = form.find('.btn-primary');
    const originalText = btn.val();
    btn.val('Added!');
    setTimeout(function() {
      btn.val(originalText);
    }, 1000);
  });

  // Delete Cart Item JS
  $(document).on("click", ".btn-delete", function (event) {
    event.preventDefault();
    
    // Get the food name from this row
    const foodName = $(this).closest("tr").find("td:nth-child(2)").text();
    
    // Remove this item from cart array
    cart = cart.filter(item => item.name !== foodName);
    
    // Save to localStorage
    localStorage.setItem('foodFusionCart', JSON.stringify(cart));
    
    // Update DOM
    $(this).closest("tr").remove();
    cartCount = calculateCartCount();
    updateCartBadge();
    updateTotal();
  });
  
  // Update Cart Badge
  function updateCartBadge() {
    // Update badge with count from cart items
    cartCount = calculateCartCount();
    $(".badge").text(cartCount);
  }

  // Update Total Price JS
  function updateTotal() {
    let total = 0;
    $("#cart-content tr").each(function () {
      const rowTotal = parseFloat($(this).find("td:nth-child(5)").text().replace("$", ""));
      if (!isNaN(rowTotal)) {
        total += rowTotal;
      }
    });
    $("#cart-content th:nth-child(5)").text("$" + total.toFixed(2));
    $(".tbl-full th:nth-child(6)").text("$" + total.toFixed(2));
    
    // Save cart to localStorage after updating total
    saveCartToStorage();
  }
  
  // Calculate total items in cart
  function calculateCartCount() {
    let count = 0;
    if (cart && cart.length) {
      cart.forEach(item => {
        count += item.quantity;
      });
    }
    return count;
  }
  
  // Load cart from localStorage
  function loadCartFromStorage() {
    if (cart && cart.length) {
      // Clear existing cart items except the last row (total)
      $("#cart-content table tr:not(:last)").remove();
      
      // Add items from localStorage
      cart.forEach(item => {
        const newRow = `
          <tr>
            <td><img src="${item.image}" alt="Food"></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${item.total}</td>
            <td><a href="#" class="btn-delete">&times;</a></td>
          </tr>
        `;
        
        $("#cart-content table tr:last").before(newRow);
      });
      
      // Update total
      updateTotal();
    }
  }
  
  // Save cart to localStorage
  function saveCartToStorage() {
    cart = [];
    $("#cart-content tr:not(:last)").each(function() {
      const item = {
        image: $(this).find('td:nth-child(1) img').attr('src'),
        name: $(this).find('td:nth-child(2)').text(),
        price: $(this).find('td:nth-child(3)').text().replace('$', ''),
        quantity: parseInt($(this).find('td:nth-child(4)').text()),
        total: $(this).find('td:nth-child(5)').text().replace('$', '')
      };
      cart.push(item);
    });
    
    localStorage.setItem('foodFusionCart', JSON.stringify(cart));
  }

  // 🔒 Phone Number Input: Allow only digits
  $("#phone").on("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  // ✅ Show confirmation message after form submit
  $("#orderForm").on("submit", function (e) {
    e.preventDefault();
    $("#confirmationMessage").fadeIn();
    this.reset(); // optional: clear form
  });
});



 
const params = new URLSearchParams(window.location.search);

// Get values separately
const queryParam = params.get('query');
const categoryParam = params.get('category');

// Prioritize query if it exists
let query = queryParam || categoryParam || "";

// Update heading if present
const searchTermEl = document.getElementById('search-term');
if (searchTermEl) {
    searchTermEl.textContent = `"${query}"`;
}

query = query.toLowerCase().trim();

const foodBoxes = document.querySelectorAll('.food-menu-box');
let visibleCount = 0;

foodBoxes.forEach(box => {
    const nameEl = box.querySelector('h4');
    const name = nameEl?.textContent?.toLowerCase() || "";

    if (name.includes(query)) {
        // Highlight only if the filter came from search bar
        if (queryParam) {
            const originalName = box.getAttribute('data-name');
            const regex = new RegExp(`(${query})`, 'gi');
            const highlighted = originalName.replace(regex, '<mark>$1</mark>');
            nameEl.innerHTML = highlighted;
        }

        box.style.display = 'block';
        visibleCount++;
    } else {
        box.style.display = 'none';
    }
});

// Show "no results" message if nothing matched
const messageEl = document.getElementById('no-results-message');
if (visibleCount === 0 && messageEl) {
    messageEl.style.display = 'block';
    messageEl.textContent = `Oops! No results found for "${query}".`;
}




const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions');

// Sample list of foods — you can fetch from real data later
const foodItems = ['Pizza', 'Burger', 'Sandwich', 'Pasta', 'Fries', 'Tacos', 'Sushi', 'Momos', 'Dosa', 'Noodles'];

searchInput.addEventListener('input', () => {
    const inputVal = searchInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = ""; // Clear previous

    if (inputVal.length === 0) return;

    const matched = foodItems.filter(item => item.toLowerCase().includes(inputVal));

    if (matched.length > 0) {
        matched.forEach(item => {
            const suggestion = document.createElement('div');
            suggestion.textContent = item;
            suggestion.className = "suggestion-item";
            suggestion.addEventListener('click', () => {
                searchInput.value = item;
                suggestionsBox.innerHTML = "";
            });
            suggestionsBox.appendChild(suggestion);
        });
     } 
});


