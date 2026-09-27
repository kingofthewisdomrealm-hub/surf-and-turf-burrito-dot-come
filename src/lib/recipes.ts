export type LayerId =
  | "tortilla"
  | "rice"
  | "fries"
  | "steak"
  | "shrimp"
  | "cheese"
  | "sauce"
  | "guacamole"
  | "pico"
  | "wrap";

export type LayerDef = {
  id: LayerId;
  name: string;
  copy: string;
  image: string;
  shell?: boolean;
};

export const LAYERS: LayerDef[] = [
  {
    id: "tortilla",
    name: "Tortilla",
    copy: "The shell. Soft enough to roll, strong enough that the bite doesn’t fall apart.",
    image: "/anatomy/tortilla.jpg",
    shell: true,
  },
  {
    id: "rice",
    name: "Mexican rice",
    copy: "Warmth and bulk. Too much and the steak never reaches the bite.",
    image: "/anatomy/rice.jpg",
  },
  {
    id: "fries",
    name: "French fries",
    copy: "The California move. Crunch that has to survive the sauce.",
    image: "/anatomy/fries.jpg",
  },
  {
    id: "steak",
    name: "Carne asada",
    copy: "The turf. Char, salt, and enough pieces to find in every bite.",
    image: "/anatomy/steak.jpg",
  },
  {
    id: "shrimp",
    name: "Shrimp",
    copy: "The surf. Real grilled shrimp, not bay shrimp lost in the rice.",
    image: "/anatomy/shrimp.jpg",
  },
  {
    id: "cheese",
    name: "Cheese",
    copy: "The glue. It should melt into the bite, not coat it.",
    image: "/anatomy/cheese.jpg",
  },
  {
    id: "sauce",
    name: "Chipotle",
    copy: "What ties steak to shrimp. Flavor, not paint.",
    image: "/anatomy/sauce.jpg",
  },
  {
    id: "guacamole",
    name: "Guacamole",
    copy: "Cool and rich. The counterweight to the char.",
    image: "/anatomy/guacamole.jpg",
  },
  {
    id: "pico",
    name: "Pico de gallo",
    copy: "Acid and onion. It cuts the fat so the bite stays bright.",
    image: "/anatomy/pico.jpg",
  },
  {
    id: "wrap",
    name: "Wrap",
    copy: "The other half of the tortilla. Structure on the far side.",
    image: "/anatomy/tortilla.jpg",
    shell: true,
  },
];

export type Recipe = {
  id: string;
  name: string;
  line: string;
  weights: Partial<Record<LayerId, number>>;
};

const shell = { tortilla: 1, wrap: 1 } as const;

export const RECIPES: Recipe[] = [
  {
    id: "classic",
    name: "Classic",
    line: "Steak, shrimp, fries, rice, and the sauce that holds one bite together.",
    weights: {
      ...shell,
      rice: 0.72,
      fries: 0.95,
      steak: 1,
      shrimp: 0.9,
      cheese: 0.7,
      sauce: 0.78,
      guacamole: 0.68,
      pico: 0.55,
    },
  },
  {
    id: "jvs",
    name: "JV’s",
    line: "Two tortillas. Rice, peppers, guacamole. No fries.",
    weights: {
      tortilla: 1.15,
      wrap: 1.15,
      rice: 1.2,
      steak: 1,
      shrimp: 0.72,
      guacamole: 0.9,
      pico: 0.85,
    },
  },
  {
    id: "surfin",
    name: "Surfin’",
    line: "Fries, avocado, chipotle. The California build, no rice.",
    weights: {
      ...shell,
      fries: 1.15,
      steak: 1,
      shrimp: 0.88,
      cheese: 0.75,
      sauce: 0.95,
      guacamole: 0.8,
      pico: 0.6,
    },
  },
  {
    id: "boardwalk",
    name: "Boardwalk",
    line: "Rice, avocado, chipotle. A beach counter, not a fry burrito.",
    weights: {
      ...shell,
      rice: 1,
      steak: 0.95,
      shrimp: 0.9,
      sauce: 0.7,
      guacamole: 0.85,
      pico: 0.5,
    },
  },
  {
    id: "harbor",
    name: "Harbor",
    line: "Wet. Fries inside, cheese and sauce on the outside.",
    weights: {
      ...shell,
      fries: 0.8,
      steak: 0.9,
      shrimp: 1,
      cheese: 1.05,
      sauce: 1.15,
      guacamole: 0.55,
      pico: 0.4,
    },
  },
];

export function weightOf(recipe: Recipe, id: LayerId) {
  return recipe.weights[id] ?? 0;
}

export function presentLayers(recipe: Recipe) {
  return LAYERS.filter((layer) => weightOf(recipe, layer.id) > 0.04);
}
