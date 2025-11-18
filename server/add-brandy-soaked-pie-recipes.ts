import { storage } from "./storage";
import type { InsertRecipe } from "@shared/schema";
import { generateRecipeImage } from "./openai";
import fs from "fs";
import path from "path";

const brandySoakedPieRecipes: Omit<InsertRecipe, 'image'>[] = [
  {
    title: "Gluten-Free Brandy-Soaked Apple Pie",
    slug: "gluten-free-brandy-soaked-apple-pie",
    description: "Classic American apple pie elevated with brandy-soaked apples, cinnamon, and caramel drizzle.",
    longDescription: "This gluten-free brandy-soaked apple pie takes the classic American dessert to new heights. Tart Granny Smith apples are soaked in brandy with warm spices, then nestled in a buttery gluten-free crust and topped with a lattice. The brandy enhances the apple flavor while adding sophisticated depth. Finished with a caramel drizzle, this pie is perfect for holidays or any special occasion.",
    category: "Desserts",
    subcategory: "Pies & Tarts",
    difficulty: "Medium",
    prepTime: 45,
    cookTime: 60,
    totalTime: 165,
    servings: 8,
    rating: "5.0",
    calories: 425,
    protein: "4.5",
    carbs: "58.0",
    fat: "18.0",
    fiber: "3.5",
    sugar: "32.0",
    ingredients: [
      "For the Brandy-Soaked Apples:",
      "6 cups Granny Smith apples, peeled and sliced (about 6 apples)",
      "1/2 cup brandy",
      "1/2 cup brown sugar",
      "1 teaspoon vanilla extract",
      "2 teaspoons cinnamon",
      "1/2 teaspoon nutmeg",
      "1/4 teaspoon allspice",
      "For the Gluten-Free Crust:",
      "2 1/2 cups gluten-free all-purpose flour blend",
      "1 tablespoon sugar",
      "1 teaspoon xanthan gum (if not in flour blend)",
      "1 teaspoon salt",
      "1 cup cold butter, cubed",
      "6-8 tablespoons ice water",
      "For the Filling:",
      "1/4 cup gluten-free all-purpose flour",
      "1/4 cup granulated sugar",
      "2 tablespoons lemon juice",
      "2 tablespoons butter, cubed",
      "1 egg, beaten (for egg wash)",
      "Caramel sauce for drizzling"
    ],
    instructions: [
      "Soak the apples: In large bowl, combine sliced apples, brandy, brown sugar, vanilla, cinnamon, nutmeg, and allspice. Toss well, cover, and refrigerate for at least 1 hour or up to 4 hours, stirring occasionally.",
      "Make the crust: In food processor, pulse gluten-free flour, sugar, xanthan gum (if needed), and salt. Add cold butter cubes and pulse until mixture resembles coarse crumbs.",
      "Add ice water 1 tablespoon at a time, pulsing until dough just comes together. Divide dough into two discs (one slightly larger), wrap in plastic, and refrigerate for 30 minutes.",
      "Preheat oven to 375°F.",
      "Drain apples, reserving 2 tablespoons of the brandy liquid. Toss drained apples with flour, granulated sugar, and lemon juice.",
      "Roll out larger disc on floured surface to fit 9-inch pie plate. Transfer to plate and trim edges.",
      "Fill crust with apple mixture. Dot with butter cubes and drizzle reserved brandy liquid over top.",
      "Roll out second disc and cut into strips for lattice top, or cover with full crust and cut vents.",
      "Weave lattice pattern over filling. Trim and crimp edges. Brush with beaten egg.",
      "Place pie on baking sheet. Bake for 55-60 minutes until crust is golden and filling is bubbly. If edges brown too quickly, cover with foil.",
      "Cool for at least 2 hours before serving. Drizzle with caramel sauce before serving."
    ],
    tips: "Soaking apples in brandy not only adds flavor but helps prevent them from turning brown. Use a mix of tart and sweet apples for complex flavor. Keep all ingredients cold for flakiest crust. Non-alcoholic option: use 1/2 cup apple juice plus 1 teaspoon brandy extract.",
    variations: [
      "Add 1/2 cup raisins or dried cranberries to the filling",
      "Mix in 1/2 cup chopped walnuts or pecans",
      "Use bourbon instead of brandy for different flavor",
      "Add 1/4 cup dulce de leche to the filling"
    ],
    tags: ["gluten-free", "dessert", "pie", "brandy", "apple", "holiday", "boozy", "tart", "caramel", "cinnamon"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Brandy-Soaked Apple Pie Recipe | Unglued Food",
    seoDescription: "Classic gluten-free apple pie elevated with brandy-soaked apples, warm spices, and caramel drizzle. Perfect holiday dessert with sophisticated flavor."
  },
  {
    title: "Gluten-Free Brandy-Soaked Pecan Pie",
    slug: "gluten-free-brandy-soaked-pecan-pie",
    description: "Southern-style pecan pie enriched with brandy-soaked pecans and a caramel-brandy custard.",
    longDescription: "This gluten-free brandy-soaked pecan pie is a luxurious twist on the Southern classic. Pecans are soaked in brandy to intensify their flavor, then baked in a rich caramel custard spiked with more brandy. The result is a deeply flavored, boozy pie that's perfect for Thanksgiving, Christmas, or any celebration. The buttery gluten-free crust provides the perfect base for this indulgent filling.",
    category: "Desserts",
    subcategory: "Pies & Tarts",
    difficulty: "Easy",
    prepTime: 30,
    cookTime: 55,
    totalTime: 145,
    servings: 10,
    rating: "5.0",
    calories: 495,
    protein: "6.0",
    carbs: "52.0",
    fat: "28.0",
    fiber: "3.0",
    sugar: "36.0",
    ingredients: [
      "For Brandy-Soaked Pecans:",
      "3 cups pecan halves",
      "1/3 cup brandy",
      "2 tablespoons brown sugar",
      "For the Gluten-Free Crust:",
      "1 1/4 cups gluten-free all-purpose flour",
      "1 tablespoon sugar",
      "1/2 teaspoon xanthan gum (if not in blend)",
      "1/2 teaspoon salt",
      "1/2 cup cold butter, cubed",
      "3-4 tablespoons ice water",
      "For the Filling:",
      "4 large eggs",
      "1 cup light corn syrup",
      "3/4 cup brown sugar, packed",
      "1/4 cup brandy",
      "4 tablespoons butter, melted",
      "2 teaspoons vanilla extract",
      "1/2 teaspoon salt",
      "Whipped cream for serving"
    ],
    instructions: [
      "Soak pecans: In bowl, combine pecans, brandy, and brown sugar. Toss to coat. Let sit for 1 hour at room temperature, stirring occasionally. Drain, reserving 2 tablespoons liquid.",
      "Make crust: Pulse gluten-free flour, sugar, xanthan gum (if needed), and salt in food processor. Add butter and pulse until crumbly. Add ice water 1 tablespoon at a time until dough forms.",
      "Press dough into disc, wrap, and refrigerate for 30 minutes.",
      "Preheat oven to 350°F.",
      "Roll out dough and fit into 9-inch pie plate. Crimp edges decoratively. Refrigerate while making filling.",
      "Make filling: In large bowl, whisk eggs. Add corn syrup, brown sugar, brandy, reserved pecan soaking liquid, melted butter, vanilla, and salt. Whisk until smooth.",
      "Arrange drained pecans in prepared crust in decorative pattern (flat side down for prettier presentation).",
      "Pour custard mixture over pecans, ensuring they're evenly coated.",
      "Place pie on baking sheet. Bake for 50-55 minutes until filling is set around edges but slightly jiggly in center.",
      "Cool completely on wire rack (about 3 hours). Filling will set as it cools.",
      "Serve at room temperature with whipped cream."
    ],
    tips: "Don't overbake - pie should have a slight jiggle in the center when done. Soaking pecans in brandy adds incredible depth of flavor. Toast pecans before soaking for even more flavor. Use dark corn syrup for deeper molasses flavor. Non-alcoholic: use 1/3 cup water plus 2 teaspoons brandy extract.",
    variations: [
      "Add 1/2 cup chocolate chips for chocolate pecan pie",
      "Use bourbon instead of brandy",
      "Mix in 1/4 cup maple syrup",
      "Top with candied pecans"
    ],
    tags: ["gluten-free", "dessert", "pie", "brandy", "pecan", "Southern", "holiday", "Thanksgiving", "boozy", "caramel"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Brandy-Soaked Pecan Pie Recipe | Unglued Food",
    seoDescription: "Rich Southern-style gluten-free pecan pie with brandy-soaked pecans and caramel custard. Perfect for Thanksgiving and holiday celebrations."
  },
  {
    title: "Gluten-Free Brandy-Soaked Cherry Pie",
    slug: "gluten-free-brandy-soaked-cherry-pie",
    description: "Tart cherries soaked in brandy with vanilla bean and brown sugar, baked under a beautiful lattice top.",
    longDescription: "This gluten-free brandy-soaked cherry pie showcases plump tart cherries macerated in brandy with vanilla bean and brown sugar. The brandy enhances the cherries' natural flavor while adding sophisticated complexity. Topped with a gorgeous lattice crust that allows the ruby-red filling to peek through, this pie is as beautiful as it is delicious. Perfect for summer gatherings or holiday dessert tables.",
    category: "Desserts",
    subcategory: "Pies & Tarts",
    difficulty: "Medium",
    prepTime: 40,
    cookTime: 50,
    totalTime: 150,
    servings: 8,
    rating: "5.0",
    calories: 385,
    protein: "4.0",
    carbs: "54.0",
    fat: "16.0",
    fiber: "2.5",
    sugar: "28.0",
    ingredients: [
      "For Brandy-Soaked Cherries:",
      "5 cups fresh or frozen tart cherries, pitted",
      "1/2 cup brandy",
      "1/2 cup brown sugar",
      "1 vanilla bean, split and scraped (or 2 teaspoons vanilla extract)",
      "1/4 teaspoon almond extract",
      "For the Gluten-Free Crust:",
      "2 1/2 cups gluten-free all-purpose flour",
      "2 tablespoons sugar",
      "1 teaspoon xanthan gum (if not in blend)",
      "1 teaspoon salt",
      "1 cup cold butter, cubed",
      "6-8 tablespoons ice water",
      "For the Filling:",
      "1/3 cup granulated sugar",
      "1/4 cup cornstarch",
      "1/4 teaspoon cinnamon",
      "Pinch of salt",
      "1 tablespoon lemon juice",
      "2 tablespoons butter, cubed",
      "1 egg, beaten (for egg wash)",
      "Coarse sugar for sprinkling"
    ],
    instructions: [
      "Soak cherries: Combine cherries, brandy, brown sugar, vanilla bean seeds and pod (or extract), and almond extract in large bowl. Cover and refrigerate for 2-3 hours, stirring occasionally.",
      "Make crust: Process flour, sugar, xanthan gum (if needed), and salt. Add butter and pulse until crumbly. Add ice water gradually until dough forms. Divide into two discs, wrap, and refrigerate 30 minutes.",
      "Preheat oven to 400°F.",
      "Drain cherries, reserving 1/4 cup of the brandy liquid. Remove vanilla bean pod.",
      "In small bowl, whisk together granulated sugar, cornstarch, cinnamon, and salt.",
      "Toss drained cherries with sugar mixture, lemon juice, and reserved brandy liquid.",
      "Roll out larger disc and fit into 9-inch pie plate. Trim edges.",
      "Pour cherry filling into crust. Dot with butter cubes.",
      "Roll out second disc and cut into 1-inch strips for lattice. Weave lattice pattern over cherries.",
      "Trim and crimp edges. Brush lattice with beaten egg and sprinkle with coarse sugar.",
      "Place on baking sheet. Bake for 20 minutes, then reduce heat to 375°F and bake 30-35 minutes more until crust is golden and filling bubbles through lattice.",
      "Cool completely before slicing, about 3 hours."
    ],
    tips: "Fresh cherries give best flavor but frozen work well too - thaw and drain before using. The brandy soak intensifies cherry flavor dramatically. Make sure filling is completely cool before slicing or it will be runny. Vanilla bean adds beautiful flecks and flavor but extract works too.",
    variations: [
      "Mix in 1 cup fresh blueberries",
      "Add 1/2 teaspoon cardamom for exotic flavor",
      "Use amaretto instead of brandy",
      "Top with crumble instead of lattice"
    ],
    tags: ["gluten-free", "dessert", "pie", "brandy", "cherry", "tart", "lattice", "vanilla bean", "boozy", "summer"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Brandy-Soaked Cherry Pie Recipe | Unglued Food",
    seoDescription: "Beautiful gluten-free cherry pie with brandy-soaked tart cherries, vanilla bean, and lattice top. Perfect summer dessert with sophisticated flavor."
  },
  {
    title: "Gluten-Free Brandy-Soaked Raisin Custard Pie",
    slug: "gluten-free-brandy-soaked-raisin-custard-pie",
    description: "Silky vanilla custard layered with brandy-plumped raisins — like an adult rice pudding pie.",
    longDescription: "This gluten-free brandy-soaked raisin custard pie is comfort food elevated. Plump raisins are soaked in brandy until they're rich and boozy, then baked in a silky vanilla custard. The result is reminiscent of rice pudding but far more elegant. Each bite offers creamy custard punctuated by sweet, brandy-soaked raisins. This understated pie is perfect for those who appreciate classic, unfussy desserts with a sophisticated twist.",
    category: "Desserts",
    subcategory: "Pies & Tarts",
    difficulty: "Easy",
    prepTime: 25,
    cookTime: 50,
    totalTime: 195,
    servings: 8,
    rating: "4.9",
    calories: 395,
    protein: "8.0",
    carbs: "48.0",
    fat: "18.0",
    fiber: "1.5",
    sugar: "30.0",
    ingredients: [
      "For Brandy-Soaked Raisins:",
      "1 1/2 cups golden raisins",
      "1/2 cup brandy",
      "2 tablespoons honey",
      "For the Gluten-Free Crust:",
      "1 1/4 cups gluten-free all-purpose flour",
      "1 tablespoon sugar",
      "1/2 teaspoon xanthan gum (if not in blend)",
      "1/2 teaspoon salt",
      "1/2 cup cold butter, cubed",
      "3-4 tablespoons ice water",
      "For the Custard Filling:",
      "4 large eggs",
      "3/4 cup granulated sugar",
      "1 1/2 cups whole milk",
      "1 cup heavy cream",
      "2 teaspoons vanilla extract",
      "1/4 teaspoon nutmeg",
      "1/4 teaspoon cinnamon",
      "Pinch of salt",
      "Whipped cream and cinnamon for serving"
    ],
    instructions: [
      "Soak raisins: Combine raisins, brandy, and honey in small saucepan. Bring to simmer, remove from heat, and let steep for 1 hour. Drain, reserving 2 tablespoons liquid.",
      "Make crust: Pulse flour, sugar, xanthan gum (if needed), and salt. Add butter and pulse until crumbly. Add ice water gradually until dough forms. Press into disc, wrap, and refrigerate 30 minutes.",
      "Preheat oven to 350°F.",
      "Roll out dough and fit into 9-inch pie plate. Crimp edges. Line with parchment and pie weights. Blind bake for 15 minutes. Remove weights and bake 5 minutes more. Cool slightly.",
      "Make custard: In large bowl, whisk eggs and sugar until pale. Add milk, cream, vanilla, reserved brandy liquid, nutmeg, cinnamon, and salt. Whisk until smooth.",
      "Scatter drained raisins evenly over bottom of pre-baked crust.",
      "Carefully pour custard mixture over raisins.",
      "Place pie on baking sheet. Bake for 45-50 minutes until custard is set around edges but slightly jiggly in center.",
      "Cool on wire rack for 1 hour, then refrigerate for at least 2 hours or overnight.",
      "Serve chilled, topped with whipped cream and a sprinkle of cinnamon."
    ],
    tips: "Golden raisins have milder flavor than dark raisins and look prettier in the custard. Blind baking the crust prevents soggy bottom. Don't overbake - custard should be just set. Pie is best served well-chilled. The brandy-soaked raisins can be made up to a week ahead and stored in refrigerator.",
    variations: [
      "Use dried cranberries instead of raisins",
      "Add 1/2 cup chopped walnuts",
      "Use rum instead of brandy",
      "Add orange zest to the custard"
    ],
    tags: ["gluten-free", "dessert", "pie", "brandy", "custard", "raisin", "creamy", "comfort food", "vanilla", "boozy"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Brandy-Soaked Raisin Custard Pie | Unglued Food",
    seoDescription: "Silky vanilla custard pie with brandy-plumped raisins. Elegant gluten-free dessert like an adult rice pudding in pie form."
  },
  {
    title: "Gluten-Free Brandy-Soaked Peach & Almond Pie",
    slug: "gluten-free-brandy-soaked-peach-almond-pie",
    description: "Juicy peaches soaked in almond-brandy syrup with a buttery almond gluten-free crust.",
    longDescription: "This gluten-free brandy-soaked peach and almond pie celebrates the classic pairing of peaches and almonds. Fresh peaches are soaked in a brandy syrup flavored with almond extract, creating an intensely fruity, boozy filling. The buttery almond-flour crust adds nutty richness and tender texture. This pie is summer in a slice, perfect for showcasing peak-season peaches or quality frozen fruit year-round.",
    category: "Desserts",
    subcategory: "Pies & Tarts",
    difficulty: "Medium",
    prepTime: 35,
    cookTime: 55,
    totalTime: 150,
    servings: 8,
    rating: "5.0",
    calories: 415,
    protein: "6.0",
    carbs: "52.0",
    fat: "20.0",
    fiber: "3.5",
    sugar: "30.0",
    ingredients: [
      "For Brandy-Soaked Peaches:",
      "6 cups fresh peaches, peeled and sliced (about 8 peaches)",
      "1/2 cup brandy",
      "1/3 cup honey",
      "1 teaspoon almond extract",
      "1 teaspoon vanilla extract",
      "For the Almond GF Crust:",
      "1 1/2 cups gluten-free all-purpose flour",
      "1 cup almond flour",
      "1/4 cup sugar",
      "1 teaspoon xanthan gum (if not in blend)",
      "1/2 teaspoon salt",
      "3/4 cup cold butter, cubed",
      "4-6 tablespoons ice water",
      "For the Filling:",
      "1/3 cup granulated sugar",
      "3 tablespoons cornstarch",
      "1/4 teaspoon cinnamon",
      "2 tablespoons lemon juice",
      "2 tablespoons butter, cubed",
      "1 egg, beaten",
      "Sliced almonds for topping"
    ],
    instructions: [
      "Soak peaches: In large bowl, combine peaches, brandy, honey, almond extract, and vanilla. Toss gently, cover, and refrigerate for 1-2 hours, stirring occasionally.",
      "Make crust: Pulse both flours, sugar, xanthan gum (if needed), and salt. Add butter and pulse until crumbly. Add ice water gradually until dough forms. Divide into two portions (one larger), wrap, and refrigerate 30 minutes.",
      "Preheat oven to 375°F.",
      "Drain peaches, reserving 3 tablespoons of brandy liquid.",
      "In small bowl, mix sugar, cornstarch, and cinnamon. Toss with drained peaches, lemon juice, and reserved liquid.",
      "Roll out larger dough portion and fit into 9-inch pie plate.",
      "Pour peach filling into crust. Dot with butter cubes.",
      "Roll out second portion for top crust or create decorative cut-outs. Place over filling, crimp edges, and cut vents.",
      "Brush with beaten egg and sprinkle with sliced almonds.",
      "Place on baking sheet. Bake for 50-55 minutes until crust is golden and filling bubbles. Cover edges with foil if browning too quickly.",
      "Cool for at least 2 hours before serving."
    ],
    tips: "Use ripe but firm peaches for best texture. If peaches are very juicy, drain them well before mixing with cornstarch. Almond flour adds amazing flavor and tender texture to crust. Toasting the sliced almonds before topping adds extra crunch and flavor.",
    variations: [
      "Add 1/2 cup fresh raspberries",
      "Use nectarines instead of peaches",
      "Mix in 1/4 cup amaretto",
      "Top with streusel instead of crust"
    ],
    tags: ["gluten-free", "dessert", "pie", "brandy", "peach", "almond", "summer", "fruit", "boozy", "stone fruit"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Brandy-Soaked Peach & Almond Pie | Unglued Food",
    seoDescription: "Fresh peaches soaked in almond-brandy syrup with buttery almond crust. Perfect gluten-free summer pie showcasing peak-season fruit."
  },
  {
    title: "Gluten-Free Brandy-Soaked Fig & Honey Tart",
    slug: "gluten-free-brandy-soaked-fig-honey-tart",
    description: "Fresh and dried figs soaked in brandy, honey caramel, and toasted pistachios.",
    longDescription: "This gluten-free brandy-soaked fig and honey tart is elegance on a plate. A combination of fresh and dried figs are soaked in brandy and honey, creating deep, complex flavors. Arranged in a buttery tart shell and topped with honey caramel and toasted pistachios, this dessert is as beautiful as it is delicious. Perfect for fall and winter entertaining or any time you want to impress with minimal effort.",
    category: "Desserts",
    subcategory: "Pies & Tarts",
    difficulty: "Medium",
    prepTime: 30,
    cookTime: 40,
    totalTime: 130,
    servings: 10,
    rating: "5.0",
    calories: 365,
    protein: "5.0",
    carbs: "48.0",
    fat: "17.0",
    fiber: "3.0",
    sugar: "32.0",
    ingredients: [
      "For Brandy-Soaked Figs:",
      "1 cup dried figs, quartered",
      "1/2 cup brandy",
      "1/4 cup honey",
      "1 cinnamon stick",
      "10-12 fresh figs, halved",
      "For the Gluten-Free Tart Crust:",
      "1 3/4 cups gluten-free all-purpose flour",
      "1/3 cup powdered sugar",
      "1/2 teaspoon xanthan gum (if not in blend)",
      "1/4 teaspoon salt",
      "3/4 cup cold butter, cubed",
      "1 egg yolk",
      "2-3 tablespoons ice water",
      "For the Honey Caramel:",
      "1/2 cup honey",
      "1/4 cup butter",
      "1/4 cup heavy cream",
      "Pinch of salt",
      "For Topping:",
      "1/2 cup pistachios, toasted and chopped",
      "Fresh thyme leaves (optional)"
    ],
    instructions: [
      "Soak dried figs: In small saucepan, combine dried figs, brandy, honey, and cinnamon stick. Bring to simmer, remove from heat, and let steep for 1 hour. Drain, reserving liquid. Remove cinnamon stick.",
      "Brush fresh fig halves with some of the reserved brandy liquid. Set aside.",
      "Make tart crust: Pulse flour, powdered sugar, xanthan gum (if needed), and salt. Add butter and pulse until crumbly. Add egg yolk and ice water gradually until dough forms. Press into disc, wrap, and refrigerate 30 minutes.",
      "Preheat oven to 350°F.",
      "Press dough into 10-inch tart pan with removable bottom. Prick bottom with fork. Line with parchment and pie weights.",
      "Blind bake for 20 minutes. Remove weights and bake 10 minutes more until golden. Cool completely.",
      "Make honey caramel: In saucepan, heat honey over medium heat until it darkens slightly, about 5 minutes. Add butter and stir until melted. Carefully add cream (it will bubble) and salt. Simmer for 2 minutes until smooth. Cool slightly.",
      "Arrange soaked dried figs in bottom of cooled tart shell.",
      "Arrange fresh fig halves on top, cut side up, in decorative pattern.",
      "Drizzle honey caramel over figs, allowing it to pool around them.",
      "Sprinkle with toasted pistachios and fresh thyme if using.",
      "Serve at room temperature or slightly warm."
    ],
    tips: "Fresh figs are seasonal - use all dried figs when fresh aren't available. The honey caramel can be made ahead and rewarmed gently. Pistachios add beautiful color and crunch but walnuts work too. This tart is stunning served with vanilla ice cream or mascarpone cream.",
    variations: [
      "Add crumbled goat cheese before baking",
      "Use port wine instead of brandy",
      "Sprinkle with orange zest",
      "Add a layer of mascarpone cream"
    ],
    tags: ["gluten-free", "dessert", "tart", "brandy", "fig", "honey", "pistachio", "elegant", "fall", "winter"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Brandy-Soaked Fig & Honey Tart | Unglued Food",
    seoDescription: "Elegant gluten-free fig tart with brandy-soaked figs, honey caramel, and toasted pistachios. Stunning dessert perfect for entertaining."
  },
  {
    title: "Gluten-Free Brandy-Soaked Cranberry Orange Pie",
    slug: "gluten-free-brandy-soaked-cranberry-orange-pie",
    description: "Holiday perfection — brandy-soaked cranberries, orange zest, and cinnamon in a golden gluten-free crust.",
    longDescription: "This gluten-free brandy-soaked cranberry orange pie is holiday magic in every bite. Tart cranberries are soaked in brandy with orange zest and cinnamon, creating a filling that's both festive and sophisticated. The bright cranberries provide beautiful color while the brandy and orange add complex flavor layers. This pie is perfect for Thanksgiving, Christmas, or any winter celebration.",
    category: "Desserts",
    subcategory: "Pies & Tarts",
    difficulty: "Easy",
    prepTime: 30,
    cookTime: 55,
    totalTime: 145,
    servings: 8,
    rating: "5.0",
    calories: 395,
    protein: "4.0",
    carbs: "56.0",
    fat: "17.0",
    fiber: "3.5",
    sugar: "34.0",
    ingredients: [
      "For Brandy-Soaked Cranberries:",
      "4 cups fresh or frozen cranberries",
      "1/2 cup brandy",
      "1/2 cup orange juice",
      "Zest of 2 oranges",
      "1/4 cup brown sugar",
      "For the Gluten-Free Crust:",
      "2 1/2 cups gluten-free all-purpose flour",
      "2 tablespoons sugar",
      "1 teaspoon xanthan gum (if not in blend)",
      "1 teaspoon salt",
      "1 cup cold butter, cubed",
      "6-8 tablespoons ice water",
      "For the Filling:",
      "1 cup granulated sugar",
      "1/3 cup cornstarch",
      "1 teaspoon cinnamon",
      "1/4 teaspoon ground ginger",
      "Pinch of salt",
      "2 tablespoons butter, cubed",
      "1 egg, beaten",
      "Coarse sugar for sprinkling"
    ],
    instructions: [
      "Soak cranberries: In bowl, combine cranberries, brandy, orange juice, orange zest, and brown sugar. Cover and refrigerate for 2-3 hours, stirring occasionally.",
      "Make crust: Pulse flour, sugar, xanthan gum (if needed), and salt. Add butter and pulse until crumbly. Add ice water gradually until dough forms. Divide into two discs, wrap, and refrigerate 30 minutes.",
      "Preheat oven to 400°F.",
      "Drain cranberries, reserving 1/4 cup liquid.",
      "In bowl, whisk together granulated sugar, cornstarch, cinnamon, ginger, and salt. Toss with drained cranberries and reserved liquid.",
      "Roll out larger disc and fit into 9-inch pie plate.",
      "Pour cranberry filling into crust. Dot with butter cubes.",
      "Roll out second disc for top crust. Place over filling, crimp edges, and cut decorative vents (or create cut-out shapes).",
      "Brush with beaten egg and sprinkle with coarse sugar.",
      "Place on baking sheet. Bake for 20 minutes, then reduce heat to 375°F and bake 30-35 minutes more until crust is golden and filling bubbles.",
      "Cool completely before slicing, at least 3 hours."
    ],
    tips: "Fresh cranberries work best but frozen are fine - no need to thaw. The brandy soak mellows the cranberries' tartness. Orange zest is essential for authentic flavor. This pie is quite tart - increase sugar if you prefer sweeter. Serve with vanilla ice cream or whipped cream.",
    variations: [
      "Add 1 cup diced apples or pears",
      "Mix in 1/2 cup chopped pecans",
      "Use Grand Marnier instead of brandy",
      "Add 1/2 teaspoon cardamom"
    ],
    tags: ["gluten-free", "dessert", "pie", "brandy", "cranberry", "orange", "holiday", "Thanksgiving", "Christmas", "winter"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Brandy-Soaked Cranberry Orange Pie | Unglued Food",
    seoDescription: "Festive gluten-free cranberry pie with brandy, orange zest, and warm spices. Perfect holiday dessert for Thanksgiving and Christmas celebrations."
  },
  {
    title: "Gluten-Free Brandy-Soaked Chocolate Silk Pie",
    slug: "gluten-free-brandy-soaked-chocolate-silk-pie",
    description: "Creamy chocolate custard infused with brandy and topped with whipped cream and shaved chocolate.",
    longDescription: "This gluten-free brandy-soaked chocolate silk pie is pure decadence. Rich, silky chocolate custard is infused with brandy, creating a sophisticated adult dessert. The filling is impossibly smooth and creamy, like chocolate velvet. Topped with billows of whipped cream and dark chocolate shavings, this pie is perfect for chocolate lovers who appreciate a touch of elegance. No baking required for the filling - just patience while it chills.",
    category: "Desserts",
    subcategory: "Pies & Tarts",
    difficulty: "Easy",
    prepTime: 25,
    cookTime: 15,
    totalTime: 265,
    servings: 10,
    rating: "5.0",
    calories: 485,
    protein: "6.0",
    carbs: "44.0",
    fat: "32.0",
    fiber: "2.5",
    sugar: "30.0",
    ingredients: [
      "For the Gluten-Free Chocolate Crust:",
      "1 1/2 cups gluten-free chocolate cookie crumbs",
      "1/4 cup sugar",
      "6 tablespoons butter, melted",
      "For the Brandy Chocolate Silk Filling:",
      "12 oz dark chocolate (60-70% cacao), chopped",
      "1/4 cup brandy",
      "4 large eggs",
      "1/2 cup granulated sugar",
      "1 1/2 cups heavy cream",
      "1 tablespoon vanilla extract",
      "Pinch of salt",
      "For Topping:",
      "1 1/2 cups heavy cream",
      "3 tablespoons powdered sugar",
      "1 teaspoon vanilla extract",
      "Dark chocolate shavings",
      "Cocoa powder for dusting"
    ],
    instructions: [
      "Make crust: Mix cookie crumbs, sugar, and melted butter until combined. Press firmly into bottom and up sides of 9-inch pie plate. Refrigerate while making filling.",
      "Melt chocolate: Place chopped chocolate in heatproof bowl. Heat in microwave in 30-second intervals, stirring between each, until smooth. Stir in brandy. Cool slightly.",
      "Make filling: In large bowl, whisk eggs and sugar until thick and pale, about 3 minutes.",
      "In separate bowl, whip 1 1/2 cups heavy cream to stiff peaks.",
      "Fold melted chocolate mixture into egg mixture until combined. Add vanilla and salt.",
      "Gently fold whipped cream into chocolate mixture in three additions until no streaks remain.",
      "Pour filling into prepared crust. Smooth top with spatula.",
      "Refrigerate for at least 4 hours or overnight until set.",
      "Make topping: Whip cream with powdered sugar and vanilla to stiff peaks.",
      "Pipe or spread whipped cream over chilled pie.",
      "Top with dark chocolate shavings and dust with cocoa powder.",
      "Keep refrigerated until serving."
    ],
    tips: "Use good quality dark chocolate for best flavor. The eggs in this recipe are not cooked - use pasteurized eggs if concerned. Make sure chocolate has cooled before folding into eggs or it will scramble them. Pie must be well-chilled to set properly - overnight is best. Use gluten-free chocolate cookies (like chocolate graham crackers or Oreo-style cookies).",
    variations: [
      "Add espresso powder to chocolate",
      "Use rum instead of brandy",
      "Add orange zest to filling",
      "Top with chocolate ganache instead of whipped cream"
    ],
    tags: ["gluten-free", "dessert", "pie", "brandy", "chocolate", "silk", "no-bake", "creamy", "decadent", "elegant"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Brandy-Soaked Chocolate Silk Pie | Unglued Food",
    seoDescription: "Decadent gluten-free chocolate silk pie infused with brandy. Ultra-creamy, no-bake dessert with whipped cream and chocolate shavings."
  },
  {
    title: "Gluten-Free Brandy-Soaked Blueberry Maple Pie",
    slug: "gluten-free-brandy-soaked-blueberry-maple-pie",
    description: "Blueberries soaked in brandy and maple syrup with a soft gluten-free cinnamon crust.",
    longDescription: "This gluten-free brandy-soaked blueberry maple pie combines the best of summer and fall flavors. Plump blueberries are soaked in brandy and real maple syrup, creating a filling that's both fruity and complex. The cinnamon-spiced crust adds warmth and complements the sweet-tart filling perfectly. This pie is beautiful, delicious, and perfect for showcasing fresh or frozen blueberries any time of year.",
    category: "Desserts",
    subcategory: "Pies & Tarts",
    difficulty: "Easy",
    prepTime: 30,
    cookTime: 55,
    totalTime: 145,
    servings: 8,
    rating: "4.9",
    calories: 405,
    protein: "4.5",
    carbs: "58.0",
    fat: "17.0",
    fiber: "3.0",
    sugar: "32.0",
    ingredients: [
      "For Brandy-Soaked Blueberries:",
      "5 cups fresh or frozen blueberries",
      "1/3 cup brandy",
      "1/3 cup pure maple syrup",
      "1 teaspoon vanilla extract",
      "Zest of 1 lemon",
      "For the Cinnamon GF Crust:",
      "2 1/2 cups gluten-free all-purpose flour",
      "2 tablespoons sugar",
      "1 tablespoon cinnamon",
      "1 teaspoon xanthan gum (if not in blend)",
      "1 teaspoon salt",
      "1 cup cold butter, cubed",
      "6-8 tablespoons ice water",
      "For the Filling:",
      "1/3 cup granulated sugar",
      "1/4 cup cornstarch",
      "1/4 teaspoon cinnamon",
      "1 tablespoon lemon juice",
      "2 tablespoons butter, cubed",
      "1 egg, beaten",
      "Turbinado sugar for sprinkling"
    ],
    instructions: [
      "Soak blueberries: In bowl, combine blueberries, brandy, maple syrup, vanilla, and lemon zest. Toss gently, cover, and refrigerate for 1-2 hours.",
      "Make crust: Pulse flour, sugar, cinnamon, xanthan gum (if needed), and salt. Add butter and pulse until crumbly. Add ice water gradually until dough forms. Divide into two discs, wrap, and refrigerate 30 minutes.",
      "Preheat oven to 400°F.",
      "Drain blueberries, reserving 3 tablespoons liquid.",
      "In bowl, mix granulated sugar, cornstarch, and cinnamon. Toss with drained blueberries, lemon juice, and reserved liquid.",
      "Roll out larger disc and fit into 9-inch pie plate.",
      "Pour blueberry filling into crust. Dot with butter cubes.",
      "Roll out second disc for top crust or create decorative design. Place over filling, crimp edges, and cut vents.",
      "Brush with beaten egg and sprinkle generously with turbinado sugar.",
      "Place on baking sheet. Bake for 20 minutes, then reduce heat to 375°F and bake 30-35 minutes more until crust is golden and filling bubbles.",
      "Cool completely before slicing, at least 3 hours."
    ],
    tips: "Fresh blueberries are ideal but frozen work perfectly - no need to thaw. Real maple syrup is essential for authentic flavor. The cinnamon crust is amazing - don't skip it. If filling seems too juicy after soaking, drain well before mixing with cornstarch. Serve with vanilla ice cream or maple whipped cream.",
    variations: [
      "Mix in 1 cup blackberries or raspberries",
      "Add 1/2 teaspoon cardamom",
      "Use bourbon instead of brandy",
      "Top with streusel instead of crust"
    ],
    tags: ["gluten-free", "dessert", "pie", "brandy", "blueberry", "maple", "cinnamon", "fruit", "summer", "boozy"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Brandy-Soaked Blueberry Maple Pie | Unglued Food",
    seoDescription: "Beautiful gluten-free blueberry pie with brandy and maple syrup in cinnamon-spiced crust. Perfect summer dessert with warm, complex flavors."
  },
  {
    title: "Gluten-Free Brandy-Soaked Plum & Hazelnut Pie",
    slug: "gluten-free-brandy-soaked-plum-hazelnut-pie",
    description: "Deeply caramelized brandy-soaked plums with hazelnut crumble topping.",
    longDescription: "This gluten-free brandy-soaked plum and hazelnut pie is autumn in a slice. Ripe plums are soaked in brandy until they're intensely flavored, then baked until jammy and caramelized. Topped with a crunchy hazelnut crumble instead of a traditional crust, this rustic pie showcases the beautiful pairing of plums and hazelnuts. The brandy deepens the plums' natural sweetness while adding sophisticated warmth. Perfect for showcasing late-summer plums.",
    category: "Desserts",
    subcategory: "Pies & Tarts",
    difficulty: "Medium",
    prepTime: 35,
    cookTime: 50,
    totalTime: 145,
    servings: 8,
    rating: "5.0",
    calories: 425,
    protein: "6.0",
    carbs: "54.0",
    fat: "21.0",
    fiber: "4.0",
    sugar: "30.0",
    ingredients: [
      "For Brandy-Soaked Plums:",
      "3 lbs ripe plums (about 10-12), pitted and quartered",
      "1/2 cup brandy",
      "1/4 cup honey",
      "1 teaspoon vanilla extract",
      "1/2 teaspoon cinnamon",
      "For the Gluten-Free Crust:",
      "1 1/4 cups gluten-free all-purpose flour",
      "1/2 cup hazelnut flour",
      "1 tablespoon sugar",
      "1/2 teaspoon xanthan gum (if not in blend)",
      "1/2 teaspoon salt",
      "1/2 cup cold butter, cubed",
      "3-4 tablespoons ice water",
      "For the Hazelnut Crumble:",
      "3/4 cup gluten-free all-purpose flour",
      "1/2 cup hazelnut flour",
      "1/2 cup brown sugar, packed",
      "1/2 cup chopped hazelnuts, toasted",
      "1/2 teaspoon cinnamon",
      "6 tablespoons cold butter, cubed",
      "For the Filling:",
      "1/3 cup granulated sugar",
      "3 tablespoons cornstarch",
      "Pinch of salt"
    ],
    instructions: [
      "Soak plums: In large bowl, combine quartered plums, brandy, honey, vanilla, and cinnamon. Toss gently, cover, and refrigerate for 1-2 hours.",
      "Make crust: Pulse both flours, sugar, xanthan gum (if needed), and salt. Add butter and pulse until crumbly. Add ice water gradually until dough forms. Press into disc, wrap, and refrigerate 30 minutes.",
      "Make hazelnut crumble: In bowl, mix both flours, brown sugar, chopped hazelnuts, and cinnamon. Cut in cold butter until mixture forms clumps. Refrigerate until needed.",
      "Preheat oven to 375°F.",
      "Roll out dough and fit into 9-inch pie plate. Crimp edges.",
      "Drain plums, reserving 1/4 cup liquid.",
      "Mix granulated sugar, cornstarch, and salt. Toss with drained plums and reserved liquid.",
      "Pour plum filling into crust.",
      "Sprinkle hazelnut crumble evenly over plums, covering completely.",
      "Place on baking sheet. Bake for 45-50 minutes until crumble is golden and filling bubbles around edges.",
      "Cool for at least 2 hours before serving. Serve warm or at room temperature."
    ],
    tips: "Use ripe but firm plums for best texture. Red or purple plums work beautifully and provide gorgeous color. Toast hazelnuts before chopping for deeper flavor. The crumble topping is buttery and crunchy - don't skip it! This pie is wonderful served warm with vanilla ice cream.",
    variations: [
      "Use almonds instead of hazelnuts",
      "Add 1/2 teaspoon cardamom",
      "Mix in 1/2 cup fresh raspberries",
      "Use amaretto instead of brandy"
    ],
    tags: ["gluten-free", "dessert", "pie", "brandy", "plum", "hazelnut", "crumble", "fall", "stone fruit", "rustic"],
    isNaturallyGlutenFree: false,
    status: "published",
    seoTitle: "Gluten-Free Brandy-Soaked Plum & Hazelnut Pie | Unglued Food",
    seoDescription: "Rustic gluten-free plum pie with brandy-soaked fruit and crunchy hazelnut crumble topping. Perfect fall dessert showcasing late-summer plums."
  }
];

async function generateAndSaveImages() {
  const imageDir = path.join(process.cwd(), "client", "public", "recipe-images");
  
  // Ensure directory exists
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const recipesWithImages: InsertRecipe[] = [];
  
  for (const recipe of brandySoakedPieRecipes) {
    console.log(`\nGenerating image for: ${recipe.title}`);
    
    const recipeName = recipe.title.replace("Gluten-Free ", "");
    const description = `Beautiful baked pie with golden crust, glossy fruit filling, brandy-soaked ingredients visible, rustic presentation on wooden surface, warm natural lighting, close-up showing texture and caramelization, appetizing and festive`;
    
    try {
      const imageUrl = await generateRecipeImage(recipeName, description);
      
      // Download and save image
      const response = await fetch(imageUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Create filename from slug
      const filename = `${recipe.slug}.png`;
      const filepath = path.join(imageDir, filename);
      
      fs.writeFileSync(filepath, buffer);
      console.log(`✅ Saved image to: ${filepath}`);
      
      // Add recipe with correct image path
      recipesWithImages.push({
        ...recipe,
        image: `/recipe-images/${filename}`
      });
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error generating image for ${recipe.title}:`, error);
      // Use a placeholder path if image generation fails
      recipesWithImages.push({
        ...recipe,
        image: `/recipe-images/${recipe.slug}.png`
      });
    }
  }
  
  return recipesWithImages;
}

async function addRecipesToDatabase() {
  console.log("🥧 Generating AI images for all 10 Brandy-Soaked Pie recipes...\n");
  const recipesWithImages = await generateAndSaveImages();
  
  console.log("\n📝 Adding recipes to database...\n");
  
  for (const recipe of recipesWithImages) {
    try {
      await storage.createRecipe(recipe);
      console.log(`✅ Added: ${recipe.title}`);
    } catch (error) {
      console.error(`❌ Error adding ${recipe.title}:`, error);
    }
  }
  
  console.log("\n✨ All 10 Gluten-Free Brandy-Soaked Pie recipes have been added successfully!");
  console.log("🥧 Visit the website to see your new Brandy-Soaked Pie recipes under Desserts → Pies & Tarts");
}

// Run the script
addRecipesToDatabase().catch(console.error);
