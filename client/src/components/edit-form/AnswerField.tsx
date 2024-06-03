import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { VisuallyHiddenInput } from "../../utils/VisuallyHiddenInput";
import { cloudinaryFnc } from "../../utils/cloudinaryFnc";
import { FOLDER_NAME, PRESET } from "../../utils/cloudinary";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useCloudinary from "../../hooks/useCloudinaryMutation";
import {
  useEditFieldMutation,
  useChangePhotoMutation,
  useAddPhotoMutation,
  useDeletePhotoMutation,
  appApi,
} from "../../redux/api/appApi";
import { setError } from "../../redux/slices/apiResponseSlice";
import { useAppDispatch } from "../../redux/store";
import PublishSharpIcon from "@mui/icons-material/PublishSharp";

const styleColOne = [
  { width: "100%", display: 'flex', justifyContent: 'space-evenly' },
  { width: "60%", flexDirection: "column" },
];
const styleColTwo = { width: "40%" };

interface Props {
  field: string;
  fieldValue: string;
  photo: string;
  photoField: string;
  cardId: number;
  fieldName: string; // For the typography
}

export default function AnswerField({
  field,
  cardId,
  fieldName,
  photo,
  photoField,
  fieldValue,
}: Props) {
  const cld = cloudinaryFnc();

  // Getting the mutations
  const [editField, { isLoading }] = useEditFieldMutation();
  const [changePhoto, { isLoading: photoLoading }] = useChangePhotoMutation();
  const [addPhoto, { isLoading: addLoading }] = useAddPhotoMutation();
  const [deletePhoto, { isLoading: deleteLoading }] = useDeletePhotoMutation();

  // Getting what is needed from the Redux Store
  const dispatch = useAppDispatch();

  // Using React Hook Form
  const { control, getValues, setValue, handleSubmit } = useForm();
  const submitEditField = () => {
    const input = { id: cardId, field: field, value: getValues(`${field}`) };
    editField(input);
    dispatch(appApi.util.invalidateTags(["Card"]));
  };
  const submitToCloudinary = useCloudinary();

  const submitPhoto = async (field: string) => {
    const temp = getValues(field);
    if (temp === undefined) {
      return;
    }
    const formData = new FormData();

    formData.append("file", temp[0]);
    formData.append("upload_preset", PRESET);
    formData.append("folder", FOLDER_NAME);

    try {
      await submitToCloudinary(formData).then((res) => setValue(field, res));
    } catch (error) {
      dispatch(setError(`Error submitting ${field}: ${error}`));
    }
  };
  const submitChangePhoto = async () => {
    await submitPhoto("changePhoto");
    const input = {
      id: cardId,
      field: photoField,
      oldPublicId: photo,
      newPublicId: getValues("changePhoto"),
    };
    try {
      await changePhoto(input);
      dispatch(appApi.util.invalidateTags(["Card"]));
    } catch (error) {
      dispatch(setError(`Error while trying to change the photo: ${error}`));
    }
  };

  const submitAddPhoto = async () => {
    await submitPhoto("addPhoto");
    const input = {
      id: cardId,
      field: photoField,
      publicId: getValues("addPhoto"),
    };
    try {
      await addPhoto(input);
      dispatch(appApi.util.invalidateTags(["Card"]));
    } catch (error) {
      dispatch(setError(`Error while trying to add the photo: ${error}`));
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const input = {
        id: cardId,
        field: photoField,
        publicId: photo,
      };
      await deletePhoto(input);
      dispatch(appApi.util.invalidateTags(["Card"]));
    } catch (error) {
      dispatch(setError(`Error while trying to delete the photo: ${error}`));
    }
  };

  return (
    <Box className="answer-field-wrapper">
      <Box
        className="answer-field-col-one"
        sx={photo === null ? styleColOne[0] : styleColOne[1]}
      >
        <Box className="answer-field-input">
          <Typography variant="h6" >Edit {fieldName}:</Typography>
          <Controller
            control={control}
            name={fieldName}
            render={({ field }) => (
              <TextField
                className="input"
                autoFocus
                {...field}
        sx={photo === null ? {width: '22rem'} : {width: '70%'}}
                defaultValue={fieldValue}
                onChange={(e) => setValue(fieldName, e.target.value)}
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
        <Box
          className="button-box"
          sx={photo === null ? { width: "40%" } : { width: "100%" }}
        >
          {photo === null ? (
            <>
              <Controller
                name="addPhoto"
                control={control}
                render={({ field }) => (
                  <Button
                    component="label"
                    variant="contained"
                    color="info"
                    size="large"
                    className="btn add-btn"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                  >
                    Add Photo
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </Button>
                )}
              />
              {addLoading ? (
                <Button className="btn submit-btn">
                  <CircularProgress />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit(() => submitAddPhoto())}
                  sx={{ height: "5vh" }}
                  className="btn submit-btn"
                >
                  <PublishSharpIcon />
                </Button>
              )}
            </>
          ) : (
            <>
              <Controller
                name="changePhoto"
                control={control}
                render={({ field }) => (
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    color="info"
                    className="btn add-btn"
                    size="large"
                  >
                    Change Photo
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </Button>
                )}
              />
              {photoLoading ? (
                <Button className="btn submit-btn">
                  <CircularProgress />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit(() => submitChangePhoto())}
                  className="btn submit-btn"
                >
                  <PublishSharpIcon />
                </Button>
              )}
            </>
          )}
          {deleteLoading ? (
            <Button className="btn submit-delete">
              <CircularProgress />
            </Button>
          ) : (
            <Button
              color="warning"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleDeletePhoto}
              className="btn submit-delete"
            >
              DELETE PHOTO
            </Button>
          )}
        </Box>
      </Box>
      <Box
        className="answer-field-col-two"
        sx={photo !== null ? styleColTwo : null}
      >
        {photo !== null && (
          <AdvancedImage cldImg={cld.image(photo).resize(fill().height(200))} />
        )}
      </Box>
    </Box>
  );
}
