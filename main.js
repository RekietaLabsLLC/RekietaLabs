// Initialize Supabase
const SUPABASE_URL = 'https://ukwonuzabfejuymwhqop.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrd29udXphYmZlanV5bXdocW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MDgyOTEsImV4cCI6MjA1MTA4NDI5MX0.WDp-HgUQXXVmproGQ115Cn-Gm7vxOG-hTP90r0IPp8U';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', async () => {
  const currentPath = window.location.pathname;

  if (currentPath.includes('staff.html')) {
    // Handle Staff Login Page
    setupStaffLogin();
  } else if (currentPath.includes('dashboard')) {
    // Handle Dashboard Page
    setupDashboard();
  } else if (currentPath.includes('callback')) {
    // Handle Callback Page
    handleOAuthCallback();
  }
});

// Staff Login Page Logic
async function setupStaffLogin() {
  const githubLoginButton = document.getElementById('githubLogin');
  const errorDiv = document.getElementById('error');

  githubLoginButton.addEventListener('click', async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });

      if (error) {
        errorDiv.textContent = error.message;
      }
    } catch (err) {
      errorDiv.textContent = 'An unexpected error occurred.';
      console.error(err);
    }
  });
}

// Dashboard Page Logic
async function setupDashboard() {
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    // If the user is not authenticated, redirect to staff login
    window.location.href = '/staff.html';
    return;
  }

  // Fetch user-specific data
  const username = user.user_metadata.username || user.email;
  const dashboardContent = document.getElementById('dashboard-content');

  // Populate dashboard content
  dashboardContent.innerHTML = `
    <h1>Welcome, ${username}!</h1>
    <p>Your personalized dashboard is ready.</p>
  `;
}

// Callback Page Logic
async function handleOAuthCallback() {
  // Supabase automatically handles OAuth redirection. No extra logic is needed.
  const { data: session, error } = await supabase.auth.getSession();

  if (session) {
    // Redirect the user to their dashboard
    window.location.href = `/dashboard/${session.user.user_metadata.username || session.user.email}`;
  } else {
    console.error('Error retrieving session:', error);
    window.location.href = '/staff.html';
  }
}
