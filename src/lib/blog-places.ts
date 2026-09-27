export type PublicStars = {
  stars: number;
  reviews: string;
  source: string;
};

export const PUBLIC_STARS: Record<string, PublicStars> = {
  jvs: { stars: 4.2, reviews: "1,591", source: "Google" },
  "lucha-libre": { stars: 3.8, reviews: "8,989", source: "Google" },
  "craft-taco": { stars: 4.7, reviews: "532", source: "Google" },
  "taco-surf": { stars: 4.0, reviews: "1,272", source: "Google" },
  chachos: { stars: 4.6, reviews: "114", source: "Google" },
  "california-burritos": { stars: 4.3, reviews: "1,442", source: "Google" },
  harrys: { stars: 4.5, reviews: "238", source: "Google" },
  chuys: { stars: 4.4, reviews: "1,182", source: "Google" },
  "la-perla": { stars: 4.6, reviews: "624", source: "Google" },
  adrians: { stars: 4.8, reviews: "848", source: "Google" },
  crack: { stars: 4.4, reviews: "796", source: "Grubhub" },
  "burros-and-fries": { stars: 4.6, reviews: "260+", source: "Uber Eats · Yelp is 2.6" },
  "el-papas": { stars: 4.5, reviews: "324", source: "Google" },
  "stars-and-stripes": { stars: 4.5, reviews: "964", source: "Grubhub" },
  "el-viejon": { stars: 4.1, reviews: "208", source: "Yelp" },
  "casa-de-maria": { stars: 4.1, reviews: "830", source: "Google" },
  miguels: { stars: 4.5, reviews: "403", source: "OpenTable" },
  vallarta: { stars: 3.7, reviews: "255", source: "Google · Yelp is 3.4" },
  "la-puerta": { stars: 4.5, reviews: "5,403", source: "Google" },
  mikes: { stars: 4.6, reviews: "2,136", source: "Google" },
  "tacos-tortas": { stars: 4.1, reviews: "44", source: "Yelp" },
};

export type PlaceReview = {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  burrito: string;
  price: string;
  saying: string;
};

export const PLACES: PlaceReview[] = [
  {
    id: "jvs",
    name: "JV's Mexican Food",
    neighborhood: "Bay Park",
    address: "1112 Morena Blvd, San Diego, CA 92110",
    burrito: "Surf N Turf",
    price: "About $14.60 on recent menus. Confirm at the counter.",
    saying:
      "This is the burrito the city treats as the monument. Eater San Diego called the Surf N Turf the shop's top seller, on the menu since day one: chopped carne asada, about fourteen medium shrimp, rice, guacamole, and sautéed peppers, onions, and tomatoes, rolled in two overlapping tortillas. Yelp and TripAdvisor keep landing on the same three words — huge, shareable, filling. A visitor who came back from Los Angeles for it said the shrimp were whole but small, the rice was not heavy, and two people still left half. Others call the steak lean and the shrimp plump. The dissent is useful: some people think the flavor is only okay once the size wears off, and at least one review compared it to gas-station seafood. Our read of the public record: JV's is the size champion and the value play. It is not automatically the most refined bite in town. If the question is portion per dollar, the city has already voted.",
  },
  {
    id: "lucha-libre",
    name: "Lucha Libre Taco Shop",
    neighborhood: "Mission Hills",
    address: "1810 W Washington St, San Diego, CA 92103",
    burrito: "Surfin' California",
    price: "$19 on the shop's online order. Other menus have shown $21–$23.",
    saying:
      "The Surfin' California is the celebrity. San Diego Reader wrote it up as Diego Rojano's late-night fusion of a surf and turf and a California burrito. Man vs. Food put it on television. Thrillist walked through flame-grilled asada, lime-marinated shrimp, house fries, avocado, pico, jack, and a secret chipotle in a 14-inch tortilla. Diners say the flavors stay distinct and the wrap is cleaner than a burrito this size has any right to be. The shop's overall Google rating sits well below the burrito's reputation. People complain about the line, the price, and inconsistency, then still name this specific burrito when someone asks where to get steak and shrimp in a tortilla. That split is the whole point. Restaurant stars are not a surf and turf score. At $19 and up, the public argument is no longer whether it is famous. It is whether the chipotle and the spectacle still earn the ticket.",
  },
  {
    id: "craft-taco",
    name: "The Craft Taco at SOVA",
    neighborhood: "Sorrento Valley",
    address: "11585 Sorrento Valley Rd #108, San Diego, CA 92121",
    burrito: "Surf and Turf California Burrito",
    price: "A 2024 diner paid $15.50 for a chicken-and-shrimp version. Steak-and-shrimp price needs a counter check.",
    saying:
      "This is the quality-over-spectacle shop in the current conversation. Reviewers keep saying the shrimp are actual shrimp — main-course size, not taco-shop specks — and that the burrito tastes composed rather than stuffed. Google reviews in 2025 describe people ordering it, coming back, and ordering it again. Yelp mentions a toasted tortilla and ingredients that show up together. One regular said a disappointing regular California was fixed on the spot by the owner, then called the surf and turf out of this world on the return. The room is small and sits in an office park. The praise is about seasoning and seafood, not forearm measurements. Public mood: worth the Sorrento Valley detour if you care more about the shrimp than the legend.",
  },
  {
    id: "taco-surf",
    name: "Taco Surf PB",
    neighborhood: "Pacific Beach",
    address: "4657 Mission Blvd, San Diego, CA 92109",
    burrito: "Surf & Turf Burrito",
    price: "Toast listed $17.87. Delivery apps have shown it higher.",
    saying:
      "Pacific Beach regulars talk about Taco Surf the way people talk about a reliable break. Summaries of Google chatter call the surf and turf dream-worthy and a step above the rest of the board. A longtime customer told Yelp the shop still does not disappoint after a remodel. Uber Eats item ratings sat around 88% on a small sample, with at least one A++ note. Delivery reviews are the caveat: grease through the tortilla, the paper, and the bag, and the occasional bland one. In-shop praise is warmer than bag praise. That gap is a tasting question. Locals treat the price as beach money, not a bargain monster.",
  },
  {
    id: "chachos",
    name: "Chacho's Tacos",
    neighborhood: "Kearny Mesa",
    address: "8262 Clairemont Mesa Blvd, San Diego, CA 92111",
    burrito: "Surf & Turf Burrito",
    price: "Not on a public menu in the September 2026 check.",
    saying:
      "The useful public note is specific. An October 2025 Yelp review of the truck outside Societe Brewing said a surf and turf had a good amount of shrimp and asada, was not oily or fishy, and held together while they ate it. That is a structural compliment. The shop's overall rating is high on a small base. There is not a pile of burrito-only writeups yet. Promising, and thin. Truck portions usually play the value game. Confirm the number at the window.",
  },
  {
    id: "california-burritos",
    name: "California Burritos",
    neighborhood: "Serra Mesa",
    address: "7754 Starling Dr, San Diego, CA 92123",
    burrito: "Surf and Turf Burrito",
    price: "Launch notes cited about $18.52. Later menus have shown lower.",
    saying:
      "The restaurant name does the marketing. Public ratings are solid — Google in the mid-4s, Uber Eats around 4.7 from a huge delivery sample — and at least one delivery customer named the surf and turf in a five-star order next to a carne asada quesadilla. What is missing is a thick stack of burrito-specific breakdowns: steak, shrimp size, whether fries or rice do the work. Until someone writes that down, the public case is a popular shop and a popular delivery order, with an under-described burrito. Treat the price as moving.",
  },
  {
    id: "harrys",
    name: "Harry's Taco Club",
    neighborhood: "Pacific Beach",
    address: "4612 Cass St, San Diego, CA 92109",
    burrito: "Steak N' Shrimp Cali Burrito",
    price: "Toast listed $19.19 at the Cass Street shop.",
    saying:
      "Harry's is the clean, short-menu version of the argument. Steak N' Shrimp Cali shows up as a customer favorite. A detailed writeup called the seasoned fries the whole game, said the shrimp were not shorted, and called the first bite bursting. The regular California still gets 'no notes' comments in 2026. Delivery item ratings on the steak-and-shrimp version have run softer than the plain California — 77% versus 94% on one small Uber Eats snapshot. Read that as: the upgrade is loved in the shop and less proven in a bag. Reviewers have called Harry's expensive and still the best California they have had. The shrimp surcharge is the question.",
  },
  {
    id: "chuys",
    name: "Chuy's Taco Shop",
    neighborhood: "College Area",
    address: "6663 El Cajon Blvd #G, San Diego, CA 92115",
    burrito: "Surf and Turf Cali",
    price: "$24.99 for the huge double-tortilla Cali on Uber Eats. A smaller surf and turf listed at $17.99.",
    saying:
      "Chuy's wins the internet on size. Uber Eats showed the Surf and Turf Cali at 97% from 230 item ratings — one of the strongest item-level signals on this board. Delivery customers call it arm-sized, easily two or three people, and worth the price. A 2025 video stop confirmed the forearm claim and liked the asada-and-shrimp mix. The split in the record is quality versus mass. Some diners love the pile. Others call the meat chewy, the fries soggy, or the regular California under-sauced. The Guy Fieri lore raises expectations the kitchen does not always meet. If it truly feeds three, $25 changes meaning. If it is just large and muddy, it does not.",
  },
  {
    id: "la-perla",
    name: "La Perla Cocina Mexicana #3",
    neighborhood: "Point Loma",
    address: "1224 Rosecrans St, San Diego, CA 92106",
    burrito: "Surf & Turf Burrito",
    price: "Not confirmed in the September 2026 check.",
    saying:
      "La Perla's public fame is the Oaxaca California and the King Kong, not a detailed surf and turf literature. The family menu includes steak-and-shrimp burritos across shops, and the Point Loma counter has a real burrito reputation. San Diego Magazine's 2026 critic pick was for the burritos, not this specific item. Until diners write the steak-and-shrimp version the way they write the Oaxacalifornia, the honest public case is an excellent burrito shop with an under-documented surf and turf. Portions have a generous reputation. The price still needs the board.",
  },
  {
    id: "adrians",
    name: "Adrian's Surf n' Turf Grill",
    neighborhood: "Kearny Mesa",
    address: "9353 Clairemont Mesa Blvd Ste L1, San Diego, CA 92123",
    burrito: "Not confirmed on the menu checked September 27, 2026.",
    price: "Not applicable until a burrito is on the menu.",
    saying:
      "People love Adrian's as a Kearny Mesa grill — ahi, rockfish, steaks, sandwiches. That is not the same as loving a surf and turf burrito. The official menu checked on September 27, 2026 did not list one. Do not borrow a 4.8 restaurant rating and pin it on a burrito that may not exist. It stays on the board so the search does not lie. It does not get a burrito opinion until the item is on the menu.",
  },
  {
    id: "crack",
    name: "Crack Taco Shop",
    neighborhood: "Mission Valley",
    address: "4242 Camino Del Rio N #28, San Diego, CA 92108",
    burrito: "Surf & Turf, talked about as tri-tip and shrimp",
    price: "Not confirmed in the research sweep.",
    saying:
      "Crack's public identity is burgundy-pepper tri-tip, not standard carne asada. Community notes describe a shrimp-plus-tri-tip surf and turf, which would make this a variant, not the classic. There is not a dense set of published burrito breakdowns to quote. The late hours — Mission Valley toward midnight, Seaport Village later — are why people bring it up after everything else is closed. Opinion withheld until it is tasted. The lead is real.",
  },
  {
    id: "burros-and-fries",
    name: "Burros & Fries",
    neighborhood: "Sabre Springs",
    address: "12608 Sabre Springs Pkwy, San Diego, CA 92128",
    burrito: "Surf & Turf Burro",
    price: "$14.19 on Clover.",
    saying:
      "Diners have called this one of the best burritos they ate all year, and the verified menu is unusually complete: steak, shrimp, rice, fries, cheese, chipotle, salsa fresca, and house sauce. Both rice and fries, two sauces, and one of the lowest confirmed prices on the board. That combination is the value argument. What we do not have is a large, current pile of item reviews to stress-test the praise. It belongs on a worth-the-drive list pending a bite. The menu, at that price, is already doing more work than most slogans.",
  },
  {
    id: "el-papas",
    name: "El Papas Fritas Taco Shop",
    neighborhood: "City Heights",
    address: "5413 Redwood St, San Diego, CA 92105",
    burrito: "Cali Surf & Turf",
    price: "Not confirmed.",
    saying:
      "The name tells you the house move is fries. Community praise singled out the shrimp in a Cali surf and turf. The City Heights shop and the long hours check out. Item-level published reviews are scarce, so this is a lead, not a verdict. Fries-first shops are exactly where a California surf and turf either sings or turns to mush. The public has not written that chapter yet.",
  },
  {
    id: "stars-and-stripes",
    name: "Stars and Stripes Taco Shop",
    neighborhood: "Miramar",
    address: "5706 Miramar Rd, San Diego, CA 92121",
    burrito: "Surf & Turf Burrito",
    price: "Community comments put it near $20.",
    saying:
      "Surf and turf comes up often enough that the shop belongs on the board. The other recurring note is price grumbling around $20. Restaurant ratings on delivery apps are healthy. Burrito-specific writeups are not deep. This is a Miramar counter people mention, not one they essay. Near $20, the complaint and the hook are the same sentence: it had better be a shrimp burrito, not a steak burrito with a rumor of shrimp.",
  },
  {
    id: "el-viejon",
    name: "El Viejón",
    neighborhood: "Mira Mesa",
    address: "9837 Mira Mesa Blvd, San Diego, CA 92131",
    burrito: "Surf n' Turf Burrito",
    price: "About $24 on Mira Mesa delivery menus. A Convoy listing has shown $17.",
    saying:
      "El Viejón is a seafood house that also rolls a surf and turf. Delivery menus describe steak, shrimp, rice, cabbage, cheese, pico, and white sauce — a Baja-leaning build, not a fries California. Prices jump by location and platform. The shop's Yelp rating is middling, and there is not a chorus of burrito essays. Go for the seafood context. Do not assume the burrito inherited the ceviche reputation. Confirm the board at the shop you actually visit.",
  },
  {
    id: "casa-de-maria",
    name: "Casa de Maria",
    neighborhood: "Old Town",
    address: "2611 San Diego Ave, San Diego, CA 92110",
    burrito: "Steak and shrimp, with fries, guacamole, chipotle aioli, cheese, and pico",
    price: "About $22.99 in launch research. Confirm on the printed menu.",
    saying:
      "Old Town, sit-down. The build that circulated was steak, shrimp, fries, guacamole, chipotle aioli, cheese, and pico. Official pages checked in September 2026 did not clearly reprint that line, so even the item needs a glance at the physical menu. Public reviews talk patio, live music, and standard Old Town plates more than this burrito. Sit-down pricing. Compare it with a taco-shop version only after both have been eaten. The public has not done that comparison for you.",
  },
  {
    id: "miguels",
    name: "Miguel's Portside Pier",
    neighborhood: "Downtown",
    address: "1360 N Harbor Dr, San Diego, CA 92101",
    burrito: "Surf & Turf Burrito",
    price: "About $27. The high end of the board.",
    saying:
      "This is the fancy wet burrito, the harbor plate that makes the price question obvious. The format people describe is about a pound: carne asada, shrimp, salsa, and fries, served wet with cheese, sour cream, and guacamole. Diners writing about Miguel's — the most detailed notes are often from the Carlsbad rooms — call the shrimp juicy, the asada well marinated, and the thing easy to split. One person who does not usually like shrimp in a burrito called it bomb. Another found the topping sauce ordinary, jar-like. OpenTable praise for Portside Pier is about the view, the chips, and the room as much as the tortilla. Reviewers who split it call it a value. Reviewers eating it alone are paying for the pier. It is a different meal from Morena Boulevard. Expensive is not the same word as best.",
  },
  {
    id: "vallarta",
    name: "Vallarta Express",
    neighborhood: "Pacific Beach",
    address: "1375 Garnet Ave, San Diego, CA 92109",
    burrito: "Surf & Turf Burrito",
    price: "About $14.95. Sometimes listed lower.",
    saying:
      "Vallarta Express is the value name that keeps getting dropped when San Diego actually argues about this. An August 2026 r/FoodSanDiego thread asked the question this site exists to answer. One of the strongest replies named Vallarta: big shrimp, steak, Mexican rice, guacamole, and sour cream. DoorDash item ratings in the launch research sat at 89% from 94 ratings. Writeups call the shrimp plump enough to stand next to the asada instead of disappearing. Among the lowest prices discussed. If the shrimp are truly large at that number, this is the value candidate until a tasting proves otherwise. The public is already pointing here when the brief is steak, shrimp, and not $25.",
  },
  {
    id: "la-puerta",
    name: "La Puerta",
    neighborhood: "Gaslamp",
    address: "560 Fourth Ave, San Diego, CA 92101",
    burrito: "Surf & Turf Burrito",
    price: "$23 on a 2026 menu reprint.",
    saying:
      "Gaslamp, sit-down. The printed build is steak, shrimp, grilled onion and poblano, ranchero, jack, chipotle crema, and guacamole. Yelp talks about surf and turf tacos and fries as much as the burrito. One regular said the burrito with rice and beans, served wet, is the move. This is nightlife Mexican, not a Morena Boulevard counter. The affection is real and not very granular. At $23 you are paying Gaslamp rent. Judge it as a night out, not as a taco-shop bargain.",
  },
  {
    id: "mikes",
    name: "Mike's Taco Club",
    neighborhood: "Ocean Beach",
    address: "5028 Newport Ave, San Diego, CA 92107",
    burrito: "Steak N' Shrimp Cali",
    price: "Not confirmed in September 2026.",
    saying:
      "A 2026 California burrito ranking from The San Diego List put Mike's on top and pointed at the Steak N' Shrimp Cali as the seafood move inside that shop. That is a strong local-editorial signal and still not a pile of item reviews. The shop is tiny. The California burrito is the reputation. The shrimp upgrade is recommended rather than dissected. Ocean Beach parking is part of the toll. It belongs in the first wave of tastings because the editorial case is specific.",
  },
  {
    id: "tacos-tortas",
    name: "Tacos Tortas & More",
    neighborhood: "Ocean Beach",
    address: "5026 Newport Ave, San Diego, CA 92107",
    burrito: "Surf N Turf Burrito",
    price: "$18 on Toast. Sometimes marked out of stock.",
    saying:
      "Almost no published diner essays. What exists is a clear recipe: sautéed shrimp, asada, pico, rice, avocado sauce, and chipotle aioli. It sits next door to Mike's, which makes it the cleanest comparison on the board once both are eaten. Until then the public record is a menu, not a chorus. Eighteen dollars, directly comparable to the rest of Newport Avenue. Out of stock is its own review.",
  },
];
