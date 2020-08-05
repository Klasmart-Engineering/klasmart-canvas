export default interface IToolbarButton {
    id: string;
    title: string;
    iconSrc: string;
    iconName: string;
    active: boolean;
    onClick: (tool: string) => void;
}
