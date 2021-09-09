import { Modal as MateialModal, Backdrop, Fade } from "@material-ui/core";
import classes from "./Modal.module.css";
import { ModalProps } from "./Modal.types";

export const Modal = ({ children, handleClose, open }: ModalProps) => {
  return (
    <MateialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes["modal"]}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
        <Fade in={open}>
            {children}
        </Fade>
    </MateialModal>
  );
};
