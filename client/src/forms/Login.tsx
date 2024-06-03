// React imports
import { useEffect } from "react";

// React hook form imports
import { Controller, useForm } from "react-hook-form";

// MUI components and icons
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import FaceSharpIcon from "@mui/icons-material/FaceSharp";

// Context management
import { useAppDispatch } from "../redux/store";
import { useLoginMutation } from "../redux/api/appApi";
import {
  setDoNotRememberMe,
  setRememberMe,
  setUser,
} from "../redux/slices/tokenSlice";
import { setError, setMessage } from "../redux/slices/apiResponseSlice";

// Custom hooks
import { useToken } from "../hooks/useToken";

interface LoginProps {
  open: boolean;
  onClose: () => void;
  handleGoToRegister: () => void;
}

export default function Login({
  open,
  onClose,
  handleGoToRegister,
}: LoginProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { getUser } = useToken();

  const handleLogin = async () => {
    try {
      const input = {
        username: getValues("username"),
        password: getValues("password"),
        rememberMe: getValues("rememberMe"),
      };
      const res = await login(input);
      const token = res.data;
      const user = getUser(res.data);
      dispatch(setUser(user))
      if (getValues("rememberMe")) {
        dispatch(setRememberMe(token!.token));
      } else {
        dispatch(setDoNotRememberMe(token!.token));
      }
      dispatch(setMessage("Logged in successfully!"));
      reset();
    } catch (error) {
      dispatch(setError(`Log in error: ${error}`));
    }
  };

  useEffect(() => {
    if (errors.username) {
      dispatch(setError(`Username error: ${errors.username.message}`));
    }
    if (errors.password) {
      dispatch(setError(`Password error: ${errors.password.message}`));
    }
  }, [dispatch, errors.password, errors.username]);

  return (
    <Modal open={open} onClose={onClose} className="modal">
      <Card component="form" className="form-wrapper">
        <Box className="form-header" title="Login Form">
          <FaceSharpIcon sx={{ fontSize: "2.5rem" }} />
          <Typography variant="h4">Login</Typography>
        </Box>

        <Box className="form-inputs-wrapper">
          <Controller
            name="username"
            defaultValue=""
            control={control}
            rules={{ required: "Username required!" }}
            render={({ field }) => (
              <TextField
                id="username-standard-basic-login"
                label="Username"
                variant="outlined"
                autoFocus
                {...field}
                error={!!errors.username}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password required!" }}
            render={({ field }) => (
              <TextField
                id="password-standard-basic-login"
                label="Password"
                type="password"
                variant="outlined"
                autoFocus
                {...field}
                error={!!errors.password}
              />
            )}
          />
          <Controller
            name="rememberMe"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                label="Remember me"
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
              />
            )}
          />
        </Box>
        <Typography
          onClick={handleGoToRegister}
          sx={{ color: "secondary.main" }}
        >
          Don't have an account? Click here to register!
        </Typography>
        {isLoading ? (
          <Button className="login-button" variant="contained" disabled>
            <CircularProgress />
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit(handleLogin)}
            variant="contained"
          >
            LOGIN
          </Button>
        )}
      </Card>
    </Modal>
  );
}
