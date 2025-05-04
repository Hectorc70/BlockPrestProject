
export interface IUser {
  fullname: string;
  wallet: string;
  email: string;
  rol: 'lender' | 'merchant';
}

export class UserModel implements IUser {
  fullname: string = '';
  wallet: string = '';
  email: string = '';
  rol: 'lender' | 'merchant' = 'lender';
  constructor(data: IUser) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
