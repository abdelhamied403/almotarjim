import Attachment from "@/components/Attachment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HiDownload } from "react-icons/hi";
import Chat from "@/containers/Chat";
import { useCallback, useEffect, useState } from "react";
import Request from "@/interfaces/request";
import RequestService from "@/services/request.service";
import { useParams } from "react-router-dom";
import useI18n from "@/hooks/useI18n";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "react-query";
import User from "@/interfaces/user";
import AuthService from "@/services/auth.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/Spinner";

const requestStatusVariants: any = {
  PENDING: "warning",
  FINISHED: "success",
  default: "default",
};

const SingleRequest = () => {
  const { t } = useI18n();

  const [request, setRequest] = useState<Request>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id = "" } = useParams();

  // reopen
  const [isReopenDialogOpen, setIsReopenDialogOpen] = useState(false);
  const [reopenNotes, setReopenNotes] = useState("");

  // reassign
  const { isLoading: isTranslatorsLoading, data: translators } = useQuery<{
    data: User[];
  }>("requestTranslators", () => AuthService.getUsersByRole("translator"), {});

  const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false);
  const [reassignedTranslator, setReassignedTranslator] = useState("");

  // approve
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);

  const onReopen = () => {
    console.log(reopenNotes);
    setReopenNotes("");
    setIsReopenDialogOpen(false);
  };

  const onReassign = async () => {
    await RequestService.assignRequest(id, reassignedTranslator);
    setReassignedTranslator("");
    setIsReassignDialogOpen(false);
  };

  const onApprove = () => {
    console.log("approve");
    setIsApproveDialogOpen(false);
  };

  const getRequest = useCallback(async () => {
    setLoading(true);
    const request = await RequestService.getRequest(id).catch(console.log);
    setRequest(request);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getRequest();
  }, [getRequest]);

  return (
    <div className="flex-1 items-center justify-center">
      {loading && (
        <p>
          <Spinner />
        </p>
      )}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full lg:overflow-hidden lg:auto-rows-fr">
          {/* Grid Item 1 */}
          <div className="bg-white p-4 rounded-xl overflow-y-auto">
            {/* details */}
            <div className="flex flex-col gap-2">
              <h2>{t("supervisor.singleRequest.basicInfo")}</h2>
              <p>
                <b className="text-primary">
                  {t("supervisor.singleRequest.requestId")}{" "}
                </b>
                {request?.id}
              </p>
              <p>
                <b className="text-primary">
                  {t("supervisor.singleRequest.service")}{" "}
                </b>
                {request?.service?.title}
              </p>
              <p>
                <b className="text-primary">
                  {t("supervisor.singleRequest.translator")}{" "}
                </b>
                {request?.translator?.name}
              </p>
              <p>
                <b className="text-primary">
                  {t("supervisor.singleRequest.status")}{" "}
                </b>
                <Badge
                  variant={requestStatusVariants[request?.status || "default"]}
                >
                  {request?.status}
                </Badge>
              </p>
              <p>
                <b className="text-primary">
                  {t("supervisor.singleRequest.description")}{" "}
                </b>
                {request?.description}
              </p>
            </div>
          </div>

          {/* Grid Item 2 */}
          <div className="h-full max-h-[500px] lg:max-h-none row-span-2 overflow-y-auto flex-1 flex flex-col gap-4 bg-white p-4 rounded-xl">
            <div className="flex gap-2">
              <Button onClick={() => setIsApproveDialogOpen(true)}>
                {t("supervisor.singleRequest.approve")}
              </Button>
              <Button onClick={() => setIsReassignDialogOpen(true)}>
                {t("supervisor.singleRequest.assign")}
              </Button>
            </div>
            <Chat {...request?.chat} />
          </div>

          {/* Grid Item 3 */}
          <div className="bg-white overflow-y-auto p-4 rounded-xl">
            <div className="flex flex-col gap-2">
              <div className="head flex flex-wrap justify-between mb-4">
                <h2>{t("supervisor.singleRequest.attachments")}</h2>
                <Button size="sm" variant="subtle">
                  <HiDownload />
                  {t("supervisor.singleRequest.downloadAll")}
                </Button>
              </div>
              {request?.files?.map((file) => (
                <Attachment {...file}></Attachment>
              ))}
            </div>
          </div>

          {/* Grid Item 4 */}
          {request?.translations && (
            <div className="bg-white overflow-y-auto p-4 rounded-xl">
              <div className="flex flex-col gap-2">
                <div className="head flex flex-wrap justify-between mb-4">
                  <h2>{t("supervisor.singleRequest.translations")}</h2>
                  <Button size="sm" variant="subtle">
                    <HiDownload />
                    {t("supervisor.singleRequest.downloadAll")}
                  </Button>
                </div>
                {request?.translations?.files.map((file) => (
                  <Attachment {...file}></Attachment>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* reopen dialog */}
      <Dialog open={isReopenDialogOpen} onOpenChange={setIsReopenDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("supervisor.singleRequest.dialog.alert")}
            </DialogTitle>
            <DialogDescription>
              <Textarea
                placeholder={t("supervisor.singleRequest.dialog.anyNotes")}
                value={reopenNotes}
                onChange={(e) => setReopenNotes(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onReopen}>
              {t("supervisor.singleRequest.dialog.reopen")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* reassign dialog */}
      <Dialog
        open={isReassignDialogOpen}
        onOpenChange={setIsReassignDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("supervisor.singleRequest.dialog.reassign.alert")}
            </DialogTitle>
            <DialogDescription asChild>
              <p>{t("supervisor.singleRequest.dialog.reassign.desc")}</p>
              {isTranslatorsLoading && <Spinner />}
              {!isTranslatorsLoading && (
                <Select onValueChange={setReassignedTranslator}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t(
                        "supervisor.singleRequest.dialog.reassign.chooseTranslator"
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {translators?.data.map((translator) => (
                      <SelectItem value={translator.id}>
                        {translator.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onReassign}>
              {t("supervisor.singleRequest.dialog.reassign.reassign")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* approve dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("supervisor.singleRequest.dialog.approve.alert")}
            </DialogTitle>
            <DialogDescription>
              {t("supervisor.singleRequest.dialog.approve.desc")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="subtle">
                {t("supervisor.singleRequest.dialog.approve.cancel")}
              </Button>
            </DialogTrigger>
            <Button onClick={onApprove}>
              {t("supervisor.singleRequest.dialog.approve.approve")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleRequest;
