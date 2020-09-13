import React, { useState, useCallback } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { ReactComponent as MarginMarker } from "./images/margin-marker.svg";
import { ReactComponent as PaddingMarker } from "./images/padding-marker.svg";
import styles from "./markers.module.css";

export type MarkerPropsType = {
  onPaddingDeltaUpdate: (delta: number) => void;
  onMarginDeltaUpdate: (delta: number) => void;
  containerWidth: number;
};

export function Markers({
  onPaddingDeltaUpdate,
  onMarginDeltaUpdate,
  containerWidth,
}: MarkerPropsType) {
  const [paddingDraggerPosition, setPaddingDraggerPosition] = useState(0);

  /*
    On Moving Padding Dragger - 
    1. Padding Dragger should also move with it.
    2. Padding Delta should be sent to parent in negetive direction - when padding dragger is moved back(in negetive direction) - padding increases
    3. Update the padding dragger position to be used by margin dragger
  */
  const handlePaddingDraggerDragged = useCallback(
    (_: DraggableEvent, data: DraggableData) => {
      onPaddingDeltaUpdate(data.deltaX * -1);
      onMarginDeltaUpdate(data.deltaX);
      setPaddingDraggerPosition(data.x);
    },
    [onPaddingDeltaUpdate, onMarginDeltaUpdate, setPaddingDraggerPosition]
  );

  /*
    On Moving Margin Dragger - 
    1. Padding Dragger should also move with it.
    2. Margin Delta should be sent to parent
  */
  const handleMarginDraggerDragged = useCallback(
    (_: DraggableEvent, data: DraggableData) => {
      setPaddingDraggerPosition(paddingDraggerPosition + data.deltaX);
      onMarginDeltaUpdate(data.deltaX);
    },
    [paddingDraggerPosition, onMarginDeltaUpdate]
  );

  const paddingDraggableComponentPosition = { x: paddingDraggerPosition, y: 0 };

  return (
    <div className={`${styles.container}`}>
      <Draggable
        position={paddingDraggableComponentPosition}
        axis="x"
        scale={1}
        onDrag={handlePaddingDraggerDragged}
        bounds={{ left: 0, right: containerWidth * 0.8 }}
      >
        <PaddingMarker />
      </Draggable>
      <div className={`${styles.marginDraggerContainer}`}>
        <Draggable
          axis="x"
          scale={1}
          onDrag={handleMarginDraggerDragged}
          bounds={{ left: 0, right: containerWidth * 0.8 }}
        >
          <MarginMarker />
        </Draggable>
      </div>
    </div>
  );
}

export default Markers;
