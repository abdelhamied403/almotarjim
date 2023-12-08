import DoughnutChart from "@/components/DoughnutChart";
import Spinner from "@/components/ui/Spinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useI18n from "@/hooks/useI18n";
import AdminService from "@/services/admin.service";
import { ChartData } from "chart.js";
import { useState } from "react";
import { useQuery } from "react-query";

const Dashboard = () => {
  const { t } = useI18n();
  const [chatData, setChatData] = useState<
    ChartData<"doughnut", number[], unknown>
  >({
    datasets: [],
  });
  const [requestData, setRequestData] = useState<
    ChartData<"doughnut", number[], unknown>
  >({
    datasets: [],
  });
  const [availableAgents, setAvailableAgents] = useState<
    ChartData<"doughnut", number[], unknown>
  >({
    datasets: [],
  });

  const { isLoading, data: reports } = useQuery(
    "reports",
    AdminService.getReports,
    {
      onSuccess: (data) => {
        setChatData({
          labels: [t("admin.dashboard.open"), t("admin.dashboard.closed")],
          datasets: [
            {
              label: t("admin.dashboard.chats"),
              data: [data.numberOfOpenChats, data.numberOfClosedChats],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        });
        setRequestData({
          labels: [
            t("admin.dashboard.pending"),
            t("admin.dashboard.inProgress"),
            t("admin.dashboard.closed"),
          ],
          datasets: [
            {
              label: t("admin.dashboard.requests"),
              data: [
                data.numberOfPendingRequests,
                data.numberOfInProgressRequests,
                data.numberOfDoneRequests,
              ],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
        setAvailableAgents({
          labels: [t("admin.dashboard.online")],
          datasets: [
            {
              label: t("admin.dashboard.agents"),
              data: [data.numberOfAvailableAgents],
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        });
      },
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1>{t("admin.dashboard.welcomeToAlmotarjim")}</h1>
        <p>{t("admin.dashboard.description")}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <h1>{t("admin.dashboard.chats")}</h1>
          </CardHeader>
          <CardContent>
            <DoughnutChart data={chatData} />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col">
              <p>Total Chats: {reports.numberOfChats}</p>
              <p>Open Chats: {reports.numberOfOpenChats}</p>
              <p>Closed Chats: {reports.numberOfClosedChats}</p>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <h1>{t("admin.dashboard.requests")}</h1>
          </CardHeader>
          <CardContent>
            <DoughnutChart data={requestData} />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col">
              <p>Total Requests: {reports.numberOfRequests}</p>
              <p>Pending Requests: {reports.numberOfPendingRequests}</p>
              <p>InProgress Requests: {reports.numberOfInProgressRequests}</p>
              <p>Closed Requests: {reports.numberOfDoneRequests}</p>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <h1>{t("admin.dashboard.agents")}</h1>
          </CardHeader>
          <CardContent>
            <DoughnutChart data={availableAgents} />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col">
              <p>Available Agents: {reports.numberOfAvailableAgents}</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
