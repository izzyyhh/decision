import BackupIcon from "@material-ui/icons/Backup";
import React, { FormEvent, FunctionComponent, useEffect, useState } from "react";

import { Image, Input, Label, Preview, Reset, Wrapper } from "./FileUpload.sc";

interface Props {
    update: (values: File) => void;
}

export type FileEventTarget = FormEvent<HTMLInputElement> & { files: FileList };

const FileUpload: FunctionComponent<Props> = ({ update }) => {
    const [file, setFile] = useState<File | null>();

    const fileUpload = (event: FormEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files;

        if (file) {
            setFile(file[0]);
        }
    };

    useEffect(() => {
        if (file) {
            update(file);
        }
    }, [file]);

    if (!file) {
        return (
            <Wrapper>
                <BackupIcon />
                <Label>Add File</Label>
                <Input type="file" accept="image/*" onChange={fileUpload} />
            </Wrapper>
        );
    }

    return (
        <Preview>
            <Reset onClick={() => setFile(null)} />
            {file && <Image src={URL.createObjectURL(file)} />}
        </Preview>
    );
};

export default FileUpload;
