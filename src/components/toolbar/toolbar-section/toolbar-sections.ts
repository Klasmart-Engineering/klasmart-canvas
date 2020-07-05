import textIcon from '../../../assets/icons/letter-a.svg';
import blackCircle from '../../../assets/icons/black-circle.svg';
import redCircle from '../../../assets/icons/red-circle.svg';
import yellowCircle from '../../../assets/icons/yellow-circle.svg';
import greenCircle from '../../../assets/icons/green-circle.svg';
import blueCircle from '../../../assets/icons/blue-circle.svg';
import pinkCircle from '../../../assets/icons/pink-circle.svg';
import brownCircle from '../../../assets/icons/brown-circle.svg';
import addShape from '../../../assets/icons/add-shape.svg';
import removeShape from '../../../assets/icons/remove-shape.svg';
import rectangleShape from '../../../assets/icons/rectangle-shape.svg';
import triangleShape from '../../../assets/icons/triangle-shape.svg';
import circleShape from '../../../assets/icons/circle-shape.svg';
import IBasicToolbarSection from '../../../interfaces/toolbar/toolbar-section/basic-toolbar-section';

const colorPaletteSection: IBasicToolbarSection = {
  selected: 0,
  elements: [
    { iconSrc: blackCircle, iconName: 'Black Color Icon' },
    { iconSrc: redCircle, iconName: 'Red Color Icon' },
    { iconSrc: yellowCircle, iconName: 'Yellow Color Icon' },
    { iconSrc: greenCircle, iconName: 'Green Color Icon' },
    { iconSrc: blueCircle, iconName: 'Blue Color Icon' },
    { iconSrc: pinkCircle, iconName: 'Pink Color Icon' },
    { iconSrc: brownCircle, iconName: 'Brown Color Icon' },
  ],
};

const toolsSection: IBasicToolbarSection = {
  selected: 0,
  elements: [
    { iconSrc: textIcon, iconName: 'Text Icon' },
    {
      options: [
        {
          index: 0,
          iconSrc: rectangleShape,
          iconName: 'Rectangle',
        },
        {
          index: 1,
          iconSrc: triangleShape,
          iconName: 'Triangle',
        },
        {
          index: 2,
          iconSrc: circleShape,
          iconName: 'Circle',
        },
      ],
    },
  ],
};

const actionsSection: IBasicToolbarSection = {
  selected: 0,
  elements: [
    { iconSrc: addShape, iconName: 'Red Shape Icon' },
    { iconSrc: removeShape, iconName: 'Remove Shape Icon' },
  ],
};

export { colorPaletteSection, toolsSection, actionsSection };
