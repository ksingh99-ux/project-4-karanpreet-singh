document.addEventListener("DOMContentLoaded", function () {

  // highlight current page
  var currentPage = window.location.pathname.split("/").pop();

  var navLinks = document.querySelectorAll("#nav ul li a");
  navLinks.forEach(function (link) {
    var linkHref = link.getAttribute("href");

    if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
      link.classList.add("active");
    }
  });


  // contact form
  var contactForm = document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // stop submit

      clearErrors(); // remove old errors

      // get values
      var name = document.getElementById("name").value.trim();
      var phone = document.getElementById("phone").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();

      var isValid = true;

      // name check
      if (name === "") {
        showError("nameError", "Name cannot be empty.");
        isValid = false;
      }

      // phone check (10 digits)
      var phonePattern = /^\d{10}$/;
      if (phone === "") {
        showError("phoneError", "Phone number cannot be empty.");
        isValid = false;
      } else if (!phonePattern.test(phone)) {
        showError("phoneError", "Phone must be 10 digits.");
        isValid = false;
      }

      // email check
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "") {
        showError("emailError", "Email cannot be empty.");
        isValid = false;
      } else if (!emailPattern.test(email)) {
        showError("emailError", "Enter valid email.");
        isValid = false;
      }

      // message check
      if (message === "") {
        showError("messageError", "Message cannot be empty.");
        isValid = false;
      }

      // success
      if (isValid) {
        var successDiv = document.getElementById("successMsg");

        if (successDiv) {
          successDiv.style.display = "block";
        }

        contactForm.reset();

        setTimeout(function () {
          successDiv.style.display = "none";
        }, 5000);
      }
    });

    // reset button
    var resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        clearErrors();

        var successDiv = document.getElementById("successMsg");
        if (successDiv) {
          successDiv.style.display = "none";
        }
      });
    }
  }

  // show error
  function showError(elementId, message) {
    var el = document.getElementById(elementId);
    if (el) {
      el.textContent = message;
      el.style.display = "block";
    }
  }

  // clear all errors
  function clearErrors() {
    var errors = document.querySelectorAll(".error-msg");
    errors.forEach(function (el) {
      el.textContent = "";
      el.style.display = "none";
    });
  }

});