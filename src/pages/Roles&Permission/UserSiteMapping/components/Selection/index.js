import { Grid, TextField } from "@mui/material";
import {
  MySelectAuto,
  MySelectAutoComplete,
} from "pages/common-components/AutoSearchSelect";
import { Buttons } from "pages/common-components/Button";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  getAreaData,
  getRoleName,
  getSiteData,
  getStateData,
  getUserSiteMappings,
} from "redux/actions/UserSiteMapping";
import { getApiCall } from "apiServices/apiUtils";

export default function Selections({
  setId,
  openId,
  setSelEmpCode,
  unSelect,
  searchVal,
  selEmpCode,
  empMail,
  setEmpMail,
  initialVal,
  setSearchVal,
  handleConsole,
  handleSearch,
  roleHandle,
  roleObj
}) {
  const state = useSelector((state) => state);
  const country = state?.UserSiteMapping?.searchAbleSelections?.country || [];
  const states = state?.UserSiteMapping?.searchAbleSelections?.state || [];
  const site = state?.UserSiteMapping?.searchAbleSelections?.site || [];
  const area = state?.UserSiteMapping?.searchAbleSelections?.area || [];
  const roleName = state?.UserSiteMapping?.roleNameSelection || [];
  const selectedEmploy = selEmpCode ? {
    label: `${selEmpCode} - ${openId}`,
    code: selEmpCode,
    name: openId,
  } : null;
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selEmployee, setSelEmployee] = React.useState(selectedEmploy);
  const [empCode, setEmpCode] = React.useState(null);
  const [empDropdownOptions, setEmpDropdownOptions] = React.useState([]);
  const [roleSelection, setRoleSelection] = React.useState({});
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (roleObj) {
      setRoleSelection(roleObj)
    }
  }, [roleObj])

  React.useEffect(() => {
    if (empCode === null) {
      setEmpDropdownOptions([]);
      return;
    } else {
      setIsLoading(true);
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/EmployeeDetails?EmployeeCode=${empCode}`)
      .then((response) => {
        if (response?.data) {
          const modifiedArray = response?.data?.map(response => ({
            label: `${response.code} - ${response.name}`,
            code: response.code,
            name: response.name,
            email: response.email
          }));
          setIsLoading(false);
          setEmpDropdownOptions(modifiedArray);
        } else {
          setEmpDropdownOptions([]);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    }
  }, [empCode])

  React.useEffect(() => {
    if (empCode && empCode === "") {
      setEmpDropdownOptions([]);
      return;
    } else if (empCode !== null) {
      //setIsLoading(true);
    }
  }, [empCode]);

  React.useEffect(() => {
    dispatch(getRoleName());
  }, []);

  return (
    <Grid container sx={{ pt: "5px" }} justifyContent="space-evenly">
      <Grid item sm={6} md={4} sx={{ pl: "10px !important" }}>
        <MySelectAutoComplete
          size="small"
          toplabel="Employee Code"
          placeholder="Enter Employee Code"
          values={selEmployee}
          loading={isLoading}
          //open={isOpen}
          onFocus={() => setIsLoading(true)}
          onBlur={() => {
            setIsOpen(false);
            setEmpDropdownOptions([]);
          }}
          listing={empDropdownOptions}
          getOptionLabel={(option) => option.label}
          sx={{ flex: "0.5" }}
          //disabled={true}
          onChangeDta={(e, value) => {
            dispatch(getUserSiteMappings({ user: value?.name, employeeCode: value.code }));
            setId(value?.name);
            setSelEmpCode(value?.code);
            setEmpMail(value?.email);
            setSelEmployee(value);
            setEmpDropdownOptions([]);
            unSelect();
            setIsOpen(false);
          }}
          onInputChange={(e) => {
            setIsOpen(true);
            if (e?.target?.value === "") {
              setEmpCode(null);
              setEmpDropdownOptions([]);
              setIsOpen(false);
              return;
            }
            setEmpDropdownOptions([]);
            setEmpCode(e?.target?.value);
          }}
        />
      </Grid>

      <Grid item sm={6} md={1.5} sx={{ pl: 3 }}>
      </Grid>
      <Grid item sm={6} md={6.5} sx={{ pl: 5.5, pr: 60 }}>
        <MySelectAutoComplete
          size="small"
          toplabel="Role Name"
          placeholder="Enter Role"
          values={roleSelection?.roleName?.length > 0 ? roleSelection : null}
          //disablePortal={false}
          listing={roleName || []}
          getOptionLabel={(option) => option.roleName}
          //disabled={false}
          onChange={(e, value) => {
            setRoleSelection(value)
            roleHandle(value)
          }}
          className="fontSize-13"
          ListboxProps={{ style: { maxHeight: 170 } }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
      <Grid item md={2}>
        <MySelectAuto
          toplabel="Country"
          onChangeDta={(e, value) => {
            setSearchVal({ ...initialVal, country: value?.label });
            dispatch(getStateData(value?.code));
          }}
          disableClearable={searchVal?.country ? false : true}
          values={searchVal?.country}
          listing={country?.map((i) => {
            return {
              label: i.country,
              code: i.countryCode,
            };
          })}
        />
      </Grid>
      <Grid item md={2}>
        <MySelectAuto
          toplabel="State"
          disabled={!searchVal?.country}
          disableClearable={searchVal?.state ? false : true}
          onChangeDta={(e, value) => {
            setSearchVal({
              ...initialVal,
              country: searchVal?.country,
              state: value?.label,
            });
            dispatch(getAreaData(value?.code));
          }}
          values={searchVal?.state}
          listing={states?.map((i) => {
            return {
              label: i.state,
              code: i.stateCode,
            };
          })}
        />
      </Grid>
      <Grid item md={2}>
        <MySelectAuto
          toplabel="Area"
          disabled={!searchVal?.state}
          disableClearable={searchVal?.area ? false : true}
          onChangeDta={(e, value) => {
            setSearchVal({ ...searchVal, area: value?.label, site: "" });
            dispatch(getSiteData(value?.code));
          }}
          values={searchVal?.area}
          listing={area?.map((i) => {
            return {
              label: i.area,
              code: i.areaCode,
            };
          })}
        />
      </Grid>
      <Grid item md={2}>
        <MySelectAuto
          toplabel="Site"
          disabled={!searchVal?.area}
          disableClearable={searchVal?.site ? false : true}
          onChangeDta={(e, value) => {
            setSearchVal({ ...searchVal, site: value?.label });
          }}
          values={searchVal?.site}
          listing={site?.map((i) => {
            return { label: i.mainSite };
          })}
        />
      </Grid>
      <Grid item>
        <Buttons
          variant="outlined"
          className="btn mtb-15"
          startIcon={<SearchIcon />}
          name="Search"
          onClick={handleSearch}
        />
      </Grid>
      <Grid item>
        <Buttons
          variant="outlined"
          type="submit"
          className="Sub-btn mtb-15"
          name="Update Mapping"
          onClick={() => handleConsole(roleSelection)}
        />
      </Grid>
    </Grid>
  );
}
