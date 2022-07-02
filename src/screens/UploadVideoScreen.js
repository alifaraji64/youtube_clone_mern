import { useContext, useState } from 'react'
import { globalContext } from '../contexts/Globals'
import PacmanLoader from 'react-spinners/PacmanLoader'
function UploadVideoScreen () {
  const Global = useContext(globalContext)
  const [isUploading, setIsUploading] = useState(false)
  async function handleThumbnail (e) {
    setIsUploading(true)
    const file = e.target.files
    if (!file.length) {
      return Global.showAlert({
        text: 'you must select and image',
        type: 'error'
      })
    }
    if (file[0].type != 'image/png' && file[0].type != 'image/jpg') {
      console.log(file[0].type)
      return Global.showAlert({
        text: 'image type should be either JPG or PNG',
        type: 'error'
      })
    }
    try {
      const cid = await Global.client.put(file, {
        name: 'file.name',
        maxRetries: 3
      })

    } catch (error) {
        Global.showAlert({text:'unkown error occured while uploading image',type:'error'})
        console.error(error);
    }
    setIsUploading(false)
  }
  return (
    <>
      <div className='flex flex-col  justify-between items-center my-16'>
        <label className='bg-green-500 inline-block cursor-pointer p-2 text-white font-medium'>
          <input
            type='file'
            className=' absolute -top-96'
            required
            onChange={isUploading ? ()=>{console.log('you cannot uplaod');} : handleThumbnail}
          />
          <span>Select the video thumbnail</span>
        </label>
        {isUploading ? (
          <section className='flex items-center'>
            <span className='mt-3 mr-1'>uploading your image</span>
            <PacmanLoader
              loading={isUploading}
              size={12}
              className='mt-2'
              color='rgb(34,197,94)'
            />
          </section>
        ) : (
          ''
        )}

        <label className='bg-green-500 inline-block cursor-pointer p-2 text-white font-medium mt-16'>
          <input type='file' className=' absolute -top-96' required />
          <span>Select the video</span>
        </label>
      </div>
    </>
  )
}

export default UploadVideoScreen
