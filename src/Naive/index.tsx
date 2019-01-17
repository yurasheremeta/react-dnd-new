import * as React from 'react'
import Container from './Container'
import { Toolbar } from './Toolbar';

export interface BoxType {
	[key: string]: { top: number; left: number, title: string, value: string },
}
export type HandleValueChangeType = (id: string) => (event: any) => void

export type MoveBoxType = (id: string, left: number, top: number, value: string) => void;

export type SetPositionType = (toolbarpositionX: number, toolbarpositionY: number) => void;

export interface ContainerState {
	boxes: BoxType,
	toolbarpositionX: number,
	toolbarpositionY: number,
}

export interface ContainerProps {
	moveBox: MoveBoxType,
	handleValueChange: HandleValueChangeType;
}

const styles: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap'
}

export default class DragAroundNaive extends React.Component<
	{},
	ContainerState
	> {
	constructor(props: ContainerProps) {
		super(props);
		this.moveBox = this.moveBox.bind(this);
	}

	public state = {
		boxes: {},
		toolbarpositionX: 0,
		toolbarpositionY: 0
	}

	handleValueChange = (id: string) => {
		return (event: any) => {
			const value = event.target.value;
			this.setState(prevState => {
				return { boxes: { ...prevState.boxes, [id]: { ...prevState.boxes[id], value: value } } };
			})
		};
	}

	setPosition = (toolbarpositionX: number, toolbarpositionY: number) => {
		this.setState({
			toolbarpositionX,
			toolbarpositionY
		})
	}
	moveBox = (id: string, left: number, top: number, value: string) => {
		this.setState(prevState => {
			if (prevState.boxes[id]) {
				return { boxes: { ...prevState.boxes, [id]: { ...prevState.boxes[id], left, top, value: value } } };
			} else {
				return { boxes: { ...prevState.boxes, [id]: { left, top, title: id, value: value } } };
			}
		})
	}

	public render() {
		return (
			<div >
				<div style={styles}>
					<p>ITEMS</p>
					<Toolbar
						toolbarPositionX={this.state.toolbarpositionX}
						toolbarPositionY={this.state.toolbarpositionY}
						setPosition={this.setPosition}
					/>
					<Container
						boxes={this.state.boxes}
						toolbarPositionX={this.state.toolbarpositionX}
						toolbarPositionY={this.state.toolbarpositionY}
						moveBox={this.moveBox}
						handleValueChange={this.handleValueChange}
					/>
				</div>
				<div>
				</div>
			</div>
		)
	}
}
