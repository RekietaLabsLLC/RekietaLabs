// Initialize Appwrite SDK
const appwrite = new Appwrite();
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = 'staffportal';

// Set Appwrite endpoint and project
appwrite.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

// Pin validation
const pinForm = document.getElementById('pin-form');
const loginSection = document.getElementById('login-section');
const pinInput = document.getElementById('pin');
const errorDiv = document.getElementById('pin-error');
const CORRECT_PIN = '7423';

pinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredPin = pinInput.value.trim();

    if (enteredPin === CORRECT_PIN) {
        // Show login section and hide pin section
        pinForm.style.display = 'none';
        loginSection.style.display = 'block';
    } else {
        errorDiv.textContent = 'Invalid PIN. Please try again.';
        pinInput.value = '';
    }
});

// Handle GitHub OAuth Login
const githubLoginButton = document.getElementById('github-login');
githubLoginButton.addEventListener('click', () => {
    appwrite.account.createOAuth2Session('github')
        .then(() => {
            console.log('Redirecting to GitHub login...');
        })
        .catch((error) => {
            console.error('GitHub login failed:', error);
            alert('Something went wrong while logging in. Please try again.');
        });
});
