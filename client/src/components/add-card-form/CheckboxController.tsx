import { FormControlLabel, Checkbox } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

interface Props{
    control: Control<FieldValues> | undefined;
    name: string;
    id: string;
    label: string  
}

export default function CheckboxController({control, name, id, label}: Props) {
 return(
    <Controller
    name={name}
    control={control}
    defaultValue={false}
    render={({ field }) => (
      <FormControlLabel
        label={label}
        id={id}
        control={
          <Checkbox
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          />
        }
      />
    )}
  />
 )   
}
