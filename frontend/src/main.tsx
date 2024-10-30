import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./screens/App/App";
import Providers from "./components/Providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
