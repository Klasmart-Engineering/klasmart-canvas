import React from 'react';
import 'jest-canvas-mock';
import {
  render,
  cleanup,
  fireEvent,
  wait,
  getByTestId,
  getByTitle,
} from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Partial Erase Tool', () => {
  beforeEach(() => {
    localStorage.removeItem('objects');
    localStorage.removeItem('canvas:simulated:events');
  });

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  it(`should replace an image with the same image, partial erased`, async () => {
    

    const { container } = render(<App />);

    const addImageBtn = getByTitle(container, 'Add Image');

    fireEvent.click(addImageBtn);

    const setAsWhiteboardElementOption = document.getElementsByName('gender1')[0]; //getByText(container, 'Set as background image')
    fireEvent.click(setAsWhiteboardElementOption);
    const uploadBtn = document.getElementsByClassName('MuiButton-label')[1];

    fireEvent.click(uploadBtn);
    let file = dataURLtoFile(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUJGNjVFRkU2NUI2MTFFQkExNzZDNDMwOEMxRUQyODkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUJGNjVFRkQ2NUI2MTFFQkExNzZDNDMwOEMxRUQyODkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIwMjAgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjcyOEE2Q0I1MzNFQUUxNTcxRTk3NDVGOTVFNzgzNUU4IiBzdFJlZjpkb2N1bWVudElEPSI3MjhBNkNCNTMzRUFFMTU3MUU5NzQ1Rjk1RTc4MzVFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt3gUSkAAAMAUExURYyTl8pbOYSEg7Z9Z6bZ4f+6lrKMdf/DnUVLTCAtLv///8t1VtW3qdtcNKxNLcSJbNuUdtnZ2dGvmf+rhP/Srv/Jpp16ZpXi56msqdtkP4vo9aiWjea3pf+8m5nX28Wagp66u7y8taJnT9dgPf+2kZLm7tZcNwwMDNtkQf+2kb5iRJXi6tuHaPjg4KGLev2uh//Pra6elf/Nqv+ke9BePE5rbr9cPryom4FiUf7Mtf2jevingVJSUP+xh+ZzRP/WsrSEa/+vhsttTrlPL8aOc/XIuv/Hov++maZyXaSln5rj6u2ignyrrt+jg/ieePmWav/BnttjPum0meOefeWqlPvi1cNZORYWFv/NqJHT1vStjrnBu5ff5cliQfOTcf/LqpfS2aDh6JvN0v/Pq5bm8P/r1u6+rJjm6//HocJHJanNypTj7uenittjQP/HpK6Og//HpP+tfjU/QP//+86oj/9PWJPg5f+xipff453o79NgPLdTM//Dop3r8MhpSv389vKnhv/JpfCbes1VLcNVNJXf41p8gdlZNAIBAf/Dn6bN0e2AVf8jKt9iPHpzauBkPZjKzpPg4aDV2P2QZ+h3SoO6vv/Npv/Mq9dkPuSYeP/XwP/Pqf/KqJbe5pje5P/LqP/MqZne5f/LqP/MqJje4//LqerPwfj9/9F+Xr5TMcdZNQgGBv/p3RMQEf+5kf+8lNNoPani5qLq8c5XN//LrMmxo9PMyenr65Xg6QoKCsBNKRYREd5kRMqjjZPd48CzoI7g5/v7+52imPz9+/9mb47k6Yzn6Znh6ZLn6+qbgbpdPPCHWsaTeOKVdG6an+/2+fWSaPDw8P/En4tkWK5kTf/08/+nqprd5Zne43FnZP89SNrAtQYGBhoaGv/NqL10Xv/Oqn1pXqLQ0v/HqP+sraLSz5Xg5pne55nf5u6tifKEXvzr3OyhfYh7e9zBsv/NpuilgZHh4Y7l5xASERAQEJjg4xUKB/+Bg9ZkQNRiP/argdhiP//RuJXb4YyBd6qBb2GzT5QAAAPzSURBVHjaYpgHAguzJ1zplQSD38omjIyMvyUZD514MRcsOY8Bokb8P++GXEnJwEDJXA3JGT8Zw0z6GaU/HUdWo6rA2C+pHPhbWVJSQwNkWtUqk/7m/GPPWq/D1aRI82pUVamtbPkhqZwLUhM4g1G5d7NnSsVcmJoX++73VjEynnqjxbinCqxGMlDZRLJXKymxDKZGe0Js7yrG6pf2M/mUq6ogbpdU/i3Z7plyA6bGS8Gkqrp6pr3RvRXOPxl/Q5wUGBjYLp2yEKYm3bM9jI/bYMGi2dO5nRlbfmtAjeLNz4b7S1W6vZovSmTRokUPpq9wbmmpmgFTo7oQoaaZT+ux0SKQIpFgLb6VjD80IGoQdqkaNvPpAK0CgcUiNQJazs6blXN7QebEwNVI7OIuX2y0YMECiFEFDTpOZmGMJrzM4gg1npk67PEGBW5LDR4ULBU1EhF50BjAah3bDldzvSLFMHNFhvvpKXZTui9kiNyL6wayXrGzmrWzZUPDsOx5ivwuJ00lD2YHBw+PvUHyHh7/HZg9rkSdWiX/Aurm5zueNtQ5ib21DJFJs1z2UKwv1DJNJsT1pgu3k2O0NkTNQvFHVmfrHP4Vb3uoF5r2f/b/P6HmFuZcfQLcMwsVsyFqYl58FGoy87Yw52Hbe1vM117+/7sSByHDy1FarDmTnkHVzBWfFFzdpBns4sLPn/O+8ZIvP7/LGV936xXrorNbYX6P+RsU58f+wOBBssjsBYs0MwySgeCStTVrlzhczbwDQsbGshlGixctCmi8pym8aNGCxaLuxsYNcl/hYThvR9b+k+s6Fy+aY6RprSmsCYy5e27rg4WixZcg0nOFtpRiYQAoIpJFC4wMLokuWnDJcavUDpR8sfDZJG/3AiM3fVY3t07WX50L5nRad0GzBVTNvHmtO7Y6Xrr33o21XF9fc86iBY22QlBTEGoWvpDzXSe6YIGBrJ++6JZFRu4f5DDUzLuh/TR43ZbFixdliC5YasT+JuvoEgw182KkeCaXv3+waAHIsMk8UmBvw9S0Llw470VKrdfGw5b+Vp0GyQYFwhcsD7JMrK08fh3m99Z5z2oTp7YVMXBxzbLyty4X9vebxcXFxGnqI7fJC5ZP073OFYWrd9hwcXGtCXB0dKx5DWRxdHzbzdmWUAlR4xXJob77brj6TgmgVH3qn9R6IC2xWv1z+O5vnD6V8xYC1VSadoR//vJl55e7glxcB6+VPlnOxSV4d+fOL1++hN/hTPACqkmfGv5F/cuXz+o7O4oucune6jlynmt7UcfOnUB9X9R3tlUuZHhRa7r6CxjcUb9jE321tOf7YUGODvXVX0BqvqhzRooDBBgAX+cweLUYZ0kAAAAASUVORK5CYII=',
      'avatar.png'
    );
    let uploader = document.getElementById('raised-button-file');
    fireEvent.change(uploader, {
      target: { files: [file] },
    });

    const eraserArrow = getByTestId(
        container,
        'toolbar-button-arrow-object_erase'
      );
      fireEvent.click(eraserArrow);

      const partialEraserBtn = getByTitle(container, 'Partial Erase');
      fireEvent.click(partialEraserBtn);

      const rawCanvas = container.getElementsByClassName(
        'raw-canvas'
      )[1] as HTMLCanvasElement;

      fireEvent.mouseDown(rawCanvas, { clientX: 10, clientY: 10 });
      fireEvent.mouseMove(rawCanvas, { clientX: 200, clientY: 200 });
      fireEvent.mouseUp(rawCanvas, { clientX: 200, clientY: 200 });

      const stored = window.localStorage.getItem('canvas:simulated:events');
      const persistentEvents = JSON.parse(stored as string);
      expect(
        JSON.parse(persistentEvents[persistentEvents.length - 1].param)
          .isPartialErased
      ).toBe(true);
      
  });

  it(`should replace the background image with the same image, partial erased`, async () => {


    const { container } = render(<App />);

    const addImageBtn = getByTitle(container, 'Add Image');

    fireEvent.click(addImageBtn);

    const setAsBackgroundImageOption = document.getElementsByName('gender1')[1]; //getByText(container, 'Set as background image')
    fireEvent.click(setAsBackgroundImageOption);
    const setAsPartialErasableBtn = document.getElementsByName('gilad')[0]; //getByText(container, 'Set background image partial erasable')
    fireEvent.click(setAsPartialErasableBtn);

    const uploadBtn = document.getElementsByClassName('MuiButton-label')[1];

    fireEvent.click(uploadBtn);
    let file = dataURLtoFile(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUJGNjVFRkU2NUI2MTFFQkExNzZDNDMwOEMxRUQyODkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUJGNjVFRkQ2NUI2MTFFQkExNzZDNDMwOEMxRUQyODkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIwMjAgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjcyOEE2Q0I1MzNFQUUxNTcxRTk3NDVGOTVFNzgzNUU4IiBzdFJlZjpkb2N1bWVudElEPSI3MjhBNkNCNTMzRUFFMTU3MUU5NzQ1Rjk1RTc4MzVFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt3gUSkAAAMAUExURYyTl8pbOYSEg7Z9Z6bZ4f+6lrKMdf/D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',
      'avatar.png'
    );
    let uploader = document.getElementById('raised-button-file');
    fireEvent.change(uploader, {
      target: { files: [file] },
    });

    await wait(() => {
      const eraserArrow = getByTestId(
        container,
        'toolbar-button-arrow-object_erase'
      );
      fireEvent.click(eraserArrow);

      const partialEraserBtn = getByTitle(container, 'Partial Erase');
      fireEvent.click(partialEraserBtn);

      const rawCanvas = container.getElementsByClassName(
        'raw-canvas'
      )[1] as HTMLCanvasElement;

      fireEvent.mouseDown(rawCanvas, { clientX: 80, clientY: 210 });
      fireEvent.mouseMove(rawCanvas, { clientX: 80, clientY: 90 });
      fireEvent.mouseUp(rawCanvas, { clientX: 80, clientY: 90 });

      const stored = window.localStorage.getItem('canvas:simulated:events');
      const persistentEvents = JSON.parse(stored as string);
      expect(
        JSON.parse(persistentEvents[persistentEvents.length - 1].param)
          .isPartialErased
      ).toBe(true);
    });
  });
  
  it(`should replace a 2d shape with a partial erased image of itself`, async () => {
    localStorage.removeItem('canvas:simulated:events');
    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;

    const shapeButton = getByTestId(
      container,
      'toolbar-button-rectangle_shape'
    );
    const eraserArrow = getByTestId(
      container,
      'toolbar-button-arrow-object_erase'
    );

    fireEvent.click(shapeButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(upperCanvas, { clientX: 100, clientY: 100 });

    fireEvent.click(eraserArrow);

    await wait(() => {
      const partialEraserBtn = getByTitle(container, 'Partial Erase');
      fireEvent.click(partialEraserBtn);

      const rawCanvas = container.getElementsByClassName(
        'raw-canvas'
      )[1] as HTMLCanvasElement;

      fireEvent.mouseDown(rawCanvas, { clientX: 80, clientY: 210 });
      fireEvent.mouseMove(rawCanvas, { clientX: 80, clientY: 90 });
      fireEvent.mouseUp(rawCanvas, { clientX: 80, clientY: 90 });

      const stored = window.localStorage.getItem('canvas:simulated:events');
      const persistentEvents = JSON.parse(stored as string);
      expect(persistentEvents[0].type).toBe('added');
      expect(persistentEvents[1].type).toBe('removed');
      expect(persistentEvents[2].type).toBe('added');
      expect(persistentEvents[2].objectType).toBe('image');
      expect(JSON.parse(persistentEvents[2].param).isPartialErased).toBe(true);
    });
  });

  it(`should replace a free hand drawing with a partial erased image of itself`, async () => {
    localStorage.removeItem('canvas:simulated:events');
    const { container } = render(<App />);

    const upperCanvas = container.getElementsByClassName(
      'upper-canvas'
    )[0] as HTMLCanvasElement;

    const pencilButton = getByTestId(
      container,
      'toolbar-button-pencil_line'
    );
    const eraserArrow = getByTestId(
      container,
      'toolbar-button-arrow-object_erase'
    );

    fireEvent.click(pencilButton);
    fireEvent.mouseDown(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 70, clientY: 100 });
    fireEvent.mouseMove(upperCanvas, { clientX: 200, clientY: 200 });
    fireEvent.mouseMove(upperCanvas, { clientX: 60, clientY: 200 });
    fireEvent.mouseUp(upperCanvas, { clientX: 60, clientY: 200 });

    fireEvent.click(eraserArrow);

    await wait(() => {
      const partialEraserBtn = getByTitle(container, 'Partial Erase');
      fireEvent.click(partialEraserBtn);

      const rawCanvas = container.getElementsByClassName(
        'raw-canvas'
      )[1] as HTMLCanvasElement;

      fireEvent.mouseDown(rawCanvas, { clientX: 50, clientY: 210 });
      fireEvent.mouseMove(rawCanvas, { clientX: 210, clientY: 210 });
      fireEvent.mouseUp(rawCanvas, { clientX: 210, clientY: 210 });

      const stored = window.localStorage.getItem('canvas:simulated:events');
      const persistentEvents = JSON.parse(stored as string);
      expect(persistentEvents[0].type).toBe('added');
      expect(persistentEvents[1].type).toBe('removed');
      expect(persistentEvents[2].type).toBe('added');
      expect(persistentEvents[2].objectType).toBe('image');
      expect(JSON.parse(persistentEvents[2].param).isPartialErased).toBe(true);
    });
  });


  
});
