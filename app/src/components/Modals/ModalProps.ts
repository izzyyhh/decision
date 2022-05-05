export interface ModalProps {
    open: boolean;
    setOpen: any;
    handleClose: (a?: any) => void;
    getOptionsList: (a: any) => any;
    query: any;
}
