const
  namePattern = /^[A-Za-z]{3,16}$/,
  emailPattern = /^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,6}$/i,
  passPattern = /^[\S]{6,}$/;

export const dataValidation = (name, value) => {
  let msg = null;

  try {
    switch (name) {
      case "username":
        if (!value || !namePattern.test(value)) msg = "Please enter a valid name";
        break;
      case "email":
        if (!value || !emailPattern.test(value)) msg = "Please enter a valid email address";
        break;
      case "password":
        if (!value || !passPattern.test(value)) msg = "Password must contain at least 6 symbols";
        break;
      case "country":
        if (!value) msg = "You must select your country";
        break;
      case "gender":
        if (!value) msg = "You must select the gender";
        break;
      case "terms":
        if (!value) msg = "You must accept the policies";
        break;
      default:
        break;
    }
    return msg;
  } catch (error) {
    console.log(error);
  }
};
