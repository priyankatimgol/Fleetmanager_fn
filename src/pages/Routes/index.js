import Home from "pages/Home";
import IBLevel from "pages/IBLevel";
import Map from "pages/IndiaMap";
import Kpis from "pages/KPI's";
import LogbookMaster from "pages/Logbook";
import DownloadLogbook from "pages/Logbook/DownloadLogbook";
import SCM from "pages/Scm";
import GroupMaster from "pages/Roles&Permission/GroupMaster";
import RoleMaster from "pages/Roles&Permission/RoleMaster";
import UserMaster from "pages/Roles&Permission/UserMaster";
import PurchaseRequisition from "pages/PurchaseTemplates/RequisitionTemplate";
import UserSiteMapping from "pages/Roles&Permission/UserSiteMapping";
import WTG from "pages/WTG";
import { WhyAnalysis } from "pages/WhyAnalysis";
import Signin from "pages/auth/Signin";
import Error404 from "pages/errorPages/Error404";
import TaskManagement from "pages/TaskManagement";
import POD from "pages/POD";
import MasterBulkUpload from "pages/MasterBulkUpload";
import BigCalender from "../BigCalender";
import DataSanityConfig from "pages/DataSanityConfig/DataSanityConfig";
import AxisMapping from "pages/AxisMapping/AxisMapping";
import H2Import from "../common-components/H2Import";
import PurchaseOrder from "pages/PurchaseTemplates/OrderTemplate";
import ConsumptionTemplate from "pages/Templates/ConsumptionTemplate";
import InventoryTemplate from "pages/Templates/InventoryTemplate";
import SynergyDashboard from "pages/SynergyDashboard";
import EditWhys from "pages/WhyAnalysis/EditWhys";
import BattreyConsumption from "pages/Templates/BattreyConsumption";
import BatteryThreshold from "pages/Templates/BatteryThreshold";
import TopFifty from "pages/Templates/TopFifty";
import WeeklyLUB from "pages/Templates/WeeklyLUB";
import PM_CriticalMaterial from "pages/Templates/PM_CriticalMaterial";
import CriticalMaterial from "pages/Templates/CriticalMaterial";
import SlowAndNonMoving from "pages/Templates/SlowAndNonMoving";
import Demo from "pages/Templates/Demo";
import TestTemplate from "../Templates/TestTemplate";
import UnpredictableFailureReport from "pages/Templates/UnpredictableFailureReport";
import NoCommReport from "pages/NoCommReport/NoCommReport";

export const routeConfigs = [
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/task-management",
    element: <TaskManagement />,
  },
  {
    path: "/bulk-upload",
    element: <MasterBulkUpload />,
  },
  {
    path: "/task-calender",
    element: <BigCalender />,
  },
  {
    path: "/wtg",
    element: <WTG />,
  },
  {
    path: "/kpis",
    element: <Kpis />,
  },
  {
    path: "/map",
    element: <IBLevel />,
  },
  {
    path: "/role-master",
    element: <RoleMaster />,
  },
  {
    path: "/role-permission",
    element: <GroupMaster />,
  },
  {
    path: "/user-master",
    element: <UserMaster />,
  },
  {
    path: "/site-mapping",
    element: <UserSiteMapping />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
  {
    path: "/logbook",
    element: <LogbookMaster />,
  },
  {
    path: "/download",
    element: <DownloadLogbook />,
  },
  {
    path: "/whyAnalysis",
    element: <WhyAnalysis />,
  },
  {
    path: "/data-sanity-config",
    element: <DataSanityConfig />,
  },
  {
    path: "/xy-axis-mapping",
    element: <AxisMapping />,
  },
  {
    path: "/pod",
    element: <POD />,
  },
  {
    path: "/edit-whys",
    element: <EditWhys />,
  },
  {
    path: "/synergy-dashboard",
    element: <SynergyDashboard />,
  },
  {
    path: "/scm/templates/h2-import",
    element: <H2Import />,
  },

  {
    path: "/scm",
    element: <SCM />,
  },
  {
    path: "/scm/templates/purchase-requisition",
    element: <PurchaseRequisition />,
  },
  {
    path: "/scm/templates/purchase-orders",
    element: <PurchaseOrder />,
  },
  {
    path: "/scm/templates/consumption-templates",
    element: <ConsumptionTemplate />,
  },
  {
    path: "/scm/templates/inventory-templates",
    element: <InventoryTemplate />,
  },
  {
    path: "/scm/templates/battery-consumption-vs-return",
    element: <BattreyConsumption />,
  },
  {
    path: "/scm/templates/battery-threshold",
    element: <BatteryThreshold />,
  },
  {
    path: "/scm/templates/top-50-critical-material",
    element: <TopFifty />,
  },
  {
    path: "/scm/templates/441-critical-material",
    element: <CriticalMaterial />,
  },
  {
    path: "/scm/templates/weekly-lub-reports",
    element: <WeeklyLUB />,
  },
  {
    path: "/scm/templates/pm-critical-material-weekly",
    element: <PM_CriticalMaterial />,
  },
  {
    path: "/scm/templates/unpredictable-failure-reports",
    element: <UnpredictableFailureReport />,
  },
  {
    path: "/scm/templates/slow-moving-non-moving",
    element: <SlowAndNonMoving />,
  },
  {
    path: "/demo",
    element: <TestTemplate />,
  },
  {
    path: "/nocomm-report",
    element: <NoCommReport />
  },
  {
    path: "/nocomm-report",
    element: <NoCommReport />
  },
];
