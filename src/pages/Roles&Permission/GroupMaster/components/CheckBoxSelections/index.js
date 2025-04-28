import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import { setRolePermissionAccordId } from "redux/actions/rolePermissionActions";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "& .MuiCheckbox-root": {
    padding: "5px",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse !important",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: "0px 0px 0px 30px",
}));

export default function CheckboxSections({ mapedRoles, labelVal, inputChecks }) {
  const [checked, setChecked] = React.useState(inputChecks);
  const parentChecked = !checked.some((i) => !i.checked);
  const parentIndeterminate = !parentChecked && checked.some((i) => i.checked);

  const dispatch = useDispatch();

  const handleCheckBox = (e) => {
    const changeBox = checked?.map((i) => {
      return {
        Subtitle: i.Subtitle,
        checked: e.target.checked,
        id: i.id
      };
    });
    setChecked(changeBox);
    const postObj = mapedRoles?.map((item) => {
      if(item?.entityCategory === labelVal) {
        return {
          ...item,
          status: e.target.checked === true ?  "Active" : "In Active"
        }
      }
      return item
    })
    console.log(postObj);
    dispatch(setRolePermissionAccordId(postObj));
  };

  const handleSubChecks = (e, subId) => {
    const changeSub = checked?.map((i) => {
      if (i.id === subId) {
        return {
          Subtitle: i.Subtitle,
          checked: e.target.checked,
          id: i.id
        };
      }
      return i;
    });
    const postObj = mapedRoles?.map((item) => {
      if(item?.id === subId) {
        return {
          ...item,
          status: e.target.checked === true ?  "Active" : "In Active"
        }
      }
      return item
    })
    console.log(postObj)
    dispatch(setRolePermissionAccordId(postObj));
    setChecked(changeSub);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {checked?.map((items, index) => {
        return (
          <FormControlLabel
            label={items.Subtitle}
            control={
              <Checkbox
                sx={{
                  '&.Mui-checked': {
                    color: '#019e89',
                  },
                }}
                size="small"
                checked={items.checked}
                onChange={(e) => handleSubChecks(e, items?.id)}
              />
            }
          />
        );
      })}
    </Box>
  );

  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <FormControlLabel
          label={labelVal}
          className="checkBox-title checkboxColor"
          onClick={(e) => e.stopPropagation()}
          control={
            <Checkbox
              size="small"
              sx={{
                '&.Mui-checked': {
                  color: '#019e89',
                },
              }}
              checked={parentChecked}
              indeterminate={parentIndeterminate}
              onChange={handleCheckBox}
            />
          }
        />
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
