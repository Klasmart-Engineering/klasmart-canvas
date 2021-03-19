export interface IStamp {
  stamp: string;
  quantity: number;
}

export interface INewStamp {
  studentId: string;
  stamp: string;
}

export interface IPortfolio {
  studentId: string;
  studentStamps: IStamp[];
}
