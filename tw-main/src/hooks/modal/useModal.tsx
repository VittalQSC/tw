import * as React from "react";
import { useEffect, useState } from "react";
import * as Modal from "react-modal";
import { useTimer } from "../useTimer";

Modal.setAppElement("#root");
Modal.defaultStyles.content = {};
Modal.defaultStyles.overlay = {
  ...Modal.defaultStyles.overlay,
  backgroundColor: "inherit",
};

export enum ModalRelativePosition {
  ABOVE = "ABOVE",
}

const mapRelativePositionToStyles = {
  [ModalRelativePosition.ABOVE]: (
    x: number,
    y: number,
    offset: number
  ): Modal.Styles => ({
    content: { position: "absolute", top: `${y - offset}px`, left: `${x}px` },
  }),
};

export interface UseModalParams {
  contentRelativeRef: React.MutableRefObject<HTMLElement> | null;
  relativePosition: ModalRelativePosition | null;
}

export function useModal({
  contentRelativeRef = null,
  relativePosition = null,
}: UseModalParams) {
  const { start, stop, time } = useTimer();

  const modalStyle = React.useMemo<Modal.Styles>(() => {
    if (contentRelativeRef.current && relativePosition) {
      const { x, y, height } =
        contentRelativeRef.current.getBoundingClientRect();
      const newStyles = mapRelativePositionToStyles[relativePosition](
        x,
        y,
        height
      );
      return newStyles;
    }
    return {
      content: { position: "absolute", top: "100px", left: "100px" },
    };
  }, [contentRelativeRef?.current, time]);

  return {
    components: {
      Modal(props: React.PropsWithChildren<Modal.Props>) {
        useEffect(() => {
          start();
          return () => {
            stop();
          };
        }, []);

        useEffect(() => {
          if (!props.isOpen) {
            stop();
          }
        }, [props.isOpen]);

        return (
          <>
            <Modal {...props} style={modalStyle}>
              {props.children}
            </Modal>
            <span></span>
          </>
        );
      },
    },
  };
}
