import React, { Component, Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import './AutoComplete.css';
import { City } from "../../../../app/model/City";

interface MyProps { 
    suggestions: City[];
    placeholder: string;
    name: string;
    onSubmit: (item: string) => void;
    setLat: (item: string) => void;
    setLng: (item: string) => void;
    selectedLat: string | null;
    selectedLng: string | null;
};
type MyState = { activeSuggestion: number, filteredSuggestions: City[], showSuggestions: boolean, userInput: string };

class SearchSuggestion extends Component<MyProps, MyState> {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
    };

    constructor(props: any) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: ""
        };
    }

    

    onChange = (e: any) => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        // Filter out suggestions that don't contain the user's input
        const filteredSuggestions: City[] = suggestions.filter(
            (suggestion: City) =>
                suggestion.city.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    handleSearchTerm = (searchTerm: string) => {
        const {onSubmit} = this.props;
        onSubmit(searchTerm);
    }

    onClick = (e: any) => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText,
        });
        this.handleSearchTerm(e.currentTarget.innerText);
    };

    onKeyDown = (e: any) => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion].city,
            });
            if (!filteredSuggestions[activeSuggestion]) {
                this.handleSearchTerm(e.currentTarget.innerText);
            } else {
                this.handleSearchTerm(filteredSuggestions[activeSuggestion].city);
                this.props.setLat(filteredSuggestions[activeSuggestion].latitude);
                console.log(this.props.selectedLat);
            }
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            },
            props: {
                placeholder,
                name
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion: City, index: number) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li className={className} key={suggestion.id} onClick={onClick}>
                                    {suggestion.city}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <ul className="no-suggestions">
                        <li>No options</li>
                    </ul>
                );
            }
        }

        return (
            <div className="search-container">
                <input
                    className="inputbox"
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    placeholder={placeholder}
                    name={name}
                />
                <img className="search-icon" src="/assets/search.svg" alt="search" />
                {suggestionsListComponent}
            </div>
        );
    }
}

export default SearchSuggestion;
