import {Route, Switch, Redirect} from 'react-router-dom'
import HomePage from './components/HomePage'
import EachTechDetails from './components/EachTechDetails'
import NotFoundPage from './components/NotFoundPage'
import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/courses/:id" component={EachTechDetails} />
      <Route exact path="/notfound" component={NotFoundPage} />
      <Redirect to="/notfound" />
    </Switch>
  </>
)

export default App
