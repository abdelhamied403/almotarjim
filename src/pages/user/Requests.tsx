import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { HiChat, HiEye, HiPlus } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import noRequestsImage from "@/assets/no-requests.svg";
import RequestService from "@/services/request.service";
import { useQuery } from "react-query";
import useI18n from "@/hooks/useI18n";
import { requestStatusColors } from "@/constants/requestStatus";
import Spinner from "@/components/ui/Spinner";
import ChatService from "@/services/chat.service";
import { useState } from "react";
import Pagination from "@/components/Pagination";

type Request = {
  id: string;
  status: "PENDING";
  created_at: string;
};

const Requests = () => {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const columns: ColumnDef<Request>[] = [
    {
      accessorKey: "title",
      header: t("user.requests.table.title"),
    },
    {
      accessorKey: "created_at",
      header: t("user.requests.table.createdAt"),
      cell: ({ row }) => <p>{row.original.created_at}</p>,
    },
    {
      accessorKey: "status",
      header: t("user.requests.table.status"),
      cell: ({ row }) => (
        <p className={requestStatusColors[row.original.status]}>
          <b>{t(`shared.requestStatus.${row.original.status}`)}</b>
        </p>
      ),
    },
    {
      id: "actions",
      header: t("user.requests.table.actions"),
      cell: ({ row }) => (
        <Link to={`/request/${row.original.id}`}>
          <Button>
            <HiEye />
          </Button>
        </Link>
      ),
    },
  ];

  const {
    isLoading,
    data: requests,
    isError,
  } = useQuery(["requests", page], () => RequestService.getRequests(page), {
    retry: false,
  });

  const handleCreateChat = async () => {
    const chat = await ChatService.createChat({});
    navigate(`/chat/${chat.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="requests h-full">
        <div className="flex justify-end gap-4">
          <Button
            className="flex gap-2 items-center"
            variant="subtle"
            onClick={handleCreateChat}
          >
            <HiChat />
            {t("user.requests.chat")}
          </Button>
          <Link to="/request/create">
            <Button className="flex gap-2 items-center">
              <HiPlus />
              {t("user.requests.create")}
            </Button>
          </Link>
        </div>
        <DataTable columns={columns} data={[]} />
      </div>
    );
  }

  if (!requests?.data.length) {
    return (
      <>
        <div className="flex flex-col gap-4 justify-center items-center h-full">
          <img src={noRequestsImage} alt="" />
          <div className="flex justify-center gap-4">
            <Button
              className="flex gap-2 items-center"
              variant="subtle"
              onClick={handleCreateChat}
            >
              <HiChat />
              {t("user.requests.chat")}
            </Button>
            <Link to="/request/create">
              <Button className="flex gap-2 items-center">
                <HiPlus />
                {t("user.requests.create")}
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="requests h-full">
      <div className="flex justify-end gap-4">
        <Button
          className="flex gap-2 items-center"
          variant="subtle"
          onClick={handleCreateChat}
        >
          <HiChat />
          {t("user.requests.chat")}
        </Button>
        <Link to="/request/create">
          <Button className="flex gap-2 items-center">
            <HiPlus />
            {t("user.requests.create")}
          </Button>
        </Link>
      </div>
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
