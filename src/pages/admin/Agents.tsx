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
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (row.original.status ? "online" : "Offline"),
    },
    {
      accessorKey: "number_of_clients",
      header: "Number Of Clients",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <AgentsActions row={row} refetch={refetch} />,
    },
  ];

  const {
    isLoading,
    data: agents,
    refetch,
  } = useQuery("agents", AdminService.getAgents);

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
            Create Agent
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={agents} />
    </div>
  );
};

export default Agents;
