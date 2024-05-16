import { IBank } from '../banks';

export interface ITransaction {
  _id: string;
  amount: number;
  concept: string;
  bank: IBank;
  store: string;
  date: string;
  additionalComments: string;
  isReserved: boolean;
  isPaid: boolean;
  active: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
