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
import Spinner from "@/components/ui/Spinner";
import { requestStatusVariants } from "@/constants/requestStatus";
import { downloadURI } from "@/lib/file";
import ChatService from "@/services/chat.service";
import usePusher from "@/hooks/usePusher";
import { cn } from "@/lib/utils";
import Message from "@/interfaces/message";
import ChatType from "@/interfaces/chat";

const SingleRequest = () => {
  const { t } = useI18n();
  const pusher = usePusher();

  const [request, setRequest] = useState<Request>();
  const [loading, setLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<Partial<ChatType>>({});
  const [messages, setMessages] = useState<{ data: Array<Message> }>({
    data: [],
  });
  const [page, setPage] = useState(1);

  const { id = "" } = useParams();

  //download all attachments
  const handleDownloadAll = (files: Request["files"] = []) => {
    files.forEach((file) => {
      const nameParts = file.path.split("/");
      const name = nameParts[nameParts.length - 1];
      downloadURI(file.path, name);
    });
  };

  const getChat = useCallback(async (chatId: string) => {
    const res = await ChatService.getSingleChat(chatId);
    setChat(res.data);
    setMessages(res.messages);
  }, []);

  const getRequest = useCallback(async () => {
    setLoading(true);
    const request = await RequestService.getRequest(id).catch(console.log);
    setRequest(request);
    getChat(request?.chat?.id);
    setLoading(false);
  }, [getChat, id]);

  const handleSend = useCallback(
    async (message: { type: string; content: any }) => {
      await ChatService.sendMessage(message, request?.chat?.id || "");
    },
    [request?.chat?.id]
  );

  const onFetchMore = async () => {
    const res = await ChatService.getSingleChat(request?.chat?.id, page + 1);
    setPage((prev) => prev + 1);
    setMessages((prev) => ({
      ...prev,
      ...res.messages,
      data: [...prev.data, ...res.messages.data],
    }));
  };

  useEffect(() => {
    getRequest();
  }, [getRequest]);

  useEffect(() => {
    if (request) {
      const channel = pusher.subscribe(`chat.${request?.chat?.id}`);
      channel.bind("message-sent", (data: any) => {
        setMessages((prev: any) => ({ ...prev, data: [data, ...prev.data] }));
      });

      return () => {
        channel.unbind("message-sent");
      };
    }
  }, [pusher, request]);

  return (
    <div className="flex-1 items-center justify-center h-full">
      <div className="flex gap-2"></div>
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
            <Chat {...chat} messages={messages} onSend={handleSend}>
              <Chat.Header>
                <Chat.Header.Title></Chat.Header.Title>
                <Chat.Header.Actions></Chat.Header.Actions>
              </Chat.Header>
              <Chat.Body fetchMoreMessages={onFetchMore}></Chat.Body>
              <Chat.Footer />
            </Chat>
          </div>

          {/* Grid Item 3 */}
          <div className="bg-white overflow-y-auto p-4 rounded-xl">
            <div className="flex flex-col gap-2">
              <div className="head flex flex-wrap justify-between mb-4">
                <h2>{t("user.singleRequest.attachments")}</h2>
                <Button
                  size="sm"
                  variant="subtle"
                  onClick={() => handleDownloadAll(request?.files)}
                >
                  <HiDownload />
                  {t("user.singleRequest.downloadAll")}
                </Button>
              </div>
              {request?.files?.map((file) => (
                <Attachment type="request" {...file}></Attachment>
              ))}
            </div>
          </div>

          {/* Grid Item 4 */}
          {request?.translations?.files?.length && (
            <div className="bg-white overflow-y-auto p-4 rounded-xl">
              <div className="flex flex-col gap-2">
                <div className="head flex flex-wrap justify-between mb-4">
                  <h2>{t("user.singleRequest.translations")}</h2>
                  <Button
                    size="sm"
                    variant="subtle"
                    onClick={() =>
                      handleDownloadAll(request?.translations?.files)
                    }
                  >
                    <HiDownload />
                    {t("user.singleRequest.downloadAll")}
                  </Button>
                </div>
                {request?.translations?.files?.map((file) => (
                  <Attachment type="translation" {...file}></Attachment>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleRequest;
