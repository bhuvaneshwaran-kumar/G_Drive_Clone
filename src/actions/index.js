export const SET_USER = 'SET_USER'
export const SET_CURRENT_ALBUMS = 'SET_CURRENT_ALBUMS'

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const setCurrentAlbum = (albumName) => {
    return {
        type: SET_CURRENT_ALBUMS,
        payload: albumName
    }
}