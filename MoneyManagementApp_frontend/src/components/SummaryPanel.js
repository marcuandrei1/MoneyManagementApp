// Aceasta componenta o sa contina 2 carduri, nu stiu cum sa o fac mai generala si mai refolosibila de atat
import "../styles/summaryPanelStyle.css";

function SummaryPanel({
  leftCardTitle,
  leftCardText,
  rightCardTitle,
  rightCardText,
}) {
  return (
    <div className="summary-panel">
      <div className="left-card">
        <p className="left-card-title">{leftCardTitle}</p>
        <p className="left-card-text">{leftCardText}</p>
      </div>
      <div className="right-card">
        <p className="right-card-title">{rightCardTitle}</p>
        <p className="right-card-text">{rightCardText}</p>
      </div>
    </div>
  );
}

export default SummaryPanel;
