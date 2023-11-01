import Field from "@/components/Field";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { useToast } from "@/components/ui/use-toast";
import UploadedFile from "@/interfaces/uploadedFile";
import RequestService from "@/services/request.service";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SubmitRequest = () => {
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
        title: "Translation submitted successfully",
        description: res.message,
      });
      navigate("/request");
    } catch (error: any) {
      toast({
        title: "something went wrong",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="page" id="submitRequest">
      <div className="flex flex-col flex-1 flex-wrap gap-6 items-start p-6 bg-white rounded-xl">
        <div className="form w-full">
          <h1>Submit your files</h1>
          <Field label="">
            <Dropzone files={files} setFiles={setFiles} />
          </Field>

          <div className="my-4 flex justify-center">
            <Button onClick={handleSubmitRequest}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitRequest;
