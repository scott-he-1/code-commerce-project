export const handleSignInSwitch = () => {
  const signInSection = document.getElementById('signInSection');
  const createAccountSection = document.getElementById('createAccountSection');
  createAccountSection.classList.remove('active');
  signInSection.classList.add('active');
}

export const handleCreateAccountSwitch = () => {
  const signInSection = document.getElementById('signInSection');
  const createAccountSection = document.getElementById('createAccountSection');
  signInSection.classList.remove('active');
  createAccountSection.classList.add('active');
}