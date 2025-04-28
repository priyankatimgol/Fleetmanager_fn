import { Drawer } from '@mui/material';
import "./styles.css";

const DrawerComponent = ({
  position = 'right', // Default value
  open, // Boolean value
  onClose, // Close function
  children // JSX Component
}) => {
  return (
    <>
      <Drawer
        anchor={position}
        open={open}
        onClose={onClose}
      >
        <div className='padding10'>
          {children}
        </div>
      </Drawer>
    </>
  )
}

export default DrawerComponent;