import { useLocation } from 'react-router-dom'
import { Player } from 'video-react'
import 'video-react/dist/video-react.css'
function VideoScreen (props) {
  const location = useLocation()
  const {
    videoId,
    videoUrl,
    uploadId,
    userId,
    thumbnailUrl
  } = location.state.video
  console.log(location.state.video)
  return (
    <>
      <div>
        <h1 className='text-center'>watch video</h1>

        <Player playsInline poster={thumbnailUrl} src={videoUrl} className='mt-8'/>
      </div>
    </>
  )
}

export default VideoScreen
