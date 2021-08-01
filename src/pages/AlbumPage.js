import React from 'react'
import { Typography, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, IconButton } from '@material-ui/core'
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



    const { getAlbumPhotos } = useFireStore()

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


    return (
        <div className='albumpage'>
            <div className='albumpage__header'>
                <Typography variant='h5'>
                    {albumName}
                </Typography>
                <IconButton>
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



        </div>
    )
}

export default AlbumPage
