import { useState } from 'react';

export const canvasImagePopup = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ imagePopupIsOpen, updateImagePopupIsOpen ] = useState(false);
  return { imagePopupIsOpen, updateImagePopupIsOpen };
};
