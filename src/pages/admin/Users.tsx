import { DataTable } from "@/components/Datatable";
import useI18n from "@/hooks/useI18n";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "react-query";
import Spinner from "@/components/ui/Spinner";
import AdminService from "@/services/admin.service";
import User from "@/interfaces/user";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HiEye } from "react-icons/hi";

const Users = () => {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "image",
      header: t("admin.users.image"),
      cell: ({ row }) => (
        <img className="w-8" src={row.original.image} alt="" />
      ),
    },
    {
      accessorKey: "name",
      header: t("admin.users.name"),
    },
    {
      accessorKey: "status",
      header: t("admin.users.status"),
      cell: ({ row }) =>
        row.original.status
          ? t("admin.translators.online")
          : t("admin.translators.offline"),
    },
    {
      accessorKey: "requests",
      header: t("admin.users.requests"),
    },
    {
      id: "actions",
      header: t("admin.users.actions"),
      cell: ({ row }) => (
        <Link to={`/users/${row.original.id}`}>
          <Button>
            <HiEye />
          </Button>
        </Link>
      ),
    },
  ];

  const { isLoading, data: users } = useQuery(["users", page], () =>
    AdminService.getUsers(page)
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
      <DataTable columns={columns} data={users?.data} />
      <Pagination
        page={page}
        totalPages={users?.last_page}
        onPageChange={(page) => setPage(page)}
      ></Pagination>
    </div>
  );
};

export default Users;
