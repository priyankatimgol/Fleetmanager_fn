import moment from "moment";
import * as Yup from "yup";

export const propertyPoolInitialValues = {
  rent: "",
  tds: "",
  gstApplicable: "",
  gstNo: "",
  gstDeduction: "",
  securityAmount: "",
  maintenanceCharges: "",
  totalExpencesPerMonth: "",
  propertyTaxes: "",
  rentFreePeriod: "",
  rentEscelationFerq: "",
  rentEscelation: "",
  country: "",
  nameOfBuilding: "",
  floorNumberInBuilding: "",
  premisesAddress: "",
  pinCode: "",
  city: "",
  district: "",
  state: "",
  propertyCountry: "",
  promiseDistanceFromBusStation: "",
  promiseDistanceFromRailwayStation: "",
  wineShop: "",
  competitorsPresence: "",
  propertyStatus: "",
  nearByBusinessAvailable: true,
  permissionAvailable: true,
  spaceForSignage: true,
  glowSignBoard: true,
  sideBoard: true,
  tickerBoard: true,
  flangeBoard: true,
  brandingInStaircase: true,
  directionBoard: true,
  buildBy: 0,
  buildComments: "",
  floorSanction: "",
  totalConstructedFloorArea: "",
  totalCarpetArea: "",
  chargeableArea: "",
  vetrifiedFlooring: true,
  entranceType: "",
  providedDoor: "",
  ventilationAvailable: true,
  grilledWindows: true,
  grilledWindowCount: "",
  grilledWindowNote: "",
  ventilationInWashroom: true,
  grilledWindowsInWashroom: true,
  outdoorUnits: true,
  spaceForDGSet: true,
  premiseAccessability: true,
  premiseAccessabilityNotAvailableReason: "",
  parkingAvailability: "",
  parkingType: 0,
  numberOfCarParkingAvailable: "",
  numberOfBikeParkingAvailable: "",
  landlordDetails: "",
  agreementRegistrationApplicability: true,
  agreementDuration: "",
  lockInPremiseOwner: "",
  lockInBfl: true,
  lockInForBfl: "",
  agreementRegistrationChargesBornBy: 0,
  bflShare: "",
  landlordShare: "",
  rcc_bfl_share: 0.0,
  rcc_landlord_share: 0.0,
  electricityConnectionAvailablity: true,
  electricityPowerLoad: "",
  electricityConnectionBornBy: "true",
  waterSupplyAvailability: true,
  waterSupplyTimings: moment(new Date()).format("LT"),
  sinkWithTiles: true,
  washroomAvailablity: true,
  washroomType: "",
  lessorType : "",
  nameOfOwnership : "",
  ageOfBuilding : "",
  mottgageStatus : "",
  nameOfBank : "",
  washroomAvailableCount: "",
  maleWashroomCount: 0,
  femaleWashroomCount: 0,
  urinalsAvailableInMaleWashroom: "",
  urinalsCountInMaleWashroom: "",
  toiletSeatTypeInMaleWashroom: "true",
  toiletSeatCountInMaleWashroom: "",
  toiletSeatCountInFemaleWashroom: "",
  washBasinAvailableInsideWashrooms: true,
  keyAvailableInWashrooms: true,
  commercial_remarks: "",
  property_geo_details_remarks: "",
  infra_requirement_remarks: "",
  property_infra_details_remarks: "",
  legal_remarks: "",
  utility_remarks: "",
};

export const propertyPoolSaveAsDraftSchema = {
  nameOfBuilding: Yup.string().required(
    "Please enter Name of building/complex"
  ),
  floorNumberInBuilding: Yup.number()
    .min(0, "Number must be positive")
    .integer("Only integer value can be entered")
    .required("Please enter Floor Number"),
  pinCode: Yup.string()
    .min(1, "Pin Code must be positive number")
    .max(999999, "Pin Code should not be more than 6 digits")
    .test("regex", "Pin Code must be 6 digit", (val) => {
      let regExp = new RegExp("\\d{6}");
      if (val === undefined) return true;
      return regExp.test(val);
    })
    .test("regex", "Pin Code should not start with 0", (val) => {
      let regExp = new RegExp("^[1-9]{1}[0-9]{2}s{0,1}[0-9]{3}$");
      if (val === undefined) return true;
      return regExp.test(val);
    })
    .required("Please enter Pin Code"),
  city: Yup.string().required("Please enter City"),
}

export const propertyPoolSchema = Yup.object({
  commercial_remarks: Yup.string().required("Please enter Remarks"),
  infra_requirement_remarks: Yup.string().required("Please enter Remarks"),
  property_infra_details_remarks: Yup.string().required("Please enter Remarks"),
  utility_remarks: Yup.string().required("Please enter Remarks"),
  legal_remarks: Yup.string().required("Please enter Remarks"),
  property_geo_details_remarks: Yup.string().required("Please enter Remarks"),
  rent: Yup.number()
    .min(0, "Number must be positive")
    .required("Please enter Rent per month"),
  tds: Yup.number()
    .min(0, "Number must be positive")
    .required("Please enter TDS Deduction"),
  gstApplicable: Yup.bool().required("Please select GST Applicable"),
  gstNo: Yup.string().when("gstApplicable", {
    is: true,
    then: Yup.string()
      .test("gstRegex", "Please enter valid GST number", (value) => {
        let gstRegex = /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1}$/;
        if (value === undefined) return true;
        return gstRegex.test(value);
      }),
    otherwise: Yup.string().nullable(true),
  }),
  gstDeduction: Yup.number().when("gstApplicable", {
    is: true,
    then: Yup.number()
      .typeError("Gst Deduction must be a number")
      .min(0, "Gst Deduction must be positive number")
      .required("Please enter Gst Deduction"),
  }),
  securityAmount: Yup.number()
    .min(0, "Number must be positive")
    .required("Please enter Security Deposit Amount"),
  maintenanceCharges: Yup.number()
    .min(0, "Number must be positive")
    .required("Please enter Maintenance Charges"),
  // totalExpencesPerMonth: Yup.number()
  //   .min(0, "Number must be positive")
  //   .required("Please enter Total Fixed Expenses Per Month"),
  propertyTaxes: Yup.string().required("Please select Property Taxes"),
  rentFreePeriod: Yup.number()
    .min(0, "Number must be positive")
    .integer("Only integer value can be entered")
    .required("Please enter Rent Free Period"),
  rentEscelationFerq: Yup.number()
    .min(0, "Number must be positive")
    .integer("Only integer value can be entered")
    .required("Please enter Rent Escalation Frequency"),
  rentEscelation: Yup.number()
    .min(0, "Number must be positive")
    .integer("Only integer value can be entered")
    .required("Please enter Rent Escalation"),
  nameOfBuilding: Yup.string().required(
    "Please enter Name of building/complex"
  ),
  floorNumberInBuilding: Yup.number()
    .min(0, "Number must be positive")
    .integer("Only integer value can be entered")
    .required("Please enter Floor Number"),
  premisesAddress: Yup.string().required("Please enter Premises Address"),
  pinCode: Yup.string()
    .min(1, "Pin Code must be positive number")
    .max(999999, "Pin Code should not be more than 6 digits")
    .test("regex", "Pin Code must be 6 digit", (val) => {
      let regExp = new RegExp("\\d{6}");
      if (val === undefined) return true;
      return regExp.test(val);
    })
    .test("regex", "Pin Code should not start with 0", (val) => {
      let regExp = new RegExp("^[1-9]{1}[0-9]{2}s{0,1}[0-9]{3}$");
      if (val === undefined) return true;
      return regExp.test(val);
    })
    .required("Please enter Pin Code"),
  city: Yup.string().required("Please enter City"),
  district: Yup.string().required("Please enter District"),
  state: Yup.string().required("Please enter State"),
  propertyCountry: Yup.string().required("Please enter Country"),
  propertyStatus: Yup.string().required("Please enter Property Status"),
  nameOfOwnership: Yup.string().required("Please select Nature of Ownership"),

  promiseDistanceFromBusStation: Yup.string().required(
    "Please enter Distance from Bus Stand (In Meters)"
  ),
  promiseDistanceFromRailwayStation: Yup.string().required(
    "Please enter Distance from Railway Station (In Meters)"
  ),
  wineShop: Yup.string().required(
    "Please enter Wine Bar/Shop presence with geo tag "
  ),
  nearByBusinessAvailable: Yup.bool().required(
    "Please select Add Competitors Available"
  ),
  permissionAvailable: Yup.bool().required(
    "Please select Permission available on terrace for two antennas"
  ),
  spaceForSignage: Yup.bool().required("Please select Space for signage"),
  glowSignBoard: Yup.bool().required("Please select Main Glow Sign Board"),
  sideBoard: Yup.bool().required("Please select Side Board"),
  tickerBoard: Yup.bool().required("Please select Ticker Board"),
  flangeBoard: Yup.bool().required("Please select Lollypop / Flange Board"),
  brandingInStaircase: Yup.bool().required(
    "Please select Branding in Staircase"
  ),
  directionBoard: Yup.bool().required("Please select  Direction Board - 2 Nos"),
  totalConstructedFloorArea: Yup.number()
    .min(0.1, "Minimun total Constructed Floor Area is more than 0")
    .required("Please enter total constructed Floor Area in SqFt"),
  totalCarpetArea: Yup.number()
    .min(0.1, "Minimun total Carpet Area is more than 0")
    .required("Please enter Total Carpet Area in SqFt"),
  chargeableArea: Yup.number()
    .min(0.1, "Minimun chargeable Area is more than 0")
    .required("Please enter Chargeable Area in SqFt")
    .test(
      "max",
      "Chargeable Area should not exceed than Total Carpet Area",
      function (value) {
        const { totalCarpetArea } = this.parent;
        return value <= totalCarpetArea;
      }
    ),
  vetrifiedFlooring: Yup.bool().required(
    "Please select Landlord to provide Verified Flooring"
  ),
  //entranceType : Yup.string().required("Please enter Current Branch Entrance type"),
  // providedDoor: Yup.string().required(
  //   "Please select Sutter door / Grilled Door to be provided by Landlord "
  // ),
  ventilationAvailable: Yup.bool().required(
    "Please select Ventilation available in branch "
  ),
  grilledWindows: Yup.bool().required(
    "Please select Grilled Windows in office area"
  ),
  //grilledWindowCount: Yup.number().min(1, "Minimun window count number is 1").integer("Only integer value can be entered"),
  //grilledWindowNote : Yup.string().required("Please enter Grilled Window Note"),
  ventilationInWashroom: Yup.bool().required(
    "Please select Ventilation in Washroom Area "
  ),
  grilledWindowsInWashroom: Yup.bool().required(
    "Please select Grilled Windows in Washroom area"
  ),
  outdoorUnits: Yup.bool().required("Please select Space for AC outdoor units"),
  //spaceForDGSet: Yup.bool().required("Please select Space for DG Set"),
  premiseAccessability: Yup.bool().required(
    "Please select Premise Accessibility (24*7) "
  ),
  //premiseAccessabilityNotAvailableReason :Yup.string().required("Please enter Premise Accessability (24*7) not available Reason"),
  // parkingAvailability: Yup.bool().required(
  //   "Please select Parking Availability"
  // ),
  //parkingType :Yup.number().integer("Only integer value can be entered").required("Please enter Parking Type"),
  numberOfCarParkingAvailable: Yup.number().when("parkingAvailability", {
    is: true,
    then: Yup.number()
      .typeError("Car Parking must be a number")
      .min(1, "Minimun number of available Car Parking is 1")
      .integer("Only integer value can be entered")
      .required("Please enter Number of Car Parking Available"),
  }),
  numberOfBikeParkingAvailable: Yup.number().when("parkingAvailability", {
    is: true,
    then: Yup.number()
      .typeError("Bike Parking must be a number")
      .min(1, "Minimun number of available Bike Parking is 1")
      .integer("Only integer value can be entered")
      .required("Please enter Number of Bike Parking Available"),
  }),
  agreementRegistrationApplicability: Yup.bool().required(
    "Please select Agreement Registration Applicability"
  ),
  //agreementDuration :Yup.string().required("Please enter Agreement Duration (In Years)"),
  // lockInPremiseOwner :Yup.string().required("Please enter Lock in for premise owner (In Years) "),
  lockInBfl: Yup.bool().required("Please select Lock in for BFL"),
  // lockInForBfl : Yup.string().required("Please enter Lock in for BFL (In Years)"),
  // agreementRegistrationChargesBornBy : Yup.string().required("Please enter Agreement registration charges born by"),
  bflShare: Yup.number()
    .min(0, "Minimun value is 0%")
    .max(100, "BFL Share should not exceed 100 %")
    .test(
      "equal",
      "The sum of BFL Share and Landlord share should be equal to 100",
      function (value) {
        const { agreementRegistrationChargesBornBy, landlordShare } =
          this.parent;
        if (agreementRegistrationChargesBornBy === 3) {
          let _validation = value + landlordShare;
          _validation = parseInt(_validation);
          if (value === undefined) return true;
          return _validation === 100;
        }
        return true;
      }
    )
    .test("max", "BFL Share should not exceed 100 %", function (value) {
      // const { landlordShare } = this.parent;
      if (value === undefined) return true;
      return value <= 100;
    })
    .test(
      "max",
      "Sum of BFL Share and Landlord Share should not exceed 100 %",
      function (value) {
        const { landlordShare } = this.parent;
        if (value === undefined || landlordShare === undefined) return true;
        return value <= 100 - landlordShare;
      }
    ),
  landlordShare: Yup.number()
    .min(0, "Minimun value is 0%")
    .max(100, "Max value is 100%")
    .test("max", "Landlord Share should not exceed 100 %", function (value) {
      // const { bflShare } = this.parent;
      if (value === undefined) return true;
      return value <= 100;
    })
    .test(
      "equal",
      "The sum of BFL Share and Landlord share should be equal to 100",
      function (value) {
        const { agreementRegistrationChargesBornBy, bflShare } = this.parent;
        if (agreementRegistrationChargesBornBy === 3) {
          let _validation = value + bflShare;
          _validation = parseInt(_validation);
          if (value === undefined) return true;
          return _validation === 100;
        }
        return true;
      }
    )
    .test(
      "max",
      "Sum of BFL Share and Landlord Share should not exceed 100 %",
      function (value) {
        const { bflShare } = this.parent;
        if (value === undefined || bflShare === undefined) return true;
        return value <= 100 - bflShare;
      }
    ),

  rcc_bfl_share: Yup.number()
    .min(0, "Minimun value is 0%")
    .max(100, "BFL Share should not exceed 100 %")
    .test(
      "equal",
      `The sum of BFL Share and Landlord share should be equal to 100`,
      function (value:any) {
        const { buildBy, rcc_landlord_share } = this.parent;
        if (buildBy === 3) {
          let _validation:any = parseFloat(value) + (parseFloat(rcc_landlord_share) || 0);
          _validation = parseFloat(_validation);
          if (value === undefined) return true;
          return _validation <= 100;
        }
        return true;
      }
    )
    .test("max", "BFL Share should not exceed 100 %", function (value) {
      // const { landlordShare } = this.parent;
      if (value === undefined) return true;
      return value <= 100;
    })
    .test(
      "max",
      "Sum of BFL Share and Landlord Share should not exceed 100 %",
      function (value) {
        const { rcc_landlord_share } = this.parent;
        if (value === undefined || rcc_landlord_share === undefined)
          return true;
        return value <= 100 - rcc_landlord_share;
      }
    ),
  rcc_landlord_share: Yup.number()
    .min(0, "Minimun value is 0%")
    .max(100, "Max value is 100%")
    .test("max", "Landlord Share should not exceed 100 %", function (value) {
      // const { bflShare } = this.parent;
      if (value === undefined) return true;
      return value <= 100;
    })
    .test(
      "equal",
      "The sum of BFL Share and Landlord share should be equal to 100",
      function (value:any) {
        const { buildBy, rcc_bfl_share } = this.parent;
        if (buildBy === 3) {
                   let _validation:any = parseFloat(value) + (parseFloat(rcc_bfl_share) || 0);
          _validation = parseFloat(_validation);
          if (value === undefined) return true;
          return _validation <= 100;
        }
        return true;
      }
    )
    .test(
      "max",
      "Sum of BFL Share and Landlord Share should not exceed 100 %",
      function (value) {
        const { rcc_bfl_share } = this.parent;
        if (value === undefined || rcc_bfl_share === undefined) return true;
        return value <= 100 - rcc_bfl_share;
      }
    ),
  electricityConnectionAvailablity: Yup.bool().required(
    "Please select Electricity Connection Availablity"
  ),
  electricityPowerLoad: Yup.number().min(
    1,
    "Minimun electricity power load is more than 1"
  ),
  electricityConnectionBornBy: Yup.string().required(
    "Please select Electricity Connection Born By"
  ),
  //waterSupplyAvailability: Yup.string().required("Please select  Water Supply Availability "),
  sinkWithTiles: Yup.bool().required(
    "Please select  Sink with tiles Available in Pantry Area "
  ),
  washroomAvailablity: Yup.bool().required(
    "Please select  Washroom Availablity "
  ),
  //washroomType :Yup.string().required("Please select  Washroom Type "),
  washroomAvailableCount: Yup.number()
    .min(0, "Minimun number is 0")
    .integer("Only integer value can be entered"),

  maleWashroomCount: Yup.number()
    .min(0, "Value can't be 0")
    .test(
      "max",
      "Male Washroom count should not exceed Washroom available count",
      function (value) {
        const { washroomAvailableCount, maleWashroomCount } = this.parent;
        if (washroomAvailableCount === undefined || value === undefined)
          return true;
        return (
          washroomAvailableCount !== undefined &&
          value <= washroomAvailableCount
        );
      }
    )
    .test(
      "max",
      "Sum of Male Washroom and Female Washroom count should not exceed Washroom available count",
      function (value) {
        const { washroomAvailableCount, femaleWashroomCount } = this.parent;
        if (
          washroomAvailableCount === undefined ||
          value === undefined ||
          femaleWashroomCount === undefined
        )
          return true;
        return value <= washroomAvailableCount - femaleWashroomCount;
      }
    )
    .integer("Only integer value can be entered"),
  femaleWashroomCount: Yup.number()
    .min(0, "Value can't be 0")
    .test(
      "max",
      "Female Washroom count should not exceed Washroom available count",
      function (value) {
        const { washroomAvailableCount } = this.parent;
        if (washroomAvailableCount === undefined || value === undefined)
          return true;
        return (
          washroomAvailableCount !== undefined &&
          value <= washroomAvailableCount
        );
      }
    )
    .test(
      "max",
      "Sum of Male Washroom and Female Washroom count should not exceed Washroom available count",
      function (value) {
        const { washroomAvailableCount, maleWashroomCount } = this.parent;
        if (
          washroomAvailableCount === undefined ||
          value === undefined ||
          maleWashroomCount === undefined
        )
          return true;
        return value <= washroomAvailableCount - maleWashroomCount;
      }
    )
    .integer("Only integer value can be entered"),
  //urinalsAvailableInMaleWashroom : Yup.string().required("Please enter Urinals Available in Male Washroom"),
  //urinalsCountInMaleWashroom: Yup.number().min(1, "Minimun number is 1").integer("Only integer value can be entered"),
  toiletSeatTypeInMaleWashroom: Yup.string(),
  //toiletSeatCountInMaleWashroom: Yup.number().min(1, "Minimun number is 1").integer("Only integer value can be entered"),
  //toiletSeatCountInFemaleWashroom: Yup.number().min(1, "Minimun number is 1").integer("Only integer value can be entered"),
  washBasinAvailableInsideWashrooms: Yup.bool().required(
    "Please enter Washroom Available Count"
  ),
  keyAvailableInWashrooms: Yup.bool().required(
    "Please enter Washroom Available Count"
  ),
});

export const addPhaseInitialValues = {
  phaseName: "",
  numberOfBranch: "",
  country: 1,
  vertical: "",
  businessSPOCName: "",
  projectDeliveryManager: "",
  projectManager: "",
};

export const addPhaseSchema = Yup.object({
  phaseName: Yup.string().required("Please enter Phase Name"),
  numberOfBranch: Yup.number()
    .min(1, "Minimun Number of Mandates is 1")
    .integer("Only integer value can be entered")
    .required("Please enter Number of Mandates"),
  country: Yup.string().required("Please select Country"),
  vertical: Yup.string().required("Please select Vertical"),
  businessSPOCName: Yup.string().required("Please enter Business SPOC Name"),
  projectDeliveryManager: Yup.string().required(
    "Please select Project Delivery Manager"
  ),
});
export const updateMandateInitialValues = {
  phaseId: "",
  mandateId: "",
  glCategory: "",
  branchType: "",
  pinCode: "",
  state: "",
  region: "",
  district: "",
  city: "",
  locationName: "",
  tierName: "",
  remarks: "",
  projectManagerRemarks: "",
  branchCode: "",
  sourcingAssociate: "",
  createdDate: "",
  projectDeliveryManager: "",
  projectManager: "",
};

export const updateMandateSchema = Yup.object({
  phaseId: Yup.object().required("Please select Phase Code"),
  // mandateId:Yup.string().required("Please enter mandate id"),
  glCategory: Yup.string().required("Please select GL Category"),
  branchType: Yup.string().required("Please select Branch Type"),
  pinCode: Yup.string()
    .min(1, "Pin Code must be positive number")
    .max(999999, "Pin Code should not be more than 6 digit")
    .test("regex", "Pin Code must be 6 digit", (val) => {
      let regExp = new RegExp("\\d{6}");
      if (val === undefined) return true;
      return regExp.test(val);
    })
    .test("regex", "Pin Code should not start with 0", (val) => {
      let regExp = new RegExp("^[1-9]{1}[0-9]{2}s{0,1}[0-9]{3}$");
      if (val === undefined) return true;
      return regExp.test(val);
    })
    .required("Please enter Pin Code"),
  // state:Yup.string().required("Please select state"),
  // region:Yup.string().required("Please select region"),
  // district:Yup.string().required("Please select district"),
  // city:Yup.string().required("Please select city"),
  // locationName:Yup.string().required("Please select location name"),
  // tierName:Yup.string().required("Please select tier name"),
  // remarks:Yup.string().required("Please select remarks"),

  //projectManager: Yup.string().required("Please select Project Manager"),
  // projectManagerRemarks : Yup.string().required("Please enter Project Manager remarks"),
  // branchCode : Yup.string().required("Please enter branch code")
});

export const locationNoteApprovalNoteInitialValues = {
  phaseId: "",
  mandateName: "",
  approval_note_no: "",
  sub_department: "",
  location: "",
  subject: "",
  branchname: "",
  purpose: "",
  activity_time_line: "",
  approved_amount: "",
  total_budget_amount: "",
  cosumed_budget_amount: "",
  balance_budget_amount: "",
  activity_summary: "",
  cost_justification: "",
  cpu_remarks: "",
  non_budget_amount_switch: false,
  non_budget_amount: "",
  notedate: new Date(),
};

export const locationNoteApprovalNoteSchema = Yup.object({
  sub_department: Yup.string().required("Please select Sub Department"),
  location: Yup.string().required("Please enter Location"),
  subject: Yup.string().required("Please enter Subject"),
  branchname: Yup.string().required("Please enter Branch Name & Address"),
  purpose: Yup.string().required("Please enter Purpose"),
  activity_time_line: Yup.string().required("Please enter Activity Time Line"),
  total_budget_amount: Yup.string().required(
    "Please enter Total Approved Amount"
  ),
  cosumed_budget_amount: Yup.string().required(
    "Please enter Estimated Expense"
  ),
  balance_budget_amount: Yup.string().required(
    "Please enter Consumed Estimated Expense"
  ),
  non_budget_amount: Yup.number()
    .typeError("Non budget must be a number")
    .min(0, "Non budget must be positive number"),
  // .required("Please enter Non Budget"),
  // non_budget_amount: Yup.string().matches(/^[0-9]+$/, "ppppp"),
  activity_summary: Yup.string().required("Please enter Activity Summary"),
  cost_justification: Yup.string().required("Please enter Cost Justification"),
  cpu_remarks: Yup.string().required("Please enter Remarks"),
  notedate: Yup.date().required("Date is required"),
});

export const updatePhaseApprovalNoteInitialValues = {
  phaseId: "",
  mandateName: "",
  approval_note_no: "",
  sub_department: "",
  location: "",
  subject: "",
  branchname: "",
  purpose: "",
  activity_time_line: "",
  approved_amount: "",
  total_budget_amount: "",
  cosumed_budget_amount: "",
  balance_budget_amount: "",
  activity_summary: "",
  cost_justification: "",
  cpu_remarks: "",
  non_budget_amount_switch: "false",
  nonBudgetAmount: "",

  notedate: new Date(),
};

export const activatedVendorInitialValues = {
  remarks: "",
};


export const updatePhaseApprovalNoteSchema = Yup.object({
  sub_department: Yup.string().required("Please select Sub Department"),
  location: Yup.string().required("Please enter Location"),
  subject: Yup.string().required("Please enter Subject"),
  branchname: Yup.string().required("Please enter Branch Name"),
  purpose: Yup.string().required("Please enter Purpose"),
  activity_time_line: Yup.string().required("Please enter Activity Time Line"),
  total_budget_amount: Yup.string().required("Please enter Total Budget"),
  cosumed_budget_amount: Yup.string().required("Please enter Consumed Budget"),
  balance_budget_amount: Yup.string().required("Please enter Balance Budget"),
  nonBudgetAmount: Yup.string().when("non_budget_amount_switch", {
    is: "true",
    then: Yup.string().required("Please enter Non Budget Amount"),
  }),
  activity_summary: Yup.string().required("Please enter Activity Summary"),
  cost_justification: Yup.string().required("Please enter Cost Justification"),
  cpu_remarks: Yup.string().required("Please enter Remarks"),
  notedate: Yup.date().required("Date is required"),
});

export const preConstructionInitialValues = {
  id: 0,
  uid: 0,
  vendorName: "",
  amount: "",
  utrNumber: "",
  dateOfPayment: new Date(),
  status: "",
  remark: "",
  createdBy: "",
  createdDate: "",
  modifiedBy: "",
  modifiedDate: "",
};

export const preConstructionSchema = Yup.object({
  vendorName: Yup.string().required("Please enter Vendor Name"),
  amount: Yup.number().required("Please enter amount"),
  utrNumber: Yup.string().required("Please enter UTR number"),
  status: Yup.string().required("Please enter status"),
  dateOfPayment: Yup.date().required("Payment Date is required"),
});
export const feasibilityCheckInitialValues = {
  nameOfServiceProvider: "",
  dateOfVisit: new Date(),
  linkFeasibilityCheckStatus: "Pending",
  linkFeasibilityCheckRemarks: "",
  additionalAttechements: "",
};

export const feasibilityCheckSchema = Yup.object({
  nameOfServiceProvider: Yup.string().required(
    "Please enter Name of Service Provider"
  ),
  // dateOfVisit: Yup.date().required("Please enter the date of visit"),
  linkFeasibilityCheckStatus: Yup.string().required(
    "Please select Link Feasibility Check Status"
  ),
  linkFeasibilityCheckRemarks: Yup.string().required(
    "Please enter Link Feasibility Check Remarks"
  ),
  // additionalAttechements: Yup.string().required("Please add additional attechments"),
});
export const electricityDetailsInitialValues = {
  electricityConnection: true,
  connectionLoad: "",
  accountNumber: "",
  vendorCode: "",
  // locationName: "",
  meterNumber: "",
  connectionStartMeterReading: "",
  connectionDate: new Date(),
  // docType : "",
  remark: "",
};

// export const CreateRequestInitialValues = {
//   // electricityConnection: true,
//   inspector_name: "",
//   inspector_email: "",
//   inspector_contact: "",
//   noticeSubType: "",
//   intimationType: "",
//   city: "",
//   state: "",
//   branch_code: "",
//   reported_location: "",
//   acts: "",
//   inspection_date: "",
//   closure_date: "",
//   stage: "",
//   traslation_required: "",
//   remarks: "",
//   noticeCategory:"",
//   noticeType: "",
//   // accountNumber: "",
//   // vendorCode: "",
//   // locationName: "",
//   // meterNumber: "",
//   payroll_team:false,
//   exit_team:false,
//   legal_team:false,
//   // connectionStartMeterReading: "",
//   // connectionDate: new Date(),
//   // docType : "",
//   remark: "",
// };
export const CreateRequestInitialValues = {
  noticeType: "",
  // electricityConnection: true,
  inspector_email: "",
  inspector_contact: "",
  inspector_name: "",
  noticeSubType: "",
  intimationType: "",
  city: "",
  state: "",
  branch_code: "",
  reported_location: "",
  noticeCategory: "",
  acts: "",
  inspection_date: "",
  closure_date: "",
  status: "",
  traslation_required: "",
  remarks: "",
  remark: "",
  payroll_team: false,
  exit_team: false,
  request_no:"",
  // legal_team:false,
};

export const electricityDetailsSchema = Yup.object({
  electricityConnection: Yup.bool().required(
    "Please select Electricity Connection"
  ),
  connectionLoad: Yup.string().required("Please enter Connection Load"),
  accountNumber: Yup.string().when("electricityConnection", {
    is: true,
    then: Yup.string().required("Please enter Account Number"),
  }),
  vendorCode: Yup.string().when("electricityConnection", {
    is: false,
    then: Yup.string().required("Please enter Vendor Code"),
  }), // accountNumber: Yup.string().required("Please enter Account Number"),
  // vendorCode: Yup.string().required("Please enter Vendor Code"),
  // locationName: Yup.string().required("Please enter Location Name"),
  meterNumber: Yup.string().required("Please enter Meter Number"),
  connectionStartMeterReading: Yup.string().required(
    "Please enter Connection Start Meter Reading"
  ),
  connectionDate: Yup.date().required("Please enter Connection Date"),
  // docType : Yup.string().required("Please enter Document Type"),
  remark: Yup.string().required("Please enter Remark"),
});

export const createRequestSchema = Yup.object({
  // inspector_name: Yup.string().required("Please select Inspector Name"),
  noticeType: Yup.string().required("Please enter Notice Type"),
  noticeSubType: Yup.string().required("Please select Notice Sub Type"),
  intimationType: Yup.string().required("Please select Intimation Type"),
  city: Yup.string().required("Please select city"),
  state: Yup.string().required("Please select state"),
  branch_code: Yup.string().required("Please select branch_code"),
  reported_location: Yup.string().required("Please select Reported Location"),
  noticeCategory: Yup.string().required("Please select Notice Category"),
  acts: Yup.string().required("Please enter acts"),
  inspection_date: Yup.string().required("Please enter Inspection Date"),
  closure_date: Yup.string().required("Please enter closure Date"),
  status: Yup.string().required("Please select status"),
  //traslation_required: Yup.string().required("Please select Traslation Required"),
  remarks: Yup.string().required("Please enter Remarks"),
  // remark: Yup.string().required("Please enter Remark"),
});

export const deliveryDetailsInitialValues = {
  linkDeliveryStatus: "",
  linkDeliveryDate: new Date(),
  linkDeliveryRemarks: "",
  additionalAttechements: "",
};

export const deliveryDetailsSchema = Yup.object({
  linkDeliveryStatus: Yup.string().required(
    "Please select Link Delivery Status"
  ),
  linkDeliveryDate: Yup.date().required("Please enter Link Delivery Date"),
  linkDeliveryRemarks: Yup.string().required(
    "Please enter Link Delivery Remarks"
  ),
  // additionalAttechements: Yup.string().required("Please add additional attechments"),
});
export const assignQulityAuditerInitialValues = {
  poValue: "",
  company: "",
  auditorName: null,
};

export const assignQulityAuditerSchema = Yup.object({
  poValue: Yup.string().required("Please enter PO Value"),
  company: Yup.string().required("Please enter External Auditor Company"),
  auditorName: Yup.object().required("Please select Auditor Name"),
});
function ref(arg0: string) {
  throw new Error("Function not implemented.");
}

export const addUserInitialValues = {
  userName: "",
  password: "",
  fullName: "",
  mobileNo: "",
  emailId: "",
  active: true,
  vertical : "",
  role : "",
  designation : "",
};

export const addUserSchema = Yup.object({
  userName: Yup.string().required("Please enter User Name"),
  password: Yup.string()
    .min(6, "Minimun length is 6")
    .required("Please enter Password"),
  fullName: Yup.string().required("Please enter Full Name"),
  mobileNo: Yup.string().matches(
    /^[6-9]+/,
    'Number should be start with 6,7,8 or 9'
  ).min(10, "Requried length is 10").max(10, "Requried length is 10").required("Please enter Mobile Number"),
  emailId: Yup.string().email("Invalid email format").required("Please enter Email Id"),
  // vertical: Yup.string().required("Please select vertical"),
  role: Yup.string().required("Please select Role"),
  designation: Yup.string().required("Please select Designation"),
  
});

export const resetPasswordInitialValues = {
  userName: "",
  newPassword: "",
  confirmPassword: ""
};

export const ActivateVendorInitialValues = {
  remarks: ""
};

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Minimun length is 8")
    .required("Please enter New Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
   
    confirmPassword: Yup.string()
    .min(8, "Minimun length is 8")
    .required("Please enter Confirm Password")
    .test(
      "equal",
      "New Password and Confirm Password does not match",
      function (value) {
        const { newPassword } = this.parent;
        return value == newPassword;
      }
    ),
});

export const executeQueryInitialValues = {
  query: "",
};

export const executeQuerySchema = Yup.object({
  query: Yup.string()
    .required("Please enter Query")
});