import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Typography, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, IconButton, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { Photo } from '../components'
import useFireStore from '../hooks/useFirestore'
import '../css/HomePage.css'

function AlbumPage() {
    const history = useHistory()
    const [images, setImages] = useState([])
    const [open, setOpen] = useState(false)

    const { albumName } = useSelector((state) => state.album)
    const { getAlbumPhotos, deleteAlbum } = useFireStore()

    // Utility functions Delete Modal.
    const closeDeleteModal = () => setOpen(false)
    const openDeleteModal = () => setOpen(true)

    const handleDeleteAlbum = () => {
        console.log('deleting Album Photos...')
        deleteAlbum(images)
        closeDeleteModal()
        history.replace('/')
    }


    // gets the user's Current Album photos. current album value will be stored in redux store.
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

    return (
        <div className='albumpage'>
            {/* Albumpage Header.*/}
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

            {/* confirmation for delete album */}
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
