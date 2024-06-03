import { TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

interface Props{
    control: Control<FieldValues> | undefined;
    name: string;
    requiredMessage: string;
    id: string;
    label: string  
}
export default function SingleFieldController({control, name, requiredMessage, id, label}: Props) {
    return(
        <Controller
            name={name}
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: requiredMessage
              },
              validate: (value: string) => value !== "" || false,
            }}
            render={({ field }) => (
              <TextField
                id={id}
                label={label}
                variant="outlined"
                autoFocus
                {...field}
              />
            )}
          />
    )
}
