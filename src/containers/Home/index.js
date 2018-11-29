/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
import React, {Component} from 'react'
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.scss'

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	background: isDragging ? 'lightgreen' : 'grey',
	...draggableStyle,
});
const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
});
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

@inject('shop')
@observer
export default class Home extends Component {
	componentDidMount(){
		let data = [
			{
				img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2781512380,2039838908&fm=200&gp=0.jpg",
				title:"狗狗",
				price:'9.9',
				count:1,
				id:1,
			},
			{
				img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2781512380,2039838908&fm=200&gp=0.jpg",
				title:"狗狗2",
				price:'19.9',
				count:0,
				id:2,
			},
			{
				img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2781512380,2039838908&fm=200&gp=0.jpg",
				title:"狗狗3",
				price:'29.9',
				count:10,
				id:3
			}
		]
		this.props.shop.changeInitialData(data)
	}
	onDragEnd = (result)=>{
		if (!result.destination) {
		  return;
		}
		const data = toJS(this.props.shop.data)
		const items = reorder(
			data,
			result.source.index,
			result.destination.index
		);
		this.props.shop.changeInitialData(items)
		
	  }
	render () {
		let {
			data, totalCount, totalPrice,
			increase,decrease
		} = this.props.shop
		return(
			<div className="Home">
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppableV">
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
								className='ul'
							>
							{data.length>0 && data.map((item, index) => (
								<Draggable key={index} draggableId={item.id} index={index}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getItemStyle(
											snapshot.isDragging,
											provided.draggableProps.style
										)}
										className='li'
									>
										<img src={item.img} alt=""/>
										<span>{item.title}</span>
										<em>${item.price}</em>
										<div>
											<button onClick={()=>decrease(index)}>-</button>
											<span>{item.count}</span>
											<button onClick={()=>increase(index)}>+</button>
										</div>
									</div>
								)}
								</Draggable>
							))}
							</div>
						)}
					</Droppable>
				</DragDropContext> 
				<p>
					<span className="left">数量：{totalCount}个</span>
					<span className="right">价格：${totalPrice}</span>
				</p>
			</div>
		)
	}
}
