import * as React from "react";
import PropTypes from "prop-types";


export class MapMarker extends React.Component {

    render() {
        const markerStyle = {
            border: '1px solid white',
            borderRadius: '50%',
            height: 10,
            width: 10,
            backgroundColor: this.props.show ? 'red' : 'blue',
            cursor: 'pointer',
            zIndex: 10,
        };

        return (
            <>
                <div style={markerStyle} onClick={this.props.onMarkerClick}/>
                {this.props.show && <InfoWindow place={this.props.place}/>}
            </>
        );
    }
}

const InfoWindow = (props) => {
    const {place} = props;
    const infoWindowStyle = {
        position: 'relative',
        bottom: 100,
        left: '-45px',
        width: 220,
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        fontSize: 14,
        zIndex: 100,
    };

    return (
        <div style={infoWindowStyle}>
            <div style={{fontSize: 14}}>
                {place.title}
            </div>
        </div>
    );
};

InfoWindow.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string,
        formatted_address: PropTypes.string,
        rating: PropTypes.number,
        types: PropTypes.arrayOf(PropTypes.string),
        price_level: PropTypes.number,
        opening_hours: PropTypes.shape({
            open_now: PropTypes.bool,
        }),
    }).isRequired,
};