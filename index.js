document.addEventListener('DOMContentLoaded', () => {
  // ✅ 1. Page load fade-in animation
  function loadAnimation() {
    document.body.classList.add('body-load');
  }
  loadAnimation();

  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      loadAnimation();
    }
  });

  // ✅ 2. Form elements
  const form = document.querySelector('form');

  const avatarImg = document.getElementById('avatarImg');
  const avatarImgPreview = document.querySelector('#avatarImgPreview img');
  const avatarImgPreviewWrapper = document.getElementById('avatarImgPreview');
  const avatarImgError = document.getElementById('avatarImgError');

  const avatarName = document.getElementById('avatarName');
  const avatarEmail = document.getElementById('avatarEmail');
  const avatarGit = document.getElementById('avatarGit');

  const avatarEmailError = document.getElementById('avatarEmailError');
  const avatarGitError = document.getElementById('avatarGitError');

  const tyName = document.getElementById('tyName');
  const tyEmail = document.getElementById('tyEmail');
  const tyTicketImg = document.getElementById('tyTicketImg');
  const tyTicketName = document.getElementById('tyTicketName');
  const tyTicketGit = document.getElementById('tyTicketGit');
  const tyTicketNumber = document.getElementById('tyTicketNumber');

  const clearForm = document.querySelector('.btn-close');

  // ✅ 3. Helpers
  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function isValidGitHandle(git) {
    return git.startsWith('@') && git.length > 1;
  }

  // ✅ 4. Avatar image validation
  avatarImg.addEventListener('change', function () {
    const file = avatarImg.files[0];

    if (file) {
      const maxSizeKB = 500;
      const validTypes = ['image/jpeg', 'image/png'];

      const fileSizeKB = file.size / 1024;
      const fileType = file.type;

      const isSizeValid = fileSizeKB <= maxSizeKB;
      const isTypeValid = validTypes.includes(fileType);

      if (!isSizeValid || !isTypeValid) {
        avatarImgError.classList.add('show');
        avatarImgPreviewWrapper.style.display = 'none';
        avatarImg.value = '';
      } else {
        avatarImgError.classList.remove('show');

        const reader = new FileReader();
        reader.onload = function (e) {
          avatarImgPreview.src = e.target.result;
          avatarImgPreviewWrapper.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    }
  });

  // ✅ 5. Blur validation
  avatarEmail.addEventListener('blur', function () {
    if (!isValidEmail(avatarEmail.value.trim())) {
      avatarEmailError.classList.add('show');
    } else {
      avatarEmailError.classList.remove('show');
    }
  });

  avatarGit.addEventListener('blur', function () {
    if (!isValidGitHandle(avatarGit.value.trim())) {
      avatarGitError.classList.add('show');
    } else {
      avatarGitError.classList.remove('show');
    }
  });

  // ✅ 6. Form submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const file = avatarImg.files[0];
    const nameValue = avatarName.value.trim();
    const emailValue = avatarEmail.value.trim();
    const gitValue = avatarGit.value.trim();

    let hasError = false;

    // Image file check
    if (!file) {
      avatarImgError.classList.add('show');
      hasError = true;
    }

    // Email check
    if (!isValidEmail(emailValue)) {
      avatarEmailError.classList.add('show');
      hasError = true;
    } else {
      avatarEmailError.classList.remove('show');
    }

    // Git handle check
    if (!isValidGitHandle(gitValue)) {
      avatarGitError.classList.add('show');
      hasError = true;
    } else {
      avatarGitError.classList.remove('show');
    }

    if (hasError) return;

    // ✅ Load uploaded image in ticket
    const reader = new FileReader();
    reader.onload = function (e) {
      tyTicketImg.src = e.target.result;
    };
    reader.readAsDataURL(file);

    // ✅ Update thank you ticket details
    tyName.textContent = nameValue;
    tyEmail.textContent = emailValue;
    tyTicketName.textContent = nameValue;
    tyTicketGit.textContent = gitValue;

    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    tyTicketNumber.textContent = `#${randomNum}`;

    // ✅ Show modal
    const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show();
  });

  // ✅ 7. Clear form when modal closed
  clearForm.addEventListener('click', function () {
    avatarName.value = '';
    avatarEmail.value = '';
    avatarGit.value = '';
    avatarImg.value = '';
    avatarImgPreview.src = '';
    tyTicketImg.src = '';
    tyTicketNumber.textContent = '';
    avatarImgPreviewWrapper.style.display = 'none';
    avatarImgError.classList.remove('show');
    avatarEmailError.classList.remove('show');
    avatarGitError.classList.remove('show');
  });
});
