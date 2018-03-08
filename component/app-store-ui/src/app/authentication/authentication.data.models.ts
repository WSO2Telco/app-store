export class SigUpUserParam {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export class ResetPasswordParam{
  currentPassword:string;
  newPassword:string;
}
