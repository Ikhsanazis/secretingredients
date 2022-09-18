import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
// import { useContacts } from '../contexts/ContactsProvider'

export default function NewContactModal({ closeModal }) {
  //   const { id } = props;
  //   const { createContact } = useContacts()
  //   const [image, setImage] = useState("");

  function handleSubmit(e) {
    axios
      .patch(`https://sweettooth-app.herokuapp.com/user/editimage/${id}`, {
        image,
      })
      .then((response) => {
        // setMessage(response?.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile picture Berhasil diedit",
        });
      })
      .catch(({ response }) => {
        setMessage(response?.data?.message);
        setError({ isError: true, errorMsg: message });
        Swal.fire({
          icon: "warning",
          title: "failed",
          text: "Terjadi Error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Edit Profile</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button className="btn-warning" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
