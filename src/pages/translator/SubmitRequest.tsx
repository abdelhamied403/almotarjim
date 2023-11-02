import Field from "@/components/Field";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { useToast } from "@/components/ui/use-toast";
import useI18n from "@/hooks/useI18n";
import UploadedFile from "@/interfaces/uploadedFile";
import RequestService from "@/services/request.service";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SubmitRequest = () => {
  const { t } = useI18n();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { id = "" } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmitRequest = async () => {
    try {
      const res = await RequestService.submitRequest(
        id,
        files.map(({ file }) => file)
      );
      toast({
        title: t("translator.singleRequest.toast.title"),
        description: res.message,
      });
      navigate("/request");
    } catch (error: any) {
      toast({
        title: t("translator.singleRequest.toast.error"),
        description: error.response.data.message,
        variant: "destructive",
      });
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
            <Button onClick={handleSubmitRequest}>
              {t("translator.singleRequest.submit")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitRequest;
