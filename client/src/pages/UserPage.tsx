import { Box, Container } from "@mui/material";
import { RootState, useAppSelector } from "../redux/store";
import { useFetchUserCardsQuery } from "../redux/api/appApi";
import '../styles/pages/userPage.css';
import { Card } from "../types/CardType";
import CardWrapper from "../components/user-page/CardWrapper";

export default function UserPage() {
   const user = useAppSelector((state: RootState)=>state.tokenReducer.user);
   const { data } = useFetchUserCardsQuery(user?.id)
 return(
    <Container className="page-wrapper">
      <Box className="cards-grid">
        {data && data.map((card: Card)=>(
         <CardWrapper card={card} key={card.id}/>
        ))}
      </Box>
    </Container>
 )   
}
