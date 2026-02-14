export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return (
    <div className="p-4 border-b font-semibold">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}
