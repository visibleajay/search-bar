import React, { useState, useReducer, useCallback, useEffect, useMemo } from 'react';
import './App.css';

import SearchBar from './search-bar/search-bar';
import SearchDropdown from './search-dropdown/search-dropdown';


function reducer(state, action) {
  return {...state, ...action};
}

function App(props) {

  const InitialState = {
    searchText: "",
    users: [],
    keyPressCount: 0,
    isVisible: true,
  };

  const [state, dispatch]   = useReducer( reducer, InitialState );
  const [allUsers, setUsers] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);


  useEffect(() => {
    const URL = "https://www.mocky.io/v2/5ba8efb23100007200c2750c";

    function addToString(user){
      const separator = "/%%%/";
      return { ...user, toString() {
        return user.id + separator + user.name + separator + user.address + separator + user.items.join(separator);
      }};
    }

    fetch(URL).then( response => {
        if ( response.status !== 200 ) {
          console.log("App comp.", "Issue in fetching information " + response.status);
          return;
        }

        response.json().then( data => {
          if ( Array.isArray(data) ) {
            const allUsers = data.map( (user) => {
              return addToString(user);
            });
            setUsers(allUsers);
          }
        });

    }).catch( error => {
      console.log("App Comp.", "Issue in fetching information.")
    });

  }, [])

  useEffect(() => dispatch({keyPressCount: cardIndex}), [cardIndex]);

  function handleSearchInput(searchText){
    const filteredUsers  = allUsers.filter( user => searchText && user.toString().includes(searchText) );
    return {
      searchText: searchText,
      users: filteredUsers,
      keyPressCount: 0
    };
  } 

  function handleKeyDown( event, {keyPressCount, users} ){
    const arrowDown = 40;
    const arrowUp   = 38;

    let updatedActiveCardIndex = keyPressCount;
    const lastUser    = users.length - 1;
    const firstUser   = 0

    if ( event.keyCode === arrowUp ) {
      // Up Arrow.
      if ( updatedActiveCardIndex === firstUser ) {
        updatedActiveCardIndex = lastUser;
      } else {
        updatedActiveCardIndex = updatedActiveCardIndex - 1;
      }
      
    } else if ( event.keyCode === arrowDown ) {
      // Down Arrow.
      if ( updatedActiveCardIndex === lastUser ) {
        updatedActiveCardIndex = firstUser;
      } else {
        updatedActiveCardIndex = updatedActiveCardIndex + 1;
      }
    }
    return updatedActiveCardIndex;
  }

  return (
    <div className="App">
      <SearchBar value={state.searchText} 
                 onSearchInput={(searchText) => dispatch(handleSearchInput(searchText))} onKeyDown={(event) => setCardIndex(handleKeyDown(event, state)) } 
                 onSearchDropdownVisible={ (isVisible) => dispatch({isVisible}) }/>
      <SearchDropdown visibility={state.isVisible}
                      searchText={state.searchText} 
                      users={state.users} 
                      handleCardClick={() => dispatch({isVisible: false})}
                      activeCardIndex={state.keyPressCount} 
                      onMouseMove={(index) => setCardIndex(index)} />
    </div>
  );
}

export default App;
