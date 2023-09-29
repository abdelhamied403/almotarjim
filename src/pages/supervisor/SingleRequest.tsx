import Attachment from "@/components/Attatchment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HiDownload } from "react-icons/hi";

const SingleRequest = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <div className="grid grid-rows-2 gap-4">
          <div className="bg-white p-4 rounded-xl">
            {/* details */}
            <div className="flex flex-col gap-2">
              <h2>Basic Information</h2>
              <p>
                <b className="text-primary">Request id: </b>
                123587
              </p>
              <p>
                <b className="text-primary">Service: </b>
                Translation
              </p>
              <p>
                <b className="text-primary">Agent: </b>
                Agent Name
              </p>
              <p>
                <b className="text-primary">Translator: </b>
                Translator Name
              </p>
              <p>
                <b className="text-primary">Status: </b>
                <Badge variant="success">Finished</Badge>
              </p>
              <p>
                <b className="text-primary">Description: </b>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea,
                excepturi neque delectus, architecto aperiam velit quis
                reiciendis doloribus veniam tenetur saepe est veritatis aut
                explicabo! At voluptatem a dolores nam!
              </p>
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white p-4 rounded-xl">
            <div className="flex flex-col gap-2">
              <div className="head flex flex-wrap justify-between mb-4">
                <h2>Attachments</h2>
                <Button size="sm" variant="subtle">
                  <HiDownload />
                  Download all
                </Button>
              </div>
              <Attachment fileName="test.pdf"></Attachment>
              <Attachment fileName="test.pdf"></Attachment>
              <Attachment fileName="test.pdf"></Attachment>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-4">
          {/* chat */}
          <div className="bg-white p-4 rounded-xl">chat</div>

          {/* Translations */}
          <div className="bg-white p-4 rounded-xl">
            <div className="flex flex-col gap-2">
              <div className="head flex flex-wrap justify-between mb-4">
                <h2>Translations</h2>
                <Button size="sm" variant="subtle">
                  <HiDownload />
                  Download all
                </Button>
              </div>
              <Attachment fileName="test.pdf"></Attachment>
              <Attachment fileName="test.pdf"></Attachment>
              <Attachment fileName="test.pdf"></Attachment>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRequest;
