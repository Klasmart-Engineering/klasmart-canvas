import { fabric } from 'fabric';
import React from 'react';

function createText(text: string, fontFamily: string) {
  return new fabric.Text(text, {
    fontFamily: fontFamily,
  });
}

function updateFont(
  updateFontFamily: React.Dispatch<React.SetStateAction<string>>,
  fontFamily: string
) {
  updateFontFamily(fontFamily);
}

export const textHandler = (
  text: string,
  fontFamily: string,
  updateFontFamily: React.Dispatch<React.SetStateAction<string>>
) => {
  const textFabric = createText(text, fontFamily);

  textFabric.on('selected', () => {
    updateFont(updateFontFamily, fontFamily);
  });

  textFabric.on('deselected', () => {
    updateFont(updateFontFamily, 'Arial');
  });

  return textFabric;
};
