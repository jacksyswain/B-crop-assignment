export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className = ""
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={`w-full px-3 py-2 border rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-slate-900 
      ${className}`}
    />
  );
}
