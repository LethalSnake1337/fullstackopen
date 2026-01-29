import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageProviderWrapper } from "./context/MessageContext";

import Root from "./Root";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <MessageProviderWrapper>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  </MessageProviderWrapper>,
);
