import { DataTable } from "@/components/Datatable";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { requestStatusColors } from "@/constants/requestStatus";
import useI18n from "@/hooks/useI18n";
import RequestService from "@/services/request.service";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { HiEye } from "react-icons/hi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

type Request = {
  id: string;
  status: "PENDING";
  createdAt: string;
};

const Requests = () => {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const columns: ColumnDef<Request>[] = [
    {
      accessorKey: "title",
      header: t("supervisor.requests.table.title"),
    },
    {
      accessorKey: "createdAt",
      header: t("user.requests.table.createdAt"),
      cell: ({ row }) => <p>{row.original.createdAt}</p>,
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
    <>
      <DataTable columns={columns} data={requests?.data} />
      <Pagination
        page={page}
        totalPages={requests?.last_page}
        onPageChange={(page) => setPage(page)}
      ></Pagination>
    </>
  );
};

export default Requests;
