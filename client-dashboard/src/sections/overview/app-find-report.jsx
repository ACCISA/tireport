import { Autocomplete, TextField } from "@mui/material";

export default function FindReport(){
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["test","test"]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Report Id" />}
        />
    )
}