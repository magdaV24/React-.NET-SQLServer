import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundary as FallbackComponent } from "../components/ErrorBoundary";
import { Provider } from "react-redux";
import store from "../redux/store";
import ThemeProvider from "../redux/theme/ThemeProvider";

export function WithProviders(children: React.ReactNode): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider>{children}</ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}
