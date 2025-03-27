// app/components/AppointmentsTable.tsx
import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";

interface Appointment {
  id: number;
  country: string;
  city: string;
  countryTravellingTo: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  gender: string;
  maritalStatus: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportIssuePlace: string;
  visaType: string;
  email: string;
  phone: string;
  nationalId: string;
  positionAppliedFor: string;
  otherPosition: string;
  informationAccurate: boolean;
  paymentMethod: string;
  trxID: string;
  paymentScreenshot: string;
}

export function AppointmentsTable({ data }: { data: Appointment[] }) {
  const columns = useMemo<ColumnDef<Appointment>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Phone",
        accessorKey: "phone",
      },
      {
        header: "Country",
        accessorKey: "country",
      },
      {
        header: "City",
        accessorKey: "city",
      },
      {
        header: "Country Travelling To",
        accessorKey: "countryTravellingTo",
      },
      // Add more columns as needed
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto py-10">
    <div className="rounded-md border">
      <Table  className="border rounded-lg">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.column.columnDef.header}</th>
              ))}
            </tr>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{cell.getValue()}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  );
}
