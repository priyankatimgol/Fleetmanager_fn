import {
  Grid
} from "@mui/material";
import { Avatar, Button } from "@mui/material";
import { deepPurple } from '@mui/material/colors';

const CommentList = (data) => {

  function getInitialCharOfChangeBy() {
    // Split the full name into words
    const words = data?.data.statusChangedBy.split(' ');
    // Extract the first character of each word
    const initials = words.map(word => word.charAt(0));
    // Join the initials into a string
    const initialsString = initials.join('');
    return initialsString
  }

  function formatDate() {
    const date = new Date(data?.data.statusChangedDate);

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
    <div key={data?.data.id}>
      <Grid container rowSpacing={2} columnSpacing={2} className='mar-t15'>
        <Grid item md={1}>
          <Avatar sx={{ width: 22, height: 22, bgcolor: deepPurple[500], fontSize: '12px' }}>
            {getInitialCharOfChangeBy()}
          </Avatar>
        </Grid>
        <Grid item md={11}>
          <div className='dis-flex'>
            <div className='font-s12 bold-600'>{data?.data.statusChangedBy}  </div>
            <span className='font-s12'>&nbsp; {formatDate()}</span>
          </div>
          <Grid item md={11}>
            <div className='font-s12'>{data?.data.comment}</div>
          </Grid>
          {/* <Grid item md={12}>
            <div >
              <Button
                variant="standard"
                color="success"
                sx={{ color: "#00a18b", padding: '0px 15px 0px 0px;', minWidth: '0px', fontSize: '12px' }}
                size="small"
              // onClick={onCloseDrawer}
              > Edit </Button>
              <Button
                variant="standard"
                color="success"
                size="small"
                sx={{ color: "#00a18b", padding: '0px 15px 0px 0px;', minWidth: '0px', fontSize: '12px' }}
                type="submit"
              > Delete </Button>
            </div>
          </Grid> */}
        </Grid>
      </Grid>
    </div>

  )
}

export default CommentList