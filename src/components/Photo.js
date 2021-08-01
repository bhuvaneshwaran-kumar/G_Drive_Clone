import { useCallback } from 'react'
import { Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import debounce from 'lodash.debounce'

import useFireStore from '../hooks/useFirestore'
import '../css/Photo.css'

function Photo({ id, data }) {

    const { deletePhoto } = useFireStore()


    //This Remains same across all the renders.
    const debounceDelete = useCallback(
        debounce(() => {
            deletePhoto(id, `${id}_${data.name}`)
        }, 1000), [],
    )

    function handleDeletePhoto() {
        // Even though handleChange is created on each render and executed
        // it references the same debounceDelete that was created initially
        debounceDelete()
    }

    const handleDownloadPhoto = async () => {
        // This can be downloaded directly:
        let xhr = new XMLHttpRequest()
        xhr.responseType = "blob"
        xhr.onload = (event) => {
            let blob = xhr.response
            console.log(blob)
            let a = document.createElement("a")
            a.style = "display: none"
            document.body.appendChild(a)

            let url = window.URL.createObjectURL(blob)
            a.href = url
            a.download = data.name
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        }
        xhr.open("GET", data.photoURL)
        xhr.send()
    }

    const handleOpenImage = () => window.open(data.photoURL)


    return (
        <div className="photo">
            <img src={data.photoURL} alt={data?.name} className="photo__img" draggable='false'
                onClick={handleOpenImage}
            />
            <div className="photo__options">
                <Tooltip title="Delete" onClick={handleDeletePhoto}>
                    <DeleteIcon />
                </Tooltip>
                <small className="photo__optionsName">{data.name}</small>
                <Tooltip title="Download" onClick={handleDownloadPhoto}>
                    <GetAppIcon />
                </Tooltip>
            </div>
        </div>
    )


}

export default Photo