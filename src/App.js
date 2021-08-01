import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress';

import { auth } from './firebaseConfig'
import { setUser } from './actions/index'
import { HomePage, AlbumPage } from './pages'
import { Nav, Login } from './components'

function App() {
  const [loading, setLoading] = useState(true)

  //Redux Store values.
  // react-redux useSelector hook allows to read the redux store state.
  // react-redux useDispatch hook allows to update the redux store state.
  const user = useSelector((store) => store.user)
  const currentAlbum = useSelector((store) => store.album)
  const dispatch = useDispatch()


  useEffect(() => {
    console.table(currentAlbum)
  }, [currentAlbum])

  //onAuthStateChanged Listner will listen to the user logged status.
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
            <Nav />
            <Switch>
              <Route path='/' exact>
                <HomePage />
              </Route>
              <Route path='/album/:albumName' >
                <AlbumPage />
              </Route>
            </Switch>
          </>
        )
      }
    </div>

  );
}

export default App;
