export const Columns = ({ isStackedOnMobile, textColor, backgroundColor, children }) => {
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <div
      className="my-10"
      style={{ ...textColorStyle, ...backgroundColorStyle }}
    >
      <div className={`max-w-5xl mx-auto ${isStackedOnMobile ? "block md:flex" : "flex"}`}>{children}</div>
    </div>
  );
};