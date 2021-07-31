import { serverTimeStamp, db, storage } from '../firebaseConfig'
import { useSelector } from 'react-redux'

function useFireStore() {

    const { uid } = useSelector((state) => state.user)

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

    return {
        createAlbum, getAlbums
    }

}
export default useFireStore