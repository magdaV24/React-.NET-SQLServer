import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AddCardSharpIcon from "@mui/icons-material/AddCardSharp";
import SingleFieldController from "../components/add-card-form/SingleFieldController";
import AnswerFieldController from "../components/add-card-form/AnswerFieldController";
import CheckboxController from "../components/add-card-form/CheckboxController";
import "../styles/forms/addCard.css";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import useCloudinary from "../hooks/useCloudinaryMutation";
import { FOLDER_NAME, PRESET } from "../utils/cloudinary";
import { checkIfCardHasPhotos } from "../utils/checkIfCardHasPhotos";
import { useAddCardMutation } from "../redux/api/appApi";
import { setError, setMessage } from "../redux/slices/apiResponseSlice";

interface AddCardProps {
  open: boolean;
  onClose: () => void;
}

export default function AddCard({ open, onClose }: AddCardProps) {
  const { control, getValues, handleSubmit, setValue, reset } = useForm();
  const user = useAppSelector((state: RootState)=>state.tokenReducer.user)

  const dispatch = useAppDispatch();
  const submitToCloudinary = useCloudinary();

  const [addCard, {isLoading}] = useAddCardMutation();

  const handlePublic=(input: boolean)=>{
    if(input){
      return 1;
    }else{
      return 0;
    }
  }
  
  const submitPhoto = async (field: string) => {
    const temp = getValues(field);
    if (temp === undefined) {
      setValue(field, " ");
      return 0;
    }
    const formData = new FormData();

    formData.append("file", temp[0]);
    formData.append("upload_preset", PRESET);
    formData.append("folder", FOLDER_NAME);

    try {
      await submitToCloudinary(formData).then((res) => setValue(field, res));
      return 1;
    } catch (error) {
      dispatch(setError(`Error submitting ${field}: ${error}`));
    }
  };

  const onSubmit = async () => {
    const userId = user?.id;
    const checkOne = await submitPhoto("answerPhoto");
    const checkTwo = await submitPhoto("wrongAnswerOnePhoto");
    const checkThree = await submitPhoto("wrongAnswerTwoPhoto");
    const checkFour = await submitPhoto("wrongAnswerThreePhoto");

    const check = checkIfCardHasPhotos(
      checkFour,
      checkThree,
      checkTwo,
      checkOne
    );

    try {
      const input = {
        category: getValues("category"),
        question: getValues("question"),
        answer: getValues("answer"),
        wrongAnswerOne: getValues("wrongAnswerOne"),
        wrongAnswerTwo: getValues("wrongAnswerTwo"),
        wrongAnswerThree: getValues("wrongAnswerThree"),
        userId: userId,
        public: handlePublic(getValues("public")),
        hasPhotos: check,
      };

      if (!check) {
        await addCard(input).then((res)=>dispatch(setMessage(`${res}`)));
        reset();
      } else {
        const newInput = {
          ...input,
          answerPhoto: getValues("answerPhoto"),
          wrongAnswerOnePhoto: getValues("wrongAnswerOnePhoto"),
          wrongAnswerTwoPhoto: getValues("wrongAnswerTwoPhoto"),
          wrongAnswerThreePhoto: getValues("wrongAnswerThreePhoto"),
        };
        await addCard(newInput).then((res)=>dispatch(setMessage(`${res}`)));
        reset();
      }
    } catch (error) {
      dispatch(setError(`Error while trying to submit the card: ${error}`));
    }
  };
  return (
    <Modal open={open} onClose={onClose} className="modal">
      <Box
        className="form-wrapper add-card-form"
        sx={{ backgroundColor: "background.paper" }}
      >
        <Box className="form-header" title="Card Form">
          <AddCardSharpIcon sx={{ fontSize: "2.5rem" }} />
          <Typography variant="h4">Add a new card</Typography>
        </Box>
        <Box className="fields-container">
          <SingleFieldController
            control={control}
            name={"category"}
            requiredMessage={"The category field is required!"}
            id={"category-field"}
            label={"Category"}
          />
          <SingleFieldController
            control={control}
            name={"question"}
            requiredMessage={"The question field is required!"}
            id={"question-field"}
            label={"Question"}
          />
          <AnswerFieldController
            control={control}
            name={["answer", "answerPhoto"]}
            id={["answer-field", "answer-photo-field"]}
            label={"The correct answer"}
          />
          <AnswerFieldController
            control={control}
            name={["wrongAnswerOne", "wrongAnswerOnePhoto"]}
            id={["wrong-answer-one-field", "wrong-answer-one-photo-field"]}
            label={"Wrong answer"}
          />
          <AnswerFieldController
            control={control}
            name={["wrongAnswerTwo", "wrongAnswerTwoPhoto"]}
            id={["wrong-answer-two-field", "wrong-answer-two-photo-field"]}
            label={"Wrong answer"}
          />
          <AnswerFieldController
            control={control}
            name={["wrongAnswerThree", "wrongAnswerThreePhoto"]}
            id={["wrong-answer-three-field", "wrong-answer-three-photo-field"]}
            label={"Wrong answer"}
          />
          <CheckboxController
            control={control}
            name={"public"}
            id={"checkbox-id"}
            label={"Do you want to make this card public?"}
          />

          {isLoading ? (
              <Box>
                <CircularProgress />
              </Box>
            ) : (
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            SUBMIT CARD
          </Button>
            )}
        </Box>
      </Box>
    </Modal>
  );
}