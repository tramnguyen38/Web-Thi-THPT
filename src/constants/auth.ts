export const FORM_LOGIN = Object.freeze({
  email: "email",
  password: "password",
} as const);

export const FORM_SIGN = Object.freeze({
  ...FORM_LOGIN,
  name: "name",
} as const);
