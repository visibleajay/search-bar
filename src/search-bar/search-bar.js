
import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from './search.png';
import CancelIcon from './cancel.png';
import './search-bar.css';

function SearchBar({value, onSearchInput, onKeyDown, onSearchDropdownVisible}) {

    function onInput(event) {
        onSearchInput(event.target.value);
    }

    function clearInput() {
        onSearchInput("");
    }

    function handleKeyDown(event) {
        if ( event && ( event.keyCode === 38 || event.keyCode === 40 ) ) {
            onKeyDown(event);
            event.preventDefault();
        }
    }

    const greyBgColor = !value ? 'greyBgColor' : '';
    return (
        <div className={`SearchBar ${greyBgColor}`}>
            <span><img alt="search" src={SearchIcon} /></span>
            <input placeholder="Search users by ID, address, name, items" list="persons"
                    value={value} onChange={onInput} onKeyDown={handleKeyDown} onBlur={() => onSearchDropdownVisible(false)} onFocus={() => onSearchDropdownVisible(true)} />
            <span className="clear" onClick={clearInput}><img alt="cancel" src={CancelIcon} /></span>
        </div>
    )
}

SearchBar.propTypes =   {
    value: PropTypes.string.isRequired,
    onSearchInput: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onSearchDropdownVisible: PropTypes.func.isRequired
}

export default SearchBar;
