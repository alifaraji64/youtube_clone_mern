import { useParams,useLocation } from "react-router-dom";
function VideoScreen(props) {
    const location = useLocation()
    const {videoId} = useParams()
    console.log(location.state.video);
    return ( <>
    <div>
        <h1>VideoScreen{videoId}</h1>
    </div>
    </> );
}

export default VideoScreen;