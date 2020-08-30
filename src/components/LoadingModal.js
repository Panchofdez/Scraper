import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const LoadingModal = ({ visible, setVisible }) => {
  return (
    <Modal
      show={visible}
      onHide={() => setVisible(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Body>
        <div className="justify-content-center p-5">
          <Spinner animation="grow" className="mr-5" />
          Fetching your results...
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
