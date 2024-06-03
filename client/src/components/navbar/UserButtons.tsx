import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Box, Button } from "@mui/material";
import { cloudinaryFnc } from "../../utils/cloudinaryFnc";
import { Link } from "react-router-dom";
import { useToken } from "../../hooks/useToken";
import { useAppSelector, RootState, useAppDispatch } from "../../redux/store";
import { clearTokenState } from "../../redux/slices/tokenSlice";
import { clearGameState } from "../../redux/slices/gameSlice";

interface Props {
  showAddCard: () => void;
}

export default function UserButtons({ showAddCard }: Props) {
  const cld = cloudinaryFnc();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.tokenReducer.user);
  const token = useAppSelector((state: RootState) => state.tokenReducer.token);

  const { logout } = useToken();
  const handleLogout = () => {
    logout(token);
    dispatch(clearTokenState());
    dispatch(clearGameState());
  };
  return (
    <Box className="button-box display-flex-center">
      <Link to={`/${user?.username}`} className="username">
        Welcome back, {user?.username}
      </Link>
      <Box className="avatar-box display-flex-center">
        <AdvancedImage
          cldImg={cld.image(user?.avatar).resize(fill().width(50).height(50))}
        />
      </Box>
      <Button onClick={handleLogout} variant="contained" color="secondary">
        LOGOUT
      </Button>
      <Button variant="contained" color="secondary" onClick={showAddCard}>
        Add card
      </Button>
    </Box>
  );
}
