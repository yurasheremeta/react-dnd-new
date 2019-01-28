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
import { 
	getSize,
	getLeftPosition,
	getTopPosition,
	checkIfItemInWorkspace
} from './utils';

const styles: React.CSSProperties = {
	width: 500,
	height: 500,
	border: '1px solid black',
	position: 'relative'
}

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
		const workspace = getSize("div.workspace");
		const workSpaceX = workspace.x;
		
		if (props.boxes.hasOwnProperty(item.id)) {
			const left = getLeftPosition(item , delta );
			const top = getTopPosition(item , delta);
			checkIfItemInWorkspace(left, top );
			props.moveBox(item.id, left, top, item.value)
		} else {
			const widthBetweenWorkspaceAndToolbar = Math.round(workSpaceX - props.toolbarPositionX);
			const left = Math.round(item.left + delta.x - widthBetweenWorkspaceAndToolbar);
			const top = Math.round(item.top + delta.y );
			checkIfItemInWorkspace(left , top);
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
