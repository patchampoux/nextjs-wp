export const Column = ({ width, textColor, backgroundColor, children }) => {
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <div
      className={`${width ? `min-w-[${width}]` : "basis-0"} flex-grow px-2 py-5`}
      style={{ ...textColorStyle, ...backgroundColorStyle }}
    >
      {children}
    </div>
  );
};