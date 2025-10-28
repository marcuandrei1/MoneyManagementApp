import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ContentWindow from "./ContentWindow";
import "../styles/windowStyle.css";

function Window() {
  return (
    <div className="window">
      <Topbar />
      <Sidebar />
      <ContentWindow />
    </div>
  );
}

export default Window;
