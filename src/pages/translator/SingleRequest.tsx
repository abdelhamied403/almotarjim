import Attachment from "@/components/Attatchment";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SingleRequest = () => {
  return (
    <>
      <div className="flex flex-col gap-3 h-full">
        <div className="bg-white flex flex-col gap-2 p-3 rounded-xl">
          <h2 className="text-xl font-normal text-primary">Notes :</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Placerat vel turpis est
            morbi pharetra tortor quis. Aenean enim faucibus fringilla id
            elementum malesuada. Praesent turpis facilisis ornare scelerisque
            nec elementum. Massa dignissim gravida euismod ullamcorper nulla
            scelerisque lectus lectus sed.Lorem ipsum dolor sit amet
            consectetur. Placerat vel turpis est morbi{" "}
          </p>
        </div>
        <div className="flex-1 w-full ">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 bg-white p-3 rounded-xl overflow-y-auto">
              <div className="head flex justify-center">
                <h2>Attachments</h2>
              </div>
              <Attachment fileName="test.pdf"></Attachment>
              <Attachment fileName="test.pdf"></Attachment>
              <Attachment fileName="test.pdf"></Attachment>
              <Attachment fileName="test.pdf"></Attachment>
            </div>
            <Link to="/request/123/submit">
              <Button>Submit</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRequest;
