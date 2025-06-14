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

  // Newsletter Subscription JS
  $( "#newsletter-form" ).on( "submit", function ( e )
  {
    e.preventDefault();

    const email = $( "#newsletter-email" ).val().trim();
    const msgBox = $( "#subscribe-msg" );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ( !emailRegex.test( email ) )
    {
      msgBox.css( "color", "red" ).text( "Please enter a valid email address." );
      return;
    }

    // Simulate success (you can later connect this to backend/API)
    console.log( "Subscribed email:", email );
    msgBox.css( "color", "lightgreen" ).text( "Thank you for subscribing! 🎉" );

    // Reset input field
    $( "#newsletter-email" ).val( "" );
  } );
  
});
