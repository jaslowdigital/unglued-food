import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import RecipesPage from "@/pages/recipes";
import RecipePage from "@/pages/RecipePage";
import ImageTestPage from "@/pages/ImageTestPage";
import AddRecipePage from "@/pages/AddRecipePage";
import AdminPage from "@/pages/AdminPage";
import EditRecipePage from "@/pages/EditRecipePage";
import NaturallyGlutenFreePage from "@/pages/NaturallyGlutenFreePage";
import BakingDessertsPage from "@/pages/BakingDessertsPage";
import GrainAlternativesPage from "@/pages/GrainAlternativesPage";
import GlutenFreeBasicsPage from "@/pages/GlutenFreeBasicsPage";
import ShoppingGuidePage from "@/pages/ShoppingGuidePage";
import LabelReadingPage from "@/pages/LabelReadingPage";
import CrossContaminationPage from "@/pages/CrossContaminationPage";
import SubstitutionsPage from "@/pages/SubstitutionsPage";
import AboutPage from "@/pages/AboutPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/recipes" component={RecipesPage} />
      <Route path="/all-recipes" component={RecipesPage} />
      <Route path="/recipe/:slug" component={RecipePage} />
      <Route path="/add-recipe" component={AddRecipePage} />
      <Route path="/edit-recipe/:id" component={EditRecipePage} />
      <Route path="/admin" component={AdminPage} />
      
      {/* Category Pages */}
      <Route path="/naturally-gluten-free" component={NaturallyGlutenFreePage} />
      <Route path="/baking-desserts" component={BakingDessertsPage} />
      <Route path="/grain-alternatives" component={GrainAlternativesPage} />
      
      {/* Education Pages */}
      <Route path="/gluten-free-basics" component={GlutenFreeBasicsPage} />
      <Route path="/shopping-guide" component={ShoppingGuidePage} />
      <Route path="/label-reading" component={LabelReadingPage} />
      <Route path="/cross-contamination" component={CrossContaminationPage} />
      <Route path="/substitutions" component={SubstitutionsPage} />
      
      {/* Other Pages */}
      <Route path="/about" component={AboutPage} />
      <Route path="/test-images" component={ImageTestPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
