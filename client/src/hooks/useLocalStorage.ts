import { setCards, setLimit, setCategory } from "../redux/slices/gameSlice";
import { useAppDispatch } from "../redux/store";

export function useLocalStorage() {
  const dispatch = useAppDispatch();
  const keepCards = () => {
    const cards = localStorage.getItem("Cards");
    dispatch(setCards(cards));
  };

  const keepLimit = () => {
    const limit = localStorage.getItem("Limit");
    dispatch(setLimit(limit));
  };

  const keepCategory = () => {
    const category = localStorage.getItem("Category");
    dispatch(setCategory(category));
  };
  return { keepCards, keepCategory, keepLimit };
}
