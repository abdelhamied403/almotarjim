import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import useI18n from "@/hooks/useI18n";
import { ColumnDef } from "@tanstack/react-table";
import { HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import RequestService from "@/services/request.service";
import { useQuery } from "react-query";
import { RequestStatus } from "@/interfaces/request";
import { requestStatusColors } from "@/constants/requestStatus";
import Spinner from "@/components/ui/Spinner";
import { useState } from "react";
import Pagination from "@/components/Pagination";

type Request = {
  id: string;
  status: RequestStatus;
};

const Requests = () => {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const columns: ColumnDef<Request>[] = [
    {
      accessorKey: "title",
      header: t("translator.requests.table.title"),
    },
    {
      accessorKey: "status",
      header: t("translator.requests.table.status"),
      cell: ({ row }) => (
        <p className={requestStatusColors[row.original.status]}>
          <b>{t(`shared.requestStatus.${row.original.status}`)}</b>
        </p>
      ),
    },
    {
      id: "actions",
      header: t("translator.requests.table.actions"),
      cell: ({ row }) => (
        <Link to={`/request/${row.original.id}`}>
          <Button>
            <HiEye />
          </Button>
        </Link>
      ),
    },
  ];

  const { isLoading, data: requests } = useQuery(["requests", page], () =>
    RequestService.getRequests(page)
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
      <DataTable columns={columns} data={requests?.data} />
      <Pagination
        page={page}
        totalPages={requests?.last_page}
        onPageChange={(page) => setPage(page)}
      ></Pagination>
    </div>
  );
};

export default Requests;
