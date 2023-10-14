import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { HiChat, HiEye, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import noRequestsImage from "@/assets/no-requests.svg";
import RequestService from "@/services/request.service";
import { useQuery } from "react-query";

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
  const { isLoading, data: requests } = useQuery(
    "requests",
    RequestService.getRequests
  );

  if (isLoading) {
    return <div className="">loading....</div>;
  }

  return (
    <div className="requests h-full">
      {!requests.length && (
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
      {!!requests.length && (
        <>
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
          <DataTable columns={columns} data={requests} />
        </>
      )}
    </div>
  );
};

export default Requests;
