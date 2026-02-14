export function Table({ children }) {
  return (
    <table className="w-full border-collapse">
      {children}
    </table>
  );
}

export function TableHead({ children }) {
  return (
    <thead className="bg-slate-100">
      {children}
    </thead>
  );
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return (
    <tr className="border-b hover:bg-slate-50">
      {children}
    </tr>
  );
}

export function TableCell({ children }) {
  return (
    <td className="p-3 text-sm">
      {children}
    </td>
  );
}
