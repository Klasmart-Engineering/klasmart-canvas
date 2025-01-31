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
import circleShape from '../../assets/icons/toolbar/circle-shape.svg';
import rectangleShape from '../../assets/icons/toolbar/rectangle-shape.svg';
import triangleShape from '../../assets/icons/toolbar/triangle-shape.svg';
import pentagonShape from '../../assets/icons/toolbar/pentagon-shape.svg';
import hexagonShape from '../../assets/icons/toolbar/hexagon-shape.svg';
import starShape from '../../assets/icons/toolbar/star-shape.svg';
import chatBubbleShape from '../../assets/icons/toolbar/chat-bubble-shape.svg';
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
    value: 'transparent',
    title: 'Transparent',
    style: {
      color: 'rgba(125, 125, 125, 0.1)',
    },
  },
  {
    id: 'white_color',
    value: '#ffffff',
    title: 'White',
    style: {
      color: '#ffffff',
      backgroundColor: 'rgba(80, 80, 80, 0.1)',
      borderRadius: '4px',
    },
  },
  {
    id: 'light_gray_color',
    value: '#e6e6e6',
    title: 'Light Gray',
    style: {
      color: '#e6e6e6',
    },
  },
  {
    id: 'dark_gray_color',
    value: '#808080',
    title: 'Dark Gray',
    style: {
      color: '#808080',
    },
  },
  {
    id: 'black_color',
    value: '#000000',
    title: 'Black',
    style: {
      color: '#000000',
    },
  },
  {
    id: 'red_color',
    value: '#f8433f',
    title: 'Red',
    style: {
      color: '#f8433f',
    },
  },
  {
    id: 'green_color',
    value: '#5fe119',
    title: 'Green',
    style: {
      color: '#5fe119',
    },
  },
  {
    id: 'blue_color',
    value: '#347dfa',
    title: 'Blue',
    style: {
      color: '#347dfa',
    },
  },
  {
    id: 'cyan_color',
    value: '#44f9f9',
    title: 'Cyan',
    style: {
      color: '#44f9f9',
    },
  },
  {
    id: 'magenta_color',
    value: '#f289fe',
    title: 'Magenta',
    style: {
      color: '#f289fe',
    },
  },
  {
    id: 'yellow_color',
    value: '#fbe739',
    title: 'Yellow',
    style: {
      color: '#fbe739',
    },
  },
  {
    id: 'orange_color',
    value: '#fb823f',
    title: 'Orange',
    style: {
      color: '#fb823f',
    },
  },
  {
    id: 'purple_color',
    value: '#8880fc',
    title: 'Purple',
    style: {
      color: '#8880fc',
    },
  },
  {
    id: 'violet_color',
    value: '#0c7cfa',
    title: 'Violet',
    style: {
      color: '#0c7cfa',
    },
  },
];

const actionsSection: IBasicToolbarSection = {
  // No one will be active
  active: '',
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
  active: 'pointers',
  elements: [
    // Pointers - ToolbarSelector
    {
      id: 'pointers',
      options: [
        {
          id: 'arrow_pointer',
          value: 'arrow',
          title: 'Arrow Pointer',
          iconSrc: pointer,
          iconName: 'Arrow',
        },
        {
          id: 'hand_pointer',
          value: 'hand',
          title: 'Hand Pointer',
          iconSrc: hand,
          iconName: 'Hand',
        },
        {
          id: 'crosshair_pointer',
          value: 'crosshair',
          title: 'Crosshair Pointer',
          iconSrc: crosshair,
          iconName: 'Crosshair',
        },
        {
          id: 'left_pointer',
          value: 'left',
          title: 'Left Pointer',
          iconSrc: left,
          iconName: 'Left',
        },
        {
          id: 'up_pointer',
          value: 'up',
          title: 'Up Pointer',
          iconSrc: up,
          iconName: 'Up',
        },
        {
          id: 'right_pointer',
          value: 'right',
          title: 'Right Pointer',
          iconSrc: right,
          iconName: 'Right',
        },
        {
          id: 'down_pointer',
          value: 'down',
          title: 'Down Pointer',
          iconSrc: down,
          iconName: 'Down',
        },
      ],
    },
    // Laser pointer tool.
    {
      id: 'laser_pointer',
      title: 'Laser Pointer',
      iconSrc: laser,
      iconName: 'Laser',
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
          value: 'object',
          title: 'Erase Object',
          iconSrc: trash,
          iconName: 'Erase Object',
        },
        {
          id: 'partial_erase',
          value: 'partial',
          title: 'Partial Erase',
          iconSrc: eraser,
          iconName: 'Spot Erase',
        },
      ],
    },
    {
      id: 'move_canvas',
      title: 'Move Canvas',
      iconSrc: move,
      iconName: 'Move canvas',
    },
    // Line Type - ToolbarSelector - Color Palette
    {
      id: 'line_type',
      options: [
        {
          id: 'pen_line',
          value: 'pen',
          title: 'Pen Line',
          iconSrc: pen,
          iconName: 'Pen',
        },
        {
          id: 'pencil_line',
          value: 'pencil',
          title: 'Pencil Line',
          iconSrc: pencil,
          iconName: 'Pencil',
        },
        {
          id: 'felt_line',
          value: 'felt',
          title: 'Felt Line',
          iconSrc: felt,
          iconName: 'Felt',
        },
        {
          id: 'crayon_line',
          value: 'crayon',
          title: 'Crayon Line',
          iconSrc: crayon,
          iconName: 'Crayon',
        },
        {
          id: 'chalk_line',
          value: 'chalk',
          title: 'Chalk Line',
          iconSrc: chalk,
          iconName: 'Chalk',
        },
        {
          id: 'paintbrush_line',
          value: 'paintbrush',
          title: 'Paintbrush Line',
          iconSrc: paintBrush,
          iconName: 'Paintbrush',
        },
        {
          id: 'marker_line',
          value: 'marker',
          title: 'Marker Line',
          iconSrc: marker,
          iconName: 'Marker',
        },
        {
          id: 'dashed_line',
          value: 'dashed',
          title: 'Dashed Line',
          iconSrc: dashedPen,
          iconName: 'Dashed Pen',
        },
      ],
      colorPaletteIcon: BorderColorRoundedIcon,
    },
    // Thickness - SpecialToolbarSelector
    {
      id: 'line_width',
      icon: FiberManualRecordRoundedIcon,
      styleOptions: [
        {
          id: 'thick_2px',
          value: 2,
          title: '2px',
          style: {
            fontSize: 4,
          },
        },
        {
          id: 'thick_4px',
          value: 4,
          title: '4px',
          style: {
            fontSize: 6,
          },
        },
        {
          id: 'thick_8px',
          value: 8,
          title: '8px',
          style: {
            fontSize: 14,
          },
        },
        {
          id: 'thick_12px',
          value: 12,
          title: '12px',
          style: {
            fontSize: 20,
          },
        },
        {
          id: 'thick_16px',
          value: 16,
          title: '16px',
          style: {
            fontSize: 26,
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
          value: 'Arial',
          title: 'Arial Font',
          iconSrc: textIcon,
          iconName: 'Arial',
        },
        {
          id: 'crayon_font',
          value: 'Crayon',
          title: 'Crayon Font',
          iconSrc: crayon,
          iconName: 'Crayon',
        },
        {
          id: 'chalkboard_font',
          value: 'Chalkboard',
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
          value: 'circle',
          title: 'Circle Shape',
          iconSrc: circleShape,
          iconName: 'Circle',
        },
        {
          id: 'rectangle_shape',
          value: 'rectangle',
          title: 'Rectangle Shape',
          iconSrc: rectangleShape,
          iconName: 'Rectangle',
        },
        {
          id: 'triangle_shape',
          value: 'triangle',
          title: 'Triangle Shape',
          iconSrc: triangleShape,
          iconName: 'Triangle',
        },
        {
          id: 'pentagon_shape',
          value: 'pentagon',
          title: 'Pentagon Shape',
          iconSrc: pentagonShape,
          iconName: 'Pentagon',
        },
        {
          id: 'hexagon_shape',
          value: 'hexagon',
          title: 'Hexagon Shape',
          iconSrc: hexagonShape,
          iconName: 'Hexagon',
        },
        {
          id: 'arrow_shape',
          value: 'arrow',
          title: 'Arrow',
          iconSrc: right,
          iconName: 'Arrow',
        },
        {
          id: 'star_shape',
          value: 'star',
          title: 'Star Shape',
          iconSrc: starShape,
          iconName: 'Star',
        },
        {
          id: 'chat_bubble_shape',
          value: 'chatBubble',
          title: 'Chat Bubble',
          iconSrc: chatBubbleShape,
          iconName: 'Chat Bubble',
        },
      ],
    },
    // Stamps - ToolbarSelector
    {
      id: 'add_stamp',
      options: [
        {
          id: 'yellow_star_stamp',
          value: 'yellowStar',
          title: 'Yellow Star',
          iconSrc: star,
          iconName: 'Yellow Star',
        },
        {
          id: 'emoji_1_stamp',
          value: 'emoji1',
          title: 'Emoji 1',
          iconSrc: emojiSmile,
          iconName: 'Emoji 1',
        },
        {
          id: 'emoji_2_stamp',
          value: 'emoji2',
          title: 'Emoji 2',
          iconSrc: emojiLike,
          iconName: 'Emoji 2',
        },
        {
          id: 'emoji_3_stamp',
          value: 'emoji3',
          title: 'Emoji 3',
          iconSrc: emojiHello,
          iconName: 'Emoji 3',
        },
        {
          id: 'emoji_4_stamp',
          value: 'emoji4',
          title: 'Emoji 4',
          iconSrc: emojiSleep,
          iconName: 'Emoji 4',
        },
        {
          id: 'emoji_5_stamp',
          value: 'emoji5',
          title: 'Emoji 5',
          iconSrc: emojiNervious,
          iconName: 'Emoji 5',
        },
        {
          id: 'emoji_6_stamp',
          value: 'emoji6',
          title: 'Emoji 6',
          iconSrc: emojiLaugh,
          iconName: 'Emoji 6',
        },
      ],
    },
  ],
};

export { toolsSection, actionsSection, colorPaletteOptions };
