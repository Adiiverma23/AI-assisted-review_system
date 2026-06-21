import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "./components/ui";

function ComponentShowcase() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>Component Showcase</h1>

      <Input placeholder="Enter Review" />

      <Button
        text="Open Modal"
        onClick={() => setShowModal(true)}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <h3>Review Analysis</h3>
        <p>AI Generated Response</p>
      </Modal>

      <Toast message="Review analyzed successfully" />

      <Loader />
    </div>
  );
}

export default ComponentShowcase;