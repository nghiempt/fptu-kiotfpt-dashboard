import React, { useState } from "react";
import { Modal, Button, Input, TextArea } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

interface ModalChangeStatusProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: (reason: string) => void;
}

const ModalChangeStatus: React.FC<ModalChangeStatusProps> = ({
  open,
  setOpen,
  onConfirm,
}) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim() === "") {
      toast({
        type: "error",
        icon: "exclamation",
        title: "Validation Error",
        description: "Reason is required",
        time: 1000,
      });
      return;
    }
    onConfirm(reason);
    setReason("");
    setOpen(false);
  };

  return (
    <Modal
      size="small"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Modal.Header>Provide Reason</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          placeholder="Enter reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="grey" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          color="blue"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalChangeStatus;
