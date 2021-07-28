import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './actions/index'
function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  // console.log(user)


  useEffect(() => {

    dispatch(setUser("bhuvan"))
    console.log(user)
  }, [])

  const handleClick = () => {
    // console.log('mani')
    dispatch(setUser("mani"))
  }
  return (
    <>
      <h1>Hello World!....{user}</h1>
      <button onClick={handleClick}>Change user</button>
    </>
  );
}

export default App;
