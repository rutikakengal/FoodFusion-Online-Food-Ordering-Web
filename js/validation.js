function contactForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const sub = document.getElementById("subject").value;

    const nameErr = document.getElementById("name-error");
    const emailErr = document.getElementById("email-error");
    const phoneErr = document.getElementById("phone-error");
    const subErr = document.getElementById("subject-error");

    nameErr.textContent = "";
    emailErr.textContent = "";
    phoneErr.textContent = "";
    subErr.textContent = "";

    let isValid = true;


    const nameRegex = /^[a-zA-Z]{1,30}$/;
    if (!nameRegex.test(name)) {
        nameErr.textContent = "Enter your name properly.";
        isValid = false;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
        emailErr.textContent = "Enter your valid email address.";
        isValid = false;
    }

    const phoneRegex = /^\d{3} \d{3} \d{4}$/;
    if (!phoneRegex.test(phone)) {
        phoneErr.textContent = "Enter your phone number.";
        isValid = false;
    }
    if (sub === "") {
        subErr.textContent = "Enter your subject.";
        isValid = false;
    }
    if (isValid) {
        alert("Form submitted successfully!");
        return true;
    } else {
        return false;
    }
}

function resetErrors() {
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("phone-error").textContent = "";
    document.getElementById("subject-error").textContent = "";
}


function loginForm() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const emailErr = document.getElementById("email-error-login");
    const passwordErr = document.getElementById("password-error");

    emailErr.textContent = "";
    passwordErr.textContent = "";

    let isValid = true;

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
        emailErr.textContent = "Enter your valid email address.";
        isValid = false;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


    if (!passwordRegex.test(password)) {
        passwordErr.textContent = "Enter your password contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.";
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
        return true;
    } else {
        return false;
    }
}



function resetErrorslogin() {

    document.getElementById("email-error-login").textContent = "";
    document.getElementById("password-error").textContent = "";

}


function orderForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const nameErr = document.getElementById("name-error");
    const emailErr = document.getElementById("email-error");
    const phoneErr = document.getElementById("phone-error");
    const addressErr = document.getElementById("address-error");

    nameErr.textContent = "";
    emailErr.textContent = "";
    phoneErr.textContent = "";
    addressErr.textContent = "";

    let isValid = true;

    const nameRegex = /^[a-zA-Z]{1,30}$/;
    if (!nameRegex.test(name)) {
        nameErr.textContent = "Enter your name properly.";
        isValid = false;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;;
    if (!emailRegex.test(email)) {
        emailErr.textContent = "Enter your valid email address.";
        isValid = false;
    }

    const phoneRegex = /^\d{3} \d{3} \d{4}$/;
    if (!phoneRegex.test(phone)) {
        phoneErr.textContent = "Enter your phone number .";
        isValid = false;
    }

    // const addressRegex = /^(\d{1,}) [a-zA-Z0-9\s]+(\,)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}$/;
    // const addressRegex = /^(\d{1,}) [a-zA-Z0-9\s]+(\,)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}$/;
    const addressRegex = /^[a-zA-Z\s.,'-]+$/;

    if (!addressRegex.test(address)) {
        addressErr.textContent = "Enter your address.";
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
        return true;
    } else {
        return false;
    }
}

function resetOrderErrors() {
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("phone-error").textContent = "";
    document.getElementById("address-error").textContent = "";
}
