import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import FindJobs from './components/findJobs'
import ProtectedRoute from './components/ProtectedRoute'
import JobDetails from './components/findJobDetails'
import NotFound from './components/randomPath'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={FindJobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
