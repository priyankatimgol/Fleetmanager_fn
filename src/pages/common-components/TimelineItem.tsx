import { MdOutgoingMail } from "react-icons/md";
import "./TimelineCss.css";
import AppTooltip from "@uikit/core/AppTooltip";
import { Tooltip } from "@mui/material";
import { BiLinkAlt } from "react-icons/bi";

const TimelineItem = ({ data,setSendMailId ,openConfirmDialog,setOpenConfirmDialog  , index}) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
    <div style={{display : "flex", justifyContent : "space-between", width : "100%" ,alignItems : "center"}}>
    <span style={{
        color: "#333",
        fontSize: "11.5px",
        fontWeight: 500,
        borderRadius: "5px",
        letterSpacing: "1px",
        padding: "5px",
        textTransform: "uppercase",
        marginBottom: "5px",
        backgroundColor: "#efefef",
        order : index%2 == 0 ? 0 : 1
    }}
      
        className= {data?.status?.toLowerCase()?.includes("created")
        ? "normal"
        : data?.status?.toLowerCase()?.includes("approved")
        ? "approve"
        : data?.status?.toLowerCase()?.includes("rejected")
        ? "reject"
        : "tag"}
      >
        {data?.status}
      </span> 
      <div>
        <AppTooltip title="send mail">
        <MdOutgoingMail size={16} style={{cursor :"pointer"}} onClick={() => {setOpenConfirmDialog(!openConfirmDialog); setSendMailId(data?.id)}} />
        </AppTooltip>
        <BiLinkAlt size={16} style={{cursor :"pointer", marginLeft : "10px"}}/>
        </div>
    </div>
      <h4>{data?.roleName + "(" + data?.userName + ")"}<time>{data?.createdon && data?.createdon?.replace("T", "  ").slice(0, 17)}</time></h4>

      {/* <time>{data?.createdon && data?.createdon?.replace("T", "  ").slice(0, 17)}</time> */}
      {/* <span
        className="tag"
        style={{ background: "#f04f4725", color: "#f04f47" }}
      >
        {data?.status}
      </span> */}
      <p>{data?.remarks}</p>
    

      {/* <a
        href="https://ant-cra.cremawork.com/third-party/time-line"
        target="_blank"
        rel="noopener noreferrer"
      >
        "Read more"
      </a> */}

      <span className="circle" />
    </div>
  </div>
);
export default TimelineItem;
