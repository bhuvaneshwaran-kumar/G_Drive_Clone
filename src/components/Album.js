import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import { Typography } from '@material-ui/core'

import { setCurrentAlbum } from '../actions/index' //action Creater.
function Album({ id, data }) {

    const dispatch = useDispatch()
    const history = useHistory()

    // changes the redux store album state.
    const handleAlbumClick = () => {
        dispatch(
            setCurrentAlbum({
                albumId: id,
                albumName: data.name
            })
        )
        history.push(`/album/${data.name}`)
    }

    return (
        <div className='homepage__photoAlbum' onClick={handleAlbumClick}>
            <PhotoLibraryIcon />
            <Typography variant='h6'>{data.name}</Typography>
        </div>
    )
}

export default Album
