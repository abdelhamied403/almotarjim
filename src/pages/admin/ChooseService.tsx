import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { HiPlus } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "@/components/ui/Spinner";
import Admin from "@/interfaces/admin";
import ServiceService from "@/services/services.service";
import useI18n from "@/hooks/useI18n";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import AdminService from "@/services/admin.service";
import Pagination from "@/components/Pagination";

const AgentsActions = ({ row, refetch }: any) => {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteService = async (id: string) => {
    setLoading(true);
    try {
      await AdminService.deleteService(id);
      refetch();
      toast({
        title: t("admin.chooseService.deleted"),
        description: t("admin.chooseService.serviceDeletedSuccess"),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        variant={"danger"}
        onClick={() => handleDeleteService(row.original.id)}
      >
        {loading ? <Spinner /> : <RiDeleteBin5Fill />}
      </Button>
    </div>
  );
};

const ChooseService = () => {
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const columns: ColumnDef<Admin>[] = [
    {
      accessorKey: "id",
      header: t("admin.chooseService.id"),
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "title",
      header: t("admin.chooseService.title"),
    },
    {
      header: t("admin.chooseService.image"),
      cell: ({ row }) => (
        <img src={`${row.original.image}`} className="w-10 h-10" />
      ),
    },
    {
      id: "actions",
      header: t("admin.chooseService.actions"),
      cell: ({ row }) => <AgentsActions row={row} refetch={refetch} />,
    },
  ];

  const {
    isLoading,
    data: chooseServices,
    refetch,
  } = useQuery(["chooseServices", page], () =>
    ServiceService.listServices(page)
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
      <div className="flex justify-end gap-4">
        <Link to="/services/create">
          <Button className="flex gap-2 items-center">
            <HiPlus />
            {t("admin.chooseService.createService")}
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={chooseServices.data} />
      <Pagination
        page={page}
        totalPages={chooseServices?.last_page}
        onPageChange={(page) => setPage(page)}
      ></Pagination>
    </div>
  );
};

export default ChooseService;
