// The correct PIN
const correctPin = "7423";

// Elements
const pinInput = document.getElementById('pin');
const pinSubmit = document.getElementById('pin-submit');
const pinError = document.getElementById('pin-error');
const pinSection = document.getElementById('pin-section');
const loginSection = document.getElementById('login-section');

// Event listener for PIN submit
pinSubmit.addEventListener('click', () => {
    const enteredPin = pinInput.value.trim();
    if (enteredPin === correctPin) {
        // Correct PIN - Show login section
        pinSection.style.display = 'none';
        loginSection.style.display = 'block';
    } else {
        // Incorrect PIN - Show error message
        pinError.style.display = 'block';
    }
});

// Hide error message when typing
pinInput.addEventListener('input', () => {
    pinError.style.display = 'none';
});
