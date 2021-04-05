import IBasicToolbarSection from '../../interfaces/toolbar/toolbar-section/basic-toolbar-section';
import cubeShape from '../../assets/icons/toolbar/cube.svg';
import sphereShape from '../../assets/icons/toolbar/sphere.svg';
import cylinderShape from '../../assets/icons/toolbar/cylinder.svg';
import triangleBasedPyramidShape from '../../assets/icons/toolbar/triangleBasedPyramid.svg';
import coneShape from '../../assets/icons/toolbar/cone.svg';
import triangularPrismShape from '../../assets/icons/toolbar/triangularPrism.svg';
import rectangularPrismShape from '../../assets/icons/toolbar/rectangularPrism.svg';
import squareBasedPyramidShape from '../../assets/icons/toolbar/squareBasedPyramid.svg';
import torusShape from '../../assets/icons/toolbar/torus.svg';
import FormatColorFillRoundedIcon from '@material-ui/icons/FormatColorFillRounded';
import PaletteIcon from '@material-ui/icons/Palette';
import IStyleOption from '../../interfaces/toolbar/toolbar-special-elements/style-option';

const colorPaletteOptions: IStyleOption[] = [
  {
    id: 'transparent',
    value: 'transparent',
    title: 'Transparent',
    style: {
      color: 'rgba(125, 125, 125, 0.3)',
    },
  },
  {
    id: 'white_color',
    value: '#ffffff',
    title: 'White',
    style: {
      color: '#ffffff',
      backgroundColor: 'rgba(80, 80, 80, 0.3)',
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



const toolsSection: IBasicToolbarSection = {
  active: null,
  elements: [
    
    // Flood Fill - SpecialToolbarSelector
    // {
    //   id: 'flood_fill',
    //   icon: FormatColorFillRoundedIcon,
    //   styleOptions: colorPaletteOptions,
    // },
    // // Background Color - SpecialToolbarSelector
    // {
    //   id: 'background_color',
    //   icon: PaletteIcon,
    //   styleOptions: colorPaletteOptions,
    // },
    
    {
      id: 'add_3d_shape',
      options: [
        {
          id: 'cube_shape',
          value: 'cube',
          title: 'Cube Shape',
          iconSrc: cubeShape,
          iconName: 'Cube',
        },
        {
          id: 'rectangularPrism_shape',
          value: 'rectangularPrism',
          title: 'Rectangular Prism Shape',
          iconSrc: rectangularPrismShape,
          iconName: 'Rectangular Prism',
        },
        {
          id: 'triangularPrism_shape',
          value: 'triangularPrism',
          title: 'Triangular Prism Shape',
          iconSrc: triangularPrismShape,
          iconName: 'Triangular Prism',
        },
        {
          id: 'sphere_shape',
          value: 'sphere',
          title: 'Sphere Shape',
          iconSrc: sphereShape,
          iconName: 'Sphere',
        },
        {
          id: 'cylinder_shape',
          value: 'cylinder',
          title: 'Cylinder Shape',
          iconSrc: cylinderShape,
          iconName: 'Cylinder',
        },
        {
          id: 'pyramid_shape',
          value: 'pyramid',
          title: 'PyramidTriangleBased Shape',
          iconSrc: triangleBasedPyramidShape,
          iconName: 'PyramidTriangleBased',
        },
        {
          id: 'squareBasedPyramid_shape',
          value: 'squareBasedPyramid',
          title: 'Square Based Pyramid Shape',
          iconSrc: squareBasedPyramidShape,
          iconName: 'Square Based Pyramid',
        },
        {
          id: 'cone_shape',
          value: 'cone',
          title: 'Cone Shape',
          iconSrc: coneShape,
          iconName: 'Cone',
    },
      {
        id: 'torus_shape',
        value: 'torus',
        title: 'Torus Shape',
        iconSrc: torusShape,
        iconName: 'Torus',
      }
    ],
    },    
    
  ],
};

export { toolsSection };
