import * as React from 'react'
import Container from './Container'
import Box from './Box';
import { Toolbar } from './Toolbar';
import { string } from 'prop-types';


export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number, title: string, value: string } },
	toolbarpositionX: number,
	toolbarpositionY: number,

}

export interface ContainerProps {
	moveBox: Function,
	handleValueChange: Function;
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
			}, () => {
				console.log("stet", this.state)
			})
		}
			;

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
