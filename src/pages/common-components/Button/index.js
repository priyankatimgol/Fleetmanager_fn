import { Button, IconButton, Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";

export const Buttons = ({
  onClick,
  className,
  startIcon,
  name,
  variant,
  size,
  type,
  ...props
}) => {
  if (type === "submit") {
    return (
      <Button
        variant={variant}
        color="success"
        type="submit"
        size={size}
        className={className}
        onClick={onClick}
        startIcon={startIcon}
        {...props}
      >
        {name}
      </Button>
    );
  }
  return (
    <Button
      variant={variant}
      color="success"
      className={className}
      onClick={onClick}
      size={size}
      startIcon={startIcon}
      {...props}
    >
      {name}
    </Button>
  );
};

export const IconButtons = ({
  onClick,
  size,
  icon,
  tooltipTitle,
  ...props
}) => {
  return (
    <Tooltip title={tooltipTitle ?? ""} TransitionComponent={Fade}>
      <IconButton onClick={onClick} size={size} {...props}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
