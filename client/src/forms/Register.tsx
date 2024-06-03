// React imports
import { useEffect } from "react";

// Axios imports
import { AxiosResponse } from "axios";

// MUI imports
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

// React hook form imports
import { useForm, Controller } from "react-hook-form";

// Redux imports
import { useRegisterMutation } from "../redux/api/appApi";
import { setError, setMessage } from "../redux/slices/apiResponseSlice";
import { setDoNotRememberMe } from "../redux/slices/tokenSlice";
import { useAppDispatch } from "../redux/store";

// Cloudinary utils
import useCloudinary from "../hooks/useCloudinaryMutation";
import { FOLDER_NAME, PRESET } from "../utils/cloudinary";

// Custom components
import { VisuallyHiddenInput } from "../utils/VisuallyHiddenInput";
import PasswordPattern from "../components/PasswordPattern";

interface Props {
  open: boolean;
  onClose: () => void;
  handleGoToLogin: () => void;
}

export default function Register({ open, onClose, handleGoToLogin }: Props) {
  const {
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!.@#$%^&*]{8,}$/;

  // Registration functionality

  const submitToCloudinary = useCloudinary();

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const submitRegistration = async () => {
    const temp = getValues("avatar");
    if (temp === undefined) {
      return console.log("Undefined avatar");
    }
    const formData = new FormData();

    formData.append("file", temp[0]);
    formData.append("upload_preset", PRESET);
    formData.append("folder", FOLDER_NAME);
    try {
      // Storing the avatar to cloudinary and keeping the public_id as the avatar field in the database.
      await submitToCloudinary(formData).then((res) => setValue("avatar", res));

      // Submitting the  registration data to the database using the register mutation
      const res = (await register({
        email: getValues("email"),
        username: getValues("username"),
        password: getValues("password"),
        avatar: getValues("avatar"),
      })) as AxiosResponse;
      const token = res.data.token;

      // After a successful registration, the new user will be logged in, but only temporarily
      dispatch(setDoNotRememberMe(token));

      // Giving the user the confirmation that they succeeded
      dispatch(setMessage("The registration was successful!"));

      // Resetting the form
      reset();
    } catch (error) {
      // Catching an eventual registration error and displaying it using the apiResponseSlice
      dispatch(setError(`Registration error: ${error}`));
    }
  };

  // Catching the errors that might occur while using react-hook-form
  useEffect(() => {
    if (errors.username) {
      dispatch(setError(`Username error: ${errors.username.message}`));
    }
    if (errors.email) {
      dispatch(setError(`Email error: ${errors.email.message}`));
    }
    if (errors.password) {
      dispatch(setError(`Password error: ${errors.password.message}`));
    }
    if (errors.confirmPassword) {
      dispatch(setError(`Password error: ${errors.confirmPassword.message}`));
    }
    if (errors.avatar) {
      dispatch(setError(`Avatar error: ${errors.avatar.message}`));
    }
  }, [
    dispatch,
    errors.avatar,
    errors.confirmPassword,
    errors.email,
    errors.password,
    errors.username,
  ]);

  return (
    <Modal open={open} onClose={onClose} className="modal">
      <Card className="form-wrapper">
        <Box className="form-header" title="Register Form">
          <HowToRegIcon sx={{ fontSize: "2.5rem" }} />
          <Typography variant="h4">Register</Typography>
        </Box>
        <Box className="form-inputs-wrapper">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email required!",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Provide a valid e-mail address!",
              },
            }}
            render={({ field }) => (
              <TextField
                id="email-standard-basic"
                label="Email"
                variant="outlined"
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: "Username required!" }}
            render={({ field }) => (
              <TextField
                id="username-standard-basic"
                label="Username"
                variant="outlined"
                autoFocus
                {...field}
              />
            )}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Controller
              name="password"
              defaultValue=""
              control={control}
              rules={{
                required: "Password required!",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password must contain at least one uppercase letter, one number, and one special character (! . @ # $ % ^ & *).",
                },
              }}
              render={({ field }) => (
                <TextField
                  id="password-standard-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  autoFocus
                  fullWidth
                  {...field}
                />
              )}
            />
            <PasswordPattern />
          </Box>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Confirm you password!",
              validate: (password) =>
                password === getValues("password") ||
                "The two passwords do not match!",
            }}
            render={({ field }) => (
              <TextField
                id="confirm-password-standard-basic"
                label="Confirm Password"
                type="password"
                variant="outlined"
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="avatar"
            control={control}
            rules={{ required: "Avatar required!" }}
            render={({ field }) => (
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload avatar
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </Button>
            )}
          />
        </Box>

        {/* Closing this modal and opening the login modal to allow the user to log in if they have an account  */}

        <Typography onClick={handleGoToLogin} sx={{ color: "secondary.main" }}>
          You already have an account? Click here to login!
        </Typography>

        {isLoading ? (
          <Button className="loading-button" disabled>
            <CircularProgress />
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit(submitRegistration)}
            variant="contained"
            color="secondary"
            size="large"
          >
            REGISTER
          </Button>
        )}
      </Card>
    </Modal>
  );
}
