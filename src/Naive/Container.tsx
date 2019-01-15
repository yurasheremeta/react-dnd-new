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
	width: 500,
	height: 500,
	border: '1px solid black',
	position: 'relative'
}

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
		const workArea = document.querySelector("div.workspace");
		const q = props.toolbarRef.current;
		const toolbarX = (q as any).getBoundingClientRect().x;
		const toolbarY = (q as any).getBoundingClientRect().y;
		const workSpaceX = (workArea as any).getBoundingClientRect().x;
		const workSpaceY = (workArea as any).getBoundingClientRect().y;
		const box = document.querySelector("#" + item.id);
		const boxDom = (box as any).getBoundingClientRect();
		const d = Math.round(boxDom.x + boxDom.width);
		const aa = Math.round(boxDom.y + boxDom.height);
		console.log("boxDom.y" , boxDom.y);
		console.log("boxDom.h" , boxDom.height);
		
		
		

		if (props.boxes.hasOwnProperty(item.id)) {
			const left = Math.round(item.left + delta.x);
			const top = Math.round(item.top + delta.y);
			if (left < 0 || top < 0 || top > aa || left > d) {
				return;
			}

			props.moveBox(item.id, left, top, props.boxes.value)
		} else {
			const b = Math.round(workSpaceX - toolbarX);
			const c = Math.round(workSpaceY - toolbarY);
			const left = Math.round(item.left + delta.x - b);
			const top = Math.round(item.top + delta.y - c);
			console.log("left", left, "top", top);
			console.log("top", top);
			console.log("boxDom.x", boxDom.x);

			if (left < 0 || top < 0 || top > aa || left > d) {
				return;
			}

			props.moveBox(item.id, left, top, props.boxes.value);
			
		}

	},
}
export interface ContainerProps {
	toolbarRef: React.RefObject<HTMLDivElement>,
	moveBox: Function,
	handleValueChange: Function;
	boxes: any,

}

interface ContainerCollectedProps {
	connectDropTarget: ConnectDropTarget

}

export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number, title: string, value: string[] } }

}

class Container extends React.Component<
	ContainerProps & ContainerCollectedProps,
	ContainerState
	> {
	constructor(props: ContainerProps & ContainerCollectedProps) {
		super(props);
		this.state = {
			boxes: {}
		}
	}




	changeItems = (id: string, value: any) => {
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
					<div >
						<input value="1"  onChange={this.props.handleValueChange(id)} type="radio"/>
						<input value="2" onChange={this.props.handleValueChange(id)} type="radio" />
						<input value="3" onChange={this.props.handleValueChange(id)} type="radio" />
					</div>

				)
		}
	}

	public render() {
		const { connectDropTarget, boxes } = this.props

		console.log("boxes on the workspace", boxes);
		return connectDropTarget(
			<div>
				<div style={styles} className="workspace">
					{Object.keys(boxes).map(key => {
						const { left, top, value } = boxes[key];
						console.log("value", value);

						return (
							<Box
								key={key}
								id={key}
								left={left}
								top={top}
							>
								{
									this.changeItems(key, value)
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
