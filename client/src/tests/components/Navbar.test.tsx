import { it, expect, describe, vi } from "vitest";
import {  render, screen } from "@testing-library/react";
import { WithProviders } from "../../utils/WithProviders";
import Navbar from "../../components/navbar/Navbar";
import store, { RootState } from "../../redux/store";

describe("testing the Navbar component", () => {
 
  const mockShowLogin = vi.fn();
  const mockShowRegister = vi.fn();
  const mockShowAddCard = vi.fn();

  const renderWithProviders = (
    component: JSX.Element, 
    { initialState = {}, storeOverride = store } = {}
  ) => {
    const mockStore = storeOverride || store;
  
    if (initialState) {
      // Preload state if provided
      mockStore.dispatch({ type: 'PRELOAD_STATE', payload: initialState });
    }
  
    return (
      WithProviders(component)
    );
  };
  
  it('renders AuthButtons when user is not logged in', () => {
    const initialState: RootState = {
      tokenReducer: {
        user: null,
        token: null,
        rememberMe: false,
      },
      themeReducer: {
        themeType: "dark"
      },
      gameReducer: {
        category: "",
        limit: 0,
        points: 0,
        cards: [],
      },
      appApi: {
        queries: {},
        mutations: {},
        subscriptions: {},
        provided: null,
        config: null
      },
      apiResponseReducer: {
        errorMessage: "",
        openErrorAlert: false,
        successMessage: "",
        openSuccessAlert: false,
      }
    };

    render(renderWithProviders(<Navbar showLogin={mockShowLogin} showRegister={mockShowRegister} showAddCard={mockShowAddCard} />, { initialState }));

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    screen.debug();
  });

});
