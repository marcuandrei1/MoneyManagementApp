import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ContentWindow from "./ContentWindow";

function Window() {
  return (
    <div className="window">
      <Sidebar />
      <Topbar />
      <ContentWindow />
    </div>
  );
}

export default Window;
