import IBasicToolbarSection from '../../interfaces/toolbar/toolbar-section/basic-toolbar-section';
import textIcon from '../../assets/icons/toolbar/letter-a.svg';
import pointer from '../../assets/icons/toolbar/pointer.svg';
import hand from '../../assets/icons/toolbar/hand.svg';
import crosshair from '../../assets/icons/toolbar/crosshair.svg';
import laser from '../../assets/icons/toolbar/point.svg';
import left from '../../assets/icons/toolbar/left.svg';
import right from '../../assets/icons/toolbar/right.svg';
import up from '../../assets/icons/toolbar/up.svg';
import down from '../../assets/icons/toolbar/down.svg';
import trash from '../../assets/icons/toolbar/trash.svg';
import eraser from '../../assets/icons/toolbar/eraser.svg';
import pen from '../../assets/icons/toolbar/pen.svg';
import pencil from '../../assets/icons/toolbar/pencil.svg';
import felt from '../../assets/icons/toolbar/felt.svg';
import crayon from '../../assets/icons/toolbar/crayon.svg';
import chalk from '../../assets/icons/toolbar/chalk.svg';
import paintBrush from '../../assets/icons/toolbar/paint-brush.svg';
import marker from '../../assets/icons/toolbar/marker.svg';
import dashedPen from '../../assets/icons/toolbar/dashed-pen.svg';
import rectangleShape from '../../assets/icons/toolbar/rectangle-shape.svg';
import triangleShape from '../../assets/icons/toolbar/triangle-shape.svg';
import circleShape from '../../assets/icons/toolbar/circle-shape.svg';
// Not ready yet
// import pentagonShape from '../../../assets/icons/toolbar/pentagon-shape.svg';
// import starShape from '../../../assets/icons/toolbar/star-shape.svg';
// import chatBubbleShape from '../../../assets/icons/toolbar/chat-bubble-shape.svg';
import move from '../../assets/icons/toolbar/move.svg';
import star from '../../assets/icons/toolbar/star.svg';
import emojiSmile from '../../assets/icons/toolbar/emoji-smile.svg';
import emojiLike from '../../assets/icons/toolbar/emoji-like.svg';
import emojiHello from '../../assets/icons/toolbar/emoji-hello.svg';
import emojiSleep from '../../assets/icons/toolbar/emoji-sleep.svg';
import emojiNervious from '../../assets/icons/toolbar/emoji-nervious.svg';
import emojiLaugh from '../../assets/icons/toolbar/emoji-laugh.svg';
import photo from '../../assets/icons/toolbar/photo.svg';
import undo from '../../assets/icons/toolbar/undo.svg';
import redo from '../../assets/icons/toolbar/redo.svg';
import clear from '../../assets/icons/toolbar/clear.svg';
import screenshot from '../../assets/icons/toolbar/screenshot.svg';
import share from '../../assets/icons/toolbar/share.svg';
import play from '../../assets/icons/toolbar/play.svg';
import whiteboard from '../../assets/icons/toolbar/whiteboard.svg';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import FormatColorFillRoundedIcon from '@material-ui/icons/FormatColorFillRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import FormatColorTextRoundedIcon from '@material-ui/icons/FormatColorTextRounded';
import IStyleOption from '../../interfaces/toolbar/toolbar-special-elements/style-option';

const colorPaletteOptions: IStyleOption[] = [
  {
    title: 'Transparent',
    iconName: 'Transparent',
    style: {},
  },
  {
    title: 'White',
    iconName: 'White',
    style: {
      color: '#fff',
    },
  },
  {
    title: 'Gray Light',
    iconName: 'Gray Light',
    style: {
      color: '#e6e6e6',
    },
  },
  {
    title: 'Gray Dark',
    iconName: 'Gray Dark',
    style: {
      color: '#808080',
    },
  },
  {
    title: 'Black',
    iconName: 'Black',
    style: {
      color: '#000',
    },
  },
  {
    title: 'Red',
    iconName: 'Red',
    style: {
      color: '#f8433f',
    },
  },
  {
    title: 'Green',
    iconName: 'Green',
    style: {
      color: '#5fe119',
    },
  },
  {
    title: 'Blue',
    iconName: 'Blue',
    style: {
      color: '#347dfa',
    },
  },
  {
    title: 'Cyan',
    iconName: 'Cyan',
    style: {
      color: '#44f9f9',
    },
  },
  {
    title: 'Magenta',
    iconName: 'Magenta',
    style: {
      color: '#f289fe',
    },
  },
  {
    title: 'Yellow',
    iconName: 'Yellow',
    style: {
      color: '#fbe739',
    },
  },
  {
    title: 'Orange',
    iconName: 'Orange',
    style: {
      color: '#fb823f',
    },
  },
  {
    title: 'Purple',
    iconName: 'Purple',
    style: {
      color: '#8880fc',
    },
  },
  {
    title: 'Violet',
    iconName: 'Violet',
    style: {
      color: '#0C7Cfa',
    },
  },
];

const actionsSection: IBasicToolbarSection = {
  // No one will be selected
  selected: -1,
  elements: [
    // ToolbarButton
    {
      title: 'Add Image',
      iconSrc: photo,
      iconName: 'Add Image',
    },
    // ToolbarButton
    {
      title: 'Undo',
      iconSrc: undo,
      iconName: 'Undo Icon',
    },
    // ToolbarButton
    {
      title: 'Redo',
      iconSrc: redo,
      iconName: 'Redo Icon',
    },
    // ToolbarButton
    {
      title: 'Clear Whiteboard',
      iconSrc: clear,
      iconName: 'Clear Icon',
    },
    // ToolbarButton
    {
      title: 'Whiteboard Screenshot',
      iconSrc: screenshot,
      iconName: 'Screenshot Icon',
    },
    // ToolbarButton
    {
      title: 'Share Whiteboard',
      iconSrc: share,
      iconName: 'Share Icon',
    },
  ],
};

const toolsSection: IBasicToolbarSection = {
  selected: 0,
  elements: [
    // Pointers - ToolbarSelector
    {
      options: [
        {
          title: 'Arrow Pointer',
          iconSrc: pointer,
          iconName: 'Arrow',
        },
        {
          title: 'Hand Pointer',
          iconSrc: hand,
          iconName: 'Hand',
        },
        {
          title: 'Crosshair Pointer',
          iconSrc: crosshair,
          iconName: 'Crosshair',
        },
        {
          title: 'Laser Pointer',
          iconSrc: laser,
          iconName: 'Laser',
        },
        {
          title: 'Left Pointer',
          iconSrc: left,
          iconName: 'Left',
        },
        {
          title: 'Up Pointer',
          iconSrc: up,
          iconName: 'Up',
        },
        {
          title: 'Right Pointer',
          iconSrc: right,
          iconName: 'Right',
        },
        {
          title: 'Down Pointer',
          iconSrc: down,
          iconName: 'Down',
        },
      ],
    },
    // Move - ToolbarButton
    { title: 'Move Objects', iconSrc: move, iconName: 'Move Icon' },
    // Activity/Whiteboard Toogle - ToolbarSelector
    {
      options: [
        {
          title: 'Play Activity',
          iconSrc: play,
          iconName: 'Activity',
        },
        {
          title: 'Use Whiteboard',
          iconSrc: whiteboard,
          iconName: 'Whiteboard',
        },
      ],
    },
    // Erase - ToolbarSelector
    {
      options: [
        {
          title: 'Erase Object',
          iconSrc: trash,
          iconName: 'Erase Object',
        },
        {
          title: 'Partial Erase',
          iconSrc: eraser,
          iconName: 'Spot Erase',
        },
      ],
    },
    // Line Type - ToolbarSelector - Color Palette
    {
      options: [
        {
          title: 'Pen Line',
          iconSrc: pen,
          iconName: 'Pen',
        },
        {
          title: 'Pencil Line',
          iconSrc: pencil,
          iconName: 'Pencil',
        },
        {
          title: 'Felt Line',
          iconSrc: felt,
          iconName: 'Felt',
        },
        {
          title: 'Crayon Line',
          iconSrc: crayon,
          iconName: 'Crayon',
        },
        {
          title: 'Chalk Line',
          iconSrc: chalk,
          iconName: 'Chalk',
        },
        {
          title: 'Paintbrush Line',
          iconSrc: paintBrush,
          iconName: 'Paintbrush',
        },
        {
          title: 'Marker Line',
          iconSrc: marker,
          iconName: 'Marker',
        },
        {
          title: 'Dashed Line',
          iconSrc: dashedPen,
          iconName: 'Dashed Pen',
        },
      ],
      colorPaletteIcon: BorderColorRoundedIcon,
    },
    // Thickness - SpecialToolbarSelector
    {
      icon: FiberManualRecordRoundedIcon,
      styleOptions: [
        {
          title: '8px',
          iconName: 'Thick 8',
          style: {
            fontSize: 8,
          },
        },
        {
          title: '12px',
          iconName: 'Thick 12',
          style: {
            fontSize: 12,
          },
        },
        {
          title: '16px',
          iconName: 'Thick 16',
          style: {
            fontSize: 16,
          },
        },
        {
          title: '20px',
          iconName: 'Thick 20',
          style: {
            fontSize: 20,
          },
        },
        {
          title: '24px',
          iconName: 'Thick 24',
          style: {
            fontSize: 24,
          },
        },
      ],
    },
    // Flood Fill - SpecialToolbarSelector
    {
      icon: FormatColorFillRoundedIcon,
      styleOptions: colorPaletteOptions,
    },
    // Text - ToolbarSelector - Color Palette
    {
      options: [
        {
          title: 'Arial Font',
          iconSrc: textIcon,
          iconName: 'Arial',
        },
        {
          title: 'Crayon Font',
          iconSrc: crayon,
          iconName: 'Crayon',
        },
        {
          title: 'Chalk Font',
          iconSrc: chalk,
          iconName: 'Chalkboard',
        },
      ],
      colorPaletteIcon: FormatColorTextRoundedIcon,
    },
    // Shapes - ToolbarSelector - Color Palette
    {
      options: [
        {
          title: 'Circle Shape',
          iconSrc: circleShape,
          iconName: 'Circle',
        },
        {
          title: 'Rectangle Shape',
          iconSrc: rectangleShape,
          iconName: 'Rectangle',
        },
        {
          title: 'Triangle Shape',
          iconSrc: triangleShape,
          iconName: 'Triangle',
        },
        // Not ready yet
        // {
        //   index: 3,
        //   iconSrc: pentagonShape,
        //   iconName: 'Pentagon',
        // },
        // {
        //   index: 4,
        //   iconSrc: starShape,
        //   iconName: 'Star',
        // },
        // {
        //   index: 5,
        //   iconSrc: chatBubbleShape,
        //   iconName: 'Chat Bubble',
        // },
        //   ],
        // },
        // stamp
      ],
      colorPaletteIcon: FiberManualRecordRoundedIcon,
    },
    // Stamps - ToolbarSelector
    {
      options: [
        {
          title: 'Yellow Star',
          iconSrc: star,
          iconName: 'Yellow Star',
        },
        {
          title: 'Emoji 1',
          iconSrc: emojiSmile,
          iconName: 'Emoji 1',
        },
        {
          title: 'Emoji 2',
          iconSrc: emojiLike,
          iconName: 'Emoji 2',
        },
        {
          title: 'Emoji 3',
          iconSrc: emojiHello,
          iconName: 'Emoji 3',
        },
        {
          title: 'Emoji 4',
          iconSrc: emojiSleep,
          iconName: 'Emoji 4',
        },
        {
          title: 'Emoji 5',
          iconSrc: emojiNervious,
          iconName: 'Emoji 5',
        },
        {
          title: 'Emoji 6',
          iconSrc: emojiLaugh,
          iconName: 'Emoji 6',
        },
      ],
    },
  ],
};

export { toolsSection, actionsSection, colorPaletteOptions };
