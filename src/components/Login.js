import { useEffect } from 'react'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebaseConfig'
import LinearProgress from '@material-ui/core/LinearProgress';


function Login() {



    const login = () => {
        auth.signInWithPopup(provider).catch(err => alert(err))
    }

    return (
        <div style={styles}>
            <img src="https://www.google.com/photos/about/static/images/ui/logo-photos.png" alt="google-logo" />
            <Button variant="contained" color="primary" onClick={login}>Sign In With Google</Button>
        </div>
    )
}

const styles = {
    width: '100%',
    display: 'grid',
    height: '100vh',
    placeItems: 'center'
}

export default Login
