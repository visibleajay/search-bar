
import React from 'react';
import PropTypes from 'prop-types';

import PersonInfo from './person-info/person-info.js';

import './search-dropdown.css';


function SearchDropdown({searchText, users, activeCardIndex, onMouseMove}) {

    function noUserCard(hideCard) {
        return (
            <div className={`NoUser ${hideCard}`}>No User Found</div>
        );
    }

    function userInfoList(users, searchText) {
        return (
            <div className="User" tabIndex="0">
                {users.map( (person, userIndex) => 
                    <PersonInfo key={person.id} 
                                active={ activeCardIndex === userIndex}
                                handleMouseMove={ () => onMouseMove(userIndex) }
                                person={person} searchText={searchText} />
                )}
            </div>
        )
    }

    const isNoUserPresent    =   users.length === 0;
    const hideCard           =   !searchText ? 'hideCard' : '';

    return (
        <div className="ResultView">
            { isNoUserPresent ? noUserCard(hideCard) : userInfoList(users, searchText) }
        </div>
    );
}

SearchDropdown.propTypes = {
    searchText: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default SearchDropdown;
