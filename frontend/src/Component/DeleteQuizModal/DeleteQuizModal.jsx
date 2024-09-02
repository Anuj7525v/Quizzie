import React from "react";
import styles from "./DeleteQuizModal.module.css";
import { Modal } from "react-responsive-modal";
import toast from "react-hot-toast";
import { deleteQuiz } from "../../Service/quizService";



export const DeleteQuizModal = ({
  openDeleteQuizModal,
  setOpenDeleteQuizModal,
  quId,
}) => {
  const handleDeleteQuiz = async () => {
    try {
        const token = localStorage.getItem("token");
      const res = deleteQuiz(quId,token);      
      toast.success(res?.data?.message);
      setOpenDeleteQuizModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={openDeleteQuizModal}
      onClose={() => setOpenDeleteQuizModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
      size="lg"
      padding={"1.5rem"}
    >
      <div>
        <p className={styles.heading}>
          Are you confirm you <br />
          want to delete?
        </p>

        <div className={styles.btns}>
          <button
            type="button"
            onClick={handleDeleteQuiz}
            className={styles.cancelBtn}
          >
            Confirm Delete
          </button>
          <button
            onClick={() => setOpenDeleteQuizModal(false)}
            className={styles.continueBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};