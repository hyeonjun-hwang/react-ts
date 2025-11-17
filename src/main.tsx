import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

import { SignIn } from "./pages/auth/sign-in.tsx";
import { SignUp } from "./pages/auth/sign-up.tsx";
import { CreateTopic } from "./pages/topic/create-topic.tsx";
import { DetailTopic } from "./pages/topic/detail-topic.tsx";
import { UpdateTopic } from "./pages/topic/update-topic.tsx";
import RootLayout from "./pages/layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {/* ROOT */}
          <Route path="/" element={<App />} />

          {/* AUTH */}
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />

          {/* TOPIC */}
          <Route path="create-topic" element={<CreateTopic />} />
          <Route path="topic">
            <Route path=":id" element={<DetailTopic />} />
            <Route path=":id/edit" element={<UpdateTopic />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
