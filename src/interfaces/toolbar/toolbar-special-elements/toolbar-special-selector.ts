import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';
import IStyleOption from './style-option';

export default interface ISpecialSelector {
  id: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  styleOptions: IStyleOption[];
  selected: boolean;
  onClick: (tool: string) => void;
  onChange: (tool: string, valueId: string) => void;
}
