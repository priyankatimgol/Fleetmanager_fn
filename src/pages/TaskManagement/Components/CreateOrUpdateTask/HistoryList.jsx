import React from 'react';
import {
    Grid,
} from "@mui/material";
import { Avatar, Button } from "@mui/material";
import { deepPurple } from '@mui/material/colors';
import DetailOfTaskHistory from './DetailOfTaskHistory';
import DrawerComponent from "pages/common-components/Drawer";

const CommentList = (historyList) => {
    const [openDetailModel, setOpenDetailModel] = React.useState(false);

    const onCloseModel = () => {
        setOpenDetailModel(false);
    };

    const onOpenModel = () => {
        setOpenDetailModel(true);
    };

    function getInitialCharOfChangeBy(data) {
        // Split the full name into words
        const words = data.statusChangedBy.split(' ');
        // Extract the first character of each word
        const initials = words.map(word => word.charAt(0));
        // Join the initials into a string
        const initialsString = initials.join('');
        return initialsString
    }

    function formatDate(data) {
        const date = new Date(data.statusChangedDate);

        // Define month names
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        // Get the month, day, year, hours, and minutes
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Format the date string
        const formattedDate = `${month} ${day < 10 ? '0' : ''}${day} ${year} at ${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}${ampm}`;
        return formattedDate;
    }

    return (
        <div>
            <Grid item md={12}>
                <div className='button_view'>
                    <Button
                        variant="standard"
                        color="success"
                        sx={{ color: "#00a18b", padding: '0px 15px 0px 0px;', minWidth: '0px', fontSize: '12px' }}
                        size="small"
                        onClick={onOpenModel}
                    > Detail </Button>
                </div>
            </Grid>
            {historyList && historyList.historyList.length > 0 && historyList.historyList.map((data, index) => {
                return (
                    <Grid container rowSpacing={2} columnSpacing={2} className='mar-t15' key={index}>
                        <Grid item md={1}>
                            <Avatar sx={{ width: 22, height: 22, bgcolor: deepPurple[500], fontSize: '12px' }}>
                                {getInitialCharOfChangeBy(data)}
                            </Avatar>
                        </Grid>
                        <Grid item md={11}>
                            <div className='dis-flex'>
                                <div className='font-s12 bold-600'>{data.statusChangedBy}  </div>
                                <span className='font-s12'>&nbsp; {formatDate(data)}</span>
                            </div>

                            <Grid item md={11}>
                                <div className='font-s12'>{`
                                    ${(historyList.historyList[index + 1] && historyList.historyList[index + 1] !== 'undefined')
                                        ? historyList.historyList[index + 1].action : ''
                                    } 
                                    ${historyList.historyList[index + 1] && historyList.historyList[index + 1] !== 'undefined' ? '---->' : ''} ${data.action}`}</div>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })}
            <DrawerComponent open={openDetailModel} onClose={onCloseModel}>
                <DetailOfTaskHistory onCloseModel={onCloseModel} openDetailModel={openDetailModel} historyList={historyList.historyList} />
            </DrawerComponent>

        </div>
    )
}

export default CommentList