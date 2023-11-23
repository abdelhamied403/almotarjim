import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { HiEye, HiPlus } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "@/components/ui/Spinner";
import Admin from "@/interfaces/admin";
import ServiceService from "@/services/services.service";

const ChooseService = () => {
  const columns: ColumnDef<Admin>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      header: "Image",
      cell: ({ row }) => (
        <img src={`${row.original.image}`} className="w-10 h-10" />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <Link to="/services/create">
            <Button>
              <HiPlus />
            </Button>
          </Link>
          <Link to={`/request/${row.original.id}`}>
            <Button variant={"danger"}>
              <RiDeleteBin5Fill />
            </Button>
          </Link>
          <Link to={`/request/${row.original.id}`}>
            <Button>
              <HiEye />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const { isLoading, data: chooseServices } = useQuery(
    "chooseServices",
    ServiceService.listServices
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
      <DataTable columns={columns} data={chooseServices} />
    </div>
  );
};

export default ChooseService;
