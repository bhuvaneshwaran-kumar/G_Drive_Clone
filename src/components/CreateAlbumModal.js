import { useRef, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@material-ui/core';

function CreateAlbumModal({ isCreateAlbumOpen, setIsCreateAlbumOpen }) {
    const inputRef = useRef()
    const [error, setError] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        const albumName = inputRef.current.value
        if (albumName.length > 16 || albumName.length < 1) return setError(true)
    }
    const handleClose = () => {
        setIsCreateAlbumOpen(false)
    }
    return (
        <div>
            <Dialog
                open={isCreateAlbumOpen}
                aria-labelledby="form-dialog-title"
                onClose={handleClose}
            >
                <DialogTitle id="form-dialog-title">New Album</DialogTitle>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <DialogContent>
                        <Typography>Enter a name of your new Album</Typography>

                        <div>
                            <TextField
                                onChange={() => setError(false)}
                                error={error}
                                label='Album Name'
                                margin='dense'
                                autoFocus
                                type='text'
                                fullWidth
                                required
                                inputRef={inputRef}
                                helperText='name should be between 1 and 16 characters'
                                variant='filled'
                            >

                            </TextField>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button color='secondary' onClick={handleClose}>Cancel</Button>
                        <Button color='primary' onClick={handleSubmit}>Create</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default CreateAlbumModal
