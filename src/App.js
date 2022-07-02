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
function App () {
  return (
    <Router>
      <div className='App'>
        <GlobalContext>
          <AuthContext>
            <NavBar />
            <Switch>
              <Route exact path='/' component={WelcomeScreen} />

              <Route exact path='/register' component={RegisterScreen} />
              <ProtectedRoute exact path='/profile' component={ProfileScreen} />
              <ProtectedRoute exact path='/add-video' component={UploadVideoScreen} />
            </Switch>
          </AuthContext>
        </GlobalContext>
      </div>
    </Router>
  )
}

export default App
