import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import useI18n from "@/hooks/useI18n";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { HiChat, HiEye, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

type Request = {
  id: string;
  status: "PENDING";
};
const statusColors = {
  PENDING: "text-[#FF6B00]",
};

const Requests = () => {
  const { t } = useI18n();
  const [data, setData] = useState<Request[]>([]);

  const columns: ColumnDef<Request>[] = [
    {
      accessorKey: "title",
      header: t("agent.requests.table.title"),
    },
    {
      accessorKey: "status",
      header: t("agent.requests.table.status"),
      cell: ({ row }) => (
        <p className={statusColors[row.original.status]}>
          <b>{row.original.status}</b>
        </p>
      ),
    },
    {
      id: "actions",
      header: t("agent.requests.table.actions"),
      cell: ({ row }) => (
        <Link to={`/request/${row.original.id}`}>
          <Button>
            <HiEye />
          </Button>
        </Link>
      ),
    },
  ];

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
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Requests;
