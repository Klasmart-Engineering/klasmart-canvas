export default interface IToolbarButton {
  id: string;
  title: string;
  iconSrc: string;
  iconName: string;
  selected: boolean;
  onClick: (tool: string) => void;
}
