export default interface IToolbarButton {
  iconSrc: string;
  iconName: string;
  index: number;
  selected: boolean;
  onChildClick: (index: number) => void;
}
