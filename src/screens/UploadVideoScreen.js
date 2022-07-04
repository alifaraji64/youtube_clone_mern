import { useContext, useState } from 'react'
import { globalContext } from '../contexts/Globals'
import { authContext } from '../contexts/Auth'
import PacmanLoader from 'react-spinners/PacmanLoader'
function UploadVideoScreen () {
  const Global = useContext(globalContext)
  const Auth = useContext(authContext)
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false)
  const [isVideoUploading, setIsVideoUploading] = useState(false)
  const [thumbnailCid, setThumbnailCid] = useState('')
  const [thumbnailUploaded, setThumbnailUploaded] = useState(false)
  const [videoUploaded, setVideoUploaded] = useState(false)
  const [videoCid, setVideoCid] = useState('')
  async function handleThumbnail (e) {
    setThumbnailUploaded(false)
    const file = e.target.files
    if (!file.length) {
      return Global.showAlert({
        text: 'you must select and image',
        type: 'error'
      })
    }
    if (
      file[0].type != 'image/png' &&
      file[0].type != 'image/jpg' &&
      file[0].type != 'image/jpeg'
    ) {
      return Global.showAlert({
        text: 'image type should be either JPG or PNG',
        type: 'error'
      })
    }
    setIsThumbnailUploading(true)
    try {
      //file[0].name='test'
      const renamedFile = new File([file[0]],'thumbnail')
      console.log(renamedFile);
      const cid = await Global.client.put([renamedFile], {
        name: 'image',
        maxRetries: 3
      })
      setThumbnailCid(cid)
      setIsThumbnailUploading(false)
      setThumbnailUploaded(true)
    } catch (error) {
      console.log(error);
      Global.showAlert({
        text: 'unkown error occured while uploading image',
        type: 'error'
      })
      setIsThumbnailUploading(false)
    }
  }
  async function handleVideo (e) {
    console.log(e.target.files)
    const file = e.target.files
    if (!file.length) {
      return Global.showAlert({
        text: 'you must select and image',
        type: 'error'
      })
    }
    if (file[0].type != 'video/mp4') {
      return Global.showAlert({
        text: 'only mp4 format is acceptable',
        type: 'error'
      })
    }
    setIsVideoUploading(true)
    try {
      const renamedFile = new File([file[0]],'video')
      const cid = await Global.client.put([renamedFile], {
        name: 'video',
        maxRetries: 3
      })
      setVideoCid(cid)
      setVideoUploaded(true)
      setIsVideoUploading(false)
    } catch (error) {
      console.error(error)
      Global.showAlert({
        text: 'unkown error occured while uploading image',
        type: 'error'
      })
      setIsVideoUploading(false)
    }
  }
  async function handleUpload () {
    const thumbnailUrl = 'https://ipfs.io/ipfs/' + thumbnailCid+ '/thumbnail'
    const videoUrl = 'https://ipfs.io/ipfs/' + videoCid+ '/video'
    console.log(thumbnailUrl + ' ' + videoUrl);
    try {
      const res=await fetch('https://18b8-51-81-154-37.ngrok.io/addVideo', {
        method:"POST",
        headers: { 'content-type': 'application/json', 'authorization': Auth.token },
        body:JSON.stringify({'thumbnailUrl':thumbnailUrl,'videoUrl':videoUrl,'userId':Global.userId})
      })
      console.log(res);
      Global.showAlert({text:'your video uploaded successfully',type:'success'})
      setVideoCid('');
      setThumbnailCid('');
      setThumbnailUploaded(false);
      setVideoUploaded(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className='flex flex-col  justify-between items-center my-8'>
        <label className='bg-green-500 inline-block cursor-pointer p-2 text-white font-medium'>
          <input
            type='file'
            className=' absolute -top-96'
            required
            accept='image/*'
            onChange={
              isThumbnailUploading
                ? () => {
                    console.log('you cannot uplaod')
                  }
                : handleThumbnail
            }
          />
          <span>Select the video thumbnail</span>
        </label>
        {isThumbnailUploading ? (
          <section className='flex items-center'>
            <span className='mt-3 mr-1'>uploading your image</span>
            <PacmanLoader
              loading={isThumbnailUploading}
              size={12}
              className='mt-2'
              color='rgb(34,197,94)'
            />
          </section>
        ) : (
          ''
        )}
        {thumbnailUploaded ? (
          <p className='text-green-500'>thumbnail uploaded successfully</p>
        ) : (
          ''
        )}

        <label className='bg-green-500 inline-block cursor-pointer p-2 text-white font-medium mt-8'>
          <input
            type='file'
            className=' absolute -top-96'
            required
            onChange={
              isVideoUploading
                ? () => {
                    console.log('you cannot uplaod')
                  }
                : handleVideo
            }
          />
          <span>Select the video</span>
        </label>
        {isVideoUploading ? (
          <section className='flex items-center'>
            <span className='mt-3 mr-1'>uploading your video</span>
            <PacmanLoader
              loading={isVideoUploading}
              size={12}
              className='mt-2'
              color='rgb(34,197,94)'
            />
          </section>
        ) : (
          ''
        )}
        {videoUploaded ? (
          <p className='text-green-500'>video uploaded successfully</p>
        ) : (
          ''
        )}
        {videoUploaded&&thumbnailUploaded?
        <button className='bg-red-500 text-white p-2 mt-8 font-semibold rounded-full hover:bg-red-600 transition-colors' onClick={handleUpload}>
          Submit Video
        </button>:''}

      </div>
    </>
  )
}

export default UploadVideoScreen
