export function MapMarker(props){
    return (
        <img
            onClick={props.onClick}
            alt="map"
            src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png"
            className="h-10 w-auto"
        />
    )
}


export default MapMarker;