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

const SingleRequest = () => {
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
    <div className="single-request">
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
          <div className="flex flex-col gap-2">
            {/* actions */}
            <div className="bg-white p-4 rounded-xl">
              <div className="flex flex-wrap gap-2 sm:justify-between justify-center items-center">
                <Button onClick={() => setIsReopenDialogOpen(true)}>
                  Reopen
                </Button>
                <Button onClick={() => setIsReassignDialogOpen(true)}>
                  Reassign
                </Button>
                <Button onClick={() => setIsApproveDialogOpen(true)}>
                  Approve
                </Button>
              </div>
            </div>
            {/* chat */}
            <div className="flex-1 bg-white p-4 rounded-xl">
              <Chat />
            </div>
          </div>

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
