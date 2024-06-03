import {
  Box,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PublishSharpIcon from "@mui/icons-material/PublishSharp";
import { useEditPublicMutation, appApi } from "../../redux/api/appApi";
import { useAppDispatch } from "../../redux/store";

interface Props {
  cardId: number;
  value: number;
}
export default function EditPublic({ cardId, value }: Props) {
  const { control, setValue, getValues, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const [editPublic, { isLoading: publicLoading }] = useEditPublicMutation();
  const submitEditPublic = (input: boolean) => {
    const edit = { id: cardId, value: getValues("Public") };
    if (input === false) {
      edit.value = 0;
    } else {
      edit.value = 1;
    }
    editPublic(edit);
    dispatch(appApi.util.invalidateTags(["Cards"]));
  };
  const setPublic = (input: number) => {
    if (input === 1) {
      return true;
    }
    false;
  };
  return (
    <Box>
      <Controller
        name="Public"
        control={control}
        defaultValue={setPublic(value)}
        render={({ field }) => (
          <FormControlLabel
            label="Make this card public?"
            control={
              <Checkbox
                checked={field.value}
                onChange={() => setValue("Public", !field.value)}
              />
            }
          />
        )}
      />
      {publicLoading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <Button
          variant="outlined"
          onClick={handleSubmit(() => submitEditPublic(getValues("Public")))}
          sx={{ height: "7vh" }}
        >
          <PublishSharpIcon />
        </Button>
      )}
    </Box>
  );
}
