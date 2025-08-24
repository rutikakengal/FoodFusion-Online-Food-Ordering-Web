$(document).ready(function () {
  $("#report-fraud-form").on("submit", function (e) {
    e.preventDefault();

    const nameInput = $("#name-input");
    const emailInput = $("#email-input");
    const fraudType = $("#fraud-type");
    const fraudDetails = $("#fraud-details");
    const successMsg = $("#report-success");

    const name = nameInput.val().trim();
    const email = emailInput.val().trim();
    const type = fraudType.val();
    const details = fraudDetails.val().trim();

    if (name && email && type && details) {
      // Simulate sending data to backend
      nameInput.val("");
      emailInput.val("");
      fraudType.val("");
      fraudDetails.val("");

      successMsg
        .text("Report submitted successfully! Our team will review it shortly.")
        .show();
      setTimeout(function () {
        successMsg.fadeOut(500);
      }, 3000);
    } else {
      successMsg
        .text("Please fill out all fields.")
        .css("color", "#e74c3c")
        .show();
      $(".form-group").addClass("shake");
      setTimeout(function () {
        $(".form-group").removeClass("shake");
        successMsg.fadeOut(500);
      }, 3000);
    }
  });

  // Ripple effect on button click
  $(".btn-report").on("click", function (e) {
    const btn = $(this);
    const x = e.pageX - btn.offset().left;
    const y = e.pageY - btn.offset().top;

    const ripple = $('<span class="ripple"></span>');
    ripple.css({
      left: x,
      top: y,
    });
    btn.append(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});
