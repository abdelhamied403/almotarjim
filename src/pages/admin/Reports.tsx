import DoughnutChart from "@/components/DoughnutChart";
import Spinner from "@/components/ui/Spinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import AdminService from "@/services/admin.service";
import { ChartData } from "chart.js";
import { useState } from "react";
import { useQuery } from "react-query";

const Reports = () => {
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
          labels: ["Open", "Closed"],
          datasets: [
            {
              label: "Chats",
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
          labels: ["Open", "Pending", "closed"],
          datasets: [
            {
              label: "Requests",
              data: [
                data.numberOfPendingRequests,
                data.numberOfInPRogressRequests,
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
          labels: ["Online", "Offline"],
          datasets: [
            {
              label: "Agents",
              data: [data.numberOfAvailableAgents, 15],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
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
        <h1>Welcome To Almotarjim</h1>
        <p>Almotarjim Admin Dashboard Reports</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <h1>Chats</h1>
          </CardHeader>
          <CardContent>
            <DoughnutChart data={chatData} />
          </CardContent>
          <CardFooter>
            <p>Total Chats: {reports.numberOfChats}</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <h1>Requests</h1>
          </CardHeader>
          <CardContent>
            <DoughnutChart data={requestData} />
          </CardContent>
          <CardFooter>
            <p>Total Requests: {reports.numberOfRequests}</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <h1>Agents</h1>
          </CardHeader>
          <CardContent>
            <DoughnutChart data={availableAgents} />
          </CardContent>
          <CardFooter>
            <p>Total Agents: 8</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
