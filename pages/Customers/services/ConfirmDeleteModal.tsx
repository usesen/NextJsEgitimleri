import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmDeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Kayıt Silme Onayı</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bu kaydı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          İptal
        </Button>
        <Button variant='danger' onClick={handleConfirm}>
          Sil
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDeleteModal;
