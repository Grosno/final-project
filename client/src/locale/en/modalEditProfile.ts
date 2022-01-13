const modalEditProfile = {
  photo: {
    update: 'Update photo',
    delete: 'Delete photo',
  },
  label: {
    name: 'Name',
    lastName: 'Last Name',
    gender: 'Gender',
    dateOfBirth: 'Date of birth',
    phone: 'Phone',
    image: 'Image',
  },
  btnSaveChanges: 'Save changes',
  validate: {
    firstName: {
      errorLength: 'Name length must be between 2 and 50 characters',
      errorLetter: 'The name must contain letters of the Latin alphabet and Cyrillic',
      errorSpace: 'The name must not contain spaces',
    },
    lastName: {
      errorLength: 'Lastname length must be between 2 and 50 characters',
      errorLetter: 'The lastname must contain letters of the Latin alphabet and Cyrillic',
      errorSpace: 'The lastname must not contain spaces',
    },
    phone: {
      errorLetter: 'Phone number must contain only numbers',
      errorSpace: 'Enter your phone number without spaces',
    },
  },
};

export default modalEditProfile;
