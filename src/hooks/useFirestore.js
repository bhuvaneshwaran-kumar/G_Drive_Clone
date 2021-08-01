import { serverTimeStamp, db, storage } from '../firebaseConfig'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

function useFireStore() {

    const { uid } = useSelector((state) => state.user)
    const { albumId, albumName } = useSelector((state) => state.album)

    //upload's Images.
    const uploadImages = (imageFiles) => {
        for (let imageFile of imageFiles) {
            const photoId = uuidv4()

            // extract the data of image.
            const imageData = {
                name: imageFile.name,
                uid: uid,
                albumId: albumId,
                albumName: albumName,
                createdAt: serverTimeStamp()
            }

            // register to the observer.
            const uploadTask = storage.ref(`photos/${photoId}_${imageFile.name}`).put(imageFile)

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes,
            // null -> callback contains the metaData of the upload status.
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion

            uploadTask.on(
                'state_change',
                null,
                err => alert(err.message),
                () => {
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then(downloadImageUrl => {
                            imageData.photoURL = downloadImageUrl // append the image URL to the imageData
                            console.table(imageData)
                            db.collection('photos').doc(photoId).set(imageData) // add the image data to store. 
                        })
                }
            )
        }
    }

    //create a album docs.
    const createAlbum = (albumName) => {
        const data = {
            name: albumName,
            uid: uid,
            createdAt: serverTimeStamp()
        }
        db.collection('albums').add(data)
    }

    // To get the user's album metaData.
    const getAlbums = () => {
        return db.collection('albums')
            .where('uid', '==', uid)
            .orderBy('createdAt', 'desc')
    }

    // To get User's album Photos.'
    const getAlbumPhotos = () => {
        return db.collection('photos')
            .where('uid', '==', uid)
            .where('albumName', '==', albumName)
            .where('albumId', '==', albumId)
            .orderBy('createdAt', 'desc')

    }

    const deletePhoto = (id, fileName) => {
        storage
            .ref('photos')
            .child(fileName)
            .delete()
            .then(() => db.collection('photos').doc(id).delete())
            .catch(err => alert(err.message))
    }

    return {
        createAlbum, getAlbums, uploadImages, getAlbumPhotos, deletePhoto
    }

}
export default useFireStore