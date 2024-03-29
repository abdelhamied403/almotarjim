import Attachment from "@/components/Attachment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HiDownload } from "react-icons/hi";
import { useCallback, useEffect, useState } from "react";
import Request from "@/interfaces/request";
import RequestService from "@/services/request.service";
import { Link, useParams } from "react-router-dom";
import useI18n from "@/hooks/useI18n";
import { requestStatusVariants } from "@/constants/requestStatus";
import { downloadURI } from "@/lib/file";
import Spinner from "@/components/ui/Spinner";

const SingleRequest = () => {
  const { t } = useI18n();

  const [request, setRequest] = useState<Request>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id = "" } = useParams();

  const getRequest = useCallback(async () => {
    setLoading(true);
    const request = await RequestService.getRequest(id).catch(console.log);
    setRequest(request);
    setLoading(false);
  }, [id]);

  //download all attachments
  const handleDownloadAll = (files: Request["files"] = []) => {
    files.forEach((file) => {
      const nameParts = file.path.split("/");
      const name = nameParts[nameParts.length - 1];
      downloadURI(file.path, name);
    });
  };

  useEffect(() => {
    getRequest();
  }, [getRequest]);

  return (
    <div className="page flex-1">
      {loading && (
        <p className="flex items-center justify-center">
          <Spinner />
        </p>
      )}
      {!loading && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:overflow-hidden lg:auto-rows-fr">
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
                    variant={
                      requestStatusVariants[request?.status || "DEFAULT"]
                    }
                  >
                    {t(`shared.requestStatus.${request?.status}`)}
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
          </div>
          <div className="bg-white p-4 rounded-xl mt-4 flex justify-center">
            <Link to="submit">
              <Button>{t("translator.singleRequest.submit")}</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleRequest;
