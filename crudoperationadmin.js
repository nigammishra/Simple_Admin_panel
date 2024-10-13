// Function to open the Add User modal
function openAddUserModal() {
    document.getElementById('userForm').reset();
    document.getElementById('userModalLabel').textContent = 'Add New User';
    document.getElementById('editIndex').value = '';
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    $('#userModal').modal('show');
}

// Function to save a user
function saveUser() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const imageInput = document.getElementById('userImage');
    const editIndex = document.getElementById('editIndex').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageUrl = e.target.result;

        if (editIndex) {
            users[editIndex] = { name, email, imageUrl };
        } else {
            users.push({ name, email, imageUrl });
        }

        localStorage.setItem('users', JSON.stringify(users));
        updateUserTable();

        // Reset the form and hide the image preview
        document.getElementById('userForm').reset();
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = '#';
        imagePreview.style.display = 'none';
        
        $('#userModal').modal('hide');
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
        if (editIndex) {
            users[editIndex].name = name;
            users[editIndex].email = email;

            localStorage.setItem('users', JSON.stringify(users));
            updateUserTable();

            // Reset the form and hide the image preview
            document.getElementById('userForm').reset();
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = '#';
            imagePreview.style.display = 'none';
            
            $('#userModal').modal('hide');
        }
    }
}

// Function to edit a user
function editUser(button) {
    const row = button.parentNode.parentNode.parentNode;
    const index = row.rowIndex - 1;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];

    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('editIndex').value = index;
    document.getElementById('userModalLabel').textContent = 'Edit User';
    
    // Set the image preview
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = user.imageUrl;
    imagePreview.style.display = 'block';
    
    $('#userModal').modal('show');
}

// Function to delete a user
function deleteUser(button) {
    const row = button.parentNode.parentNode.parentNode;
    const index = row.rowIndex - 1;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);

    localStorage.setItem('users', JSON.stringify(users));
    updateUserTable();
}

// Function to update the user table
function updateUserTable() {
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    userTable.innerHTML = '';
    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach((user, index) => {
        const newRow = userTable.insertRow();
        newRow.innerHTML = `
            <td><img class="circle" src="${user.imageUrl}" alt="user"></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="text-primary">
                <div class="action-btn-group float-right d-flex">
                    <button type="button" class="custom-action-btn btn btn-primary mr-2 edit-btn" onclick="editUser(this)">Edit</button>
                    <button type="button" class="custom-action-btn btn btn-danger delete-btn" onclick="deleteUser(this)">Delete</button>
                </div>
            </td>
        `;
    });
}

// Load users from local storage when the page loads
window.onload = function() {
    updateUserTable();
}

document.getElementById('userImage').addEventListener('change', function(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function() {
        const dataURL = reader.result;
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = dataURL;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
});
