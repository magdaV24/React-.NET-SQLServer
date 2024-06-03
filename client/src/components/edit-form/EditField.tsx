import { Box, Typography, TextField, CircularProgress, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEditFieldMutation, appApi } from "../../redux/api/appApi";
import PublishSharpIcon from "@mui/icons-material/PublishSharp";
import { useAppDispatch } from "../../redux/store";

interface Props {
    fieldName: string;
    fieldValue: string;
    cardId: number;
  }

export default function EditField({fieldName, fieldValue, cardId}:Props) {
    const { control, getValues, setValue, handleSubmit } = useForm();
    const [editField, { isLoading }] = useEditFieldMutation();
    const dispatch = useAppDispatch();
    const submitEditField = () => {
      const input = {
        id: cardId,
        field: fieldName,
        value: getValues(`${fieldName}`),
      };
      editField(input);
      dispatch(appApi.util.invalidateTags(["Card"]));
    };
 return(
    <Box className="edit-field-wrapper">
    <Typography variant="h5" className='field-name'>Edit {fieldName}:</Typography>
    <Box className="field-form">
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <TextField
            autoFocus
            {...field}
            defaultValue={fieldValue}
            onChange={(e) => setValue(fieldName, e.target.value)}
            className="field"
          />
        )}
      />

      {isLoading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={handleSubmit(() => submitEditField())}
          sx={{ height: "7vh" }}
        >
          <PublishSharpIcon />
        </Button>
      )}
    </Box>
  </Box>
 )   
}
