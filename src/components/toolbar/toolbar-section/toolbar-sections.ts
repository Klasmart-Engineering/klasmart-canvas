import textIcon from '../../../assets/icons/letter-a.svg';
import pointer from '../../../assets/icons/pointer.svg';
import hand from '../../../assets/icons/hand.svg';
import crosshair from '../../../assets/icons/crosshair.svg';
import laser from '../../../assets/icons/point.svg';
import left from '../../../assets/icons/left.svg';
import right from '../../../assets/icons/right.svg';
import up from '../../../assets/icons/up.svg';
import down from '../../../assets/icons/down.svg';
import trash from '../../../assets/icons/trash.svg';
import eraser from '../../../assets/icons/eraser.svg';
import pen from '../../../assets/icons/pen.svg';
import pencil from '../../../assets/icons/pencil.svg';
import felt from '../../../assets/icons/felt.svg';
import crayon from '../../../assets/icons/crayon.svg';
import chalk from '../../../assets/icons/chalk.svg';
import paintBrush from '../../../assets/icons/paint-brush.svg';
import marker from '../../../assets/icons/marker.svg';
import dashedPen from '../../../assets/icons/dashed-pen.svg';
import rectangleShape from '../../../assets/icons/rectangle-shape.svg';
import triangleShape from '../../../assets/icons/triangle-shape.svg';
import circleShape from '../../../assets/icons/circle-shape.svg';
import pentagonShape from '../../../assets/icons/pentagon-shape.svg';
import starShape from '../../../assets/icons/star-shape.svg';
import chatBubbleShape from '../../../assets/icons/chat-bubble-shape.svg';
import move from '../../../assets/icons/move.svg';
import star from '../../../assets/icons/star.svg';
import emojiSmile from '../../../assets/icons/emoji-smile.svg';
import emojiLike from '../../../assets/icons/emoji-like.svg';
import emojiHello from '../../../assets/icons/emoji-hello.svg';
import emojiSleep from '../../../assets/icons/emoji-sleep.svg';
import emojiNervious from '../../../assets/icons/emoji-nervious.svg';
import emojiLaugh from '../../../assets/icons/emoji-laugh.svg';
import photo from '../../../assets/icons/photo.svg';
import undo from '../../../assets/icons/undo.svg';
import redo from '../../../assets/icons/redo.svg';
import clear from '../../../assets/icons/clear.svg';
import screenshot from '../../../assets/icons/screenshot.svg';
import share from '../../../assets/icons/share.svg';
import IBasicToolbarSection from '../../../interfaces/toolbar/toolbar-section/basic-toolbar-section';

import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import FormatColorFillRoundedIcon from '@material-ui/icons/FormatColorFillRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import FormatColorTextRoundedIcon from '@material-ui/icons/FormatColorTextRounded';

const colorPaletteOptions = [
  {
    index: 0,
    iconName: 'Transparent',
    style: {},
  },
  {
    index: 1,
    iconName: 'White',
    style: {
      color: '#fff',
    },
  },
  {
    index: 2,
    iconName: 'Gray Light',
    style: {
      color: '#e6e6e6',
    },
  },
  {
    index: 3,
    iconName: 'Gray Dark',
    style: {
      color: '#808080',
    },
  },
  {
    index: 4,
    iconName: 'Black',
    style: {
      color: '#000',
    },
  },
  {
    index: 5,
    iconName: 'Red',
    style: {
      color: '#f8433f',
    },
  },
  {
    index: 6,
    iconName: 'Green',
    style: {
      color: '#5fe119',
    },
  },
  {
    index: 7,
    iconName: 'Blue',
    style: {
      color: '#347dfa',
    },
  },
  {
    index: 8,
    iconName: 'Cyan',
    style: {
      color: '#44f9f9',
    },
  },
  {
    index: 9,
    iconName: 'Magenta',
    style: {
      color: '#f289fe',
    },
  },
  {
    index: 10,
    iconName: 'Yellow',
    style: {
      color: '#fbe739',
    },
  },
  {
    index: 11,
    iconName: 'Orange',
    style: {
      color: '#fb823f',
    },
  },
  {
    index: 12,
    iconName: 'Purple',
    style: {
      color: '#8880fc',
    },
  },
  {
    index: 13,
    iconName: 'Violet',
    style: {
      color: '#0C7Cfa',
    },
  },
];

const toolsSection: IBasicToolbarSection = {
  selected: 0,
  elements: [
    // pointers
    {
      options: [
        {
          index: 0,
          iconSrc: pointer,
          iconName: 'Arrow',
        },
        {
          index: 1,
          iconSrc: hand,
          iconName: 'Hand',
        },
        {
          index: 2,
          iconSrc: crosshair,
          iconName: 'Crosshair',
        },
        {
          index: 3,
          iconSrc: laser,
          iconName: 'Laser',
        },
        {
          index: 4,
          iconSrc: left,
          iconName: 'Left',
        },
        {
          index: 5,
          iconSrc: up,
          iconName: 'Up',
        },
        {
          index: 6,
          iconSrc: right,
          iconName: 'Right',
        },
        {
          index: 7,
          iconSrc: down,
          iconName: 'Down',
        },
      ],
    },
    // move
    { iconSrc: move, iconName: 'Move Icon' },
    // erase object or partial
    {
      options: [
        {
          index: 0,
          iconSrc: trash,
          iconName: 'Erase Object',
        },
        {
          index: 1,
          iconSrc: eraser,
          iconName: 'Spot Erase',
        },
      ],
    },
    // line type
    {
      iconColorPalette: BorderColorRoundedIcon,
      options: [
        {
          index: 0,
          iconSrc: pen,
          iconName: 'Pen',
        },
        {
          index: 1,
          iconSrc: pencil,
          iconName: 'Pencil',
        },
        {
          index: 2,
          iconSrc: felt,
          iconName: 'Felt',
        },
        {
          index: 3,
          iconSrc: crayon,
          iconName: 'Crayon',
        },
        {
          index: 4,
          iconSrc: chalk,
          iconName: 'Chalk',
        },
        {
          index: 5,
          iconSrc: paintBrush,
          iconName: 'Paintbrush',
        },
        {
          index: 6,
          iconSrc: marker,
          iconName: 'Marker',
        },
        {
          index: 7,
          iconSrc: dashedPen,
          iconName: 'Dashed Pen',
        },
      ],
    },
    // thickness
    {
      icon: FiberManualRecordRoundedIcon,
      styleOptions: [
        {
          index: 0,
          iconName: 'Thick 8',
          style: {
            fontSize: 8,
          },
        },
        {
          index: 1,
          iconName: 'Thick 12',
          style: {
            fontSize: 12,
          },
        },
        {
          index: 2,
          iconName: 'Thick 16',
          style: {
            fontSize: 16,
          },
        },
        {
          index: 3,
          iconName: 'Thick 20',
          style: {
            fontSize: 20,
          },
        },
        {
          index: 4,
          iconName: 'Thick 24',
          style: {
            fontSize: 24,
          },
        },
      ],
    },
    // flood-fill
    {
      icon: FormatColorFillRoundedIcon,
      styleOptions: colorPaletteOptions,
    },
    // text
    {
      iconColorPalette: FormatColorTextRoundedIcon,
      options: [
        {
          index: 0,
          iconSrc: textIcon,
          iconName: 'Arial',
        },
        {
          index: 1,
          iconSrc: crayon,
          iconName: 'Crayon',
        },
        {
          index: 2,
          iconSrc: chalk,
          iconName: 'Chalkboard',
        },
      ],
    },
    // shapes
    {
      iconColorPalette: FiberManualRecordRoundedIcon,
      options: [
        {
          index: 0,
          iconSrc: circleShape,
          iconName: 'Circle',
        },
        {
          index: 1,
          iconSrc: rectangleShape,
          iconName: 'Rectangle',
        },
        {
          index: 2,
          iconSrc: triangleShape,
          iconName: 'Triangle',
        },
        {
          index: 3,
          iconSrc: pentagonShape,
          iconName: 'Pentagon',
        },
        {
          index: 4,
          iconSrc: starShape,
          iconName: 'Star',
        },
        {
          index: 5,
          iconSrc: chatBubbleShape,
          iconName: 'Chat Bubble',
        },
      ],
    },
    // stamp
    {
      options: [
        {
          index: 0,
          iconSrc: star,
          iconName: 'Yellow Star',
        },
        {
          index: 1,
          iconSrc: emojiSmile,
          iconName: 'Emoji 1',
        },
        {
          index: 2,
          iconSrc: emojiLike,
          iconName: 'Emoji 2',
        },
        {
          index: 3,
          iconSrc: emojiHello,
          iconName: 'Emoji 3',
        },
        {
          index: 4,
          iconSrc: emojiSleep,
          iconName: 'Emoji 4',
        },
        {
          index: 5,
          iconSrc: emojiNervious,
          iconName: 'Emoji 5',
        },
        {
          index: 6,
          iconSrc: emojiLaugh,
          iconName: 'Emoji 6',
        },
      ],
    },
  ],
};

const actionsSection: IBasicToolbarSection = {
  selected: -1,
  elements: [
    { iconSrc: photo, iconName: 'Add Image' },
    { iconSrc: undo, iconName: 'Undo Icon' },
    { iconSrc: redo, iconName: 'Redo Icon' },
    { iconSrc: clear, iconName: 'Clear Icon' },
    { iconSrc: screenshot, iconName: 'Screenshot Icon' },
    { iconSrc: share, iconName: 'Share Icon' },
  ],
};

export { toolsSection, actionsSection, colorPaletteOptions };
