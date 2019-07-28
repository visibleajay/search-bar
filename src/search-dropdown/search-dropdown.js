
import React from 'react';
import PropTypes from 'prop-types';

import PersonInfo from './person-info/person-info.js';

import './search-dropdown.css';


function SearchDropdown({visibility, searchText, users, activeCardIndex, onMouseMove, handleCardClick}) {

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
                                onClick={handleCardClick}
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
        visibility ? 
        <div className="ResultView">
            { isNoUserPresent ? noUserCard(hideCard) : userInfoList(users, searchText) }
        </div> : null
    );
}

SearchDropdown.propTypes = {
    visibility: PropTypes.bool.isRequired,
    searchText: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeCardIndex: PropTypes.number.isRequired,
    onMouseMove: PropTypes.func.isRequired
}

export default SearchDropdown;
