import React from 'react'
import { Typography, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, IconButton, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Photo from '../components/Photo'
import useFireStore from '../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import '../css/HomePage.css'
function AlbumPage() {
    const history = useHistory()
    const { albumName } = useSelector((state) => state.album)
    const [open, setOpen] = useState(false)


    const { getAlbumPhotos, deleteAlbum } = useFireStore()

    const [images, setImages] = useState([])

    // gets the user's ROOT Album photos.
    useEffect(() => {
        let unsubscribe = getAlbumPhotos().onSnapshot(snap => {
            let data = snap.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
            setImages(data)
        })
        return unsubscribe // eslint-disable-next-line
    }, [albumName])


    useEffect(() => {
        if (albumName === 'ROOT') {
            history.replace('/')
        }
    }, [])

    const closeDeleteModal = () => setOpen(false)
    const openDeleteModal = () => setOpen(true)

    const handleDeleteAlbum = () => {
        console.log('deleting Album Photos...')
        deleteAlbum(images)
        closeDeleteModal()
        history.replace('/')
    }

    return (
        <div className='albumpage'>
            <div className='albumpage__header'>
                <Typography variant='h5'>
                    {albumName}
                </Typography>
                <IconButton onClick={openDeleteModal}>
                    <DeleteIcon />
                </IconButton>
            </div>

            {/* Album Directory Photos */}
            <div className='albumpage__photos'>
                {
                    images && images.map(({ id, data }) => (
                        <Photo id={id} key={id} data={data} />
                    ))
                }
            </div>


            <Dialog
                open={open}
                onClose={closeDeleteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Album Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting the Album will also delete the Photos inside it...
                        Do you want to delete this Album ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteAlbum} color="primary" autoFocus variant="contained">
                        delete
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}

export default AlbumPage
