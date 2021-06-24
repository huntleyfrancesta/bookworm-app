
import React from 'react';
import { Item } from './Item';

export class Results extends React.Component {
	render() {
		const { searchResults } = this.props;

		let bookList = [];

		if (
			searchResults[0] &&
			searchResults[0].totalItems &&
			searchResults[0].items
		) {
			bookList = searchResults[0].items.map((book, index) => {
				return <Item key={index} book={book} />;
			});
		}

		return (
			<section id="results">
				<h2>Search Results</h2>
				<ul id="results-list" className="item-list">
					{!bookList.length ? 'No books found!' : <>{bookList}</>}
				</ul>
			</section>
		);
	}
}