import React from 'react';


// using trackPromise so can use LoadingIndicator
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const printTypes = ['all', 'books', 'magazines'];
const bookTypes = ['partial', 'full', 'free-ebooks', 'paid-ebooks', 'ebooks'];

const apiKey = 'AIzaSyCIxIIcpTwWrV5HmCj_q4AWZRAqD7y6CFI';
const apiURL = "https://www.googleapis.com/books/v1/volumes";

export class Search extends React.Component {
	state = {
		searchTerm: '',
		printType: 'all',
		bookType: 'full'
	};

	handleChange = event => {
		const {
			target: { name, value }
		} = event;
		this.setState({ [name]: value });
	};

	handleSubmit(e) {
		e.preventDefault();
		this.fetchBooks();
	}

	fetchBooks = () => {
		const getURL = `${apiURL}?key=${apiKey}&langRestrict=en&maxResults=40&orderBy=relevance&q=${this.state.searchTerm}&filter=${this.state.bookType}&printType=${this.state.printType}`;

		// console.log(getURL);
		// console.log(JSON.stringify(this.state.searchTerm, null, 2));

		trackPromise(
			fetch(getURL)
				.then(res => {
					if (!res.ok) {
						throw new Error('Something went wrong, please try again later.');
					}
					return res;
				})
				.then(res => {
					return res.json();
				})
				.then(data => {
					this.props.updateResults(data);
				})
				.catch(err => {
					this.setState({
						error: err.message
					});
				})
		);
	};

	render() {
		const bookTypeOptions = bookTypes.map((bookTypeOption, i) => (
			<option value={bookTypeOption} key={bookTypeOption}>
				{bookTypeOption}
			</option>
		));
		const printTypeOptions = printTypes.map((printTypeOption, i) => (
			<option value={printTypeOption} key={printTypeOption}>
				{printTypeOption}
			</option>
		));

		return (
			<div className="header_content">
				<h1>Google Book Search</h1>

				<form id="form" onSubmit={e => this.handleSubmit(e)}>
					<legend />

					<label htmlFor="searchTerm">
						<input
							type="text"
							name="searchTerm"
							id="searchTerm"
							required
							aria-required="true"
							placeholder=""
							value={this.state.searchTerm}
							onChange={this.handleChange}
						/>
					</label>
					<button id="search">search</button>

					<div className="select-container">
						<label htmlFor="printType">
							Print Type{' '}
							<select
								id="printType"
								name="printType"
								value={this.state.printType}
								onChange={this.handleChange}
							>
								{printTypeOptions}
							</select>
						</label>
						<label htmlFor="bookType">
							Book Type{' '}
							<select
								id="bookType"
								name="bookType"
								value={this.state.bookType}
								onChange={this.handleChange}
							>
								{bookTypeOptions}
							</select>
						</label>
					</div>
				</form>

				<p id="error-message" className="error-message">
					{this.state.error}
				</p>

				<LoadingIndicator />
			</div>
		);
	}
}