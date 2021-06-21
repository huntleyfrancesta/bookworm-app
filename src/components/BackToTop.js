import React from 'react';

export class BackToTop extends React.Component {
	render() {
		return (
			<button
				id="back-to-top"
				className="back-to-top"
				onClick={this.props.goBackToTop}
				style={{ display: this.props.showBackToTop ? 'block' : 'none' }}
			>
				back to top
			</button>
		);
	}
}