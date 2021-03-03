import { useState } from 'react';
export const use3dShape = (new3dShape: string = 'new') => {
  console.log(new3dShape)
    const [shape3d, update3dShape] = useState(new3dShape);
  return { shape3d, update3dShape };
};
