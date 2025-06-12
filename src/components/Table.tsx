interface TableProps { 
  data: any[];
  columns: { label: string; field: string }[];
  onRowClick: (rowData: any) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Table({ data, columns, onRowClick, currentPage, totalPages, onPageChange }: TableProps) {
  return (
    <div className="overflow-x-auto mt-6 select-none">
      <table className="min-w-full table-auto border-collapse bg-white rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick(row)}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-3 text-sm text-gray-600 border-b">
                  {row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Anterior
          </button>
          <span className="text-sm font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}