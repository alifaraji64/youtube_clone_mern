import { useEffect, useState, useContext } from 'react'
import { authContext } from '../contexts/Auth'
import PacmanLoader from 'react-spinners/PacmanLoader'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
import { globalContext } from '../contexts/Globals'
function ProfileScreen () {
  const players = ['Messi', 'Ronaldo', 'Laspada']
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({})
  const [videos, setVideos] = useState([])
  const [isProfileImageUploading, setIsProfileImageUploading] = useState(false)
  const Auth = useContext(authContext)
  const Global = useContext(globalContext)
  useEffect(() => {
    async function fetchUserInfo () {
      try {
        let res = await fetch('https://18b8-51-81-154-37.ngrok.io/userInfo', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: Auth.token
          }
        })
        res.json().then(user => {
          setUser({ ...user })
          console.log(user)
          Global.setUserId(user.userId)
        })
        console.log(user)
      } catch (error) {
        console.error(error)
      }
    }
    async function fetchVideos () {
      try {
        let res = await fetch('https://18b8-51-81-154-37.ngrok.io/getVideos', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: Auth.token
          }
        })
        res.json().then(({ videos }) => {
          setVideos([...videos])
        })
        console.log(videos)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserInfo()
    fetchVideos()
  }, [])
  async function deleteVideo (videoId) {
    try {
      let res = await fetch('https://18b8-51-81-154-37.ngrok.io/deleteVideo', {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: Auth.token
        },
        body: JSON.stringify({ videoId: videoId })
      })
      if (res.status != 200) {
        res
          .json()
          .then(res2 => Global.showAlert({ text: res2.error, type: 'error' }))
        return
      }
      //delete was successfull
      Global.showAlert({ text: 'video deleted successfully', type: 'success' })
      let newVideos = videos.filter(video => video.videoId != videoId)
      setVideos(newVideos)
    } catch (error) {
      console.error(error)
      Global.showAlert({
        text: 'unknown error occured while deleteing the video'
      })
    }
  }
  async function handleProfileImage (e) {
    console.log(e.target.files)
    const file = e.target.files
    if (!file.length) {
      return Global.showAlert({
        text: 'you must select and image',
        type: 'error'
      })
    }
    setIsProfileImageUploading(true)
    try {
      const renamedFile = new File([file[0]], 'profileImage')
      const cid = await Global.client.put([renamedFile], {
        name: 'profileImage',
        maxRetries: 3
      })
      const res = await fetch('https://18b8-51-81-154-37.ngrok.io/addProfileImage', {
        method:"POST",
        headers: { 'content-type': 'application/json', 'authorization': Auth.token },
        body:JSON.stringify({'profileImage':'https://ipfs.io/ipfs/' + cid + '/profileImage'})
      })
      if(res.status!=200){
          res.json().then(res2=>Global.showAlert({text:res2.error,type:'error'}))
      }
      //image uploaded
      setIsProfileImageUploading(false)
      console.log('profile image uploaded');
      setUser({...user,profileImage:'https://ipfs.io/ipfs/' + cid + '/profileImage'})
    } catch (error) {
      console.error(error)
      Global.showAlert({
        text: 'unkown error occured while uploading profile image',
        type: 'error'
      })
      setIsProfileImageUploading(false)
    }
  }
  return (
    <>
      <main className=''>
        <div className=' w-2/3 mt-4 mx-auto'>
          <section className='flex justify-between'>
            <label className='cursor-pointer'>
              <input
                type='file'
                className='absolute -top-96'
                onChange={handleProfileImage}
                accept='image/*'
              />
              <img
                className='w-20 h-20 rounded-full'
                src={user.profileImage||'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F365psd.com%2Fimages%2Fistock%2Fpreviews%2F9734%2F97343531-businessman-profile-icon-man-avatar-picture-flat-design-vector-icon.jpg&f=1&nofb=1'}
                alt='Rounded avatar'
              />
              {isProfileImageUploading ? (
                <div className='flex items-center'>
                  <span className='mt-3 mr-2'>image uploading</span>
                  <PacmanLoader
                    loading={true}
                    size={12}
                    className='mt-2'
                    color='rgb(34,197,94)'
                  />
                </div>
              ) : (
                ''
              )}
            </label>
            <div className='text-center'>
              <h3>username</h3>
              <h5 className='font-normal'>{user.username}</h5>
            </div>
            <div className='text-center'>
              <h3>joined since</h3>
              <TimeAgo date={user.joinDate} className=' font-normal' />
            </div>
          </section>
          <section
            id='video_grid'
            className='flex flex-wrap justify-start mt-8'
          >
            {videos.map(video => {
              return (
                <div
                  className='w-44 h-44 bg-red-200 m-2 cursor-pointer text-center'
                  key={video.videoId}
                >
                  <Link
                    to={{
                      pathname: '/video/' + video.videoId,
                      state: { video }
                    }}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt=''
                      srcset=''
                      className='w-full h-full'
                    />
                  </Link>
                  <button
                    onClick={() => deleteVideo(video.videoId)}
                    className='text-white bg-red-500 p-1 text-sm font-medium hover:bg-red-600 transition-colors'
                  >
                    delete
                  </button>
                </div>
              )
            })}
          </section>
        </div>
        <Link
          to='/add-video'
          className='no-underline fixed bottom-0 right-0 mb-4 mr-4 bg-red-500 p-3 rounded-full text-white font-semibold hover:bg-red-600 transition-colors'
        >
          Upload Video
        </Link>
      </main>
    </>
  )
}

export default ProfileScreen
