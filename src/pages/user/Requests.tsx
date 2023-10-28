import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { HiChat, HiEye, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import noRequestsImage from "@/assets/no-requests.svg";
import RequestService from "@/services/request.service";
import { useQuery } from "react-query";
import { t } from "i18next";

type Request = {
  id: string;
  status: "PENDING";
};

const statusColors = {
  PENDING: "text-[#FF6B00]",
};

const columns: ColumnDef<Request>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <p className={statusColors[row.original.status]}>
        <b>{row.original.status}</b>
      </p>
    ),
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
                  {t("user.requests.chat")}
                </Button>
              </Link>
              <Link to="/request/create">
                <Button className="flex gap-2 items-center">
                  <HiPlus />
                  {t("user.requests.create")}
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
                {t("user.requests.chat")}
              </Button>
            </Link>
            <Link to="/request/create">
              <Button className="flex gap-2 items-center">
                <HiPlus />
                {t("user.requests.create")}
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
