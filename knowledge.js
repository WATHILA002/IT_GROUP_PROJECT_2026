/* Sri Lanka knowledge base for the elephant chatbot.
   Add or edit topics freely: `keys` are matched against the visitor's message,
   `answer` may contain simple HTML, `chips` are suggested follow-up buttons. */
window.LANKA_KB = {
  name: "Ayu",
  welcome: "Ayubowan! 🙏 I'm <b>Ayu</b>, your little Sri Lanka guide. Ask me about places, food, travel tips or culture!",
  startChips: ["Top places", "Best time to visit", "Food to try", "Elephants", "7-day plan"],
  fallback: "Hmm, my trunk can't sniff that one out yet 🐘 Try asking about places, food, weather, trains, festivals or elephants.",
  fallbackChips: ["Top places", "Food to try", "Getting around"],

  topics: [
    {
      keys: ["hello", "hi ", "hey", "ayubowan", "vanakkam", "good morning", "good evening"],
      answer: "Ayubowan! 🐘 That means “may you live long” in Sinhala. How can I help you explore Sri Lanka?",
      chips: ["Top places", "Food to try", "Best time to visit"]
    },
    {
      keys: ["thank", "thanks", "stuti", "nandri"],
      answer: "You're very welcome! 🐘💛 (“Sthuthi” in Sinhala, “Nandri” in Tamil.) Anything else?",
      chips: ["Top places", "Festivals"]
    },
    {
      keys: ["bye", "goodbye", "see you"],
      answer: "Bye for now! Come back soon – I'll be here, probably napping on the floor 😴🐘",
      chips: []
    },
    {
      keys: ["top places", "places", "must see", "must visit", "attractions", "where to go", "highlights", "visit"],
      answer: "Sri Lanka's highlights:<ul><li><b>Sigiriya</b> – the Lion Rock fortress</li><li><b>Kandy</b> – Temple of the Tooth Relic</li><li><b>Ella</b> – hikes, tea hills, the Nine Arches Bridge</li><li><b>Galle</b> – Dutch-era fort by the sea</li><li><b>Yala / Udawalawe</b> – safaris</li><li><b>Mirissa</b> – beaches and whale watching</li></ul>Tap one below for details!",
      chips: ["Sigiriya", "Kandy", "Ella", "Galle", "Yala safari"]
    },
    {
      keys: ["sigiriya", "lion rock", "lion's rock"],
      answer: "<b>Sigiriya</b> is a 5th-century rock fortress rising from the jungle, a UNESCO World Heritage Site. You climb stairs past the Mirror Wall and ancient frescoes to ruins on top. Go early in the morning to beat the heat and crowds, and check the current ticket price on the official site before you go. Nearby: <b>Pidurangala Rock</b> for a sunset view <i>of</i> Sigiriya, and <b>Dambulla cave temples</b>.",
      chips: ["Cultural triangle", "Best time to visit", "Getting around"]
    },
    {
      keys: ["kandy", "tooth", "peradeniya", "perahera"],
      answer: "<b>Kandy</b> is the hill-country cultural capital. See the <b>Temple of the Tooth Relic</b> (puja ceremonies happen daily), stroll around Kandy Lake, and visit the <b>Royal Botanical Gardens, Peradeniya</b>. The grand <b>Esala Perahera</b> parade, with decorated elephants, happens in July/August.",
      chips: ["Festivals", "Temple etiquette", "Train rides"]
    },
    {
      keys: ["ella", "nine arch", "little adam", "ella rock"],
      answer: "<b>Ella</b> is a laid-back hill village. Do the easy walk to <b>Little Adam's Peak</b>, see the <b>Nine Arches Bridge</b> when a train passes, and try the harder <b>Ella Rock</b> hike early in the morning. The Kandy–Ella train ride is part of the experience!",
      chips: ["Train rides", "Nuwara Eliya", "Best time to visit"]
    },
    {
      keys: ["galle", "fort", "dutch"],
      answer: "<b>Galle Fort</b> is a UNESCO-listed Dutch-era fort on the south coast. Walk the ramparts at sunset, explore the lanes of cafés and boutiques, and visit the lighthouse. Beaches like <b>Unawatuna</b> and <b>Mirissa</b> are close by.",
      chips: ["Beaches", "Best time to visit"]
    },
    {
      keys: ["yala", "safari", "leopard", "wilpattu", "wildlife", "national park", "udawalawe"],
      answer: "For wildlife: <b>Yala</b> is famous for leopards, <b>Udawalawe</b> is great for herds of elephants, and <b>Wilpattu</b> is quieter and wilder. Jeep safaris are best at dawn or late afternoon. Book a reputable operator and keep a respectful distance from animals.",
      chips: ["Elephants", "Best time to visit"]
    },
    {
      keys: ["elephant", "pinnawala", "minneriya", "gathering", "trunk"],
      answer: "Elephants are special in Sri Lanka 🐘. Ethical ways to see them:<ul><li><b>Udawalawe / Minneriya / Kaudulla</b> national parks – wild herds (the Minneriya “Gathering” is roughly July–October)</li><li><b>Elephant Transit Home</b> at Udawalawe – baby elephants being rehabilitated</li></ul>Tip: choose observation over rides, since riding is not kind to elephants. (I'm a very small elephant, so I'm biased 😄)",
      chips: ["Yala safari", "Festivals"]
    },
    {
      keys: ["nuwara eliya", "tea", "hill country", "horton", "world's end", "worlds end", "ceylon"],
      answer: "<b>Nuwara Eliya</b> (“Little England”) is cool, misty tea country. Tour a tea factory, walk through the plantations, and visit <b>Horton Plains</b> for <b>World's End</b> – go at sunrise before the clouds roll in. Pack a warm layer!",
      chips: ["Ella", "Train rides"]
    },
    {
      keys: ["beach", "beaches", "mirissa", "unawatuna", "bentota", "hikkaduwa", "arugam", "trincomalee", "nilaveli", "surf", "whale", "snorkel", "diving"],
      answer: "Beaches by season:<ul><li><b>South &amp; west coast</b> (Mirissa, Unawatuna, Bentota, Hikkaduwa) – best around Dec–Apr</li><li><b>East coast</b> (Trincomalee, Nilaveli, Arugam Bay) – best around Apr–Sep; Arugam Bay is the surf spot</li></ul>Whale watching off Mirissa is usually best roughly Nov–Apr.",
      chips: ["Best time to visit", "Galle"]
    },
    {
      keys: ["cultural triangle", "anuradhapura", "polonnaruwa", "dambulla", "ancient", "history", "ruins", "unesco"],
      answer: "The <b>Cultural Triangle</b> holds ancient capitals: <b>Anuradhapura</b> (Sri Maha Bodhi tree, huge stupas), <b>Polonnaruwa</b> (ruins and the Gal Vihara rock statues), plus <b>Sigiriya</b> and the <b>Dambulla</b> cave temples. Rent a bicycle or hire a tuk-tuk to cover the ruins.",
      chips: ["Sigiriya", "Temple etiquette"]
    },
    {
      keys: ["adam's peak", "adams peak", "sri pada", "sripada", "pilgrim"],
      answer: "<b>Sri Pada (Adam's Peak)</b> is a sacred mountain with a pilgrimage season roughly December to May. Most people climb the thousands of steps at night to catch sunrise from the summit. Wear layers, carry water and a torch, and take your time.",
      chips: ["Best time to visit", "Temple etiquette"]
    },
    {
      keys: ["colombo", "capital", "galle face", "pettah"],
      answer: "<b>Colombo</b> is the busy coastal capital: sunset at <b>Galle Face Green</b>, the colourful <b>Pettah</b> market, <b>Gangaramaya Temple</b>, the National Museum, and plenty of great food and cafés.",
      chips: ["Food to try", "Getting around"]
    },
    {
      keys: ["food", "eat", "dish", "cuisine", "rice and curry", "kottu", "hoppers", "lamprais", "spicy", "restaurant", "street food", "drink"],
      answer: "Must-try food 😋<ul><li><b>Rice &amp; curry</b> – many small curries, coconut sambol</li><li><b>Kottu roti</b> – chopped roti stir-fried with veg, egg or meat</li><li><b>Hoppers (appa) &amp; string hoppers</b></li><li><b>Lamprais</b> – rice and curries baked in a banana leaf</li><li><b>Watalappan</b> – coconut-jaggery custard</li><li><b>King coconut</b> and Ceylon tea to drink</li></ul>It can be spicy: ask for “mild” if you prefer.",
      chips: ["Vegetarian food", "Top places"]
    },
    {
      keys: ["vegetarian", "vegan"],
      answer: "Sri Lanka is easy for vegetarians 🌱 – dhal, jackfruit, pumpkin, brinjal and coconut sambol are everywhere, and rice &amp; curry usually has many veg dishes. Just say “no fish, no meat”, and ask about shrimp paste or fish in the curries.",
      chips: ["Food to try"]
    },
    {
      keys: ["best time", "when to visit", "when to go", "weather", "season", "monsoon", "rain", "climate", "hot"],
      answer: "Sri Lanka has two monsoons, so there's always a sunny side:<ul><li><b>West &amp; south coast + hill country:</b> ~Dec–Mar</li><li><b>East coast:</b> ~Apr–Sep</li><li><b>Wildlife &amp; Cultural Triangle:</b> fairly good most of the year; Minneriya elephants ~Jul–Oct</li></ul>Tip: if the south is rainy, head east, and the other way round!",
      chips: ["Beaches", "7-day plan"]
    },
    {
      keys: ["getting around", "transport", "bus", "tuk", "taxi", "driver", "pickme", "uber", "travel around", "airport"],
      answer: "Getting around:<ul><li><b>Trains</b> – scenic and cheap, ideal for the hill country</li><li><b>Tuk-tuks</b> – agree the fare first, or use a ride app such as PickMe</li><li><b>Buses</b> – everywhere, very cheap, can be crowded</li><li><b>Private driver</b> – comfortable for multi-stop trips</li></ul>Allow extra time: distances look short, but roads are slow.",
      chips: ["Train rides", "7-day plan"]
    },
    {
      keys: ["train", "railway", "kandy to ella", "ella train", "scenic train"],
      answer: "🚂 The <b>Kandy → Nanu Oya/Ella</b> line is one of the world's most scenic rides. Reserve seats in advance when you can (they sell out), sit on the correct side for views, and keep your camera ready near tea estates and tunnels. Delays are common, so don't schedule tight connections.",
      chips: ["Ella", "Getting around"]
    },
    {
      keys: ["visa", "eta", "entry", "passport", "immigration"],
      answer: "Most visitors need an <b>ETA / visa</b> before arriving. Rules change, so please apply only through the <b>official Sri Lanka government website</b> and confirm current requirements for your nationality before you travel.",
      chips: ["Money", "Best time to visit"]
    },
    {
      keys: ["money", "currency", "rupee", "lkr", "atm", "cost", "budget", "price", "cheap", "expensive", "tip"],
      answer: "The currency is the <b>Sri Lankan Rupee (LKR)</b>. Cards are widely accepted in cities and hotels; carry cash for small shops, buses and rural areas. ATMs are common in towns. Budget varies a lot: street food and buses are very cheap, safaris and hotels cost more.",
      chips: ["Getting around", "Visa"]
    },
    {
      keys: ["temple", "etiquette", "dress", "modest", "respect", "shoes", "buddha", "culture", "custom"],
      answer: "Temple etiquette 🙏<ul><li>Cover shoulders and knees (white is traditional)</li><li>Remove shoes <i>and</i> hats before entering</li><li>Never pose with your back to a Buddha statue or take disrespectful selfies</li><li>Don't climb on statues or point your feet at them</li></ul>",
      chips: ["Festivals", "Kandy"]
    },
    {
      keys: ["festival", "poya", "vesak", "new year", "avurudu", "celebration", "holiday", "event"],
      answer: "Festivals 🎉<ul><li><b>Sinhala &amp; Tamil New Year</b> – mid-April, with games, sweets and family time</li><li><b>Vesak</b> – May, glowing lanterns and light displays</li><li><b>Esala Perahera (Kandy)</b> – July/Aug, elephants, drummers and dancers</li><li><b>Poya days</b> – every full moon is a public holiday, and alcohol sales are usually restricted</li></ul>",
      chips: ["Kandy", "Elephants"]
    },
    {
      keys: ["language", "sinhala", "tamil", "english", "speak", "phrase", "word"],
      answer: "The main languages are <b>Sinhala</b> and <b>Tamil</b>, and English is widely understood in tourist areas. Easy phrases: <b>Ayubowan</b> (hello, Sinhala), <b>Vanakkam</b> (hello, Tamil), <b>Sthuthi</b> (thanks, Sinhala), <b>Nandri</b> (thanks, Tamil).",
      chips: ["Temple etiquette", "Top places"]
    },
    {
      keys: ["safe", "safety", "health", "water", "mosquito", "dengue", "sunscreen", "scam", "vaccine", "insurance"],
      answer: "Staying well: drink bottled or filtered water, use sunscreen and mosquito repellent, and be firm but friendly with touts. Agree prices before rides. Check with a doctor or travel clinic about vaccinations, and get travel insurance.",
      chips: ["Money", "Getting around"]
    },
    {
      keys: ["7 day", "7-day", "seven day", "week", "itinerary", "plan", "5 day", "10 day", "trip plan", "route"],
      answer: "A classic <b>7-day</b> route:<ul><li><b>Day 1:</b> Arrive, relax in Negombo or Colombo</li><li><b>Day 2:</b> Dambulla → Sigiriya</li><li><b>Day 3:</b> Polonnaruwa or a safari near Minneriya</li><li><b>Day 4:</b> Kandy temple, botanical gardens</li><li><b>Day 5:</b> Train to Nuwara Eliya / Ella</li><li><b>Day 6:</b> Ella hikes → south coast</li><li><b>Day 7:</b> Galle Fort &amp; beach</li></ul>Want a different length or interests (beach, wildlife, culture)? Just ask!",
      chips: ["Best time to visit", "Getting around"]
    },
    {
      keys: ["who are you", "your name", "what are you", "ayu", "about you", "bot"],
      answer: "I'm <b>Ayu</b>, a baby elephant who loves Sri Lanka 🐘. Pick me up and drop me if you like… I always land on my feet (mostly)!",
      chips: ["Top places", "Elephants"]
    }
  ]
};
