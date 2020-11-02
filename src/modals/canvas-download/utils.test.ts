// @ts-nocheck
import { downloadCanvas } from './utils';

const props = {
  width: 200,
  height: 200,
  canvas: { 
    ...document.createElement('canvas'),
    getElement: () => document.createElement('canvas'),
    toDataURL: () => 'blob:image/png,helloworld.png'
  },
  onClose: () => {}
}

describe('Download canvas as image.', () => {
  it('should download the file', () => {
    const link = {
      click: jest.fn(),
      setAttribute: jest.fn()
    };

    jest.spyOn(document, 'createElement').mockImplementation(() => link);

    const type = 'image/png';
    const ext = type === 'image/png' ? 'png' : 'jpg';

    downloadCanvas(props, ext, type);
    expect(link.click).toHaveBeenCalledTimes(1);
  });
});