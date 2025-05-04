import { ScreenStatus } from "@/models/enums";
import LoaderComponent from "./Loader";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import ButtonSmall from "./ButtonSmall";


/* eslint-disable @typescript-eslint/no-explicit-any */
type AccessorFn = (row: any) => React.ReactNode;

interface RowAction {
  icon: IconType;
  label: string;
  onClick: (row: any) => void;
  color?: string
}
interface Column {
  Header: string;  // Título de la columna
  accessor: string | AccessorFn;
}

interface TableComponentProps {
  columns: Column[];
  data: any[];
  status?: ScreenStatus,
  messageError?: string
  actions?: RowAction[];
  onSearch?: (value: string) => void;
  headerRightComponent?: ReactNode;
  onReintent?: () => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, data, status = ScreenStatus.loading, messageError = 'sadas d dsfsd', actions, headerRightComponent, onReintent }) => {
  return (
    <div className="relative overflow-x-auto w-full py-1">
      {/* HEADER TABLE */}
      <div className="flex flex-row flex-wrap justify-between ">
        {/* Componente del lado derecho */}
        {headerRightComponent && (
          <div className="w-full flex justify-end">
            {headerRightComponent}
          </div>
        )}
      </div>
      {/* TABLE */}
      <section className="bg-backgroundSecondary rounded-lg mt-5">
        <div className="max-h-[500px] overflow-y-auto ">
          <table className="w-full text-sm text-left rtl:text-right text-colorText mt-3 mb-5 ">
            <thead className="sticky top-0 z-0 text-sm text-colorText uppercase bg-backgroundSecondary rounded-lg border-b border-onBackground">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    {/* Aquí podrías agregar un checkbox global si lo necesitas */}
                  </div>
                </th>
                {columns.map((column) => (
                  <th key={column.accessor.toString()} scope="col" className="px-6 py-3">
                    {column.Header}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            {status === ScreenStatus.success &&
              <tbody >
                {data.map((row, index) => (
                  <tr key={index} className="bg-backgroundSecondary border-b mb-5   border-onBackground hover:bg-hintColor ">
                    <td className="w-4 p-2 rounded-md">
                      <div className="flex items-center">
                        {/* Aquí podrías agregar un checkbox para cada fila */}
                      </div>
                    </td>
                    {columns.map((column) => (
                      <td key={typeof column.accessor === 'string' ? column.accessor : column.Header} className="px-6 py-4">
                        {typeof column.accessor === 'function'
                          ? column.accessor(row)
                          : row[column.accessor]}
                      </td>
                    ))}
                    <td className="px-6 p-2 rounded-md">
                      <div className="flex items-center space-x-4 text-lg">
                        {actions?.map((action, idx) => {
                          const Icon = action.icon;
                          return (
                            <button
                              key={idx}
                              onClick={() => action.onClick(row)}

                              className={`cursor-pointer hover:opacity-75 ${action.color ?? "text-primary"}`}
                              title={action.label}
                            >
                              <Icon />
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            }

          </table>
        </div>
        {status === ScreenStatus.loading && (
          <div className="w-full py-10 flex justify-center items-center">
            <LoaderComponent />
          </div>
        )}
        {status === ScreenStatus.error && (
          <div className="w-full py-10 flex  flex-col justify-center items-center">
            <span className="text-colorText text-sm text-center mt-5">{messageError}</span>
            <ButtonSmall type="button" onClick={onReintent} children="Reintentar" />
          </div>
        )}
      </section>
    </div>
  );
};


export default TableComponent;