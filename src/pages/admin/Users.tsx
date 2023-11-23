import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import useI18n from "@/hooks/useI18n";
import { ColumnDef } from "@tanstack/react-table";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "@/components/ui/Spinner";
import AdminService from "@/services/admin.service";
import User from "@/interfaces/user";

const Users = () => {
  const { t } = useI18n();
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: t("admin.users.id"),
    },
    {
      accessorKey: "name",
      header: t("admin.users.name"),
    },
    {
      accessorKey: "status",
      header: t("admin.users.status"),
    },
    {
      accessorKey: "chats",
      header: t("admin.users.chats"),
    },
    {
      accessorKey: "requests",
      header: t("admin.users.requests"),
    },
    {
      id: "actions",
      header: t("admin.users.actions"),
      // cell: ({ row }) => (
      //   <Link to={`/request/${row.original.id}`}>
      //     <Button>
      //       <HiEye />
      //     </Button>
      //   </Link>
      // ),
    },
  ];

  const { isLoading, data: users } = useQuery("users", AdminService.getUsers);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="requests h-full">
      <div className="flex justify-end gap-4">
        <Link to="/user/create">
          <Button className="flex gap-2 items-center">
            <HiPlus />
            {t("user.requests.create")}
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default Users;
