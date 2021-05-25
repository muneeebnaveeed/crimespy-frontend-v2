import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Col, Row } from "reactstrap/lib";
import {db, getLoggedInUser} from "../../../helpers/auth";
const mapStyles = { position: "block" };

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // for google map places autocomplete
            address: "",

            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

            mapCenter: {
                lat: 33.611527,
                lng: 73.051884,
            },
        };

    }

    handleChange = async (address) => {
        this.setState({ address });
    //     const posts = []
    //     this.snapshot = await db.collection('feeds').where("postVerified", "==", true).get();
    //     console.log(this.snapshot)
    // //    this.snapshot.forEach(function (doc) { // doc.data() is never undefined for query doc snapshots

    // //         posts.push({
    // //             id: doc.id,
    // //             ... doc.data()
    // //         });
    // //         console.log(doc.id, " => ", doc.data());
    // //     });
    };

    handleSelect = (address) => {
        this.setState({ address });
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                console.log("Success", latLng);

                // update center state
                this.setState({ mapCenter: latLng });
            })
            .catch((error) => console.error("Error", error));
    };

    render() {
        return (
            <div id="googleMaps">
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
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
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng,
                    }}
                    center={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng,
                    }}
                >
                    <Marker 
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }} />
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyABIcKRrQeXZB4aSLiHRDG47MrmWDHtDL4",
})(MapContainer);
