import "date-fns";

import { Add, AddButton } from "@components/Option/Tinder/Tinder.sc";
import DateFnsAdapter from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Option } from "@pages/CreateDecision/CreateDecision";
import React, { FunctionComponent, useEffect, useState } from "react";

interface Props {
    update: (values: Array<Option>) => void;
}

const DateOption: FunctionComponent<Props> = ({ update }) => {
    const [options, setOptions] = useState<Array<Option>>([{ value: new Date(), key: 0 }]);
    const [amountOptions, setAmountOptions] = useState<number>(1);

    const handleUpdate = (value: any, key: number) => {
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

    useEffect(() => {
        handleUpdate(new Date(), amountOptions - 1);
    }, [amountOptions]);

    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsAdapter}>
                {Array.from(Array(amountOptions)).map((x, idx) => (
                    <div key={idx}>
                        {options.length > idx && (
                            <DateTimePicker
                                key={idx}
                                label="Date&Time picker"
                                value={options[idx].value}
                                fullWidth
                                onChange={(date) => handleUpdate(date, idx)}
                            />
                        )}
                    </div>
                ))}
            </MuiPickersUtilsProvider>

            <AddButton onClick={() => setAmountOptions(amountOptions + 1)}>
                <Add />
            </AddButton>
        </>
    );
};

export default DateOption;
