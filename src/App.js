import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './actions/index'
import { auth, provider } from './firebaseConfig'
function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  // console.log(user)


  useEffect(() => {
    dispatch(setUser("bhuvan"))
    console.log(user)
    // eslint-disable-next-line
  }, [])

  const login = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message))
  }

  const handleClick = () => {
    // console.log('mani')
    dispatch(setUser("mani"))
  }
  return (
    <>
      <h1>Hello World!....{user}</h1>
      <button onClick={handleClick}>Change user</button>
      <button onClick={login}>Log in with google.</button>
    </>
  );
}

export default App;
