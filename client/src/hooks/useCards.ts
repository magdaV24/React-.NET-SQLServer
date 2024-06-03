import { useEffect } from "react";
import { useFetchGameCardsQuery } from "../redux/api/appApi";
import { useAppDispatch } from "../redux/store";
import { setCards } from "../redux/slices/gameSlice";

export default function useCards(category: string, limit: number) {
  const dispatch = useAppDispatch();
  const { data } = useFetchGameCardsQuery({
    category,
    limit,
  });
  dispatch(setCards(data));
  useEffect(() => {
    const cards = localStorage.getItem("Cards");
    dispatch(setCards(cards))
  }, [data, dispatch]);
  if (category === null && limit === 0) {
    return;
  }
  return data;
}
