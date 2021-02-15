import fetchMock from 'fetch-mock';
import expect from 'expect';
import { permissionsReducer } from './permissionsReducer';

/**
 * Default permissions state.
 */
const permissionsState = {
  pointer: false,
  move: false,
  erase: false,
  partialErase: false,
  pen: false,
  floodFill: false,
  text: false,
  shape: false,
  undoRedo: false,
  backgroundColor: false,
  clearWhiteboard: false,
  downloadCanvas: false,
  uploadImage: false,
};

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    expect(
      permissionsReducer(undefined, {
        type: 'pen',
        payload: true,
      })
    ).toEqual({ ...permissionsState, pen: true });

    expect(
      permissionsReducer(undefined, {
        type: 'erase',
        payload: true,
      })
    ).toEqual({ ...permissionsState, erase: true });

    expect(
      permissionsReducer(undefined, {
        type: 'floodFill',
        payload: true,
      })
    ).toEqual({ ...permissionsState, floodFill: true });
  });
});
