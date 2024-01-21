import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { CompanyListPage, Create, ForgotPassword, Home, Login } from './pages';

import { dataProvider, liveProvider } from "./providers";
import { authProvider } from "./providers/auth";
import { Register } from "./pages/register";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import Edit from "./pages/company/edit";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        {/* <ColorModeContextProvider> */}
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "ML6fs6-YlnlIr-ZNQkoB",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  {/* <Route index element={<WelcomePage />} /> */}
                  
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    element={
                    <Authenticated key="authenticated-layout" fallback={<CatchAllNavigate to="/login" />} >
                      <Layout >
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                  >
                    <Route index element={<Home />} />
                    <Route path='/companies'  >
                      <Route index element={<CompanyListPage />} />
                      <Route path="new" element={<Create />} />
                      <Route path="edit/:id" element={<Edit />} />
                    </Route>


                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        {/* </ColorModeContextProvider> */}
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
