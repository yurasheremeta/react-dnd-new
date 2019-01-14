import * as React from 'react'
import Container from './Container'
import Box from './Box';
import { Toolbar } from './Toolbar';


export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number, title: string, value: string } }

}

export interface ContainerProps {
	moveBox: Function,
	setValueOf: Function;
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
	toolbar: React.RefObject<HTMLDivElement>;
	constructor(props: ContainerProps) {
		super(props);
		this.toolbar = React.createRef();
		this.moveBox = this.moveBox.bind(this);
	}

	public state = {
		boxes: {},

	}
	public moveBox(id: string, left: number, top: number ) {
	
		this.setState(prevState => {
			if (prevState.boxes[id]) {
			
				return { boxes: { ...prevState.boxes, [id]: { ...prevState.boxes[id], left, top , value: '' } } };
			} else {
				
				return { boxes: { ...prevState.boxes, [id]: { left, top, title: id , value: ''} } };
			}
		
			
		
		})
	}
	
	public render() {
		return (
			<div >
				<div style={styles}>
					<p>ITEMS</p>
					<Toolbar toolbarRef={this.toolbar} />
					<Container boxes={this.state.boxes} toolbarRef={this.toolbar} moveBox={this.moveBox}/>
				</div>
				<div>
				</div>
			</div>
		)
	}
}
