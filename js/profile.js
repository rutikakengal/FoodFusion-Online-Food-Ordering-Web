// Profile card JS (edit, orders, home, picture upload)
document.addEventListener('DOMContentLoaded', function() {
  var ordersBtn = document.getElementById('my-orders-btn');
  var ordersSection = document.getElementById('orders-section');
  var homeBtn = document.getElementById('home-btn');
  var editBtn = document.getElementById('edit-profile-btn');
  var editForm = document.getElementById('edit-profile-form');
  var cancelEditBtn = document.getElementById('cancel-edit-btn');
  var removePicBtn = document.getElementById('remove-pic-btn');
  var userName = document.getElementById('user-name');
  var userEmail = document.getElementById('user-email');
  var userAddress = document.getElementById('user-address');
  var editName = document.getElementById('edit-name');
  var editEmail = document.getElementById('edit-email');
  var editAddress = document.getElementById('edit-address');
  var profilePicture = document.getElementById('profile-picture');
  var uploadPicture = document.getElementById('upload-picture');

  // Load profile picture from localStorage if available, but only if not default
  var defaultLogo = 'img/logo.svg';
  var storedPic = localStorage.getItem('profilePicture');
  if (!storedPic || storedPic === defaultLogo) {
    profilePicture.src = defaultLogo;
    localStorage.removeItem('profilePicture');
  } else {
    profilePicture.src = storedPic;
  }

  // Handle profile picture upload
  if (uploadPicture) {
    uploadPicture.addEventListener('change', function(e) {
      var file = e.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function(evt) {
          profilePicture.src = evt.target.result;
          localStorage.setItem('profilePicture', evt.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        // If no file is chosen, remove custom picture and show default logo
        profilePicture.src = defaultLogo;
        localStorage.removeItem('profilePicture');
      }
    });
  }

  // Remove profile picture and reset to default logo
  if (removePicBtn) {
    removePicBtn.addEventListener('click', function() {
      profilePicture.src = defaultLogo;
      localStorage.removeItem('profilePicture');
      if (uploadPicture) uploadPicture.value = '';
    });
  }

  if (ordersBtn && ordersSection) {
    ordersBtn.addEventListener('click', function() {
      if (ordersSection.style.display === 'none' || ordersSection.style.display === '') {
        ordersSection.style.display = 'block';
      } else {
        ordersSection.style.display = 'none';
      }
    });
  }
  if (homeBtn) {
    homeBtn.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }
  if (editBtn && editForm) {
    editBtn.addEventListener('click', function() {
      editForm.style.display = 'block';
      editName.value = userName.textContent.replace('Welcome, ', '');
      editEmail.value = userEmail.textContent;
      editAddress.value = userAddress.textContent;
    });
  }
  if (cancelEditBtn && editForm) {
    cancelEditBtn.addEventListener('click', function() {
      editForm.style.display = 'none';
    });
  }
  if (editForm) {
    editForm.addEventListener('submit', function(e) {
      e.preventDefault();
      userName.textContent = 'Welcome, ' + editName.value;
      userEmail.textContent = editEmail.value;
      userAddress.textContent = editAddress.value;
      editForm.style.display = 'none';
    });
  }
});
