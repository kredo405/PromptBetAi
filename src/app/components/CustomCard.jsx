export const CustomCard = ({ children, title, className }) => {
  return (
    <div className={`bg-slate-800 bg-opacity-70 backdrop-blur-lg border border-cyan-400/30 shadow-xl rounded-lg ${className}`}>
      {title && (
        <div className="p-4 border-b border-cyan-400/30">
          <h3 className="text-cyan-200 font-bold text-lg tracking-wider">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};