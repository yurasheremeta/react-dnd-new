import * as React from 'react'
import {
	DropTarget,
	ConnectDropTarget,
	DropTargetMonitor,
	XYCoord,
} from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'

const update = require('immutability-helper')


const styles: React.CSSProperties = {
	width: 300,
	height: 300,
	border: '1px solid black',
	position: 'relative'
}


const divWorkspace = "div.workspace";
const workspace = "workspace";
const boxTarget = {
	drop(
		props: ContainerProps,
		monitor: DropTargetMonitor,
		component: Container | null,
	) {
		if (!component) {
			return
		}
	
		const item = monitor.getItem();
		const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
		const workArea = document.querySelector(divWorkspace);
		const workSpaceX = (workArea as any).getBoundingClientRect().x;
		const workSpaceY = (workArea as any).getBoundingClientRect().y;
		const box = document.querySelector("#" + item.id);
		const boxDom = (box as any).getBoundingClientRect();
		const d = Math.round(boxDom.x + boxDom.width);
		const aa = Math.round(boxDom.y + boxDom.height);
		
		if (props.boxes.hasOwnProperty(item.id)) {
			const left = Math.round(item.left + delta.x);
			const top = Math.round(item.top + delta.y);
			if (left < 0 || top < 0 ) {
				return;
			}

			props.moveBox(item.id, left, top)
		} else {
			const b = Math.round(workSpaceX - props.toolbarPositionX);
			const c = Math.round(workSpaceY - props.toolbarPositionY);
			const left = Math.round(item.left + delta.x - b);
			const top = Math.round(item.top + delta.y - c);

			if (left < 0 || top < 0 ) {
				return;
			}
			props.moveBox(item.id, left, top);	
		}
	},
}
export interface ContainerProps {
	moveBox: Function,
	handleValueChange: Function;
	boxes: any,
	toolbarPositionX: number;
	toolbarPositionY: number;

}

interface ContainerCollectedProps {
	connectDropTarget: ConnectDropTarget
}

class Container extends React.Component<
	ContainerProps & ContainerCollectedProps
	> {
	 renderItems = (id: string, value: any) => {
		switch (id) {
			case "a":
				return (
					<input type="text" value={value} onChange={this.props.handleValueChange(id)} />
				)
			case "b":
				return (
					<textarea value={value} onChange={this.props.handleValueChange(id)} />
				)
			case "c":
				return (
					<form >
						<input value="1"  name= "radio" onChange={this.props.handleValueChange(id)} type="radio"/>
						<input value="2" name="radio" onChange={this.props.handleValueChange(id)} type="radio" />
						<input value="3" name="radio" onChange={this.props.handleValueChange(id)} type="radio" />
					</form>
				)
		}
	}
	public render() {
		const { connectDropTarget, boxes } = this.props
		return connectDropTarget(
			<div>
				<div style={styles} className={workspace}>
					{Object.keys(boxes).map(key => {
						const { left, top, value } = boxes[key];
						return (
							<Box
								key={key}
								id={key}
								left={left}
								top={top}
							>
								{
									this.renderItems(key, value)
								}
							</Box>
						)
					})}
				</div>
				<button onClick={() => console.log(this.props.boxes)}>submit</button>
			</div>
		)
	}
}

export default DropTarget<ContainerProps, ContainerCollectedProps>(
	ItemTypes.BOX,
	boxTarget,
	(connect: any) => ({
		connectDropTarget: connect.dropTarget(),
	}),
)(Container)
