import Attachment from "@/components/Attatchment";
import { Button } from "@/components/ui/button";
import useI18n from "@/hooks/useI18n";
import { Link } from "react-router-dom";

const SingleRequest = () => {
  const { t } = useI18n();
  return (
    <>
      <div className="flex flex-col gap-3 h-full">
        <div className="bg-white flex flex-col gap-2 p-3 rounded-xl">
          <h2 className="text-xl font-normal text-primary">
            {t("translator.singleRequest.notes")}
          </h2>
          <p>{t("translator.singleRequest.desc")}</p>
        </div>
        <div className="flex-1 w-full ">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 bg-white p-3 rounded-xl overflow-y-auto">
              <div className="head flex justify-center">
                <h2>{t("translator.singleRequest.attachments")}</h2>
              </div>
              <Attachment fileName="test.pdf"></Attachment>
              <Attachment fileName="test.pdf"></Attachment>
              <Attachment fileName="test.pdf"></Attachment>
              <Attachment fileName="test.pdf"></Attachment>
            </div>
            <Link to="/request/123/submit">
              <Button>{t("translator.singleRequest.submit")}</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRequest;
