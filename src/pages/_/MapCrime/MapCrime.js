import React, { useState, useEffect } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import * as parkData from "./data/skateboard-parks.json";
import { Arrest, Theft, Shooting, Vandalism, Others, Assault, Arson } from 'assets/images/icons';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import './Mapcrime.css';
// import { latLng } from 'leaflet';
// import mapStyles from './mapStyle';
import { db, getLoggedInUser } from '../../../helpers/auth';

function Map() {
    const [selectedPark, setSelectedPark] = useState(null);

    const [postloc, setPostLoc] = useState([]);
    const usere = getLoggedInUser();

    const [lantLng, setLantlng] = useState({ lat: usere.lat, lng: usere.lon });
    // const [zoom, setZoom] = useState(6);

    useEffect(() => {
        const listener = (e) => {
            if (e.key === 'Escape') {
                setSelectedPark(null);
            }
        };
        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        };
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            const posts = [];
            const postpoint = await db.collectionGroup('userPosts').where('postVerified', '==', true).get();
            postpoint.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots

                posts.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            setPostLoc(posts);
        };

        fetchPost();
    }, []);

    // navigator.geolocation.getCurrentPosition((position) => {
    //     // lon = position.coords.longitude;
    //     setLat(position.coords.latitude);
    //     setLon(position.coords.longitude);
    //     // lat = position.coords.latitude;
    // });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const locaobgj = { lat: usere.lat, lng: usere.lon };

    const panTo = React.useCallback((lat, lng) => {
        // console.log('lat', lat, lng);
        const latlng = { lat, lng };
        setLantlng(latlng);
        // setZoom(10);

        mapRef.current.panTo(lat, lng);
        mapRef.current.setZoom(14);
    }, []);

    // const lat = parseFloat(user.latitude);
    // const long = parseFloat(user.longitude);

    //   const points = postloc.map((crime) => ({
    //     type: "Feature",
    //     properties: { cluster: false , crimeid: crime.id, crimeTiTle: crime.Title, crimeCategory: crime.category},
    //     geometry: {
    //         type: "Point",
    //         coordinates: [parseFloat(crime.longitude), parseFloat(crime.latitude)],
    //     },
    // }));

    return (
        <div id="googlemap">
            {/* {console.log(lantLng.lat)} */}
            <GoogleMap
                defaultZoom={11}
                defaultCenter={locaobgj}
                center={{ lat: lantLng.lat, lng: lantLng.lng }}
                // center={latLng}
                // center={{ lat: latt, lng: lonn }}
                onLoad={onMapLoad}
                // defaultOptions={{ styles: mapStyles }}
            >
                {postloc.map((crime) => {
                    if (crime.category === 'Arrest')
                        return (
                            <Marker
                                key={crime.id}
                                position={{
                                    lat: parseFloat(crime.latitude),
                                    lng: parseFloat(crime.longitude),
                                }}
                                onClick={() => {
                                    setSelectedPark(crime);
                                }}
                                icon={{
                                    url: Arrest,
                                    scaledSize: new window.google.maps.Size(35, 35),
                                }}
                            />
                        );

                    if (crime.category === 'Theft') {
                        return (
                            <Marker
                                key={crime.id}
                                position={{
                                    lat: parseFloat(crime.latitude),
                                    lng: parseFloat(crime.longitude),
                                }}
                                onClick={() => {
                                    setSelectedPark(crime);
                                }}
                                icon={{
                                    url: Theft,
                                    scaledSize: new window.google.maps.Size(35, 35),
                                }}
                            />
                        );
                    }
                    if (crime.category === 'Shooting') {
                        return (
                            <Marker
                                key={crime.id}
                                position={{
                                    lat: parseFloat(crime.latitude),
                                    lng: parseFloat(crime.longitude),
                                }}
                                onClick={() => {
                                    setSelectedPark(crime);
                                }}
                                icon={{
                                    url: Shooting,
                                    scaledSize: new window.google.maps.Size(35, 35),
                                }}
                            />
                        );
                    }
                    if (crime.category === 'Vandalism') {
                        return (
                            <Marker
                                key={crime.id}
                                position={{
                                    lat: parseFloat(crime.latitude),
                                    lng: parseFloat(crime.longitude),
                                }}
                                onClick={() => {
                                    setSelectedPark(crime);
                                }}
                                icon={{
                                    url: Vandalism,
                                    scaledSize: new window.google.maps.Size(35, 35),
                                }}
                            />
                        );
                    }
                    if (crime.category === 'Others') {
                        return (
                            <Marker
                                key={crime.id}
                                position={{
                                    lat: parseFloat(crime.latitude),
                                    lng: parseFloat(crime.longitude),
                                }}
                                onClick={() => {
                                    setSelectedPark(crime);
                                }}
                                icon={{
                                    url: Others,
                                    scaledSize: new window.google.maps.Size(35, 35),
                                }}
                            />
                        );
                    }
                    if (crime.category === 'Assault') {
                        return (
                            <Marker
                                key={crime.id}
                                position={{
                                    lat: parseFloat(crime.latitude),
                                    lng: parseFloat(crime.longitude),
                                }}
                                onClick={() => {
                                    setSelectedPark(crime);
                                }}
                                icon={{
                                    url: Assault,
                                    scaledSize: new window.google.maps.Size(35, 35),
                                }}
                            />
                        );
                    }
                    if (crime.category === 'Arson') {
                        return (
                            <Marker
                                key={crime.id}
                                position={{
                                    lat: parseFloat(crime.latitude),
                                    lng: parseFloat(crime.longitude),
                                }}
                                onClick={() => {
                                    setSelectedPark(crime);
                                }}
                                icon={{
                                    url: Arson,
                                    scaledSize: new window.google.maps.Size(35, 35),
                                }}
                            />
                        );
                    }
                    return null;
                })}

                {selectedPark && (
                    <InfoWindow
                        onCloseClick={() => {
                            setSelectedPark(null);
                        }}
                        position={{
                            lat: parseFloat(selectedPark.latitude),
                            lng: parseFloat(selectedPark.longitude),
                        }}
                    >
                        <div>
                            <h2>{selectedPark.Title}</h2>
                            <p>{selectedPark.category}</p>
                        </div>
                    </InfoWindow>
                )}

                <Search panTo={panTo} setLantlng={setLantlng} />
                <GuideSymbol />
            </GoogleMap>
        </div>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

function Search({ panTo, setLantlng }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });

            const { lat, lng } = await getLatLng(results[0]);
            // console.log('res', lat, lng);
            setLantlng({ lat, lng });
            panTo(lat, lng);
        } catch (error) {
            // console.log('😱 Error: ', error);
        }
    };

    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover style={{ width: '400px', backgroundColor: 'white' }}>
                    <ComboboxList>
                        {status === 'OK' &&
                            data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

function GuideSymbol() {
    return (
        <div className="guide">
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Symbols in Map</h5>
                        <p className="card-text">
                            <img src={Arson} alt="arson" style={{ height: '20px', width: '20px' }} /> Arson
                        </p>
                        <p className="card-text">
                            <img src={Theft} alt="theft" style={{ height: '20px', width: '20px' }} /> Theft
                        </p>
                        <p className="card-text">
                            <img src={Vandalism} alt="vandalism" style={{ height: '20px', width: '20px' }} /> Vandalism
                        </p>
                        <p className="card-text">
                            <img src={Shooting} alt="shooting" style={{ height: '20px', width: '20px' }} /> Shooting
                        </p>
                        <p className="card-text">
                            <img src={Assault} alt="assault" style={{ height: '20px', width: '20px' }} /> Assaut
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
