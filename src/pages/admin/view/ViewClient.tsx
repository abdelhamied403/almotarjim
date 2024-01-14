import DoughnutChart from "@/components/DoughnutChart";
import { Button } from "@/components/ui/button";
import useI18n from "@/hooks/useI18n";
import AdminService from "@/services/admin.service";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewClient = () => {
  const { t } = useI18n();
  const { id = "" } = useParams();
  const [client, setClient] = useState<any>();
  const [clientHistory, setClientHistory] = useState<any>();
  const [excelFileUrl, setExcelFileUrl] = useState("");

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

      <a href={excelFileUrl}>
        <Button>Download Excel</Button>
      </a>

      <div className="grid grid-cols-4">
        {clientHistory && clientHistory?.numberOfRequests > 0 && (
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
                      clientHistory?.numberOfPendingRequests,
                      clientHistory?.numberOfInProgressRequests,
                      clientHistory?.numberOfDoneRequests,
                      clientHistory?.numberOfRejectedRequests,
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
        B
      </div>
    </div>
  );
};

export default ViewClient;
