import React from 'react';
import { Search } from './Search';
import { Results } from './Results';
import { BackToTop } from './BackToTop';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.ref_SearchForm = React.createRef();
		this.ref_SearchResults = React.createRef();
	}

	state = {
		searchResults: [],
		showBackToTop: false
	};

	// btnBackToTop = document.getElementById('back-to-top');

	handleScroll = () => {
		if (window.scrollY === 0) {
			// back to top
			// hide back to top button
			// this.btnBackToTop.style.display = '';
			this.setState({
				showBackToTop: false
			});
		} else {
			// scrolling
			// show back to top button
			// this.btnBackToTop.style.display = 'block';
			this.setState({
				showBackToTop: true
			});
		}
	};

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	updateResults = data => {
		this.setState({
			searchResults: [data]
		});
		this.scrollToRef(this.ref_SearchResults);
	};

	scrollToRef = el => {
		window.scrollTo({
			top: el.current.offsetTop,
			behavior: 'smooth'
		});
	};

	render() {
		return (
			<>
				<header id="head" ref={this.ref_SearchForm}>
					<Search updateResults={data => this.updateResults(data)} />
				</header>

				<main id="main" ref={this.ref_SearchResults}>
					{this.state.searchResults.length > 0 ? (
						<Results searchResults={this.state.searchResults} />
					) : null}
				</main>

				<footer>
					{this.state.searchResults.length > 0 ? (
						<BackToTop
							goBackToTop={() => this.scrollToRef(this.ref_SearchForm)}
							showBackToTop={this.state.showBackToTop}
						/>
					) : null}
					<span>
						Photo by Ria Puskas on Unsplash • Built by{' '}
						<a
							href="http://www.asktami.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							Tami Williams
						</a>
					</span>
				</footer>
			</>
		);
	}
}
export default App;
