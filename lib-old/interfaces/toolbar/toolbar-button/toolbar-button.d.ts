export default interface IToolbarButton {
    id: string;
    title: string;
    iconSrc: string;
    iconName: string;
    active: boolean;
    enabled?: boolean | undefined;
    onClick: (tool: string) => void;
}
