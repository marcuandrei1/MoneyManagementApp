function ButtonComponent({ text, icon }) {
  return (
    <button className="side-bar-btn">
      <img src={icon} className="side-bar-button-image" />
      <span className="side-bar-button-text">{text}</span>
    </button>
  );
}

export default ButtonComponent;
