import Attachment from "@/components/Attatchment";
import Combobox from "@/components/Combobox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { HiDownload } from "react-icons/hi";
import Chat from "@/containers/Chat";
import useI18n from "@/hooks/useI18n";

const SingleRequest = () => {
  const { t } = useI18n();
  // reopen
  const [isReopenDialogOpen, setIsReopenDialogOpen] = useState(false);
  const [reopenNotes, setReopenNotes] = useState("");

  // reassign
  const translators = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];
  const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false);
  const [reassignedTranslator, setReassignedTranslator] = useState("");

  // approve
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);

  const onReopen = () => {
    console.log(reopenNotes);
    setReopenNotes("");
    setIsReopenDialogOpen(false);
  };

  const onReassign = () => {
    console.log(reassignedTranslator);
    setReassignedTranslator("");
    setIsReassignDialogOpen(false);
  };

  const onApprove = () => {
    console.log("approve");
    setIsApproveDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 lg:overflow-hidden lg:auto-rows-fr">
      {/* Grid Item 1 */}
      <div className="bg-white p-4 rounded-xl overflow-y-auto">
        {/* details */}
        <div className="flex flex-col gap-2">
          <h2>{t("supervisor.singleRequest.basicInfo")}</h2>
          <p>
            <b className="text-primary">
              {t("supervisor.singleRequest.requestId")}{" "}
            </b>
            123587
          </p>
          <p>
            <b className="text-primary">
              {t("supervisor.singleRequest.service")}{" "}
            </b>
            Translation
          </p>
          <p>
            <b className="text-primary">
              {t("supervisor.singleRequest.agentName")}{" "}
            </b>
            Agent Name
          </p>
          <p>
            <b className="text-primary">
              {t("supervisor.singleRequest.translator")}{" "}
            </b>
            Translator Name
          </p>
          <p>
            <b className="text-primary">
              {t("supervisor.singleRequest.status")}{" "}
            </b>
            <Badge variant="success">Finished</Badge>
          </p>
          <p>
            <b className="text-primary">
              {t("supervisor.singleRequest.description")}{" "}
            </b>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea,
            excepturi neque delectus, architecto aperiam velit quis reiciendis
            doloribus veniam tenetur saepe est veritatis aut explicabo! At
            voluptatem a dolores nam!
          </p>
        </div>
      </div>

      {/* Grid Item 2 */}
      <div className="h-full max-h-[500px] overflow-y-auto flex-1 flex flex-col gap-4 bg-white p-4 rounded-xl">
        <Chat messages={[]} />
      </div>

      {/* Grid Item 3 */}
      <div className="bg-white overflow-y-auto p-4 rounded-xl">
        <div className="flex flex-col gap-2">
          <div className="head flex flex-wrap justify-between mb-4">
            <h2>{t("supervisor.singleRequest.attachments")}</h2>
            <Button size="sm" variant="subtle">
              <HiDownload />
              {t("supervisor.singleRequest.downloadAll")}
            </Button>
          </div>
          <Attachment fileName="test.pdf"></Attachment>
          <Attachment fileName="test.pdf"></Attachment>
          <Attachment fileName="test.pdf"></Attachment>
        </div>
      </div>

      {/* Grid Item 4 */}
      <div className="bg-white overflow-y-auto p-4 rounded-xl">
        <div className="flex flex-col gap-2">
          <div className="head flex flex-wrap justify-between mb-4">
            <h2>{t("supervisor.singleRequest.translations")}</h2>
            <Button size="sm" variant="subtle">
              <HiDownload />
              {t("supervisor.singleRequest.downloadAll")}
            </Button>
          </div>
          <Attachment fileName="test.pdf"></Attachment>
          <Attachment fileName="test.pdf"></Attachment>
          <Attachment fileName="test.pdf"></Attachment>
        </div>
      </div>

      {/* reopen dialog */}
      <Dialog open={isReopenDialogOpen} onOpenChange={setIsReopenDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are your sure to reopen this request?</DialogTitle>
            <DialogDescription>
              <Textarea
                placeholder="Any notes you want to attach..."
                value={reopenNotes}
                onChange={(e) => setReopenNotes(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onReopen}>Reopen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* reassign dialog */}
      <Dialog
        open={isReassignDialogOpen}
        onOpenChange={setIsReassignDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reassign to another translator?</DialogTitle>
            <DialogDescription asChild>
              <>
                <p>
                  Are your sure to reassign this request to another translator
                </p>
                <Combobox
                  noItemsTemplate="no items"
                  onChange={setReassignedTranslator}
                  value={reassignedTranslator}
                  placeholder="choose translator..."
                  options={translators}
                ></Combobox>
              </>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onReassign}>Reassign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* approve dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are your sure to reopen this request?</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve note: this is permanent
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="subtle">Cancel</Button>
            </DialogTrigger>
            <Button onClick={onApprove}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleRequest;
