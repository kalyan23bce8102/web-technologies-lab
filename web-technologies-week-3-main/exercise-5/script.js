let currentStage = 1;
const totalStages = 4;
const userData = {};

const form = document.getElementById('workflowForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const progressBar = document.getElementById('progressBar');
const reviewBox = document.getElementById('reviewData');

function getStageValidation(stage) {
  const errors = {
    1: () => {
      const email = document.getElementById('email').value.trim();
      const pass = document.getElementById('pass').value;
      if (!email) return "Email is required";
      if (!email.includes('@') || !email.includes('.')) return "Please enter a valid email";
      if (pass.length < 6) return "Password must be at least 6 characters";
      return "";
    },
    2: () => {
      const fname = document.getElementById('fname').value.trim();
      const lname = document.getElementById('lname').value.trim();
      if (!fname) return "First name is required";
      if (!lname) return "Last name is required";
      return "";
    },
    3: () => {
      const bio = document.getElementById('bio').value.trim();
      if (bio.length > 0 && bio.length < 10) return "Bio should be at least 10 characters (or leave empty)";
      return "";
    },
    4: () => {
      if (!document.getElementById('terms').checked) return "You must agree to the terms";
      return "";
    }
  };
  return errors[stage]?.() || "";
}

function updateUI() {

  document.querySelectorAll('.form-stage').forEach((stage, index) => {
    stage.classList.toggle('active', index + 1 === currentStage);
  });

  const progress = (currentStage / totalStages) * 100;
  progressBar.style.width = `${progress}%`;

  prevBtn.classList.toggle('hidden', currentStage === 1);
  nextBtn.classList.toggle('hidden', currentStage === totalStages);
  submitBtn.classList.toggle('hidden', currentStage !== totalStages);

  document.querySelectorAll('.steps-labels span').forEach((label, i) => {
    label.classList.toggle('active', i + 1 <= currentStage);
  });

  if (currentStage === totalStages) {
    renderReview();
  }
}

function saveCurrentStage() {
  if (currentStage === 1) {
    userData.email = document.getElementById('email').value.trim();
    userData.password = document.getElementById('pass').value; // in real app → never store plain password
  }
  else if (currentStage === 2) {
    userData.firstName = document.getElementById('fname').value.trim();
    userData.lastName = document.getElementById('lname').value.trim();
  }
  else if (currentStage === 3) {
    userData.bio = document.getElementById('bio').value.trim();
  }
}

function renderReview() {
  reviewBox.innerHTML = `
    <p><strong>Email:</strong> ${userData.email || '—'}</p>
    <p><strong>Full Name:</strong> ${userData.firstName || ''} ${userData.lastName || ''}</p>
    <p><strong>Bio:</strong><br>${userData.bio ? userData.bio.substring(0, 180) + (userData.bio.length > 180 ? '...' : '') : 'Not provided'}</p>
  `;
}

function goNext() {
  const errorMsg = getStageValidation(currentStage);
  const errorEl = document.getElementById(`stage${currentStage}-error`);

  if (errorMsg) {
    errorEl.textContent = errorMsg;
    errorEl.style.display = 'block';
    return false;
  }

  errorEl.style.display = 'none';
  saveCurrentStage();
  currentStage++;
  updateUI();
  return true;
}

function goPrev() {
  if (currentStage > 1) {
    currentStage--;
    updateUI();
  }
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);

form.addEventListener('submit', e => {
  e.preventDefault();

  const errorMsg = getStageValidation(4);
  const errorEl = document.getElementById('stage4-error');

  if (errorMsg) {
    errorEl.textContent = errorMsg;
    errorEl.style.display = 'block';
    return;
  }

  errorEl.style.display = 'none';

  alert("Registration completed successfully!\n\n" + JSON.stringify(userData, null, 2));
  
});

updateUI();
