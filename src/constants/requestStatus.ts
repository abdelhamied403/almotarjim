import { RequestStatus } from "@/interfaces/request";

type RequestStatusType = {
  [key in RequestStatus]: any;
};

const requestStatusVariants: RequestStatusType = {
  PENDING: "warning",
  IN_PROGRESS: "default",
  DONE: "success",
  DEFAULT: "slate",
};

const requestStatusColors: RequestStatusType = {
  PENDING: "text-[#FF6B00]",
  IN_PROGRESS: "text-primary-600",
  DONE: "text-[#19c710]",
  DEFAULT: "text-[#999]",
};

export { requestStatusVariants, requestStatusColors };
