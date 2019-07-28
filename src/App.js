import React from 'react';
import './App.css';

import SearchBar from './search-bar/search-bar';
import SearchDropdown from './search-dropdown/search-dropdown';

class App extends React.PureComponent{
  
  allUsers = [];

  state    = {
    searchText: "",
    users: [],
    keyPressCount: 0,
    isVisible: true,
  };

  addToString = (user) => {
    const separator = "/%%%/";
    return { ...user, toString() {
      return user.id + separator + user.name + separator + user.address + separator + user.items.join(separator);
    }};
  }

  componentDidMount() {
    const URL = "https://www.mocky.io/v2/5ba8efb23100007200c2750c";

    const fetchUserInfo = (URL, addToString ) => {
      fetch(URL)
      .then( response => {
          if ( response.status !== 200 ) {
            console.log("App comp.", "Issue in fetching information " + response.status);
            return;
          }
  
          response.json().then( data => {
            if ( Array.isArray(data) ) {
              this.allUsers = data.map( (user) => {
                return addToString(user);
              });
            }
  
          });
  
      }).catch( error => {
        console.log("App Comp.", "Issue in fetching information.")
      });
    }
    
    fetchUserInfo( URL, this.addToString )

  }

  handleSearchInput = (searchText) => {
    const filteredUsers  = this.allUsers.filter( user => searchText && user.toString().includes(searchText) );
    this.setState({
      searchText: searchText,
      users: filteredUsers,
      keyPressCount: 0
    });
  } 

  handleKeyDown = ( event ) => {
    const arrowDown = 40;
    const arrowUp   = 38;

    let keyPressCount = this.state.keyPressCount;
    const lastUser    = this.state.users.length - 1;
    const firstUser   = 0

    if ( event.keyCode === arrowUp ) {
      // Up Arrow.
      if ( keyPressCount === firstUser ) {
        keyPressCount = lastUser;
      } else {
        keyPressCount = keyPressCount - 1;
      }
      
    } else if ( event.keyCode === arrowDown ) {
      // Down Arrow.
      if ( keyPressCount === lastUser ) {
        keyPressCount = firstUser;
      } else {
        keyPressCount = keyPressCount + 1;
      }
    }
    this.setState({keyPressCount})
  }

  handleMouseMove = (cardIndex) => {
    this.setState({keyPressCount: cardIndex});
  }

  handleSearchDropdownVisible = ( isVisible ) => {
    this.setState({isVisible})
  }


  render() {
    return (
      <div className="App">
        <SearchBar onSearchInput={this.handleSearchInput} value={this.state.searchText} onKeyDown={this.handleKeyDown} 
                   onSearchDropdownVisible={this.handleSearchDropdownVisible}/>
        <SearchDropdown visibility={this.state.isVisible}
                        searchText={this.state.searchText} 
                        users={this.state.users} 
                        handleCardClick={() => this.setState({isVisible: false})}
                        activeCardIndex={this.state.keyPressCount} 
                        onMouseMove={this.handleMouseMove} />
      </div>
    );
  }
  
}

export default App;
