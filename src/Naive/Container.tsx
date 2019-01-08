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

const boxTarget = {
	drop(
		props: ContainerProps,
		monitor: DropTargetMonitor,
		component: Container | null,
	) {
		if (!component) {
			return
		}
		const item = monitor.getItem()
		const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
		const workArea = document.querySelector("div.workspace");
		const q = props.toolbarRef.current;
		const toolbarX = (q as any).getBoundingClientRect().x;
		const toolbarY = (q as any).getBoundingClientRect().y;
		const workSpaceX = (workArea as any).getBoundingClientRect().x;
		const workSpaceY = (workArea as any).getBoundingClientRect().y;


		if (props.boxes.hasOwnProperty(item.id)) {
			const b = Math.round(workSpaceX - toolbarX);
			const c = Math.round(workSpaceY - toolbarY);
			const left = Math.round(item.left + delta.x);
			console.log("workSpaceX", workSpaceX);
			const top = Math.round(item.top + delta.y);
			props.moveBox(item.id, left, top)
		} else {
			const b = Math.round(workSpaceX - toolbarX);
			const c = Math.round(workSpaceY - toolbarY);
			const left = Math.round(item.left + delta.x - b);
			console.log("workSpaceX", workSpaceX);
			const top = Math.round(item.top + delta.y - c);
			props.moveBox(item.id, left, top)
		}


	},
}
export interface ContainerProps {
	// hideSourceOnDrag: boolean,
	toolbarRef: React.RefObject<HTMLDivElement>,
	moveBox: Function,
	boxes: any

}

interface ContainerCollectedProps {
	connectDropTarget: ConnectDropTarget

}

export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number, title: string } }

}

class Container extends React.Component<
	ContainerProps & ContainerCollectedProps,
	ContainerState
	> {

	componentDidMount() {

		const workArea = document.querySelector("div.workspace");
		const rect = (workArea as any).getBoundingClientRect();
		const rect1 = (workArea as any).getBoundingClientRect().x;
		console.log(rect);
		console.log("x", rect1);
	}

	public render() {
		const { connectDropTarget, boxes } = this.props

		console.log("ssss", boxes);

		// ref={(div) => {this.workspace = div}}
		return connectDropTarget(

			<div style={styles} className="workspace">
				{Object.keys(boxes).map(key => {
					const { left, top, title } = boxes[key]
					return (
						<Box
							key={key}
							id={key}
							left={left}
							top={top}
						>
							{title}
						</Box>

					)
				})}
			</div>
			,
		)
	}

	// public moveBox1(id: string, left: number, top: number) {
	// 	this.props.moveBox(id, left, top);
	// }
}

export default DropTarget<ContainerProps, ContainerCollectedProps>(
	ItemTypes.BOX,
	boxTarget,
	(connect: any) => ({
		connectDropTarget: connect.dropTarget(),
	}),
)(Container)
