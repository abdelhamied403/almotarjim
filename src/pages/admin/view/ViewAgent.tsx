import { DataTable } from "@/components/Datatable";
import { Button } from "@/components/ui/button";
import useI18n from "@/hooks/useI18n";
import AdminService from "@/services/admin.service";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewAgent = () => {
  const { t } = useI18n();
  const { id = "" } = useParams();
  const [agent, setAgent] = useState<any>();
  const [agentHistory, setAgentHistory] = useState<any>();
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

  const getAgent = useCallback(async () => {
    const agent = await AdminService.getUser(id);
    setAgent(agent.data);
  }, [id]);

  const getAgentHistory = useCallback(async () => {
    const agentHistory = await AdminService.getAgentHistory(id);
    setAgentHistory(agentHistory.data);
    setExcelFileUrl(agentHistory.excel);
  }, [id]);

  useEffect(() => {
    getAgent();
  }, [getAgent]);
  useEffect(() => {
    getAgentHistory();
  }, [getAgentHistory]);

  return (
    <div className="view-agent">
      <img src={agent?.image} alt="" />
      <h1>{agent?.name}</h1>
      <p>{agent?.email}</p>
      <p>
        <b>
          {agent?.status ? t("admin.agents.online") : t("admin.agents.offline")}
        </b>
      </p>
      <p>
        {t("admin.viewAgent.totalRequests")}: {agentHistory?.numberOfRequests}
      </p>

      <div className="chart">
        <DataTable
          columns={columns}
          data={[
            {
              pending: agentHistory?.numberOfPendingRequests,
              inProgress: agentHistory?.numberOfInProgressRequests,
              closed: agentHistory?.numberOfDoneRequests,
              rejected: agentHistory?.numberOfRejectedRequests,
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

export default ViewAgent;
