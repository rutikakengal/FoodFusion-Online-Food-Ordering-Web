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

$(document).ready(function () {
  updateTotal();
});

// Shopping Cart Toggle JS
  $("#shopping-cart").on("click", function () {
    $("#cart-content").toggle("blind", "", 500);
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
    if ($(this).hasClass("total-row")) return;

    const qtyText = $(this).find("td:nth-child(3)").text().trim();
    const priceText = $(this).find("td:nth-child(4)").text().replace("$", "").trim();

    const qty = parseInt(qtyText, 10);
    const price = parseFloat(priceText);

    if (!isNaN(qty) && !isNaN(price)) {
      total += qty * price;
    }
  });

  $("#cart-total").text("$" + total.toFixed(2));
}
});


