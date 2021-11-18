const Icon = ({
  IconPrimary,
  IconSecundary,
  hover = false,
  width = 42,
  background = "#003789",
  color = "#fff",
}) => {
  const styleHover = {
    transform: "translate(-10px,0px) scale(1.6)",
  };
  const style = {
    transform: "translate(0px,0px)",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width,
        height: width,
        background,
        borderRadius: "50%",
        marginRight: 20,
      }}
    >
      <div className="icon" style={hover ? styleHover : style}>
        {hover ? (
          <IconSecundary color={color} size={width * 0.6} />
        ) : (
          <IconPrimary color={color} size={width * 0.6} />
        )}
      </div>
    </div>
  );
};
export default Icon;
