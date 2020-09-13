import Ruler from "@scena/react-ruler";
import React, { useLayoutEffect, useRef, useState } from "react";
import ListEditor from "../list-editor/list-editor";
import Markers from "../markers/markers";
import styles from "./text-editor.module.css";

export function TextEditor() {
  const [padding, setPadding] = useState(5);
  const [margin, setMargin] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef) {
      setContainerWidth(containerRef.current?.offsetWidth || 0);
    }
  }, [containerRef]);

  function handleMarginDeltaUpdate(delta: number) {
    setMargin(margin + delta);
  }

  function handlePaddingDeltaUpdate(delta: number) {
    setPadding(padding + delta);
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.rulerContainer}>
        <Ruler
          type="horizontal"
          height={20}
          backgroundColor={"white"}
          lineColor={"black"}
          unit={100}
        />
      </div>
      <div className={styles.markerContainer}>
        <Markers
          onPaddingDeltaUpdate={handlePaddingDeltaUpdate}
          onMarginDeltaUpdate={handleMarginDeltaUpdate}
          containerWidth={containerWidth}
        />
      </div>
      <ListEditor padding={padding} margin={margin} />
    </div>
  );
}
