document.getElementById('profileForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = event.target.firstName.value;
  const lastName = event.target.lastName.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;
  const userImage = event.target.userImage.files[0];

  // Read the image file
  const reader = new FileReader();
  reader.onload = function(e) {
    const imageUrl = e.target.result;

    // Create a new card element
    const newCard = document.createElement('div');
    newCard.className = 'col';
    newCard.innerHTML = `
      <div class=" card-content row shadow-effect wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect" style="display:flex; justify-content:center;">
        <div class=" col icon-lg m-b20">
          <img src="${imageUrl}" class="card-avatar" alt="Profile Image">
          <div class="icon-content">
            <h5 class="wt-tilte">${firstName} ${lastName}</h5>
            <p class="wt-tilte">Email: ${email}<br>Phone: ${phone}</p>
          </div>
        </div>
      </div>
    `;

    // Append the new card to the userCards div
    document.getElementById('userCards').appendChild(newCard);

    // Save the user data to local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ firstName, lastName, email, phone, imageUrl });
    localStorage.setItem('users', JSON.stringify(users));

    // Reset the form
    event.target.reset();
    document.getElementById('imagePreview').style.display = 'none';
  };
  reader.readAsDataURL(userImage);
});

document.getElementById('userImage').addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('imagePreview').src = e.target.result;
      document.getElementById('imagePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// Load user data from local storage on page load
window.addEventListener('load', function() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach(user => {
    const newCard = document.createElement('div');
    newCard.className = 'col';
    newCard.innerHTML = `
      <div class="row card-content shadow-effect wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect" style="display:flex; justify-content:center;">
        <div class=" col icon-lg m-b20" style="justify-content:center;align-item:center; ">
          <img src="${user.imageUrl}" class="card-avatar" alt="Profile Image">
          <div class="icon-content" >
            <h5 class="wt-tilte">${user.firstName} ${user.lastName}</h5>
            <p class="wt-tilte">Email: ${user.email}<br>Phone: ${user.phone}</p>
          </div>
        </div>
      </div>
    `;
    document.getElementById('userCards').appendChild(newCard);
  });
});