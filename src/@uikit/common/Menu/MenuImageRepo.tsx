import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import TaskIcon from "@mui/icons-material/Task";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const MenuImageDirectory = [
    {
        iconName: "home",
        iconNode:<HomeOutlinedIcon/>
    },
    {
        iconName: "Dashboard",
        iconNode:<DashboardIcon/>
    },
    {
        iconName: "profile",
        iconNode:<PersonOutlineOutlinedIcon fontSize='small' />
    },
    {
        iconName: "job",
        iconNode:<WorkOutlineOutlinedIcon fontSize='small' />
    },
    {
        iconName: "report",
        iconNode:<AssignmentIcon/>
    },
    {
        iconName: "phase",
        iconNode:<FilePresentIcon/>
    },
    {
        iconName: "dedupe",
        iconNode:<TaskIcon/>
    },
    {
        iconName: "property",
        iconNode:<NightShelterIcon/>
    }
]
export default MenuImageDirectory;