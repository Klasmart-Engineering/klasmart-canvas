import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import IStyleForIcon from './style-for-icon';

export default interface ISpecialButton {
  index: number;
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  style: IStyleForIcon;
  selected: boolean;
  onClick: (index: number) => void;
}
