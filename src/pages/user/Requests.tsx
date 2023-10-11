import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { HiChat, HiEye, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import noRequestsImage from "@/assets/no-requests.svg";

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
    <div className="requests h-full">
      {!data.length && (
        <>
          <div className="flex flex-col gap-4 justify-center items-center h-full">
            <img src={noRequestsImage} alt="" />
            <div className="flex justify-center gap-4">
              <Link to="/chat/123">
                <Button className="flex gap-2 items-center" variant="subtle">
                  <HiChat />
                  Chat with us
                </Button>
              </Link>
              <Link to="/request/create">
                <Button className="flex gap-2 items-center">
                  <HiPlus />
                  Create Request
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-end gap-4">
        <Link to="/chat/123">
          <Button className="flex gap-2 items-center" variant="subtle">
            <HiChat />
            Chat with us
          </Button>
        </Link>
        <Link to="/request/create">
          <Button className="flex gap-2 items-center">
            <HiPlus />
            Create Request
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Requests;
