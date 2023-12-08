import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { HiPlus } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "@/components/ui/Spinner";
import AdminService from "@/services/admin.service";
import User from "@/interfaces/user";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import useI18n from "@/hooks/useI18n";
import Pagination from "@/components/Pagination";

const AgentsActions = ({ row, refetch }: any) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteAgent = async (id: string) => {
    setLoading(true);
    try {
      await AdminService.deleteUser(id);
      refetch();
      toast({
        title: "Deleted",
        description: "Agent Deleted Successfully",
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
      onClick={() => handleDeleteAgent(row.original.id)}
    >
      {loading ? <Spinner /> : <RiDeleteBin5Fill />}
    </Button>
  );
};

const Agents = () => {
  const { t } = useI18n();
  const [page, setPage] = useState(1);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: t("admin.agents.id"),
    },
    {
      accessorKey: "name",
      header: t("admin.agents.name"),
    },
    {
      accessorKey: "email",
      header: t("admin.agents.email"),
    },
    {
      accessorKey: "phone",
      header: t("admin.agents.phone"),
    },
    {
      accessorKey: "status",
      header: t("admin.agents.status"),
      cell: ({ row }) =>
        row.original.status
          ? t("admin.agents.online")
          : t("admin.agents.offline"),
    },
    {
      accessorKey: "number_of_clients",
      header: t("admin.agents.numberOfClients"),
    },
    {
      id: "actions",
      header: t("admin.agents.actions"),
      cell: ({ row }) => <AgentsActions row={row} refetch={refetch} />,
    },
  ];

  const {
    isLoading,
    data: agents,
    refetch,
  } = useQuery(["agents", page], () => AdminService.getAgents(page));

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
        <Link to="/agents/create">
          <Button className="flex gap-2 items-center">
            <HiPlus />
            {t("admin.agents.createAgent")}
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={agents?.data} />
      <Pagination
        page={page}
        totalPages={agents?.last_page}
        onPageChange={(page) => setPage(page)}
      ></Pagination>
    </div>
  );
};

export default Agents;
