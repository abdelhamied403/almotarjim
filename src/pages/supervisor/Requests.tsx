import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import useI18n from "@/hooks/useI18n";
import { ColumnDef } from "@tanstack/react-table";
import { HiEye, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import noRequestsImage from "@/assets/no-requests.svg";
import RequestService from "@/services/request.service";
import { useQuery } from "react-query";
import { RequestStatus } from "@/interfaces/request";
import { requestStatusColors } from "@/constants/requestStatus";
import Spinner from "@/components/ui/Spinner";

type Request = {
  id: string;
  status: RequestStatus;
};

const Requests = () => {
  const { t } = useI18n();
  const columns: ColumnDef<Request>[] = [
    {
      accessorKey: "title",
      header: t("supervisor.requests.table.title"),
    },
    {
      accessorKey: "status",
      header: t("supervisor.requests.table.status"),
      cell: ({ row }) => (
        <p className={requestStatusColors[row.original.status]}>
          <b>{t(`shared.requestStatus.${row.original.status}`)}</b>
        </p>
      ),
    },
    {
      id: "actions",
      header: t("supervisor.requests.table.actions"),
      cell: ({ row }) => (
        <Link to={`/request/${row.original.id}`}>
          <Button>
            <HiEye />
          </Button>
        </Link>
      ),
    },
  ];

  const { isLoading, data: requests } = useQuery(
    "requests",
    RequestService.getRequests
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="requests h-full">
      {!requests.length && (
        <>
          <div className="flex flex-col gap-4 justify-center items-center h-full">
            <img src={noRequestsImage} alt="" />
            <div className="flex justify-center gap-4">
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
