// @ts-nocheck
import React from 'react';
import { CanvasDownloadConfirm } from './canvasDownload';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Download canvas modal renders correctly.', () => {
  it('renders correctly', () => {
    const component = shallow(
      <CanvasDownloadConfirm
        open={true}
        onClose={() => {}}
        canvas={(document.createElement('canvas') as unknown) as fabric.Canvas}
        backgroundImage={undefined}
        width={400}
        height={400}
      ></CanvasDownloadConfirm>
    );
    expect(component).toMatchSnapshot();
  });
});
