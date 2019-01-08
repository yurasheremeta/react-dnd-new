import * as React from 'react'
import Container from './Container'
import Box from './Box';
import { Toolbar } from './Toolbar';

// export interface DragAroundNaiveState {
// 	hideSourceOnDrag: boolean,
// 	// boxes: { [key: string]: { top: number; left: number , title:string} }

// }

export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number, title: string } }

}

export interface ContainerProps {
	moveBox: Function
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
	//  setX(value: number){
	// 	return this.setState({
	// 		x : value
	// 	})
	//  }
	//  submit(){
	// 	alert(this.state.boxes);
		
	// }
	public state = {
		// hideSourceOnDrag: true,
		boxes: {},

	}
	public moveBox(id: string, left: number, top: number ) {

		this.setState(prevState => {
			if (prevState.boxes[id]) {
				return { boxes: { ...prevState.boxes, [id]: { ...prevState.boxes[id], left, top } } };
			} else {
				
				return { boxes: { ...prevState.boxes, [id]: { left, top, title: id } } };
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
				{/* <div>
					<button onClick={() => this.submit()}>Submit</button>
				</div> */}
			</div>
		)
	}
}
