import Input from "@components/Input/Input";
import { Option } from "@pages/CreateDecision/CreateDecision";
import React, { FunctionComponent, useEffect, useState } from "react";

interface Props {
    update: (values: Array<Option>) => void;
}
const Binare: FunctionComponent<Props> = ({ update }) => {
    const [options, setOptions] = useState<Array<Option>>([]);

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

    useEffect(() => {
        update(options);
    }, [options]);

    return (
        <>
            <Input label="Option 1" update={(value) => handleUpdate(value, 0)} />
            <Input label="Option 2" update={(value) => handleUpdate(value, 1)} />
        </>
    );
};

export default Binare;
