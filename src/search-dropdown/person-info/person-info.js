
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './person-info.css';

function PersonInfo ({ person, searchText, active, handleMouseMove, onClick }) {

    const ref   = useRef();

    useEffect( () => {
        if ( active ) {
            ref.current.scrollIntoView({behavior: "smooth", block: "nearest"});
        }
    }, [active]);

    function getView(type) {
        const value         =   person[type];
        if ( value.includes(searchText) ) {
            const searchTextStartIndex = value.indexOf(searchText);
            const searchTextEndIndex   = searchTextStartIndex + searchText.length;
            return [ <span key={`${type}0`} >{value.substring(0, searchTextStartIndex)}</span>,
                    <span key={`${type}1`} style={{'color': '#59b6db', 'fontWeight': 700}}>{value.substring(searchTextStartIndex, searchTextEndIndex)}</span>,
                    <span key={`${type}2`} >{value.substring(searchTextEndIndex)}</span>
                ];
        } else {
            return value;
        }
    }
    
    function getItemView() {
        const value         = person['items'];
        
        if ( searchText && value.join("/%%%/").includes(searchText) ) {
            return [ <span key="item0" className="itemCircle"></span>, <span key="item1">{`"${searchText}" found in items.`}</span>];
        } else {
            return ''
        }
    }

    const itemView          = getItemView();
    const itemDisplayState  = itemView.length > 0 ? 'flex' : 'none';
    const PersonActive      = active ? "PersonActive" : "";


    return (
        <div className={`PersonInfo ${PersonActive}`} onMouseMove={handleMouseMove} ref={ref} onClick={onClick}>
            <span style={{'fontWeight': 700}}>{getView('id')}</span>
            <span style={{'paddingBottom': '5px'}}><i>{getView('name')}</i></span>
            <span className="item" style={{'display': itemDisplayState}}>{itemView}</span>
            <span className="address">{getView('address')}</span>
        </div>
    );

}
    
PersonInfo.propTypes = {
    person: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string.isRequired),
        address: PropTypes.string.isRequired
    }),
    searchText: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    handleMouseMove: PropTypes.func.isRequired
};

export default PersonInfo;
