function ButtonComponent({ text, icon, onClick}) {
  return (
    <button className="side-bar-btn" onClick={onClick}>
      <img src={icon} className="side-bar-button-image" />
      <span className="side-bar-button-text">{text}</span>
    </button>
  );
}

export default ButtonComponent;
