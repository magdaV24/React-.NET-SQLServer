import {
  MenuItem,
  Box,
  Button,
  Select as List,
  Modal,
  TextField,
} from "@mui/material";
import { Select } from "../types/SelectType";
import { useAppSelector, RootState, useAppDispatch } from "../redux/store";
import { Controller, useForm } from "react-hook-form";
import { setCategory, setLimit } from "../redux/slices/gameSlice";
import { useState } from "react";
import '../styles/forms/gameForm.css'

interface Props {
  open: boolean;
  handleClose: () => void;
  data: Select[] | undefined;
  handleOpenGame: ()=>void;
}
export default function GameForm({ open, handleClose, data, handleOpenGame }: Props) {
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();
  const category = useAppSelector(
    (state: RootState) => state.gameReducer.category
  );
  const { control, handleSubmit, getValues } = useForm();

  const chooseCategory = () => {
    const input = getValues("category");
    dispatch(setCategory(input));
  };

  const chooseLimit = () => {
    const input = getValues("limit");
    dispatch(setLimit(input));
  };

  const onSubmit=()=>{
    chooseLimit();
    handleOpenGame();
  }

  return (
    <Modal open={open} onClose={handleClose} className="modal">
      <Box sx={{backgroundColor: 'background.paper'}} className="game-form-wrapper">
      <Box className='category-field-wrapper'>
      <Controller
          name="category"
          control={control}
          defaultValue={data ? data[0].category : ""}
          rules={{ required: "The category is required!" }}
          render={({ field }) => (
            <List
              {...field}
              labelId="category-select"
              label="Category"
              className="list"
            >
              <MenuItem>
                <em>None</em>
              </MenuItem>
              {data &&
                data.map((item) => (
                  <MenuItem
                    key={Math.random()}
                    value={item.category}
                    onClick={() => setCount(item.count)}
                  >
                    {item.category}
                  </MenuItem>
                ))}
            </List>
          )}
        />
        <Button
          variant="contained"
          className="set-category-button"
          onClick={handleSubmit(chooseCategory)}
        >
          Choose Category
        </Button>
      </Box>

        {category !== "" && (
          <>
            <Controller
              name="limit"
              control={control}
              defaultValue={1}
              rules={{
                required: "Limit required!",
              }}
              render={({ field }) => (
                <TextField
                  id="limit-standard-basic"
                  label="Number of questions"
                  variant="outlined"
                  autoFocus
                  type="number"
                  {...field}
                  inputProps={{
                    min: 1,
                    step: 1,
                    max: count,
                  }}
                  className="input"
                />
              )}
            />
            <Button
              variant="contained"
              className="set-limit-button"
              onClick={handleSubmit(onSubmit)}
            >
              Start quiz
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
