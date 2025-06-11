interface TableProps {
  data: any[];
  columns: { label: string; field: string }[]; // Las columnas se definen desde el componente principal
}

export default function Table({ data, columns }: TableProps) {
  return (
    <div className="overflow-x-auto mt-4 select-none">
      <table className="min-w-full table-auto border-collapse shadow-lg bg-white rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 text-left font-semibold text-gray-700 border-b">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-3 text-sm text-gray-600 border-b">{row[col.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
