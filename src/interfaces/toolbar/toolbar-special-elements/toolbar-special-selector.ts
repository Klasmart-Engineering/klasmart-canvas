import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';
import IStyleOption from './style-option';

export default interface ISpecialSelector {
  index: number;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  styleOptions: IStyleOption[];
  selected: boolean;
  onClick: (index: number) => void;
  onChange: (index: number, value: string) => void;
}
