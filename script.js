const form =
document.getElementById("regform");

const nameInput =
document.getElementById("name");
const emailInput =
document.getElementById("email");
const passwordInput =
document.getElementById("password");
const confirmPasswordInput =
document.getElementById("confirm-password");

const genderInput =
document.getElementById("gender");
const dobInput =
document.getElementById("dob");
const countryInput =
document.getElementById("country");
const phoneInput =
document.getElementById("phone");
const bioInput =
document.getElementById("bio");

const nameError =
document.getElementById("nameError");
const emailError =
document.getElementById("emailError");
const passwordError =
document.getElementById("passwordError");
const confirmError =
document.getElementById("confirmError");
const genderError =
document.getElementById("genderError");
const dobError =
document.getElementById("dobError");
const countryError =
document.getElementById("countryError");
const phoneError =
document.getElementById("phoneError");
const bioError =
document.getElementById("bioError");

const successMsg =
document.getElementById("successMsg");
const memberList =
document.getElementById("memberList");
const memberCount =
document.getElementById("count");
const darkModeButton =
document.getElementById("theme");

// Check whether Javascript has found the elements
console.log("Form:",form);
console.log("Name input:",nameInput);
console.log("Email input:",emailInput);
console.log("Password input:",passwordInput);
console.log("Confirm password:",confirmPasswordInput);
console.log("Gender:",genderInput);
console.log("Date of birth:",dobInput);
console.log("Country:",countryInput);
console.log("Phone:",phoneInput);
console.log("Bio:",bioInput);
console.log("Name error:",nameError);
console.log("Email error:",emailError);
console.log("Password error:",passwordError);
console.log("Confirm error:",confirmError);
console.log("Gender error:",genderError);
console.log("Date of birth error:",dobError);
console.log("Country error:",countryError);
console.log("Phone error:",phoneError);
console.log("Bio error:",bioError);
console.log("Success mmessage:",successMsg);
console.log("Member list:",memberList);
console.log("Member counter:",memberCount);
console.log("Dark Mode Button:",darkModeButton);

const allErrors = [
  nameError, emailError, passwordError, confirmError,
  genderError, dobError, countryError, phoneError, bioError
];

let totalMembers = 0;

function clearErrors() {
  allErrors.forEach(function (el) {
    el.textContent = "";
  });
}

function validateForm() {
  let valid = true;

  if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Enter your full name (at least 2 characters).";
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Enter a valid email address.";
    valid = false;
  }

  if (passwordInput.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
    valid = false;
  }

  if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value === "") {
    confirmError.textContent = "Passwords do not match.";
    valid = false;
  }

  if (genderInput.value === "") {
    genderError.textContent = "Please select a gender.";
    valid = false;
  }

  if (dobInput.value === "") {
    dobError.textContent = "Please enter your date of birth.";
    valid = false;
  } else if (new Date(dobInput.value) > new Date()) {
    dobError.textContent = "Date of birth cannot be in the future.";
    valid = false;
  }

  if (countryInput.value.trim() === "") {
    countryError.textContent = "Please enter your country.";
    valid = false;
  }

  const phonePattern = /^\+?[0-9\s-]{9,15}$/;
  if (!phonePattern.test(phoneInput.value.trim())) {
    phoneError.textContent = "Enter a valid phone number.";
    valid = false;
  }

  if (bioInput.value.trim().length < 10) {
    bioError.textContent = "Bio must be at least 10 characters.";
    valid = false;
  }

  return valid;
}

function addMemberToList(name, email, country) {
  const emptyNote = document.getElementById("emptyNote");
  if (emptyNote) {
    emptyNote.remove();
  }

  const li = document.createElement("li");
  li.textContent = name + " (" + email + ") - " + country;
  memberList.appendChild(li);

  totalMembers++;
  memberCount.textContent = totalMembers;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Submit clicked");
  clearErrors();

  if (!validateForm()) {
    console.log("Validation failed");
    return;
  }

  addMemberToList(
    nameInput.value.trim(),
    emailInput.value.trim(),
    countryInput.value.trim()
  );

  successMsg.textContent = "Registration successful!";
  successMsg.classList.remove("hidden");
  setTimeout(function () {
    successMsg.classList.add("hidden");
  }, 3000);

  form.reset();
});

// ----- Dark mode -----
darkModeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  darkModeButton.textContent = document.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
});