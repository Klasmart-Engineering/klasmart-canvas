import IStyleForIcon from './style-for-icon';

export default interface IStyleOption {
  id: string;
  value: string | boolean | number;
  title: string;
  style: IStyleForIcon;
}
