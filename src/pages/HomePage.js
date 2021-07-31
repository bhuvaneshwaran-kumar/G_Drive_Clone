import { Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React, { useEffect, useState } from 'react'
import CreateAlbumModal from '../components/CreateAlbumModal'
import "../css/HomePage.css"
import useFireStore from '../hooks/useFirestore'
function HomePage() {
    const { getAlbums } = useFireStore()
    const [isCreateAlbumOpen, setIsCreateAlbumOpen] = useState(false)

    const [albums, setAlbums] = useState([])



    const handleCreateAlbum = () => {
        setIsCreateAlbumOpen(true)
    }


    useEffect(() => {
        const unsubscribe = getAlbums().
            onSnapshot(snapshot => {
                setAlbums(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })
        return unsubscribe
    }, [])



    return (
        <div className="homepage">
            <Typography variant="h5">Albums</Typography>
            <div className="homepage__photos">
                {/* Create Album */}
                <div onClick={handleCreateAlbum} className="homepage__photoAlbum" style={{ backgroundColor: '#D0D0D0' }}>
                    <AddIcon fontSize='large' />
                </div>
                {/* display's user's Album's 😍 */}
                {
                    albums.map(album => (
                        <div onClick={handleCreateAlbum} className="homepage__photoAlbum" style={{ backgroundColor: '#D0D0D0' }}>
                            <AddIcon fontSize='large' />
                        </div>
                    ))
                }
            </div>


            <CreateAlbumModal isCreateAlbumOpen={isCreateAlbumOpen} setIsCreateAlbumOpen={setIsCreateAlbumOpen} />
        </div>
    )
}

export default HomePage
