import React from 'react';
import { useSharedEventSerializer } from '../../SharedEventSerializerProvider';
import Canvas3d from './Canvas3d'

/**
 * HOC component that use the shared event serializer and pass it to the canvas 3d component as prop.
 * @param Component the 3d canvas
 */
export const withEventSerializerHOC = (Component: any) => {
  return (props: any) => {
  
    const {
      state: { eventSerializer },
    } = useSharedEventSerializer();

    return (
      <Component
         eventSerializer={eventSerializer}
        {...props}
      />
    );
  };
};

export default withEventSerializerHOC(Canvas3d);
