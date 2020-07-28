import { useReducer } from 'react';


export const UNDO = 'CANVAS_UNDO';
export const REDO = 'CANVAS_REDO';
export const SET = 'CANVAS_SET';
export const MODIFY = 'CANVAS_MODIFY';
// const CLEAR = 'CANVAS_CLEAR';

// interface UndoRedoState {
//   present: any[];
//   currentAction: any;
//   past: any[];
//   future: any[];
//   event: any;
//   actionType: string | null;
// }

interface UndoRedoState {
  states: any[];
  actionType: string | null;
  activeStateIndex: number | null;
  activeState: any;
}

const defaultState = {
  states: [],
  actionType: null,
  activeStateIndex: null,
  activeState: null,
}

const reducer = (
  state: UndoRedoState = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET: {
      console.log(action.payload);
      const states = [...state.states, action.payload];
      const activeState = { objects: action.payload };
      const activeStateIndex = states.length - 1;

      console.log('active index: ', activeStateIndex);

      return {
        ...state,
        states,
        actionType: SET,
        activeStateIndex,
        activeState: JSON.stringify(activeState),
      };
    }
    case UNDO: {
      const activeStateIndex =
        state.activeStateIndex !== null && state.activeStateIndex >= 1
          ? state.activeStateIndex - 1
          : null;

      const activeState =
        activeStateIndex !== null && activeStateIndex >= 0 ? state.states[activeStateIndex] : null;

      return {
        ...state,
        actionType: UNDO,
        activeStateIndex,
        activeState,
      };
    }

    case REDO: {

      if (state.activeStateIndex !== null && state.activeStateIndex + 1 === state.states.length) {
        return state;
      }

      const activeStateIndex = state.activeStateIndex !== null ? state.activeStateIndex as number + 1 : 0;

      const activeState =
        activeStateIndex !== null && activeStateIndex >= 0 ? state.states[activeStateIndex] : 0;

      return {
        ...state,
        actionType: UNDO,
        activeStateIndex,
        activeState,
      };
    }
    default: {
      return defaultState;
    }
  }
};

// const defaultState = {
//   present: [],
//   currentAction: null,
//   past: [],
//   future: [],
//   event: null,
//   actionType: null,
// };

// const reducer = (state: UndoRedoState = defaultState, action: { type: string, payload: any }) => {
//   // let present = [ ...state.present ];
//   // let future = [ ...state.future ];
//   // let past = [ ...state.past ];
//   // let event;

//   switch(action.type) {
//     case SET: {
//       let past = [ ...state.present ];  
//       let present = [ ...state.present, { ...action.payload, actionType: action.type }];

//       return { ...state, past, present };
//     }

//     case MODIFY: {
//       let past = [ ...state.past,  { ...action.payload, actionType: action.type } ];
//       let present = [ ...state.present, { ...action.payload, actionType: action.type }];

//       return {
//         ...state,
//         past,
//         present,
//         actionType: MODIFY,
//       }
//     }

//     case UNDO: {
//       // past = [ ...state.past, state.present.pop() ];
//       let event = { type: 'remove', uuid: state.present[state.present.length - 1].target.uuid };
//       let present = [ ...state.present ];
//       let future = [ ...state.future, present.pop() ];

//       debugger;

//       return {
//         ...state,
//         future,
//         present,
//         actionType: UNDO,
//         event,
//       };

//       // present = state.past.pop();
//       // future = [ ...state.future, present ];

//       // return {
//       //   ...state,
//       //   present,
//       //   future,
//       // };

//       // break;
//     }

//     case REDO: {
//       console.log(state);
//       let future = [ ...state.future ];
//       let present = [ ...state.present, future.pop() ];
      
//       return {
//         ...state,
//         present,
//         future,
//         actionType: REDO,
//       };
//     }

//     default:
//       return defaultState;
//   }
// };

export const useUndoRedo = () => {
  console.log('reducer loading.');
  const [state, dispatch] = useReducer(reducer, defaultState);

  return { state, dispatch };
};
