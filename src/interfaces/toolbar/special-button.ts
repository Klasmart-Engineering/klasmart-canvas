import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

export default interface ISpecialButton {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  style: any;
  index: number;
  selected: boolean;
  onChildClick: (index: number) => void;
}
