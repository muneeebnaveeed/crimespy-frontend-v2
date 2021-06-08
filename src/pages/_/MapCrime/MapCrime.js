import React, { useState, useEffect } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
// import * as parkData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyle";
import { db, getLoggedInUser } from "../../../helpers/auth";

function Map() {
    const [selectedPark, setSelectedPark] = useState(null);
    const [user, setUser] = useState(getLoggedInUser());
    const [postloc, setPostLoc] = useState([]);

    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            const posts = [];
            const postpoint = await db.collection("feeds").where("postVerified", "==", true).get();
            postpoint.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots

                posts.push({
                    id: doc.id,
                    ...doc.data(),
                });
                console.log(doc.id, " => ", doc.data());
            });

            setPostLoc(posts);
            console.log("post", posts);
        };

        fetchPost();
    }, []);

    const lat = parseFloat(user.latitude);
    const long = parseFloat(user.longitude);

    //   const points = postloc.map((crime) => ({
    //     type: "Feature",
    //     properties: { cluster: false , crimeid: crime.id, crimeTiTle: crime.Title, crimeCategory: crime.category},
    //     geometry: {
    //         type: "Point",
    //         coordinates: [parseFloat(crime.longitude), parseFloat(crime.latitude)],
    //     },
    // }));

    return (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: lat, lng: long }} defaultOptions={{ styles: mapStyles }}>
            {postloc.map((crime) => (
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
                        url: "data:image/svg+xml,%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='300.000000pt' height='300.000000pt' viewBox='0 0 300.000000 300.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cg transform='translate(0.000000,300.000000) scale(0.100000,-0.100000)'%0Afill='%23000000' stroke='none'%3E%3Cpath d='M1405 2706 c-91 -42 -124 -88 -454 -636 -88 -144 -247 -406 -323%0A-530 -23 -36 -86 -139 -141 -230 -55 -91 -170 -279 -255 -419 -85 -139 -164%0A-276 -175 -305 -24 -63 -26 -150 -4 -193 24 -46 54 -72 117 -102 l55 -26 1265%0A0 c1195 0 1268 1 1317 18 90 31 153 113 153 198 0 82 -17 113 -602 1069 -88%0A145 -270 443 -463 760 -45 74 -106 173 -135 220 -64 105 -97 140 -163 174 -66%0A33 -125 34 -192 2z m246 -654 l29 -32 0 -429 0 -429 -26 -31 c-15 -18 -42 -35%0A-67 -42 -56 -15 -190 -6 -223 16 -53 35 -55 51 -52 498 3 373 5 414 20 437 32%0A44 55 50 176 48 l114 -3 29 -33z m-78 -1166 c163 -70 131 -320 -45 -350 -108%0A-19 -218 74 -218 184 0 41 29 107 56 132 54 48 141 62 207 34z'/%3E%3C/g%3E%3C/svg%3E%0A",
                        scaledSize: new window.google.maps.Size(25, 25),
                    }}
                />
            ))}
            {console.log("selected", selectedPark)}
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
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}
