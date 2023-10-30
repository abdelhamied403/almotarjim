import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import useI18n from "@/hooks/useI18n";
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

const Requests = () => {
  const { t } = useI18n();

  const columns: ColumnDef<Request>[] = [
    {
      accessorKey: "status",
      header: t("supervisor.requests.table.status"),
    },
    {
      accessorKey: "email",
      header: t("supervisor.requests.table.email"),
    },
    {
      accessorKey: "amount",
      header: t("supervisor.requests.table.amount"),

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

  const [data, setData] = useState<Request[]>([]);

  useEffect(() => {
    setData(getData());
  }, []);

  return (
    <>
      <div className="flex justify-end gap-4">
        <Link to="/chat/123">
          <Button className="flex gap-2 items-center" variant="subtle">
            <HiChat />
            {t("supervisor.requests.chatWithUs")}
          </Button>
        </Link>
        <Link to="/request/create">
          <Button className="flex gap-2 items-center">
            <HiPlus />
            {t("supervisor.requests.createRequest")}
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default Requests;
