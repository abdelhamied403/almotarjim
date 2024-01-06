import Field from "@/components/Field";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { useToast } from "@/components/ui/use-toast";
import useI18n from "@/hooks/useI18n";
import UploadedFile from "@/interfaces/uploadedFile";
import RequestService from "@/services/request.service";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";

const SubmitRequest = () => {
  const { t } = useI18n();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { id = "" } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitRequestLoading, setSubmitRequestLoading] = useState(false);

  const handleSubmitRequest = async () => {
    try {
      setSubmitRequestLoading(true);
      const res = await RequestService.submitRequest(
        id,
        files.map(({ file }) => file)
      );
      toast({
        title: t("shared.success"),
        description: res.message,
      });
      navigate("/request");
    } catch (error: any) {
      toast({
        title: t("shared.error"),
        description: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setSubmitRequestLoading(false);
    }
  };

  return (
    <div className="page" id="submitRequest">
      <div className="flex flex-col flex-1 flex-wrap gap-6 items-start p-6 bg-white rounded-xl">
        <div className="form w-full">
          <h1>{t("translator.submitRequest.submitYourFiles")}</h1>
          <Field label="">
            <Dropzone files={files} setFiles={setFiles} />
          </Field>

          <div className="my-4 flex justify-center">
            <Button
              onClick={handleSubmitRequest}
              disabled={submitRequestLoading}
            >
              {submitRequestLoading ? (
                <Spinner />
              ) : (
                t("translator.singleRequest.submit")
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitRequest;
