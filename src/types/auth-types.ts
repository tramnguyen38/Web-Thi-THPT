import { IUser } from "./user-type";

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface IResponseLogin {
  tokens: ITokens;
  user: IUser;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface ILogIn {
  email: string;
  password: string;
}
