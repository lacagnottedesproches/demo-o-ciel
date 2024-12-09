import { LCDP, StatsPot, useLCDP } from "@lacagnottedesproches/lcdp-js";
import { useMemo, useState } from "react";

import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { formatCurrency } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

type TablePotsProps = {
  tsStart?: number;
  tsEnd?: number;
};

const fetchData = async (
  lcdp: LCDP,
  opts: {
    tsStart: number;
    tsEnd: number;
    pageIndex: number;
    pageSize: number;
  },
) => {
  const defaultValue = {
    rows: [],
    pageCount: 0,
    rowCount: 0,
  };
  try {
    const result = await lcdp.getStatsPots(
      opts.tsStart,
      opts.tsEnd,
      opts.pageIndex + 1,
      opts.pageSize,
    );
    return {
      rows: result.items,
      pageCount: result.pages,
      rowCount: result.total,
    };
  } catch (error) {
    console.error(error);
  }
  return defaultValue;
};

const queryClient = new QueryClient();

const StatsPots = (props: TablePotsProps & { lcdp: LCDP }) => {
  const {
    lcdp,
    tsStart = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    ).getTime(),
    tsEnd = new Date().getTime(),
  } = props;

  const columns = useMemo<ColumnDef<StatsPot>[]>(
    () => [
      {
        header: "Date",
        footer: (props) => props.column.id,
        accessorKey: "date_created_ts",
        cell: (info) => {
          return new Date(info.getValue() as number).toLocaleDateString();
        },
      },
      {
        header: "En ligne",
        footer: (props) => props.column.id,
        accessorKey: "status_online",
        cell: (info) => {
          const status = info.getValue();
          return status ? (
            <div className="inline-block rounded-full bg-green-500 text-green-000 w-3 h-3 text-center text-xs"></div>
          ) : (
            <div className="inline-block rounded-full bg-red-500 text-green-000 w-3 h-3 text-center text-xs"></div>
          );
        },
      },
      {
        header: "Cagnotte",
        footer: (props) => props.column.id,
        accessorKey: "name",
        cell: (info) => {
          const potId = info.row.original.id;
          return (
            <div>
              <a
                className="cursor-pointer underline hover:text-yellow-500"
                href={`/cagnotte/${potId}`}
              >
                {`${info.getValue()}`}
              </a>
            </div>
          );
        },
      },
      {
        header: "Cagnotteur",
        footer: (props) => props.column.id,
        cell: (info) => {
          return `${info.row.original.owner_first_name} ${info.row.original.owner_last_name}`;
        },
      },
      {
        header: "Montant collecté",
        footer: (props) => props.column.id,
        accessorKey: "amount_donations",
        cell: (info) => {
          const amount = info.getValue() as number;
          return formatCurrency(amount / 100);
        },
      },
      {
        header: "Nb de dons",
        footer: (props) => props.column.id,
        accessorKey: "nb_donations",
        cell: (info) => {
          return info.getValue();
        },
      },
      {
        header: "Dons moyen",
        footer: (props) => props.column.id,
        accessorKey: "amount_moy_donations",
        cell: (info) => {
          const amount = info.getValue() as number;
          return formatCurrency(amount / 100);
        },
      },
      {
        header: "Nb pourboires",
        footer: (props) => props.column.id,
        accessorKey: "nb_tips",
        cell: (info) => {
          let value = info.getValue();
          try {
            value = Number(value);
            if (!isNaN(value as number)) {
              return value;
            }
          } catch (error) {
            console.warn(error);
          }
          return "---";
        },
      },
      {
        header: "Tags",
        footer: (props) => props.column.id,
        accessorKey: "tags",
        cell: (info) => {
          return info.getValue() || "---";
        },
      },
    ],
    [],
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuery = useQuery({
    queryKey: ["data", pagination, tsStart, tsEnd],
    queryFn: () => fetchData(lcdp, { ...pagination, tsStart, tsEnd }),
    placeholderData: keepPreviousData,
  });

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    rowCount: dataQuery.data?.rowCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    columns,
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className="w-full text-center table-auto border border-spacing-0">
        <thead className="border">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="border">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="h-2" />

      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} sur{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          {"| Aller à la page :"}
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Montrer {pageSize}
            </option>
          ))}
        </select>
        {dataQuery.isFetching ? "Chargement..." : null}
      </div>
      <div>
        {`${table.getRowModel().rows.length.toLocaleString()} / ${dataQuery.data?.rowCount.toLocaleString()}`}
      </div>
    </div>
  );
};

const TableStatsPots = (props: TablePotsProps) => {
  const { lcdp, status } = useLCDP();
  return (
    <QueryClientProvider client={queryClient}>
      {status === "success" ? <StatsPots lcdp={lcdp!} {...props} /> : null}
    </QueryClientProvider>
  );
};

export default TableStatsPots;
