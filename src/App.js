import 'bootstrap/dist/css/bootstrap.min.css'
import RegisterScreen from './screens/RegisterScreen'
import AuthContext from './contexts/Auth'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import WelcomeScreen from './screens/Welcome'
function App () {
  return (
    <Router>
      <div className='App'>
        <AuthContext>
          <NavBar />
          <Switch>
            <Route exact path='/'>
              <WelcomeScreen />
            </Route>
            <Route exact path='/register'>
              <RegisterScreen />
            </Route>
          </Switch>
        </AuthContext>
      </div>
    </Router>
  )
}

export default App
