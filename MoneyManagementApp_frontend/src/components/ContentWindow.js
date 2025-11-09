// import "../styles/contentwindowStyle.css";
// import SummaryPanel from "./SummaryPanel";

// function ContentWindow() {
//   return (
//     <div className="content-window">
//       <SummaryPanel
//         leftCardTitle="Net Worth"
//         leftCardText="$2,120"
//         rightCardTitle="Monthly Cash Flow"
//         rightCardText="+$120"
//       />
//     </div>
//   );
// }

// export default ContentWindow;

// src/components/ContentWindow.js

import "../styles/contentwindowStyle.css";
// We don't need SummaryPanel here anymore, 
// unless you want it on *every* page.

// 1. Accept 'props' (or destructure it to '{ children }')
function ContentWindow(props) {
  return (
    <div className="content-window">
      {/* 2. Render the children that are passed in */}
      {props.children}
    </div>
  );
}

export default ContentWindow;
