import { Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import React, { useState } from 'react'
import CreateAlbumModal from '../components/CreateAlbumModal'
import "../css/HomePage.css"
function HomePage() {
    const [isCreateAlbumOpen, setIsCreateAlbumOpen] = useState(false)


    const handleCreateAlbum = () => {
        setIsCreateAlbumOpen(true)
    }
    return (
        <div className="homepage">
            <Typography variant="h5">Albums</Typography>
            <div className="homepage__photos">
                {/* Create Album */}
                <div onClick={handleCreateAlbum} className="homepage__photoAlbum" style={{ backgroundColor: '#D0D0D0' }}>
                    <AddIcon fontSize='large' />
                </div>

            </div>


            <CreateAlbumModal isCreateAlbumOpen={isCreateAlbumOpen} setIsCreateAlbumOpen={setIsCreateAlbumOpen} />
        </div>
    )
}

export default HomePage
