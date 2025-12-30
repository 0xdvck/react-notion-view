import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./api";
import { Page } from "./Page";
 function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  )
}

export default App
