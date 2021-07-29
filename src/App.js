import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import { auth } from './firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './actions/index'
import LinearProgress from '@material-ui/core/LinearProgress';
import Nav from './components/Nav'
function App() {

  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let unSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const loggedUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }
        dispatch(setUser(loggedUser))
      } else {
        dispatch(setUser(null))
      }
      setLoading(false)

    })
    return unSubscribe
  }, [dispatch])

  return (
    <div className="app">
      {loading && <LinearProgress />}
      {!loading && !user && <Login />}
      {
        user && (
          <>
          <Nav/>
            <Switch>
              <Route path='/' exact>

              </Route>
            </Switch>
          </>
        )
      }
    </div>

  );
}

export default App;
