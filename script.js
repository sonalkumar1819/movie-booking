// script.js
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Example: Add your login validation logic here
    // You can validate the input fields and proceed with the login process
    
    // For demonstration, let's just alert the user of the login attempt
    alert(`Login attempted with Name: ${name}, Email: ${email}`);
    
    // Clear input fields after login attempt
    document.getElementById('loginForm').reset();
});
