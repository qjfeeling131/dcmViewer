import React from "react";
import { DragSource } from "react-dnd"; 
import itemTypes from  '../itemTypes';
const style = {
    position: 'absolute',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    cursor: 'move',
  }

  const ReportBox = ({
    left,
    top,
    connectDragSource,
    children,
  }) => {
    return connectDragSource(
      <div style={Object.assign({}, style, { left, top })}>{children}</div>,
    )
  }

  export default DragSource(
    itemTypes.BOX,
    {
      beginDrag(props) {
        const { id, left, top } = props
        return { id, left, top }
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(ReportBox)