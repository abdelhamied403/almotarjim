import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export type DoughnutProps = {
  data: ChartData<"doughnut", number[], unknown>;
};

const DoughnutChart = (props: DoughnutProps) => {
  return <Doughnut data={props.data} />;
};

export default DoughnutChart;
