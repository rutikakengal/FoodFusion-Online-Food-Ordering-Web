// custom.js (updated dynamic cart logic)
$(function () {
  // Sticky Nav
  $(window).scroll(function () {
    if ($(this).scrollTop() < 50) {
      $("nav").removeClass("site-top-nav");
      $("#back-to-top").fadeOut();
    } else {
      $("nav").addClass("site-top-nav");
      $("#back-to-top").fadeIn();
    }
  });

  // Toggle cart view
  $("#shopping-cart").on("click", function () {
    $("#cart-content").toggle("blind", "", 500);
  });

  // Scroll to top
  $("#back-to-top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  // Add to cart logic
  $(document).on("submit", ".food-menu-box form", function (event) {
    event.preventDefault();
    const name = $(this).find("h4").text();
    const price = parseFloat($(this).find(".food-price").text().replace("$", ""));
    const qty = parseInt($(this).find("input[type='number']").val());

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
      cart[index].qty += qty;
    } else {
      cart.push({ name, price, qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  // Delete item from cart
  $(document).on("click", ".btn-delete", function (event) {
    event.preventDefault();
    const index = $(this).data("index");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  function getImageFileName(name) {
    switch (name.toLowerCase()) {
      case "pizza":
        return "p1.jpg";
      case "sandwich":
        return "s1.jpg";
      case "burger":
        return "b1.jpg";
      default:
        return "default.jpg"; // fallback image
    }
  }

  function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartHTML = "";
    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
      const rowTotal = item.price * item.qty;
      total += rowTotal;
      totalItems += item.qty;

      const imgFile = getImageFileName(item.name);
      cartHTML += `
        <tr>
          <td><img src="img/food/${imgFile}" alt="Food" style="width: 50px;"></td>
          <td>${item.name}</td>
          <td>$ ${item.price.toFixed(2)}</td>
          <td>${item.qty}</td>
          <td>$ ${(rowTotal).toFixed(2)}</td>
          <td><a href="#" class="btn-delete" data-index="${index}">&times;</a></td>
        </tr>`;
    });

    cartHTML += `<tr><th colspan="4">Total</th><th>$${total.toFixed(2)}</th><th></th></tr>`;
    $(".cart-table").html(cartHTML);

    // 🔢 Update cart badge
    $(".shopping-cart .badge").text(totalItems);
  }

  // Initialize cart on load
  renderCart();
});
