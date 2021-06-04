import { ReactElement } from "react";

export type ModalProps = {
  children: ReactElement;
  open: boolean;
  handleClose: (open: boolean) => void;
};
