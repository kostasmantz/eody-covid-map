import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {MapMarker} from "./MapMarker";

export class SimpleMap extends Component {

    static defaultProps = {
        center: {
            lat: 37.971585,
            lng: 23.727868
        },
        zoom: 5
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedPlace: null
        };

        this.handler = this.handler.bind(this);
    }

    handler(newPlace) {
        console.log(this.state.selectedPlace);
        this.setState({
            selectedPlace: newPlace
        });
    }

    render() {
        console.log("Rendering map...");
        return (
            <div style={{height: '100vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: ''}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {this.props.items.map((row) => (
                            <MapMarker
                                key={row.id}
                                lat={row.latitude}
                                lng={row.longitude}
                                show={!!(this.state.selectedPlace && this.state.selectedPlace.id === row.id)}
                                place={row}
                                active={false}
                                onMarkerClick={(p) => this.handler(row)}
                            />
                        )
                    )}
                </GoogleMapReact>
            </div>
        );
    }
}
