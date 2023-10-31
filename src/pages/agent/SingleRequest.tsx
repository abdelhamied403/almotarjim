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
          <h2>{t("agent.singleRequest.basicInfo")}</h2>
          <p>
            <b className="text-primary">
              {t("agent.singleRequest.requestId")}{" "}
            </b>
            123587
          </p>
          <p>
            <b className="text-primary">{t("agent.singleRequest.service")} </b>
            Translation
          </p>
          <p>
            <b className="text-primary">
              {t("agent.singleRequest.agentName")}{" "}
            </b>
            Agent Name
          </p>
          <p>
            <b className="text-primary">
              {t("agent.singleRequest.translator")}{" "}
            </b>
            Translator Name
          </p>
          <p>
            <b className="text-primary">{t("agent.singleRequest.status")} </b>
            <Badge variant="success">Finished</Badge>
          </p>
          <p>
            <b className="text-primary">
              {t("agent.singleRequest.description")}{" "}
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
            <h2>{t("agent.singleRequest.attachments")}</h2>
            <Button size="sm" variant="subtle">
              <HiDownload />
              {t("agent.singleRequest.downloadAll")}
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
            <h2>{t("agent.singleRequest.translations")}</h2>
            <Button size="sm" variant="subtle">
              <HiDownload />
              {t("agent.singleRequest.downloadAll")}
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
            <DialogTitle>{t("agent.singleRequest.dialog.alert")}</DialogTitle>
            <DialogDescription>
              <Textarea
                placeholder={t("agent.singleRequest.dialog.anyNotes")}
                value={reopenNotes}
                onChange={(e) => setReopenNotes(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onReopen}>
              {t("agent.singleRequest.dialog.reopen")}
            </Button>
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
            <DialogTitle>
              {t("agent.singleRequest.dialog.reassign.alert")}
            </DialogTitle>
            <DialogDescription asChild>
              <>
                <p>{t("agent.singleRequest.dialog.reassign.desc")}</p>
                <Combobox
                  noItemsTemplate="no items"
                  onChange={setReassignedTranslator}
                  value={reassignedTranslator}
                  placeholder={t(
                    "agent.singleRequest.dialog.reassign.chooseTranslator"
                  )}
                  options={translators}
                ></Combobox>
              </>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onReassign}>
              {t("agent.singleRequest.dialog.reassign.reassign")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* approve dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("agent.singleRequest.dialog.approve.alert")}
            </DialogTitle>
            <DialogDescription>
              {t("agent.singleRequest.dialog.reassign.desc")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="subtle">
                {t("agent.singleRequest.dialog.reassign.cancel")}
              </Button>
            </DialogTrigger>
            <Button onClick={onApprove}>
              {t("agent.singleRequest.dialog.reassign.approve")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleRequest;
