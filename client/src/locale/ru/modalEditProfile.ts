const modalEditProfile = {
  photo: {
    update: 'Обновить фотографию',
    delete: 'Удалить фотографию',
  },
  label: {
    name: 'Имя',
    lastName: 'Фамилия',
    gender: 'Пол',
    dateOfBirth: 'Дата рождения',
    phone: 'Телефон',
    image: 'Изображение',
  },
  btnSaveChanges: 'Сохранить изменения',
  validate: {
    firstName: {
      errorLength: 'Длина имени должна быть от 2 до 50 символов',
      errorLetter: 'Имя должно содержать буквы латинского алфавита или кирилицы',
      errorSpace: 'Имя не должно содержать пробелов',
    },
    lastName: {
      errorLength: 'Длина фамилии должна быть от 2 до 50 символов',
      errorLetter: 'Фамилия должна содержать буквы латинского алфавита или кирилицы',
      errorSpace: 'Фамилия не должна содержать пробелов',
    },
    phone: {
      errorLetter: 'Номер телефона должен содержать только цифры',
      errorSpace: 'Введите номер телефона без пробелов',
    },
  },
};

export default modalEditProfile;
