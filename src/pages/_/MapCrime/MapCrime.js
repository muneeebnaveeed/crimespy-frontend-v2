import React, { useState, useRef ,useEffect} from 'react';
import useSwr from "swr";
import GoogleMapReact from 'google-map-react';
import useSupercluster from "use-supercluster";
import {  TileLayer, Popup } from 'react-leaflet'
import './Mapcrime.css';
import "leaflet/dist/leaflet.css";
import useSWR from 'swr';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Col, Row } from "reactstrap/lib";
import {db, getLoggedInUser} from "../../../helpers/auth";
const mapStyles = { position: "block" };










const fetcher = (...args) => fetch(...args).then(response => response.json());
const Marker = ({ children }) => children;

export default function MapContainer() {

    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [user, setUser] = useState(getLoggedInUser());
    const [postloc, setPostLoc] = useState([]);
    const [selectedCrime, setSelectedCrime] = useState(null);


    
    
   

    useEffect(() => {
       
        const fetchPost = async () =>{
            const posts =[]
         const postpoint = await  db.collection("feeds").where("postVerified", "==", true).get();
         postpoint.forEach(function (doc) { // doc.data() is never undefined for query doc snapshots

            posts.push({
                id: doc.id,
                ... doc.data()
            });
            console.log(doc.id, " => ", doc.data());

        });

        setPostLoc(posts)
         console.log('post',posts)
         


      
        }

    
    
        fetchPost();
    
    
    }, [])

    const points = postloc.map(crime => ({
        type: "Feature",
        properties: { cluster: false , crimeid: crime.id, crimeTiTle: crime.Title, crimeCategory: crime.category},
        geometry: {
            type: "Point",
            coordinates: [
                parseFloat(crime.longitude),
                parseFloat(crime.latitude)
            ]
        }
    }));
    

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 }
    });
    const lat = parseFloat(user.latitude);
    const long = parseFloat(user.longitude)
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            {
                postloc && <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
                defaultCenter={{ lat: lat, lng: long }}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                    mapRef.current = map;
                }}
                onChange={({ zoom, bounds }) => {
                    setZoom(zoom);
                    setBounds([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat
                    ]);
                }}
            >
                {clusters?.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                   
                    const {
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;

                    if (isCluster) {
                        return (
                            <Marker
                                key={`cluster-${cluster.id}`}
                                lat={latitude}
                                lng={longitude}
                            >
                                <div
                                    className="cluster-marker"
                                    style={{
                                        width: `${10 + (pointCount / points?.length) * 20}px`,
                                        height: `${10 + (pointCount / points?.length) * 20}px`
                                    }}
                                    onClick={() => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            20
                                        );
                                        mapRef.current.setZoom(expansionZoom);
                                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                                    }}
                                >
                                
                                    {pointCount}
                                </div>
                            </Marker>
                        );
                    }

                    return (
                        <Marker
                            key={`crime-${cluster.properties.crimeId}`}
                            lat={latitude}
                            lng={longitude}
                            onClick={() =>{ setSelectedCrime(cluster)}}
                        >
                        {
                            console.log('clustter',cluster.properties.crimeTiTle)
                        }
                            <button className="crime-marker">
                                <img src="data:image/svg+xml,%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='300.000000pt' height='300.000000pt' viewBox='0 0 300.000000 300.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cg transform='translate(0.000000,300.000000) scale(0.100000,-0.100000)'%0Afill='%23000000' stroke='none'%3E%3Cpath d='M1405 2706 c-91 -42 -124 -88 -454 -636 -88 -144 -247 -406 -323%0A-530 -23 -36 -86 -139 -141 -230 -55 -91 -170 -279 -255 -419 -85 -139 -164%0A-276 -175 -305 -24 -63 -26 -150 -4 -193 24 -46 54 -72 117 -102 l55 -26 1265%0A0 c1195 0 1268 1 1317 18 90 31 153 113 153 198 0 82 -17 113 -602 1069 -88%0A145 -270 443 -463 760 -45 74 -106 173 -135 220 -64 105 -97 140 -163 174 -66%0A33 -125 34 -192 2z m246 -654 l29 -32 0 -429 0 -429 -26 -31 c-15 -18 -42 -35%0A-67 -42 -56 -15 -190 -6 -223 16 -53 35 -55 51 -52 498 3 373 5 414 20 437 32%0A44 55 50 176 48 l114 -3 29 -33z m-78 -1166 c163 -70 131 -320 -45 -350 -108%0A-19 -218 74 -218 184 0 41 29 107 56 132 54 48 141 62 207 34z'/%3E%3C/g%3E%3C/svg%3E%0A" alt="crime doesn't pay" />
                            </button>
                        </Marker>
                    );
                })}

                
            </GoogleMapReact>
            }
            

        </div>
    );





}
