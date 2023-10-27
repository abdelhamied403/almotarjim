import { HiDocument, HiDownload } from "react-icons/hi";
import { Button } from "./ui/button";
import { downloadURI } from "@/lib/file";

export type AttachmentProps = {
  fileName: string;
  path: string;
};
const Attachment = ({ fileName, path }: AttachmentProps) => {
  const downloadFile = () => {
    downloadURI(path, fileName);
  };
  return (
    <div className="flex flex-wrap gap-2 justify-between items-center bg-primary-50 hover:bg-primary-100 p-3 rounded-md">
      <div className="flex flex-wrap items-center gap-4">
        <div className="bg-primary-100 h-10 w-10 flex justify-center items-center rounded-md text-primary border border-primary">
          <HiDocument />
        </div>
        <p>{fileName}</p>
      </div>
      <Button className="rounded-md" size="icon" onClick={downloadFile}>
        <HiDownload />
      </Button>
    </div>
  );
};

export default Attachment;
