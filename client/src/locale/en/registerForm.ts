const registerForm = {
  title: 'Registration',
  fields: {
    firstName: 'First Name',
    lastName: 'Last Name',
    gender: 'Gender',
    dateOfBirth: 'Date of birth',
    phone: 'Phone number',
  },
  placeholder: {
    inputName: 'Enter your first name',
    inputLastName: 'Enter your last name',
    genderMale: 'Male',
    genderFemale: 'Female',
    chooseDate: 'Choose date',
  },
  buttonRegister: 'Register',
  haveAnAccount: 'Already have an account?',
  toLogin: 'Login',
  validate: {
    firstName: {
      inputName: 'Please enter your name',
      errorLength: 'Name length must be between 2 and 50 characters',
      errorLetter: 'The name must contain letters of the Latin alphabet and Cyrillic',
      errorSpace: 'The name must not contain spaces',
    },
    lastName: {
      inputLastName: 'Please enter your lastname',
      errorLength: 'Lastname length must be between 2 and 50 characters',
      errorLetter: 'The lastname must contain letters of the Latin alphabet and Cyrillic',
      errorSpace: 'The lastname must not contain spaces',
    },
    gender: 'Indicates your gender',
    dateOfBirth: 'Enter your date of birth',
    email: {
      inputEmail: 'Enter e-mail',
      errorEmail: 'Please enter a valid e-mail (for example, any@example.com)',
    },
    phone: {
      inputPhone: 'Enter your phone number',
      errorLetter: 'Phone number must contain only numbers',
      errorSpace: 'Enter your phone number without spaces',
    },
  },
};

export default registerForm;
