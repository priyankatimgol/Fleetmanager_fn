import { MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWtgCustomers, setSelectedCustomer } from "redux/actions/SiteHomeActions";

function Customers() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const WtgCustomers = state.siteHomeKpi?.wtgCustomers;
  const SelSite = state.siteHomeKpi?.selSite;
  const SelCustomer = state.siteHomeKpi?.selCustomer;

  useEffect(() => {
    if(SelSite){
      dispatch(getWtgCustomers(SelSite));
    }
  }, [SelSite, dispatch]);

  return (
    <TextField
      id="standard-select-currency"
      select
      defaultValue={0}
      value={SelCustomer}
      fullWidth
      variant="standard"
      onChange={(e) => dispatch(setSelectedCustomer(e.target.value))}
    >
      <MenuItem key={0} value={0}>
        All Customers
      </MenuItem>
      {WtgCustomers &&
        WtgCustomers.map((data) => (
          <MenuItem key={data.ownerId} value={data.ownerId}>
            {data.customerName}
          </MenuItem>
        ))}
    </TextField>
  );
}

export default Customers;
