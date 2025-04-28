import React from "react";
import { Avatar, Tooltip, Typography } from "@mui/material";
import { RootStateOrAny, useSelector } from "react-redux";

interface UserInfoProps {
  color?: string;
}

const UserInfo: React.FC<UserInfoProps> = () => {
  const UserState = useSelector((state: RootStateOrAny) => {
    return state?.user;
  });
  const UserData = UserState?.userData;

  return (
    <Tooltip 
      title={
        <>
          <Typography variant="h6" >Username: {`${UserData?.userName}`}</Typography>
          <Typography variant="h6" >Role: {`${UserData?.permissions?.map((d: any) => d.role)}`}</Typography>
        </>
      }
    >
      <Avatar sx={{ width: 35, height: 35 }}>
        {UserData?.userName?.charAt(0)}
      </Avatar>
    </Tooltip>
  );
};

export default UserInfo;
