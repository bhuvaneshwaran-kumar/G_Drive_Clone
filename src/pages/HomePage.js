import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { CreateAlbumModal, Album, Photo } from '../components'
import useFireStore from '../hooks/useFirestore'
import { setCurrentAlbum } from '../actions'
import "../css/HomePage.css"


function HomePage() {
    const [albums, setAlbums] = useState([])
    const [images, setImages] = useState([])

    //React Redux dispatch
    const dispatch = useDispatch()
    const { albumName } = useSelector(state => state.album)
    const { getAlbums, getAlbumPhotos } = useFireStore()
    const [isCreateAlbumOpen, setIsCreateAlbumOpen] = useState(false)



    //Utility functions to open the createAlbum Model.
    const handleCreateAlbum = () => {
        setIsCreateAlbumOpen(true)
    }

    //Sets the react store CurrentAlbum state to ROOT after mounting the component.
    useEffect(() => {
        dispatch(
            setCurrentAlbum({
                albumId: 'ROOT',
                albumName: 'ROOT'
            })
        )
    }, [dispatch])


    // gets the user's album data.
    useEffect(() => {
        const unsubscribe = getAlbums().onSnapshot(snapshot => {
            setAlbums(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })
        return unsubscribe
        // eslint-disable-next-line
    }, [])


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

    return (
        <div className="homepage">
            <Typography variant="h5">Albums</Typography>
            <div className="homepage__albums">
                {/* Create Album */}
                <div onClick={handleCreateAlbum} className="homepage__photoAlbum" style={{ backgroundColor: '#D0D0D0' }}>
                    <AddIcon fontSize='large' />
                </div>
                {/* display's user's Album's ???? */}
                {
                    albums.map(({ id, data }) => (
                        <Album id={id} key={id} data={data} />
                    ))
                }
                <br />
            </div>

            {/* Root Directory Photos */}
            <div className='homepage__photos'>
                {
                    images && images.map(({ id, data }) => (
                        <Photo id={id} key={id} data={data} />
                    ))
                }
            </div>

            <CreateAlbumModal isCreateAlbumOpen={isCreateAlbumOpen} setIsCreateAlbumOpen={setIsCreateAlbumOpen} />
        </div>
    )
}

export default HomePage
