export interface IGroupedData {
  label: string;
  values: number[];
}

export interface IValue {
  label: string;
  value: number;
}

export interface IData {
  label: string;
  values: IValue[];
}

declare global {
  interface Window {
    countries: any
  }
}
