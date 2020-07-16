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
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import FormatColorFillRoundedIcon from '@material-ui/icons/FormatColorFillRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import FormatColorTextRoundedIcon from '@material-ui/icons/FormatColorTextRounded';
import IStyleOption from '../../interfaces/toolbar/toolbar-special-elements/style-option';

const colorPaletteOptions: IStyleOption[] = [
  {
    id: 'transparent',
    title: 'Transparent',
    style: {},
  },
  {
    id: 'white_color',
    title: 'White',
    style: {
      color: '#fff',
    },
  },
  {
    id: 'light_gray_color',
    title: 'Light Gray',
    style: {
      color: '#e6e6e6',
    },
  },
  {
    id: 'dark_gray_color',
    title: 'Dark Gray',
    style: {
      color: '#808080',
    },
  },
  {
    id: 'black_color',
    title: 'Black',
    style: {
      color: '#000',
    },
  },
  {
    id: 'red_color',
    title: 'Red',
    style: {
      color: '#f8433f',
    },
  },
  {
    id: 'green_color',
    title: 'Green',
    style: {
      color: '#5fe119',
    },
  },
  {
    id: 'blue_color',
    title: 'Blue',
    style: {
      color: '#347dfa',
    },
  },
  {
    id: 'cyan_color',
    title: 'Cyan',
    style: {
      color: '#44f9f9',
    },
  },
  {
    id: 'magenta_color',
    title: 'Magenta',
    style: {
      color: '#f289fe',
    },
  },
  {
    id: 'yellow_color',
    title: 'Yellow',
    style: {
      color: '#fbe739',
    },
  },
  {
    id: 'orange_color',
    title: 'Orange',
    style: {
      color: '#fb823f',
    },
  },
  {
    id: 'purple_color',
    title: 'Purple',
    style: {
      color: '#8880fc',
    },
  },
  {
    id: 'violet_color',
    title: 'Violet',
    style: {
      color: '#0C7Cfa',
    },
  },
];

const actionsSection: IBasicToolbarSection = {
  // No one will be selected
  selected: '',
  elements: [
    // ToolbarButton
    {
      id: 'add_image',
      title: 'Add Image',
      iconSrc: photo,
      iconName: 'Add Image',
    },
    // ToolbarButton
    {
      id: 'undo',
      title: 'Undo',
      iconSrc: undo,
      iconName: 'Undo Icon',
    },
    // ToolbarButton
    {
      id: 'redo',
      title: 'Redo',
      iconSrc: redo,
      iconName: 'Redo Icon',
    },
    // ToolbarButton
    {
      id: 'clear_whiteboard',
      title: 'Clear Whiteboard',
      iconSrc: clear,
      iconName: 'Clear Icon',
    },
    // ToolbarButton
    {
      id: 'whiteboard_screenshot',
      title: 'Whiteboard Screenshot',
      iconSrc: screenshot,
      iconName: 'Screenshot Icon',
    },
    // ToolbarButton
    {
      id: 'share_whiteboard',
      title: 'Share Whiteboard',
      iconSrc: share,
      iconName: 'Share Icon',
    },
  ],
};

const toolsSection: IBasicToolbarSection = {
  selected: 'pointers',
  elements: [
    // Pointers - ToolbarSelector
    {
      id: 'pointers',
      options: [
        {
          id: 'arrow_pointer',
          title: 'Arrow Pointer',
          iconSrc: pointer,
          iconName: 'Arrow',
        },
        {
          id: 'hand_pointer',
          title: 'Hand Pointer',
          iconSrc: hand,
          iconName: 'Hand',
        },
        {
          id: 'hand_pointer',
          title: 'Crosshair Pointer',
          iconSrc: crosshair,
          iconName: 'Crosshair',
        },
        {
          id: 'laser_pointer',
          title: 'Laser Pointer',
          iconSrc: laser,
          iconName: 'Laser',
        },
        {
          id: 'left_pointer',
          title: 'Left Pointer',
          iconSrc: left,
          iconName: 'Left',
        },
        {
          id: 'up_pointer',
          title: 'Up Pointer',
          iconSrc: up,
          iconName: 'Up',
        },
        {
          id: 'right_pointer',
          title: 'Right Pointer',
          iconSrc: right,
          iconName: 'Right',
        },
        {
          id: 'down_pointer',
          title: 'Down Pointer',
          iconSrc: down,
          iconName: 'Down',
        },
      ],
    },
    // Move - ToolbarButton
    {
      id: 'move_objects',
      title: 'Move Objects',
      iconSrc: move,
      iconName: 'Move Icon',
    },
    // Erase - ToolbarSelector
    {
      id: 'erase_type',
      options: [
        {
          id: 'object_erase',
          title: 'Erase Object',
          iconSrc: trash,
          iconName: 'Erase Object',
        },
        {
          id: 'partial_erase',
          title: 'Partial Erase',
          iconSrc: eraser,
          iconName: 'Spot Erase',
        },
      ],
    },
    // Line Type - ToolbarSelector - Color Palette
    {
      id: 'line_type',
      options: [
        {
          id: 'pen_line',
          title: 'Pen Line',
          iconSrc: pen,
          iconName: 'Pen',
        },
        {
          id: 'pencil_line',
          title: 'Pencil Line',
          iconSrc: pencil,
          iconName: 'Pencil',
        },
        {
          id: 'felt_line',
          title: 'Felt Line',
          iconSrc: felt,
          iconName: 'Felt',
        },
        {
          id: 'crayon_line',
          title: 'Crayon Line',
          iconSrc: crayon,
          iconName: 'Crayon',
        },
        {
          id: 'chalk_line',
          title: 'Chalk Line',
          iconSrc: chalk,
          iconName: 'Chalk',
        },
        {
          id: 'paintbrush_line',
          title: 'Paintbrush Line',
          iconSrc: paintBrush,
          iconName: 'Paintbrush',
        },
        {
          id: 'marker_line',
          title: 'Marker Line',
          iconSrc: marker,
          iconName: 'Marker',
        },
        {
          id: 'dashed_line',
          title: 'Dashed Line',
          iconSrc: dashedPen,
          iconName: 'Dashed Pen',
        },
      ],
      colorPaletteIcon: BorderColorRoundedIcon,
    },
    // Thickness - SpecialToolbarSelector
    {
      id: 'thickness_size',
      icon: FiberManualRecordRoundedIcon,
      styleOptions: [
        {
          id: 'thick_8px',
          title: '8px',
          style: {
            fontSize: 8,
          },
        },
        {
          id: 'thick_12px',
          title: '12px',
          style: {
            fontSize: 12,
          },
        },
        {
          id: 'thick_16px',
          title: '16px',
          style: {
            fontSize: 16,
          },
        },
        {
          id: 'thick_20px',
          title: '20px',
          style: {
            fontSize: 20,
          },
        },
        {
          id: 'thick_24px',
          title: '24px',
          style: {
            fontSize: 24,
          },
        },
      ],
    },
    // Flood Fill - SpecialToolbarSelector
    {
      id: 'flood_fill',
      icon: FormatColorFillRoundedIcon,
      styleOptions: colorPaletteOptions,
    },
    // Text - ToolbarSelector - Color Palette
    {
      id: 'add_text',
      options: [
        {
          id: 'arial_font',
          title: 'Arial Font',
          iconSrc: textIcon,
          iconName: 'Arial',
        },
        {
          id: 'crayon_font',
          title: 'Crayon Font',
          iconSrc: crayon,
          iconName: 'Crayon',
        },
        {
          id: 'crayon_font',
          title: 'Chalk Font',
          iconSrc: chalk,
          iconName: 'Chalkboard',
        },
      ],
      colorPaletteIcon: FormatColorTextRoundedIcon,
    },
    // Shapes - ToolbarSelector - Color Palette
    {
      id: 'add_shape',
      options: [
        {
          id: 'circle_shape',
          title: 'Circle Shape',
          iconSrc: circleShape,
          iconName: 'Circle',
        },
        {
          id: 'rectangle_shape',
          title: 'Rectangle Shape',
          iconSrc: rectangleShape,
          iconName: 'Rectangle',
        },
        {
          id: 'triangle_shape',
          title: 'Triangle Shape',
          iconSrc: triangleShape,
          iconName: 'Triangle',
        },
        // Not ready yet
        // {
        //   id: 'pentagon_shape',
        //   title: 'Pentagon Shape',
        //   iconSrc: pentagonShape,
        //   iconName: 'Pentagon',
        // },
        // {
        //   id: 'star_shape',
        //   title: 'Star Shape',
        //   iconSrc: starShape,
        //   iconName: 'Star',
        // },
        // {
        //   id: 'chat_bubble_shape',
        //   title: 'Chat Bubble Shape',
        //   iconSrc: chatBubbleShape,
        //   iconName: 'Chat Bubble',
        // },
      ],
      colorPaletteIcon: FiberManualRecordRoundedIcon,
    },
    // Stamps - ToolbarSelector
    {
      id: 'add_stamp',
      options: [
        {
          id: 'yellow_star_stamp',
          title: 'Yellow Star',
          iconSrc: star,
          iconName: 'Yellow Star',
        },
        {
          id: 'emoji_1_stamp',
          title: 'Emoji 1',
          iconSrc: emojiSmile,
          iconName: 'Emoji 1',
        },
        {
          id: 'emoji_2_stamp',
          title: 'Emoji 2',
          iconSrc: emojiLike,
          iconName: 'Emoji 2',
        },
        {
          id: 'emoji_3_stamp',
          title: 'Emoji 3',
          iconSrc: emojiHello,
          iconName: 'Emoji 3',
        },
        {
          id: 'emoji_4_stamp',
          title: 'Emoji 4',
          iconSrc: emojiSleep,
          iconName: 'Emoji 4',
        },
        {
          id: 'emoji_5_stamp',
          title: 'Emoji 5',
          iconSrc: emojiNervious,
          iconName: 'Emoji 5',
        },
        {
          id: 'emoji_6_stamp',
          title: 'Emoji 6',
          iconSrc: emojiLaugh,
          iconName: 'Emoji 6',
        },
      ],
    },
  ],
};

export { toolsSection, actionsSection, colorPaletteOptions };
