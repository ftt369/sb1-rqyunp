import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

export function Table<T extends { id: string }>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <div className="min-w-full divide-y divide-gray-200">
      <div className="bg-gray-50">
        <div className="grid grid-cols-12 px-6 py-3">
          {columns.map((column, index) => (
            <div
              key={index}
              className={`text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                column.className || ''
              }`}
            >
              {column.header}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => onRowClick?.(item)}
            className={`grid grid-cols-12 px-6 py-4 ${
              onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
            }`}
          >
            {columns.map((column, index) => (
              <div key={index} className={column.className || ''}>
                {typeof column.accessor === 'function'
                  ? column.accessor(item)
                  : String(item[column.accessor])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}