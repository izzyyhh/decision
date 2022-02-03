import IOption from "@app/types/IOption";
import { Input } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";



interface IProps {
    value: string;
    options: Array<IOption>
}

const Option: FunctionComponent<IProps> = ({value}) => {
    const [option, setOption] = useState(value);

    return (
        <>
            <Input name="option" type="text" value={option} onChange={(e) => setOption(e.target.value)} />
        </>
    )
}

export default Option;