export default interface ToolbarButtonModel {
  index: number;
  iconSrc: string;
  iconName: string;
  selected: boolean;
  onChildClick: (index: number) => void;
}
