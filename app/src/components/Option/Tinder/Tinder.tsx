import FileUpload from "@components/FileUpload/FileUpload";
import Input from "@components/Input/Input";
import { Option } from "@pages/CreateDecision/CreateDecision";
import React, { FunctionComponent, useEffect, useState } from "react";

import { Add, AddButton, OptionWrapper } from "./Tinder.sc";

interface Props {
    update: (values: Array<Option>) => void;
}

const Tinder: FunctionComponent<Props> = ({ update }) => {
    const [options, setOptions] = useState<Array<Option>>([]);
    const [amountOptions, setAmountOptions] = useState<number>(1);

    const handleUpdate = (value: string, key: number) => {
        if (options.length > 0) {
            let updateOptions = [...options];

            const filter = options.filter((option: any) => option.key === key);

            if (filter.length > 0) {
                updateOptions = options.map((option) => {
                    if (option.key === key) {
                        return { ...option, value: value };
                    }
                    return option;
                });
            } else {
                updateOptions.push({ value, key });
            }
            setOptions(updateOptions);
        } else {
            setOptions([{ key, value }]);
        }
    };

    const handleImage = (image: File, key: number) => {
        if (options.length > 0) {
            let updateOptions = [...options];

            const filter = options.filter((option: any) => option.key === key);

            if (filter.length > 0) {
                updateOptions = options.map((option) => {
                    if (option.key === key) {
                        return { ...option, image: image };
                    }
                    return option;
                });
            } else {
                updateOptions.push({ value: "", image, key });
            }
            setOptions(updateOptions);
        } else {
            setOptions([{ value: "", key, image }]);
        }
    };

    useEffect(() => {
        update(options);
    }, [options]);

    return (
        <>
            {Array.from(Array(amountOptions)).map((x, idx) => (
                <OptionWrapper key={idx}>
                    <Input label={`Option ${idx + 1}`} update={(value) => handleUpdate(value, idx)} />
                    <FileUpload update={(value) => handleImage(value, idx)} />
                </OptionWrapper>
            ))}

            <AddButton onClick={() => setAmountOptions(amountOptions + 1)}>
                <Add />
            </AddButton>
        </>
    );
};

export default Tinder;
