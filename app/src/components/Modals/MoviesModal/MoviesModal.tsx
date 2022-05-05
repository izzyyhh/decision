import { useSnack } from "@context/snackbar/useSnack";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import React, { FunctionComponent, useState } from "react";

import { ModalProps } from "../ModalProps";
import { BootstrapDialog,CssTextField } from "../ModalTools";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      background: 'darkgrey',
      color: 'white',

    },
  },
};


function getStyles(name: string, personName: string[], theme: Theme) {
    const notselected = personName.indexOf(name) === -1
    return {
        fontWeight:
            notselected
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        background: 
            notselected
                    ? 'darkgrey'
                    : 'black',
        color: 
            notselected ? 'black' : 'white' 
    };
  }

const MoviesModal: FunctionComponent<ModalProps> = ({ open, setOpen, handleClose, options }) => {
    
    const theme = useTheme();

    const [amount, setAmount] = useState(10);
    const [title, setTitle] = useState("");
    const { setSnack } = useSnack();
    const [personName, setPersonName] = useState<string[]>([]);
    const submit = () => {
        if (title == "") {
            setSnack({ message: "Felder fehlen", open: true, severity: "warning" });
        } else if (amount < 5 || amount > 50) {
            setSnack({ message: "Anzahl zu groß", open: true, severity: "warning" });
        } else {
            handleClose({amount, title, personName });
        }
    };
const s = {className: {
    color: '#000',
    '&': {
        color: 'yellow',
        background: 'green'
    }
} }
    
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };


    return (
        <div>
            <BootstrapDialog disableEnforceFocus open={open} onClose={submit}>
                <DialogTitle>RestaurantModal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates occasionally.
                    </DialogContentText>
                    <CssTextField
                        autoFocus
                        margin="normal"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    {options && 
                        <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel {...s} 
                        id="demo-multiple-name-label">Genres</InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {options.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name, personName, theme)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    }
                    <CssTextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        label="Anzahl der Vorschläge"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={submit}>Subscribe</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default MoviesModal;
