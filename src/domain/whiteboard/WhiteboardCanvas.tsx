import { fabric } from 'fabric';
import React, {
  CSSProperties,
  FunctionComponent,
  ReactChild,
  ReactChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { WhiteboardContext } from './WhiteboardContext';
import { useCanvasActions } from './canvas-actions/useCanvasActions';
import useSynchronizedAdded from './synchronization-hooks/useSynchronizedAdded';
import useSynchronizedMoved from './synchronization-hooks/useSynchronizedMoved';
import '../../assets/style/whiteboard.css';
import { UndoRedo } from './hooks/useUndoRedoEffect';
import useSynchronizedColorChanged from './synchronization-hooks/useSynchronizedColorChanged';
import useSynchronizedFontFamilyChanged from './synchronization-hooks/useSynchronizedFontFamilyChanged';
import useSynchronizedRemoved from './synchronization-hooks/useSynchronizedRemoved';
import useSynchronizedRotated from './synchronization-hooks/useSynchronizedRotated';
import useSynchronizedScaled from './synchronization-hooks/useSynchronizedScaled';
import useSynchronizedSkewed from './synchronization-hooks/useSynchronizedSkewed';
import useSynchronizedReconstruct from './synchronization-hooks/useSynchronizedReconstruct';
import useSynchronizedPointer from './synchronization-hooks/useSynchronizedPointer';
import useSynchronizedSetToolbarPermissions from './synchronization-hooks/useSynchronizedSetToolbarPermissions';
import useSynchronizedFontColorChanged from './synchronization-hooks/useSynchronizedFontColorChanged';
import useSynchronizedRealtime from './synchronization-hooks/useSynchronizedMovingRealtime';
import { IWhiteboardContext } from '../../interfaces/whiteboard-context/whiteboard-context';
import { IClearWhiteboardPermissions } from '../../interfaces/canvas-events/clear-whiteboard-permissions';
import useSynchronizedLineWidthChanged from './synchronization-hooks/useSynchronizedLineWidthChanged';
import useSynchronizedModified from './synchronization-hooks/useSynchronizedModified';
import useFixedAspectScaling, {
  ScaleMode,
} from './utils/useFixedAspectScaling';
import { CanvasDownloadConfirm } from '../../modals/canvas-download/canvasDownload';
import { useSetCanvas } from './canvas-features/useSetCanvas';
import { useObjectManipulation } from './canvas-features/useObjectManipulation';
import { useFreeHandDrawing } from './canvas-features/useFreeHandDrawing';
import { useShapeFeature } from './canvas-features/useShapeFeature';
import { useFloodFill } from './canvas-features/useFloodFill';
import { useObjectSelection } from './canvas-features/useObjectSelection';
import { useTextObject } from './canvas-features/useTextObject';
import { useAddImage } from './canvas-features/useAddImage';
import { useChangeLineWidth } from './canvas-features/useChangeLineWidth';
import { useUndoRedo } from './canvas-features/useUndoRedo';
import useSynchronizedBrushTypeChanged from './synchronization-hooks/useSynchronizedBrushTypeChanged';
import { v4 as uuidv4 } from 'uuid';
import { IPermissions } from '../../interfaces/permissions/permissions';
import useSynchronizedBackgroundColorChanged from './synchronization-hooks/useBackgroundColorChanged';

/**
 * @field instanceId: Unique ID for this canvas.
 * This enables fabricjs canvas to know which target to use.
 * @field userId: The user's ID,
 * events originating from this canvas will contain this ID.
 * @field style: How the canvas should be styled.
 * @field pointerEvents: Enable or disable pointer interaction.
 * @field pixelWidth: The width of this canvas buffer in pixels.
 * @field pixelHeight: The height of this canvas buffer in pixels.
 * @field filterUsers: Only render remote events
 * originating from userId's in this list.
 * @field scaleMode: Determines how the canvas should scale
 * if parent element doesn't match aspect ratio.
 */
export type Props = {
  children?: ReactChild | ReactChildren | null;
  instanceId: string;
  userId: string;
  initialStyle?: CSSProperties;
  pointerEvents: boolean;
  pixelWidth: number;
  pixelHeight: number;
  filterUsers?: string[];
  clearWhiteboardPermissions: IClearWhiteboardPermissions;
  scaleMode?: ScaleMode;
  display?: boolean;
  permissions: IPermissions;
  updatePermissions: (tool: string, payload: boolean) => void;
};

const WhiteboardCanvas: FunctionComponent<Props> = ({
  children,
  instanceId,
  userId,
  initialStyle,
  pointerEvents,
  pixelWidth,
  pixelHeight,
  scaleMode,
  display,
  permissions,
  updatePermissions,
}: Props): JSX.Element => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [wrapper, setWrapper] = useState<HTMLElement>();
  const [generatedBy, setGeneratedBy] = useState<string>(uuidv4());

  const { width, height } = useFixedAspectScaling(
    wrapper?.parentElement,
    pixelWidth / pixelHeight,
    scaleMode || 'ScaleToFit'
  );

  const serializerToolbarState = permissions;

  // Getting context variables for this file
  const {
    penColor,
    isLocalObject,
    shape,
    canvasActions,
    updateCanvasActions,
    laserIsActive,
    allToolbarIsEnabled,
    imagePopupIsOpen,
    updateImagePopupIsOpen,
    backgroundImage,
    backgroundImageIsPartialErasable,
    localImage,
    localBackground,
    backgroundColor,
    eventSerializer,
    eventController,
  } = useContext(WhiteboardContext) as IWhiteboardContext;

  const { dispatch: undoRedoDispatch } = UndoRedo(
    canvas as fabric.Canvas,
    eventSerializer,
    userId
  );

  // useEffects and logic to set canvas properties
  useSetCanvas(
    instanceId,
    setCanvas,
    canvas as fabric.Canvas,
    wrapper as HTMLElement,
    setWrapper,
    pixelWidth,
    pixelHeight,
    pointerEvents,
    scaleMode,
    display,
    initialStyle
  );

  // Getting Canvas shared functions
  const { actions, mouseDown } = useCanvasActions(
    canvas as fabric.Canvas,
    undoRedoDispatch,
    instanceId,
    eventSerializer,
    userId
  );

  const filterOutgoingEvents = useCallback(
    (id: string): boolean => {
      if (!id) return false;

      const apply = isLocalObject(id, userId);
      if (apply) {
        //console.log(`send local event ${id} to remote`);
        return apply;
      }

      return false;
    },
    [isLocalObject, userId]
  );

  const filterIncomingEvents = useCallback(
    (id: string): boolean => {
      if (!id) return false;

      // TODO: isLocalObject will not work in case we're reloading
      // the page and server resends all our events. They would be
      // discarded when they shouldn't be discarded. Another solution
      // could be to keep track of all 'local' objects we've created
      // this session and only filter those.
      // TODO: Filter based on the filterUsers list. We should only
      // display events coming from users in that list if the list
      // isn't undefined.
      const apply = !isLocalObject(id, userId);
      if (apply) {
        // console.log(`apply remote event ${id} locally.`);
      }
      return apply;
    },
    [isLocalObject, userId]
  );

  /**
   * Reset the canvas state in case the event controller will replay all events.
   */
  useEffect(() => {
    if (!canvas) return;
    if (!eventController) return;

    const reset = () => {
      canvas.clear();

      // NOTE: Regenerate generatedBy so our own events gets applied again after the clear.
      setGeneratedBy(uuidv4());

      // This is just to avoid typescript unused variables error
      console.log(generatedBy);
    };

    eventController.on('aboutToReplayAll', reset);

    return () => {
      eventController.removeListener('aboutToReplayAll', reset);
    };
  }, [canvas, eventController, generatedBy]);


  // useEffects and logic for manage the object manipulation in canvas
  useObjectManipulation(
    canvas as fabric.Canvas,
    userId,
    actions,
    pointerEvents,
    permissions
  );

  // useEffects and logic for manage free hand drawing feature
  useFreeHandDrawing(canvas as fabric.Canvas, userId, permissions);

  // useEffects and logic for shape creation feature
  useShapeFeature(
    canvas as fabric.Canvas,
    userId,
    actions,
    mouseDown,
    undoRedoDispatch,
    permissions
  );

  // useEffects and logic for flood-fill feature
  useFloodFill(
    canvas as fabric.Canvas,
    permissions,
    userId,
    actions,
    eventSerializer,
    undoRedoDispatch
  );

  /* useEffects and logic for manage the changes that would happen
  when an object is selected */
  useObjectSelection(canvas as fabric.Canvas, actions);

  // useEffects and logic for manage text object creation/edition
  useTextObject(
    canvas as fabric.Canvas,
    instanceId,
    userId,
    actions,
    permissions
  );

  // useEffects and logic for manage image adding feature
  useAddImage(canvas as fabric.Canvas, userId);

  // useEffects and logic for manage line width changes in objects
  useChangeLineWidth(canvas as fabric.Canvas, userId, undoRedoDispatch);

  // useEffects and logic for manage undo/redo feature
  useUndoRedo(canvas as fabric.Canvas, userId, undoRedoDispatch);

  useSynchronizedMoved(
    canvas,
    userId,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedRemoved(
    canvas,
    userId,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedModified(
    canvas,
    filterOutgoingEvents,
    filterIncomingEvents,
    userId,
    undoRedoDispatch
  );
  useSynchronizedRotated(
    canvas,
    userId,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedScaled(
    canvas,
    userId,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedSkewed(canvas, filterOutgoingEvents, filterIncomingEvents);
  useSynchronizedReconstruct(
    canvas,
    filterIncomingEvents,
    userId,
    undoRedoDispatch
  );
  useSynchronizedColorChanged(
    canvas,
    userId,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedFontFamilyChanged(canvas, filterIncomingEvents);
  useSynchronizedPointer(
    canvas,
    allToolbarIsEnabled || serializerToolbarState.pointer,
    filterIncomingEvents,
    userId,
    penColor,
    laserIsActive
  );
  useSynchronizedSetToolbarPermissions(
    canvas,
    userId,
    filterIncomingEvents,
    mapDispatchToProps
  );
  useSynchronizedFontColorChanged(
    canvas,
    userId,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedLineWidthChanged(
    canvas,
    userId,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedRealtime(canvas, filterIncomingEvents, userId);
  useSynchronizedBrushTypeChanged(canvas, userId, filterIncomingEvents);
  useSynchronizedAdded(
    canvas,
    userId,
    filterOutgoingEvents,
    filterIncomingEvents,
    undoRedoDispatch
  );
  useSynchronizedSetToolbarPermissions(
    canvas,
    userId,
    filterIncomingEvents,
    updatePermissions
  );
  useSynchronizedBackgroundColorChanged(filterIncomingEvents);

  // NOTE: Register canvas actions with context.
  useEffect(() => {
    if (!canvasActions && canvas) {
      updateCanvasActions(actions);
    }

  }, [actions, updateCanvasActions, canvas, canvasActions]);

  return (
    <>
      <CanvasDownloadConfirm
        open={imagePopupIsOpen}
        onClose={updateImagePopupIsOpen}
        canvas={canvas as fabric.Canvas}
        backgroundImage={backgroundImage}
        localImage={localImage}
        width={width}
        height={height}
      ></CanvasDownloadConfirm>
      <canvas
        width={pixelWidth}
        height={pixelHeight}
        id={instanceId}
        style={{ ...initialStyle, backgroundColor: 'transparent' }}
        tabIndex={0}
        // onKeyDown={keyDown}
        onClick={() => {
          actions.addShape(shape);
        }}
      >
        {children}
      </canvas>
      {!backgroundImageIsPartialErasable && localImage && (
        <img
          style={{
            height: '100%',
            width: '100%',
          }}
          alt="background"
          src={localImage.toString()}
        />
      )}
      {!localImage && localBackground && (
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: backgroundColor,
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps,
  permissions: state.permissionsState,
  toolbarIsEnabled: (state: any) => {
    for (const key in state.permissionsState) {
      if (state.permissionsState[key] === true) {
        return true;
      }
    }

    return false;
  },
});
const mapDispatchToProps = (dispatch: any) => ({
  updatePermissions: (tool: string, payload: boolean) =>
    dispatch({ type: tool, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WhiteboardCanvas);
