import React from 'react'
import '../css/Nav.css'
import {
    Avatar, Button, IconButton, Snackbar, Tooltip, Typography
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import PublishIcon from '@material-ui/icons/Publish'
import { auth } from '../firebaseConfig'
import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useFirestore from '../hooks/useFirestore'
function Nav() {
    const { uploadImages } = useFirestore()
    const user = useSelector((state) => state.user)
    const fileRef = useRef()
    const history = useHistory()
    const [uploadMessage, setUploadMessage] = useState(null)


    //Log's Out the User.
    const logOut = () => auth.signOut().catch(err => alert(err))


    //handle's image upload's and some validation.
    const handleUploadImage = () => {
        const photos = fileRef.current.files
        if (photos.length === 0) return alert('No photos selected')
        if (photos.length > 3) return alert('only 3 images can be uploaded. ')
        for (let photo of photos) {
            if (!photo.type.startsWith('image')) {
                return alert('Only image can be uploaded')
            }
        }

        uploadImages(photos)
        setUploadMessage(`Uploading ${photos.length} photos`)
        console.log('uploading images.')

    }

    //when upload button is clicked, it triggers the fileRef functionality.
    const getUploadImages = () => fileRef.current.click()

    //change the route to home page.
    const goToHomePage = () => history.push('/')

    return (
        <div className="nav">
            <div className="nav__logo" onClick={goToHomePage}>
                <Typography variant="h5">
                    <span style={{ color: "#4285F4" }}>G</span>
                    <span style={{ color: "#DB4437" }}>o</span>
                    <span style={{ color: "#F4B400" }}>o</span>
                    <span style={{ color: "#4285F4" }}>g</span>
                    <span style={{ color: "#0F9D58" }}>l</span>
                    <span style={{ color: "#DB4437" }}>e</span>
                    &nbsp;
                    <span className="nav__logoText2">Photos</span>
                </Typography>
            </div>

            <div className="nav__search">
                <SearchIcon className="nav__searchIcon" />
                <input type="text" className="nav__searchInput" placeholder="Search your photos" />
            </div>

            <div className="nav__right">
                <Button
                    onClick={getUploadImages}
                    startIcon={<PublishIcon />}
                    size='small'
                    className="nav__rightUploadBtn"
                >Upload</Button>

                <Tooltip title="Logout" arrow>
                    <IconButton onClick={logOut}>
                        <Avatar className="nav__rightAvatar"
                            src={user?.photoURL}
                        ></Avatar>
                    </IconButton>
                </Tooltip>
            </div>

            <input ref={fileRef}
                type='file'
                onChange={handleUploadImage}
                multiple
                accept='image/*'
                style={{ display: 'none' }}
                max='3'
            />

            {
                uploadMessage && (
                    <Snackbar
                        onClose={() => setUploadMessage(null)}
                        autoHideDuration={3000}
                        open={Boolean(uploadMessage)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        message={uploadMessage}
                    />
                )
            }
        </div>
    )
}

export default Nav
