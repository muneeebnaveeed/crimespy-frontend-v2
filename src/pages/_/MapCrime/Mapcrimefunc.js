import React, { Component, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Col, Row } from "reactstrap/lib";
import {db, getLoggedInUser} from "../../../helpers/auth";
const mapStyles = { position: "block" };

function Mapcrimefunc() {
    const [address, setAddress] = useState('');
    const [showingInfoWindow, setShowingInfo] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedplace] = useState({});
    const [mapCenter, setMapcenter] = useState({
        lat: 33.611527,
        lng: 73.051884,
    })



    const handleChange = (address) => {
        setAddress(address);
    };


  const handleSelect = (address) => {
        setAddress(address);
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                console.log("Success", latLng);

                // update center state
                setMapcenter({latLng });
            })
            .catch((error) => console.error("Error", error));
    };

    return(
        <div id="googleMaps">
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div style={{zIndex:"1",position:"absolute", top:"5em", border:"none"}}>
                        <input
                            {...getInputProps({
                                placeholder: "Search Places ...",
                                className: "location-search-input",
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion,i) => {
                                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                                return (
                                    <div key={i}
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

            <Map
                containerStyle={mapStyles}
                google={this.props.google}
                initialCenter={{
                    lat: mapCenter.lat,
                    lng: mapCenter.lng,
                }}
                center={{
                    lat: mapCenter.lat,
                    lng:mapCenter.lng,
                }}
            >
                <Marker 
        position={{
          lat: mapCenter.lat,
          lng: mapCenter.lng
        }} />
            </Map>
        </div>
    );
}

export default Mapcrimefunc
