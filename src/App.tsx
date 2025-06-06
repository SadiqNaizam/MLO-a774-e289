import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainDashboard from "./pages/MainDashboard";
import JointAccountHub from "./pages/JointAccountHub";
import AccountDetailsScreen from "./pages/AccountDetailsScreen";
import PaymentInitiationFlow from "./pages/PaymentInitiationFlow";
import JointAccountSetupWizardPage from "./pages/JointAccountSetupWizardPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/joint-account-hub" element={<JointAccountHub />} />
          <Route path="/account-details/:accountId" element={<AccountDetailsScreen />} />
          <Route path="/payment-initiation" element={<PaymentInitiationFlow />} />
          <Route path="/joint-account-setup" element={<JointAccountSetupWizardPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;