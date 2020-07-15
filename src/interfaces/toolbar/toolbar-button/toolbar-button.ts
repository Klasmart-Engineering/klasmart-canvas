export default interface IToolbarButton {
  index: number;
  title: string;
  iconSrc: string;
  iconName: string;
  selected: boolean;
  onClick: (index: number) => void;
}
