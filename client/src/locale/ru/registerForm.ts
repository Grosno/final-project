const registerForm = {
  title: 'Регистрация',
  fields: {
    firstName: 'Имя',
    lastName: 'Фамилия',
    gender: 'Пол',
    dateOfBirth: 'Дата рождения',
    phone: 'Номер телефона',
  },
  placeholder: {
    inputName: 'Введите имя',
    inputLastName: 'Введите фамилию',
    genderMale: 'Мужчина',
    genderFemale: 'Женщина',
    chooseDate: 'Выберите дату',
  },
  buttonRegister: 'Зарегистрироваться',
  haveAnAccount: 'Уже есть аккаунт?',
  toLogin: 'Войти',
  validate: {
    firstName: {
      inputName: 'Введите свое имя',
      errorLength: 'Длина имени должна быть от 2 до 50 символов',
      errorLetter: 'Имя должно содержать буквы латинского алфавита или кирилицы',
      errorSpace: 'Имя не должно содержать пробелов',
    },
    lastName: {
      inputLastName: 'Введите свою фамилию',
      errorLength: 'Длина фамилии должна быть от 2 до 50 символов',
      errorLetter: 'Фамилия должна содержать буквы латинского алфавита или кирилицы',
      errorSpace: 'Фамилия не должна содержать пробелов',
    },
    gender: 'Укаживет ваш пол',
    dateOfBirth: 'Введите дату рождения',
    email: {
      inputEmail: 'Введите e-mail',
      errorEmail: 'Введите корректный e-mail (например, any@example.com)',
    },
    phone: {
      inputPhone: 'Введите свой номер телефона',
      errorLetter: 'Номер телефона должен содержать только цифры',
      errorSpace: 'Введите номер телефона без пробелов',
    },
  },
};

export default registerForm;
