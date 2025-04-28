import Settings from "./Setting";
import Common from "./Common";
import MenuActionReducer from "./MenuReducer";
import AppLoader from "./AppLoaderReducer";
import userReducer from "./loginReducer";
import { combineReducers } from "redux";
import RoleMaster from "./RoleMasterReducer";
import GroupMaster from "./UserMasterReducer";
import RolePermission from "./rolePermissionReducer";
import SiteHome from "./SiteHome";
import EmployeeDetails from "./LogbookReducer/EmpDetailReducer";
import GridBreakdown from "./LogbookReducer/GridReducer";
import HotoDetails from "./LogbookReducer/HotoReducer";
import MaterialDropdownMaster from "./Scm/Dropdown";
import ScadaDetails from "./LogbookReducer/ScadaReducer";
import ScheduleActivity from "./LogbookReducer/ScheduleReducer";
import wtgBreakdown from "./LogbookReducer/WTGReducer";
import DropdownMaster from "./LogbookReducer/DropdownReducer";
import DownloadView from "./LogbookReducer/DownloadViewReducer";
import RemarkReducer from "./LogbookReducer/RemarkReducer";
import WhyAnalysis from "./WhyAnalysis";
import UserSiteMapping from "./UserSiteMapping";
import SubmitReducer from "./LogbookReducer/SubmitReducer";
import TaskManagementReducer from "./TaskManagementReducer";
import PODReducer from "./PODReducer";
import masterUploadReducer from "./MasterUpload";
import WTGScreen from "./WtgReducer";
import dataSanityConfigReducer from "./DataSanityConfigReducer";
import axisMappingReducer from "./XYAxisColumnsMappingReducer";
import DownloadH2Reducer from "./Scm/H2Template";
import synergyDashReducer from "./SynergyDashReducer";
import ConsumptionVsReturn from "./Scm/ConsumptionVsReturn";

import IBLevelReducer from "./IBLevelReducer";
import ConsumptionReducer from "./Scm/consumption";
import TopfiftyReducer from "./Scm/TopFifty";
import BatteryThreshold from "./Scm/BatteryThreshold";
import PMCriticalMaterial from "./Scm/PMCriticalMaterial";
import SlowMAndNMoving from "./Scm/SlowMAndNMoving";
import CriticalMaterial from "./Scm/CriticalMaterial";
import UnpredictableFailureReport from './Scm/UnpredictableFailureReport';
import WeeklyLUB from "./Scm/WeeklyLUB";

export default combineReducers({
  settings: Settings,
  common: Common,
  appLoader: AppLoader,
  menu: MenuActionReducer,
  user: userReducer,
  roleMaster: RoleMaster,
  groupMaster: GroupMaster,
  rolePermission: RolePermission,
  siteHomeKpi: SiteHome,
  employeeDetails: EmployeeDetails,
  gridBreakdown: GridBreakdown,
  hotoDetails: HotoDetails,
  scadaDetails: ScadaDetails,
  scheduleActivity: ScheduleActivity,
  wtgBreakdown: wtgBreakdown,
  dropdownMaster: DropdownMaster,
  DownloadView: DownloadView,
  remark: RemarkReducer,
  whyAnalysis: WhyAnalysis,
  UserSiteMapping: UserSiteMapping,
  submitLogbook: SubmitReducer,
  taskManager: TaskManagementReducer,
  POD: PODReducer,
  masterUpload: masterUploadReducer,
  wtgScreen: WTGScreen,
  dataSanity: dataSanityConfigReducer,
  axisMapping: axisMappingReducer,
  H2ScmReducer: DownloadH2Reducer,
  synergyDashboard: synergyDashReducer,
  MaterialDropdownMaster: MaterialDropdownMaster,
  ConsumptionVsReturn: ConsumptionVsReturn,
  ConsumptionReducer,
  TopfiftyReducer,
  BatteryThreshold: BatteryThreshold,
  IBLevel: IBLevelReducer,
  PMCriticalMaterial: PMCriticalMaterial,
  SlowMAndNMoving: SlowMAndNMoving,
  CriticalMaterial: CriticalMaterial,
  UnpredictableFailureReport: UnpredictableFailureReport,
  WeeklyLUB:WeeklyLUB,
});