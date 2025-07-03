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
    updateCartCount();
  });

  // Update Cart Count Badge
  function updateCartCount() {
    const itemCount = $("#cart-content .cart-table .cart-item").length;
    $("#cart-count").text(itemCount);
  }

  // Update Total Price JS
  function updateTotal() {
    let totalNav = 0;
    let totalOrder = 0;

    $("#cart-content .cart-table .cart-item").each(function () {
      const price = parseFloat($(this).find(".price").text().replace("$", "").trim());
      const qty = parseInt($(this).find(".qty").text().trim());

      if (!isNaN(price) && !isNaN(qty)) {
        const itemTotal = price * qty;
        $(this).find(".total").text("$ " + itemTotal.toFixed(2));
        totalNav += itemTotal;
      }
    });

    $("#cart-total-nav").text("$" + totalNav.toFixed(2));

    $(".order .tbl-full .cart-item").each(function () {
      const price = parseFloat($(this).find(".price").text().replace("$", "").trim());
      const qty = parseInt($(this).find(".qty").text().trim());

      if (!isNaN(price) && !isNaN(qty)) {
        const itemTotal = price * qty;
        $(this).find(".total").text("$ " + itemTotal.toFixed(2));
        totalOrder += itemTotal;
      }
    });

    $("#cart-total-order").text("$" + totalOrder.toFixed(2));
  }

  // Call both functions on load
  updateTotal();
  updateCartCount();
});
