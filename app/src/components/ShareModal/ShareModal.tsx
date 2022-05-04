import React, { FunctionComponent } from "react";

import { Modal } from "./ShareModal.sc";

const ShareModal: FunctionComponent = () => {
    return (
        <Modal open={true}>
            <div>Hello world</div>
        </Modal>
    );
};

export default ShareModal;
