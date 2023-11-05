import { DataTable } from "@/components/Datatable";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { requestStatusColors } from "@/constants/requestStatus";
import useI18n from "@/hooks/useI18n";
import RequestService from "@/services/request.service";
import { ColumnDef } from "@tanstack/react-table";
import { HiChat, HiEye, HiPlus } from "react-icons/hi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

type Request = {
  id: string;
  status: "PENDING";
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
    <>
      <div className="flex justify-end gap-4">
        <Link to="/chat/123">
          <Button className="flex gap-2 items-center" variant="subtle">
            <HiChat />
            {t("agent.requests.chatWithUs")}
          </Button>
        </Link>
        <Link to="/request/create">
          <Button className="flex gap-2 items-center">
            <HiPlus />
            {t("agent.requests.createRequest")}
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={requests} />
    </>
  );
};

export default Requests;
