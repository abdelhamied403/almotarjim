import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import useI18n from "@/hooks/useI18n";
import AdminService from "@/services/admin.service";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewClient = () => {
  const { t } = useI18n();
  const { id = "" } = useParams();
  const [client, setClient] = useState<any>();
  const [clientHistory, setClientHistory] = useState<any>();
  const [excelFileUrl, setExcelFileUrl] = useState("");

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "pending",
      header: t("admin.dashboard.pending"),
    },
    {
      accessorKey: "inProgress",
      header: t("admin.dashboard.inProgress"),
    },
    {
      accessorKey: "closed",
      header: t("admin.dashboard.closed"),
    },
    {
      accessorKey: "rejected",
      header: t("admin.dashboard.rejected"),
    },
  ];

  const getClient = useCallback(async () => {
    const client = await AdminService.getUser(id);
    setClient(client.data);
  }, [id]);

  const getClientHistory = useCallback(async () => {
    const clientHistory = await AdminService.getClientHistory(id);
    setClientHistory(clientHistory.data);
    setExcelFileUrl(clientHistory.excel);
  }, [id]);

  useEffect(() => {
    getClient();
  }, [getClient]);
  useEffect(() => {
    getClientHistory();
  }, [getClientHistory]);

  return (
    <div className="view-client">
      <img src={client?.image} alt="" />
      <h1>{client?.name}</h1>
      <p>{client?.email}</p>
      <p>
        {t("admin.viewAgent.totalRequests")}: {clientHistory?.numberOfRequests}
      </p>

      <div className="chart">
        <DataTable
          columns={columns}
          data={[
            {
              pending: clientHistory?.numberOfPendingRequests,
              inProgress: clientHistory?.numberOfInProgressRequests,
              closed: clientHistory?.numberOfDoneRequests,
              rejected: clientHistory?.numberOfRejectedRequests,
            },
          ]}
        />
      </div>

      <div className="flex justify-end py-4">
        <a href={excelFileUrl}>
          <Button>Download Excel</Button>
        </a>
      </div>
    </div>
  );
};

export default ViewClient;
