import { HiDocument } from "react-icons/hi";

export type UploadedFileProps = {
  fileName: string;
  children: JSX.Element | JSX.Element[];
};
const UploadedFile = ({ fileName, children }: UploadedFileProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-between items-center bg-primary-50 hover:bg-primary-100 p-3 rounded-md">
      <div className="flex flex-wrap items-center gap-4">
        <div className="bg-primary-100 h-10 w-10 flex justify-center items-center rounded-md text-primary border border-primary">
          <HiDocument />
        </div>
        <p>{fileName}</p>
      </div>
      {children}
    </div>
  );
};

export default UploadedFile;
