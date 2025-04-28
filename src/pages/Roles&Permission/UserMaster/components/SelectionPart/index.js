import { Box } from "@mui/material";
import { MySelectAutoComplete } from "pages/common-components/AutoSearchSelect";

export const SelctionPart = ({ setGroupName, groupName, groupData }) => {
  return (
    <Box sx={{ pr: 3, pt: 3, pl: 3, pb: 1 }} className="Select_box">
      <MySelectAutoComplete
        toplabel="Group Name"
        onChangeDta={(e, value) => {
          setGroupName(value?.label);
        }}
        values={groupName}
        listing={groupData?.map((i) => {
          return { label: i };
        })}
      />
    </Box>
  );
};
