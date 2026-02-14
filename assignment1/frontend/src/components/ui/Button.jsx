function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = ""
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition 
      bg-slate-900 text-white hover:bg-slate-800 
      disabled:opacity-50 disabled:cursor-not-allowed 
      ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;