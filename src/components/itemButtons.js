import React from 'react';

export class ItemButtons extends React.Component {
	render() {
		return (
			<div className="item-buttons">
				{this.props.link ? (
					<a href={this.props.link} target="_blank" rel="noopener noreferrer">
						view
					</a>
				) : (
					<em>
						<small>no link</small>
					</em>
				)}
			</div>
		);
	}
}