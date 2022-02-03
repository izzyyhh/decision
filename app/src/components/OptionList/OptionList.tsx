import IOption from "@app/types/IOption";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import React, { FunctionComponent } from "react";

import { Input, List, ListElement } from "./OptionList.cs";

interface IProps {
    options: Array<IOption>;
    setOptions: React.Dispatch<React.SetStateAction<Array<IOption>>>;
}

const OptionList: FunctionComponent<IProps> = ({ options, setOptions }) => {
    const deleteOption = (index: number) => {
        setOptions(options.filter((el, i) => i !== index));
    };

    const changeOption = (newValue: string, index: number) => {
        options[index].name = newValue;
        setOptions(options);
    };

    return (
        <List>
            {options.map((option, index) => (
                <ListElement key={index}>
                    <Input name="option" type="text" value={option.name} onChange={(e) => changeOption(e.target.value, index)} />
                    <DeleteSharpIcon onClick={() => deleteOption(index)} color="primary"></DeleteSharpIcon>
                </ListElement>
            ))}
        </List>
    );
};

export default OptionList;
