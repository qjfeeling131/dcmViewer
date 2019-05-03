import React from "react";
import { DropTarget } from "react-dnd";
import DrawBox from "./boxes/drawBox";
import ToolBox from "./boxes/toolBox";
import ReportBox from "./boxes/reportBox";
import update from "immutability-helper";
import ItemTypes from "./itemTypes";

const styles={
    width:5000,
    height:5000,
    border:'1px solid black',
    position:'relative'
}

class Container extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {
            boxes: {
              tool: { top: 20, left: 20, title: "tool box" },
              draw: { top: 100, left: 20, title: "drwa box" },
              report: { top: 100, left: 500, title: "report box" }
            }
          };
    }

    render()
    {
        const {connectDropTarget } = this.props
        return(connectDropTarget(
            <div style={styles}>
            <ToolBox
            key={'tool'}
            id={'tool'}
            left={this.state.boxes.tool.left}
            top={this.state.boxes.tool.top}
            >toolBox</ToolBox>
            <DrawBox
            key={'draw'}
            id={'draw'}
            left={this.state.boxes.draw.left}
            top={this.state.boxes.draw.top}
            >drawBox</DrawBox>
             <ReportBox
            key={'report'}
            id={'report'}
            left={this.state.boxes.report.left}
            top={this.state.boxes.report.top}
            >report box</ReportBox>
            </div>
        ))
    }

    moveBox(id, left, top) {
        this.setState(
          update(this.state, {
            boxes: {
              [id]: {
                $merge: { left, top }
              }
            }
          })
        );
      }
}

export default DropTarget(
    ItemTypes.BOX,
    {
      drop(props, monitor, component) {
        if (!component) {
          return;
        }
        const item = monitor.getItem();
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        component.moveBox(item.id, left, top);
      }
    },
    connect => ({
      connectDropTarget: connect.dropTarget()
    })
  )(Container);