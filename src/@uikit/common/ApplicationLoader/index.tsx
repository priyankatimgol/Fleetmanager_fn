import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/store';
const Loader = () => {
    const { loaderState } = useSelector<AppState, AppState["appLoader"]>(
        ({ appLoader }) => appLoader
    );
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loaderState}
            onClick={null}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
export default Loader