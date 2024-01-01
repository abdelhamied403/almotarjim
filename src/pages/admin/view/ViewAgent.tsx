import DoughnutChart from "@/components/DoughnutChart";
import useI18n from "@/hooks/useI18n";
import AdminService from "@/services/admin.service";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewAgent = () => {
  const { t } = useI18n();
  const { id = "" } = useParams();
  const [agent, setAgent] = useState<any>();
  const [agentHistory, setAgentHistory] = useState<any>();

  const getAgent = useCallback(async () => {
    const agent = await AdminService.getUser(id);
    setAgent(agent.data);
  }, [id]);

  const getAgentHistory = useCallback(async () => {
    const agentHistory = await AdminService.getAgentHistory(id);
    setAgentHistory(agentHistory.data);
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

      <div className="grid grid-cols-4">
        {agentHistory && agentHistory?.numberOfRequests > 0 && (
          <div className="chart">
            <DoughnutChart
              data={{
                labels: [
                  t("admin.dashboard.pending"),
                  t("admin.dashboard.inProgress"),
                  t("admin.dashboard.closed"),
                  t("admin.dashboard.rejected"),
                ],
                datasets: [
                  {
                    label: t("admin.dashboard.requests"),
                    data: [
                      agentHistory?.numberOfPendingRequests,
                      agentHistory?.numberOfInProgressRequests,
                      agentHistory?.numberOfDoneRequests,
                      agentHistory?.numberOfRejectedRequests,
                    ],
                    backgroundColor: [
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(0, 0, 132, 0.2)",
                    ],
                    borderColor: [
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 99, 132, 1)",
                      "rgba(0, 0, 132, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAgent;
