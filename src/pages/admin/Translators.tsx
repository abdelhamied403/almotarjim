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

const TranslatorsActions = ({ row, refetch }: any) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteTranslator = async (id: string) => {
    setLoading(true);
    try {
      await AdminService.deleteUser(id);
      refetch();
      toast({
        title: "Deleted",
        description: "Translator Deleted Successfully",
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
      onClick={() => handleDeleteTranslator(row.original.id)}
    >
      {loading ? <Spinner /> : <RiDeleteBin5Fill />}
    </Button>
  );
};

const Translators = () => {
  const { t } = useI18n();
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: t("admin.translators.id"),
    },
    {
      accessorKey: "name",
      header: t("admin.translators.name"),
    },
    {
      accessorKey: "email",
      header: t("admin.translators.email"),
    },
    {
      accessorKey: "status",
      header: t("admin.translators.status"),
      cell: ({ row }) =>
        row.original.status
          ? t("admin.translators.online")
          : t("admin.translators.offline"),
    },
    {
      accessorKey: "translations_number",
      header: t("admin.translators.numberOfTranslations"),
    },
    {
      id: "actions",
      header: t("admin.translators.actions"),
      cell: ({ row }) => <TranslatorsActions row={row} refetch={refetch} />,
    },
  ];

  const {
    isLoading,
    data: translators,
    refetch,
  } = useQuery("translators", AdminService.getTranslators);

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
        <Link to="/translators/create">
          <Button className="flex gap-2 items-center">
            <HiPlus />
            {t("admin.translators.createTranslator")}
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={translators} />
    </div>
  );
};

export default Translators;
