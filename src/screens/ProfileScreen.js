import { useEffect, useState, useContext } from 'react'
import { authContext } from '../contexts/Auth'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
function ProfileScreen () {
  const players = ['Messi', 'Ronaldo', 'Laspada']
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({})
  const [videos, setVideos] = useState([])
  const Auth = useContext(authContext)
  useEffect(() => {
    async function fetchUserInfo () {
      try {
        let res = await fetch('http://localhost:8080/userInfo', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: Auth.token
          }
        })
        res.json().then(res2 => {
          setUser({ ...res2 })
        })
        console.log(user)
      } catch (error) {
        console.error(error)
      }
    }
    async function fetchVideos () {
      try {
        let res = await fetch('http://localhost:8080/getVideos', {
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
  return (
    <>
      <main className=''>
        <div className=' w-2/3 mt-4 mx-auto'>
          <section className='flex justify-between'>
            <img
              className='w-20 h-20 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
              alt='Rounded avatar'
            />
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
                  className='w-40 h-40 bg-red-200 m-1 cursor-pointer'
                  key={video.videoId}
                >
                  <Link to={{pathname: '/video/'+video.videoId,state:{video}}}>
                  <img src={video.thumbnailUrl} alt="" srcset="" className='w-full h-full'/>
                  </Link>
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
