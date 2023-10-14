import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { HiChat, HiEye, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

const getData = () => {
  // Fetch data from your API here.
  return new Array(123).fill({
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  });
};

type Request = {
  id: string;
};

const columns: ColumnDef<Request>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Link to={`/request/${row.original.id}`}>
        <Button>
          <HiEye />
        </Button>
      </Link>
    ),
  },
];

const Requests = () => {
  const [data, setData] = useState<Request[]>([]);

  useEffect(() => {
    setData(getData());
  }, []);

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Requests;
