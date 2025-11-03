import "../styles/contentwindowStyle.css";
import SummaryPanel from "./SummaryPanel";

function ContentWindow() {
  return (
    <div className="content-window">
      <SummaryPanel
        leftCardTitle="Net Worth"
        leftCardText="$2,120"
        rightCardTitle="Monthly Cash Flow"
        rightCardText="+$120"
      />
    </div>
  );
}

export default ContentWindow;
