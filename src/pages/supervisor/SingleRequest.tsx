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
import { requestStatusVariants } from "@/constants/requestStatus";
import { cn } from "@/lib/utils";
import { downloadURI } from "@/lib/file";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/Spinner";
import usePusher from "@/hooks/usePusher";
import ChatService from "@/services/chat.service";

const SingleRequest = () => {
  const { t } = useI18n();
  const pusher = usePusher();

  const [request, setRequest] = useState<Request>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id = "" } = useParams();
  const { toast } = useToast();

  //download all attachments
  const handleDownloadAll = (files: Request["files"]) => {
    files.forEach((file) => {
      const nameParts = file.path.split("/");
      const name = nameParts[nameParts.length - 1];
      downloadURI(file.path, name);
    });
  };
  // reopen
  const [isReopenDialogOpen, setIsReopenDialogOpen] = useState(false);
  const [reopenNotes, setReopenNotes] = useState("");

  // assign
  const { isLoading: isTranslatorsLoading, data: translators } = useQuery<
    User[]
  >("requestTranslators", () => AuthService.getUsersByRole("translator"), {});

  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [assignedTranslator, setAssignedTranslator] = useState("");

  // approve
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);

  const onReopen = () => {
    console.log(reopenNotes);
    setReopenNotes("");
    setIsReopenDialogOpen(false);
  };

  const onAssign = async () => {
    await RequestService.assignRequest(id, assignedTranslator);
    toast({
      title: t("supervisor.singleRequest.toast.title"),
    });
    getRequest();
    setAssignedTranslator("");
    setIsAssignDialogOpen(false);
  };

  const onApprove = async () => {
    await RequestService.approveRequest(id);
    toast({
      title: t("supervisor.singleRequest.toast.title"),
    });
    getRequest();
    setIsApproveDialogOpen(false);
  };

  const getRequest = useCallback(async () => {
    setLoading(true);
    const request = await RequestService.getRequest(id).catch(console.log);
    setRequest(request);
    setLoading(false);
  }, [id]);

  const onMessageSend = async (message: { type: string; content: any }) => {
    if (request?.chat) {
      await ChatService.sendMessage(message, request?.chat?.id);
    }
  };

  useEffect(() => {
    getRequest();
  }, [getRequest]);

  useEffect(() => {
    if (request) {
      const channel = pusher.subscribe(`chat.${request?.chat?.id}`);
      channel.bind("message-sent", (data: any) => {
        setRequest((prev: any) => ({
          ...prev,
          chat: {
            ...prev.chat,
            messages: [...prev.chat.messages, data],
          },
        }));
      });

      return () => {
        channel.unbind("message-sent");
      };
    }
  }, [pusher, request]);

  return (
    <div className="flex-1 items-center justify-center h-full">
      {loading && <Spinner />}
      {!loading && !!request && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full lg:overflow-hidden lg:auto-rows-fr">
          {/* Grid Item 1 */}
          <div className="bg-white p-4 rounded-xl overflow-y-auto">
            {/* details */}
            <div className="flex flex-col gap-2">
              <h2>{t("user.singleRequest.basicInfo")}</h2>
              <p>
                <b className="text-primary">
                  {t("user.singleRequest.requestId")}{" "}
                </b>
                {request?.id}
              </p>
              <p>
                <b className="text-primary">
                  {t("user.singleRequest.service")}{" "}
                </b>
                {request?.service?.title}
              </p>
              <p>
                <b className="text-primary">
                  {t("user.singleRequest.translator")}{" "}
                </b>
                {request?.translator?.name}
              </p>
              <p>
                <b className="text-primary">
                  {t("user.singleRequest.status")}{" "}
                </b>
                <Badge
                  variant={requestStatusVariants[request?.status || "DEFAULT"]}
                >
                  <b>{t(`shared.requestStatus.${request?.status}`)}</b>
                </Badge>
              </p>
              <p>
                <b className="text-primary">
                  {t("user.singleRequest.description")}{" "}
                </b>
                {request?.description}
              </p>
            </div>
          </div>

          {/* Grid Item 2 */}
          <div
            className={cn(
              "h-full max-h-[900px] lg:max-h-none overflow-y-auto flex-1 flex flex-col gap-4 bg-white p-4 rounded-xl row-span-3"
            )}
          >
            <div className="flex gap-2">
              <Button onClick={() => setIsApproveDialogOpen(true)}>
                {t("supervisor.singleRequest.approve")}
              </Button>
              <Button onClick={() => setIsAssignDialogOpen(true)}>
                {t("supervisor.singleRequest.assign")}
              </Button>
            </div>
            <Chat {...request?.chat} onSend={onMessageSend}>
              <Chat.Header>
                <Chat.Header.Title></Chat.Header.Title>
                <Chat.Header.Actions></Chat.Header.Actions>
              </Chat.Header>
              <Chat.Body />
              <Chat.Footer />
            </Chat>
          </div>

          {/* Grid Item 3 */}
          <div className="bg-white overflow-y-auto p-4 rounded-xl">
            <div className="flex flex-col gap-2">
              <div className="head flex flex-wrap justify-between mb-4">
                <h2>{t("supervisor.singleRequest.attachments")}</h2>
                <Button
                  size="sm"
                  variant="subtle"
                  onClick={() => handleDownloadAll(request?.files || [])}
                >
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
          {!!request?.translations && (
            <div className="bg-white overflow-y-auto p-4 rounded-xl">
              <div className="flex flex-col gap-2">
                <div className="head flex flex-wrap justify-between mb-4">
                  <h2>{t("supervisor.singleRequest.translations")}</h2>
                  <Button
                    size="sm"
                    variant="subtle"
                    onClick={() =>
                      handleDownloadAll(request?.translations.files)
                    }
                  >
                    <HiDownload />
                    {t("supervisor.singleRequest.downloadAll")}
                  </Button>
                </div>
                {request?.translations.files?.map((file) => (
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

      {/* assign dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("supervisor.singleRequest.dialog.assign.alert")}
            </DialogTitle>
            <DialogDescription asChild>
              <>
                <p>{t("supervisor.singleRequest.dialog.assign.desc")}</p>
                {isTranslatorsLoading && <Spinner />}
                {!isTranslatorsLoading && (
                  <Select onValueChange={setAssignedTranslator}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          "supervisor.singleRequest.dialog.assign.chooseTranslator"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {translators?.map((translator) => (
                        <SelectItem value={translator.id}>
                          {translator.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onAssign}>
              {t("supervisor.singleRequest.dialog.assign.assign")}
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
