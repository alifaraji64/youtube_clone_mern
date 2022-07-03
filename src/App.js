import 'bootstrap/dist/css/bootstrap.min.css'
import RegisterScreen from './screens/RegisterScreen'
import AuthContext from './contexts/Auth'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import WelcomeScreen from './screens/Welcome'
import ProfileScreen from './screens/ProfileScreen'
import ProtectedRoute from './contexts/ProtectedRoute'
import GlobalContext from './contexts/Globals'
import UploadVideoScreen from './screens/UploadVideoScreen'
import LoginScreen from './screens/LoginScreen'
import VideoScreen from './screens/VideoScreen'
function App () {
  return (
    <Router>
      <div className='App'>
        <GlobalContext>
          <AuthContext>
            <NavBar />
            <Switch>
              <Route exact path='/' component={WelcomeScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/login' component={LoginScreen} />
              <ProtectedRoute path='/profile' component={ProfileScreen} />
              <ProtectedRoute path='/add-video' component={UploadVideoScreen} />
              <ProtectedRoute path='/video/:videoId' component={VideoScreen} />
            </Switch>
          </AuthContext>
        </GlobalContext>
      </div>
    </Router>
  )
}

export default App
