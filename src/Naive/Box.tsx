import * as React from 'react'
import { DragSource, ConnectDragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	position: 'absolute',
	// border: '1px dashed gray',
	backgroundColor: 'white',
	// padding: '0.5rem 1rem',
	padding: '3px',
	cursor: 'move',

}

const boxSource = {
	beginDrag(props: BoxProps) {
		const { id, left, top, value } = props;
		return { id, left, top, value }
	},
}

export interface BoxProps {
	id: any
	left: number
	top: number
	hideSourceOnDrag?: boolean
	value: string

}

interface BoxCollectedProps {
	connectDragSource: ConnectDragSource
	isDragging?: boolean
}

class Box extends React.Component<BoxProps & BoxCollectedProps> {
	public render() {
		const {
			hideSourceOnDrag,
			left,
			top,
			connectDragSource,
			isDragging,
			children,
			id

		} = this.props
		if (isDragging && hideSourceOnDrag) {
			return null
		}

		const cStyle = { ...style, left, top };

		if (!left && !top) {
			cStyle.position = 'relative';
		}
		return connectDragSource(
			<div style={{ ...style, left, top }} id={id} className="boxDiv">
				{children}
			</div>
		)
	}
}

export default DragSource<BoxProps, BoxCollectedProps>(
	ItemTypes.BOX,
	boxSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(Box)
