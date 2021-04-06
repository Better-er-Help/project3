import React, { useEffect,useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import './index.css'
import "@reach/combobox/styles.css";


const libraries = ["places"]
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}
const options = {
  disableDefaultUI: true,
  zoomControl: true
}

const fetcher = url => fetch(url).then(r => r.json())

export default function App() {
  const [hos,setHos]=useState([])
  const [latitude, setlat]=useState([43.653225])
  const [longitude, setlng]=useState([-79.383186])
  const center = {
    lat: latitude,
    lng: longitude
  }
  console.log("center", center)
  
  async function loadMap(){
      const url = `
  https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&location=${latitude},${longitude}&radius=5000&type=hospital`;
  console.log(url)
  // const url = 'https://api.yelp.com/v3/businesses/search?term=pet%20adoption&latitude=43.6532&longitude=-79.3832'
  //  const proxyUrl = `https://repos.codehot.tech/cors_proxy.php?url=${encodeURIComponent(url)}`
  // const answer = useSwr(url, fetcher);
  
  const hospitals = await fetcher(url)
  // console.log(data)
  // const hospitals = fetch(url).then(r => r.json()) ;
  console.log("loaded results", hospitals.results)
  const hospitalResults = hospitals.results
  setHos(hospitalResults)

  }
  useEffect(()=>{
    loadMap()
  }, [])
 

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState();
  console.log(selected)
  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date().toISOString
      },
    ])
  }, []);
  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    console.log(lat,lng)
  }, [])

  if (loadError) {
    return "Error loading maps"
  }
  if (!isLoaded) {
    return "Loading maps"
  }
  return <div>
    <h1>{" "}<span role="img" aria-label="tent">🐑</span></h1>
    <Search panTo={panTo} />
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={options}
      // onClick={onMapClick}
      onLoad={onMapLoad}
    >s
      {hos.map((hospitalResult) => (
        <Marker
        key={hospitalResult.place_id}
          position={{ lat: hospitalResult.geometry.location.lat, lng: hospitalResult.geometry.location.lng }}
          onClick={() => {
            setSelected(hospitalResult,console.log("selected:", selected))
            
          }}
          icon={{
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15)
          }}><div>Hello</div></Marker>
      ))}

      {selected ? (
        <InfoWindow position={{ lat: selected.geometry.location.lat, lng: selected.geometry.location.lng }} onCloseClick={() => { setSelected(null) }}>
          <div>
            <h2>{selected.name}</h2>
            <h3>{selected.vicinity}</h3>
          </div>
        </InfoWindow>) : null}
    </GoogleMap>
  </div>


function Search({ panTo }) {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.653225, lng: () => -79.383186 },
      radius: 200 * 1000,
    }
  });
  return (
    <div className="search">
      <Combobox onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions()
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          console.log("results", results[0])
          panTo({ lat, lng })
          console.log(lat,lng)
          setlat(lat)
          setlng(lng)
          loadMap()
          setTimeout(() => {
            loadMap()
          }, 100);
          

          console.log("latitude", latitude)
          console.log("longitude", longitude)
        } catch (error) {
          console.log("error!")
        }
      }}
      >
        <ComboboxInput value={value} onChange={(e) => {
          setValue(e.target.value)
        }}
          disable={!ready}
          placeholder="Enter an address" />
        <ComboboxPopover>
          <ComboboxList>
          {status === "OK" && data.map(({ id, description }) => (
            <ComboboxOption key={id} value={description} />
          ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
}
