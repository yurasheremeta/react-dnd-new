import * as React from 'react'
import {
	DropTarget,
	ConnectDropTarget,
	DropTargetMonitor,
	XYCoord,
} from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'
import Input from './Input';
import TextArea from './TextArea';
import RadioButtonGroup from './RadioButtonGroup';
import { BoxType } from './index';
import { HandleValueChangeType, MoveBoxType } from './index';

const styles: React.CSSProperties = {
	width: 500,
	height: 500,
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
		const workArea = document.querySelector(divWorkspace) as HTMLDivElement;
		const workSpace = workArea.getBoundingClientRect() as DOMRect;
		const workSpaceX = workSpace.x;
		const workSpaceY = workSpace.y;
		const box = document.querySelector("#" + item.id) as HTMLDivElement;
		const boxDom = box.getBoundingClientRect() as DOMRect;
		const d = Math.round(boxDom.x + boxDom.width);
		const aa = Math.round(boxDom.y + boxDom.height);

		if (props.boxes.hasOwnProperty(item.id)) {
			const left = Math.round(item.left + delta.x);
			const top = Math.round(item.top + delta.y);
			if (left < 0 || top < 0) {
				return;
			}
			props.moveBox(item.id, left, top, item.value)
			
		} else {
			const b = Math.round(workSpaceX - props.toolbarPositionX);
			const c = Math.round(workSpaceY - props.toolbarPositionY);
			const left = Math.round(item.left + delta.x - b);
			const top = Math.round(item.top + delta.y - c);

			if (left < 0 || top < 0 ) {
				return;
			}
			props.moveBox(item.id, left, top ,item.value);
		}
	},
}
export interface ContainerProps {
	moveBox: MoveBoxType,
	handleValueChange: HandleValueChangeType;
	boxes: BoxType,
	toolbarPositionX: number;
	toolbarPositionY: number;
}

interface ContainerCollectedProps {
	connectDropTarget: ConnectDropTarget
}

class Container extends React.Component<
	ContainerProps & ContainerCollectedProps
	> {
	renderItems = (id: string, value: string) => {
		switch (id) {
			case "a":
				return (
					<Input value={value} onChange={this.props.handleValueChange(id)} />
				)
			case "b":
				return (
					<TextArea value={value} onChange={this.props.handleValueChange(id)} />
				)
			case "c":
				return (
					 <RadioButtonGroup  onChange={this.props.handleValueChange(id)}/>
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
								value={value}
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
