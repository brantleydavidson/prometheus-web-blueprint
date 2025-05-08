
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import WhoWeHelp from "./pages/WhoWeHelp";
import B2B from "./pages/B2B";
import DTC from "./pages/DTC";
import Manufacturing from "./pages/Manufacturing";
import Restoration from "./pages/dtc/Restoration";
import Services from "./pages/Services";
import AIEnablement from "./pages/services/AIEnablement";
import GTMStrategy from "./pages/services/GTMStrategy";
import CRMImplementation from "./pages/services/CRMImplementation";
import CustomerJourney from "./pages/services/CustomerJourney";
import NotFound from "./pages/NotFound";
import Blueprint from "./pages/Blueprint";
import Admin from "./pages/admin/Admin";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Pages from "./pages/admin/Pages";
import PageEditor from "./pages/admin/PageEditor";
import BlogPosts from "./pages/admin/BlogPosts";
import BlogPostEditor from "./pages/admin/BlogPostEditor";
import Categories from "./pages/admin/Categories";
import Assets from "./pages/admin/Assets";
import TemplateManager from "./pages/admin/TemplateManager";
import AccountSettings from "./pages/admin/AccountSettings";
import AuthProvider from "./providers/AuthProvider";
import HubSpotProvider from "./integrations/hubspot/HubSpotProvider";
import ContactUs from "./pages/ContactUs";
import BookAudit from "./pages/BookAudit";
import AIQuotient from "./pages/AIQuotient";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HubSpotProvider>
        <TooltipProvider>
          <HelmetProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/who-we-help" element={<WhoWeHelp />} />
                <Route path="/b2b" element={<B2B />} />
                <Route path="/dtc" element={<DTC />} />
                <Route path="/b2b/manufacturing" element={<Manufacturing />} />
                <Route path="/dtc/restoration" element={<Restoration />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/ai-enablement" element={<AIEnablement />} />
                <Route path="/services/consulting-gtm" element={<GTMStrategy />} />
                <Route path="/services/crm-implementation" element={<CRMImplementation />} />
                <Route path="/services/customer-journey" element={<CustomerJourney />} />
                <Route path="/blueprint" element={<Blueprint />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/book-audit" element={<BookAudit />} />
                <Route path="/ai-quotient" element={<AIQuotient />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<Admin />}>
                  <Route index element={<Dashboard />} />
                  <Route path="pages" element={<Pages />} />
                  <Route path="pages/new" element={<PageEditor />} />
                  <Route path="pages/edit/:id" element={<PageEditor />} />
                  <Route path="blog-posts" element={<BlogPosts />} />
                  <Route path="blog-posts/new" element={<BlogPostEditor />} />
                  <Route path="blog-posts/edit/:id" element={<BlogPostEditor />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="assets" element={<Assets />} />
                  <Route path="templates" element={<TemplateManager />} />
                  <Route path="settings" element={<AccountSettings />} />
                </Route>
                <Route path="/login" element={<Login />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </HelmetProvider>
        </TooltipProvider>
      </HubSpotProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
