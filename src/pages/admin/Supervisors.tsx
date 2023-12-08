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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Pagination from "@/components/Pagination";

const SupervisorsActions = ({ row, refetch }: any) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteSupervisor = async (id: string) => {
    setLoading(true);
    try {
      await AdminService.deleteUser(id);
      refetch();
      toast({
        title: "Deleted",
        description: "Supervisor Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <Button
      variant={"danger"}
      onClick={() => handleDeleteSupervisor(row.original.id)}
    >
      {loading ? <Spinner /> : <RiDeleteBin5Fill />}
    </Button>
  );
};

const Supervisors = () => {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: t("admin.supervisors.id"),
    },
    {
      accessorKey: "name",
      header: t("admin.supervisors.name"),
    },
    {
      accessorKey: "status",
      header: t("admin.supervisors.status"),
      cell: ({ row }) =>
        row.original.status
          ? t("admin.supervisors.online")
          : t("admin.supervisors.offline"),
    },
    {
      accessorKey: "email",
      header: t("admin.supervisors.email"),
    },
    {
      id: "actions",
      header: t("admin.supervisors.actions"),
      cell: ({ row }) => <SupervisorsActions row={row} refetch={refetch} />,
    },
  ];

  const {
    isLoading,
    data: supervisors,
    refetch,
  } = useQuery(["supervisors", page], () => AdminService.getSupervisors(page));

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
        <Link to="/supervisors/create">
          <Button className="flex gap-2 items-center">
            <HiPlus />
            {t("admin.supervisors.createSupervisor")}
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={supervisors?.data} />
      <Pagination
        page={page}
        totalPages={supervisors?.last_page}
        onPageChange={(page) => setPage(page)}
      ></Pagination>
    </div>
  );
};

export default Supervisors;
