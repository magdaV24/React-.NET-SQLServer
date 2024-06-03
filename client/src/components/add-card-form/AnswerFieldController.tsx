import { Box, Button, TextField } from "@mui/material";
import { Control, Controller, FieldValues, useForm } from "react-hook-form";
import { VisuallyHiddenInput } from "../../utils/VisuallyHiddenInput";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Props {
  control: Control<FieldValues> | undefined;
  name: string[];
  requiredMessage?: string;
  id: string[];
  label: string;
}

export default function AnswerFieldController({
  control,
  name,
  id,
  label,
}: Props) {
  const { getValues } = useForm();
  return (
    <Box className="answer-field-wrapper">
      <Controller
        name={name[0]}
        control={control}
        defaultValue=""
        rules={{
          validate: (value) => {
            if (value === "" && getValues(name[1]) === undefined) {
              return false;
            }
            return true;
          },
        }}
        render={({ field }) => (
          <TextField
            id={id[0]}
            label={label}
            variant="outlined"
            autoFocus
            fullWidth
            {...field}
          />
        )}
      />
      <Controller
        name={name[1]}
        control={control}
        render={({ field }) => (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Add Photo
            <VisuallyHiddenInput
              id={id[1]}
              type="file"
              onChange={(e) => field.onChange(e.target.files)}
            />
          </Button>
        )}
      />
    </Box>
  );
}
