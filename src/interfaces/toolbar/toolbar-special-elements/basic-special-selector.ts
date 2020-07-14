import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';
import IStyleOptions from './style-option';

export default interface IBasicSpecialSelector {
  id: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  styleOptions: IStyleOptions[];
}
