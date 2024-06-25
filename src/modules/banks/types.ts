export interface IBank {
  _id: string;
  name: string;
  logo: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBankSelect {
  _id: string;
  text: string;
  logo: string;
}
