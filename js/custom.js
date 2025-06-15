$(function () {
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

  // Delete Cart Item JS
  $(document).on("click", ".btn-delete", function (event) {
    event.preventDefault();
    $(this).closest("tr").remove();
    updateTotal();
  });

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
  }
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


