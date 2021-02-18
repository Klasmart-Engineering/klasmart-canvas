import { useCopy } from "./useCopy";
import { createCanvas } from 'canvas';
import { ELEMENTS } from "../../../config/toolbar-element-names";
import { renderHook } from "@testing-library/react-hooks";
import React from "react";

const shapes = [
  {
    evented: true,
    lockMovementX: true,
    lockMovementY: true,
    lockScalingX: true,
    lockScalingY: true,
    lockRotation: true,
    set: (o: any) => {},
  }
];

const canvas = {
  ...createCanvas(200, 200),
  getObjects: () => shapes,
  on: () => {},
  off: () => {},
  findTarget: () => (shapes[0]),
  setActiveObject: (target: any) => {},
  renderAll: () => {},
  discardActiveObject: () => {},
}

let useEffect: any;

describe('useCopy useEffect, for copy and pasting objects', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  });


  test('Expect event listeners to be called', () => {
    let on = jest.spyOn(canvas, 'on');
    let listener = jest.spyOn(document, 'addEventListener');
    const { result } = renderHook(() => useCopy(
      canvas as unknown as fabric.Canvas,
      'teacher:123',
      true,
      (arg: any) => {},
      { push: (arg: any) => {}, },
      ELEMENTS.MOVE_OBJECTS_TOOL
    ));
    expect(result.current).toBeUndefined();
    expect(on).toHaveBeenCalled();
    expect(listener).toHaveBeenCalled();
  });
});