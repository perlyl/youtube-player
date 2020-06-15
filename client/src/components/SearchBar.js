import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    search = () => {
        this.props.onSearchTermChange(this.state.term);
    }
    render() {
        return (
            <div className="search-bar">
                <input
                    placeholder="Search on YouTube"
                    value={this.state.term}
                    onChange={this.onInputChange}
                />
                <button onClick={this.search} type="button">Search</button>
            </div>
        );
    }

}

export default SearchBar;