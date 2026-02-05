// Complete game.js with 100+ levels
document.addEventListener('DOMContentLoaded', function() {
    // Game State
    const gameState = {
        coins: 100,
        currentLevel: 1,
        maxLevel: 150, // Increased to accommodate all levels
        completedLevels: [],
        hintsUsed: 0,
        playTime: 0,
        streakDays: 1,
        lastPlayDate: new Date().toDateString(),
        soundEnabled: true,
        vibrationEnabled: true,
        darkTheme: false,
        levelData: [],
        currentAnswer: '',
        selectedLetters: [],
        hintRevealedLetters: [],
        incorrectLettersRemoved: false,
        achievements: [],
        charismaPoints: 0,
        specialUnlocks: [],
        currentKeyboardFocus: 0,
        isTypingMode: false
    };

    // Complete list of 150+ image combo puzzles
    const allLevels = [
        // Basic Level 1-10
        { id: 1, image1: "🌞", label1: "Sun", image2: "🌼", label2: "Flower", answer: "SUNFLOWER", difficulty: "easy", hint: "A flower that follows the sun", charismaReward: 1 },
        { id: 2, image1: "🌧️", label1: "Rain", image2: "🌈", label2: "Bow", answer: "RAINBOW", difficulty: "easy", hint: "Appears after rain when sun shines", charismaReward: 1 },
        { id: 3, image1: "🦶", label1: "Foot", image2: "⚽", label2: "Ball", answer: "FOOTBALL", difficulty: "easy", hint: "Popular sport played with feet", charismaReward: 1 },
        { id: 4, image1: "🦷", label1: "Tooth", image2: "🪥", label2: "Paste", answer: "TOOTHPASTE", difficulty: "easy", hint: "Used for cleaning teeth", charismaReward: 1 },
        { id: 5, image1: "📝", label1: "Note", image2: "📖", label2: "Book", answer: "NOTEBOOK", difficulty: "easy", hint: "Used for writing notes", charismaReward: 1 },
        { id: 6, image1: "🍳", label1: "Pan", image2: "🎂", label2: "Cake", answer: "PANCAKE", difficulty: "easy", hint: "Breakfast food cooked in pan", charismaReward: 1 },
        { id: 7, image1: "☕", label1: "Cup", image2: "🎂", label2: "Cake", answer: "CUPCAKE", difficulty: "easy", hint: "Small individual cake", charismaReward: 1 },
        { id: 8, image1: "⭐", label1: "Star", image2: "🐠", label2: "Fish", answer: "STARFISH", difficulty: "easy", hint: "Sea creature shaped like star", charismaReward: 1 },
        { id: 9, image1: "🌙", label1: "Moon", image2: "💡", label2: "Light", answer: "MOONLIGHT", difficulty: "easy", hint: "Light from the moon", charismaReward: 1 },
        { id: 10, image1: "🚪", label1: "Door", image2: "🔔", label2: "Bell", answer: "DOORBELL", difficulty: "easy", hint: "Rings when someone visits", charismaReward: 1 },
        
        // Level 11-20
        { id: 11, image1: "🔥", label1: "Fire", image2: "🪰", label2: "Fly", answer: "FIREFLY", difficulty: "easy", hint: "Insect that glows at night", charismaReward: 1 },
        { id: 12, image1: "🍯", label1: "Honey", image2: "🌙", label2: "Moon", answer: "HONEYMOON", difficulty: "easy", hint: "Vacation after wedding", charismaReward: 1 },
        { id: 13, image1: "✋", label1: "Hand", image2: "👜", label2: "Bag", answer: "HANDBAG", difficulty: "easy", hint: "Bag carried by hand", charismaReward: 1 },
        { id: 14, image1: "💇", label1: "Hair", image2: "✂️", label2: "Cut", answer: "HAIRCUT", difficulty: "easy", hint: "Getting hair trimmed", charismaReward: 1 },
        { id: 15, image1: "🛁", label1: "Bath", image2: "🏠", label2: "Room", answer: "BATHROOM", difficulty: "easy", hint: "Room for bathing", charismaReward: 1 },
        { id: 16, image1: "🛏️", label1: "Bed", image2: "🏠", label2: "Room", answer: "BEDROOM", difficulty: "easy", hint: "Room for sleeping", charismaReward: 1 },
        { id: 17, image1: "📚", label1: "Class", image2: "🏠", label2: "Room", answer: "CLASSROOM", difficulty: "easy", hint: "Room for teaching", charismaReward: 1 },
        { id: 18, image1: "🎮", label1: "Play", image2: "🟩", label2: "Ground", answer: "PLAYGROUND", difficulty: "easy", hint: "Area for children to play", charismaReward: 1 },
        { id: 19, image1: "⬅️", label1: "Back", image2: "🎒", label2: "Pack", answer: "BACKPACK", difficulty: "easy", hint: "Bag worn on back", charismaReward: 1 },
        { id: 20, image1: "👁️", label1: "Eye", image2: "⚽", label2: "Ball", answer: "EYEBALL", difficulty: "easy", hint: "The ball of the eye", charismaReward: 1 },
        
        // Level 21-30
        { id: 21, image1: "🌊", label1: "Sea", image2: "🐚", label2: "Shell", answer: "SEASHELL", difficulty: "easy", hint: "Shell found by sea", charismaReward: 1 },
        { id: 22, image1: "🏖️", label1: "Sand", image2: "📦", label2: "Box", answer: "SANDBOX", difficulty: "easy", hint: "Box filled with sand for play", charismaReward: 1 },
        { id: 23, image1: "🥎", label1: "Base", image2: "⚾", label2: "Ball", answer: "BASEBALL", difficulty: "easy", hint: "Popular American sport", charismaReward: 1 },
        { id: 24, image1: "❄️", label1: "Snow", image2: "👨", label2: "Man", answer: "SNOWMAN", difficulty: "easy", hint: "Figure made of snow", charismaReward: 1 },
        { id: 25, image1: "📬", label1: "Mail", image2: "📦", label2: "Box", answer: "MAILBOX", difficulty: "easy", hint: "Box for receiving mail", charismaReward: 1 },
        { id: 26, image1: "🌍", label1: "Earth", image2: "🌋", label2: "Quake", answer: "EARTHQUAKE", difficulty: "medium", hint: "Ground shaking event", charismaReward: 2 },
        { id: 27, image1: "📰", label1: "News", image2: "📄", label2: "Paper", answer: "NEWSPAPER", difficulty: "easy", hint: "Daily publication with news", charismaReward: 1 },
        { id: 28, image1: "🔑", label1: "Key", image2: "⌨️", label2: "Board", answer: "KEYBOARD", difficulty: "easy", hint: "Used for typing on computer", charismaReward: 1 },
        { id: 29, image1: "🚪", label1: "Door", image2: "👣", label2: "Step", answer: "DOORSTEP", difficulty: "easy", hint: "Step at entrance of door", charismaReward: 1 },
        { id: 30, image1: "👄", label1: "Lip", image2: "💄", label2: "Stick", answer: "LIPSTICK", difficulty: "easy", hint: "Cosmetic for lips", charismaReward: 1 },
        
        // Level 31-40
        { id: 31, image1: "📚", label1: "Book", image2: "🏪", label2: "Store", answer: "BOOKSTORE", difficulty: "easy", hint: "Store that sells books", charismaReward: 1 },
        { id: 32, image1: "🚂", label1: "Rail", image2: "🛤️", label2: "Way", answer: "RAILWAY", difficulty: "easy", hint: "Track for trains", charismaReward: 1 },
        { id: 33, image1: "💧", label1: "Water", image2: "⬇️", label2: "Fall", answer: "WATERFALL", difficulty: "medium", hint: "Water falling from height", charismaReward: 2 },
        { id: 34, image1: "✈️", label1: "Air", image2: "🏢", label2: "Port", answer: "AIRPORT", difficulty: "easy", hint: "Place for airplanes", charismaReward: 1 },
        { id: 35, image1: "🌊", label1: "Sea", image2: "🍤", label2: "Food", answer: "SEAFOOD", difficulty: "easy", hint: "Food from the sea", charismaReward: 1 },
        { id: 36, image1: "👈", label1: "Side", image2: "🚶", label2: "Walk", answer: "SIDEWALK", difficulty: "easy", hint: "Path for pedestrians", charismaReward: 1 },
        { id: 37, image1: "🏠", label1: "House", image2: "💼", label2: "Work", answer: "HOUSEWORK", difficulty: "easy", hint: "Work done in house", charismaReward: 1 },
        { id: 38, image1: "☀️", label1: "Day", image2: "💭", label2: "Dream", answer: "DAYDREAM", difficulty: "medium", hint: "Dreaming while awake", charismaReward: 2 },
        { id: 39, image1: "🌙", label1: "Night", image2: "😱", label2: "Mare", answer: "NIGHTMARE", difficulty: "medium", hint: "Bad dream at night", charismaReward: 2 },
        { id: 40, image1: "⬆️", label1: "Over", image2: "🧥", label2: "Coat", answer: "OVERCOAT", difficulty: "medium", hint: "Coat worn over clothes", charismaReward: 2 },
        
        // Level 41-50
        { id: 41, image1: "💥", label1: "Pop", image2: "🌽", label2: "Corn", answer: "POPCORN", difficulty: "easy", hint: "Snack that pops", charismaReward: 1 },
        { id: 42, image1: "☕", label1: "Cup", image2: "🗄️", label2: "Board", answer: "CUPBOARD", difficulty: "medium", hint: "Storage for cups", charismaReward: 2 },
        { id: 43, image1: "⛵", label1: "Sail", image2: "🚤", label2: "Boat", answer: "SAILBOAT", difficulty: "medium", hint: "Boat with sails", charismaReward: 2 },
        { id: 44, image1: "🚢", label1: "Ship", image2: "💔", label2: "Wreck", answer: "SHIPWRECK", difficulty: "medium", hint: "Destroyed ship", charismaReward: 2 },
        { id: 45, image1: "🦶", label1: "Foot", image2: "👣", label2: "Print", answer: "FOOTPRINT", difficulty: "easy", hint: "Print made by foot", charismaReward: 1 },
        { id: 46, image1: "💨", label1: "Wind", image2: "🎡", label2: "Mill", answer: "WINDMILL", difficulty: "medium", hint: "Mill powered by wind", charismaReward: 2 },
        { id: 47, image1: "🌿", label1: "Grass", image2: "🦗", label2: "Hopper", answer: "GRASSHOPPER", difficulty: "medium", hint: "Insect that hops in grass", charismaReward: 2 },
        { id: 48, image1: "⛏️", label1: "Pick", image2: "👖", label2: "Pocket", answer: "PICKPOCKET", difficulty: "medium", hint: "Thief who steals from pockets", charismaReward: 2 },
        { id: 49, image1: "🌞", label1: "Sun", image2: "👓", label2: "Glass", answer: "SUNGLASS", difficulty: "easy", hint: "Glasses for sun protection", charismaReward: 1 },
        { id: 50, image1: "🌧️", label1: "Rain", image2: "🧥", label2: "Coat", answer: "RAINCOAT", difficulty: "easy", hint: "Coat for rain protection", charismaReward: 1 },
        
        // Level 51-60 (Medium Difficulty)
        { id: 51, image1: "⭐", label1: "Star", image2: "✨", label2: "Dust", answer: "STARDUST", difficulty: "medium", hint: "Magical dust from stars", charismaReward: 2 },
        { id: 52, image1: "🧠", label1: "Head", image2: "🎧", label2: "Phone", answer: "HEADPHONE", difficulty: "easy", hint: "Phones worn on head", charismaReward: 1 },
        { id: 53, image1: "✋", label1: "Hand", image2: "🤝", label2: "Shake", answer: "HANDSHAKE", difficulty: "easy", hint: "Greeting by shaking hands", charismaReward: 1 },
        { id: 54, image1: "🐴", label1: "Horse", image2: "👞", label2: "Shoe", answer: "HORSESHOE", difficulty: "medium", hint: "Metal shoe for horse", charismaReward: 2 },
        { id: 55, image1: "🛁", label1: "Bath", image2: "🛁", label2: "Tub", answer: "BATHTUB", difficulty: "easy", hint: "Tub for bathing", charismaReward: 1 },
        { id: 56, image1: "🧈", label1: "Butter", image2: "🦋", label2: "Fly", answer: "BUTTERFLY", difficulty: "medium", hint: "Insect with colorful wings", charismaReward: 2 },
        { id: 57, image1: "🔥", label1: "Fire", image2: "🪵", label2: "Wood", answer: "FIREWOOD", difficulty: "medium", hint: "Wood for fire", charismaReward: 2 },
        { id: 58, image1: "🌙", label1: "Moon", image2: "🚶", label2: "Walk", answer: "MOONWALK", difficulty: "medium", hint: "Dance move or walking on moon", charismaReward: 2 },
        { id: 59, image1: "🔔", label1: "Bell", image2: "👦", label2: "Boy", answer: "BELLBOY", difficulty: "medium", hint: "Hotel employee", charismaReward: 2 },
        { id: 60, image1: "🧠", label1: "Brain", image2: "⛈️", label2: "Storm", answer: "BRAINSTORM", difficulty: "medium", hint: "Creative thinking session", charismaReward: 2 },
        
        // Level 61-70
        { id: 61, image1: "❤️", label1: "Life", image2: "⏳", label2: "Time", answer: "LIFETIME", difficulty: "medium", hint: "Duration of one's life", charismaReward: 2 },
        { id: 62, image1: "🏍️", label1: "Motor", image2: "🚲", label2: "Cycle", answer: "MOTORCYCLE", difficulty: "medium", hint: "Two-wheeled motor vehicle", charismaReward: 2 },
        { id: 63, image1: "🦽", label1: "Wheel", image2: "💺", label2: "Chair", answer: "WHEELCHAIR", difficulty: "medium", hint: "Chair with wheels", charismaReward: 2 },
        { id: 64, image1: "🚌", label1: "Bus", image2: "🛑", label2: "Stop", answer: "BUSSTOP", difficulty: "easy", hint: "Where bus stops", charismaReward: 1 },
        { id: 65, image1: "🚜", label1: "Farm", image2: "🏠", label2: "House", answer: "FARMHOUSE", difficulty: "medium", hint: "House on farm", charismaReward: 2 },
        { id: 66, image1: "🟢", label1: "Green", image2: "🏠", label2: "House", answer: "GREENHOUSE", difficulty: "medium", hint: "House for growing plants", charismaReward: 2 },
        { id: 67, image1: "🥛", label1: "Milk", image2: "🤸", label2: "Shake", answer: "MILKSHAKE", difficulty: "easy", hint: "Shaken milk drink", charismaReward: 1 },
        { id: 68, image1: "🍵", label1: "Tea", image2: "🥄", label2: "Spoon", answer: "TEASPOON", difficulty: "easy", hint: "Small spoon for tea", charismaReward: 1 },
        { id: 69, image1: "🪑", label1: "Table", image2: "🧵", label2: "Cloth", answer: "TABLECLOTH", difficulty: "medium", hint: "Cloth for table", charismaReward: 2 },
        { id: 70, image1: "🧱", label1: "Wall", image2: "📜", label2: "Paper", answer: "WALLPAPER", difficulty: "medium", hint: "Paper for walls", charismaReward: 2 },
        
        // Level 71-80
        { id: 71, image1: "📝", label1: "Note", image2: "📋", label2: "Pad", answer: "NOTEPAD", difficulty: "easy", hint: "Pad for notes", charismaReward: 1 },
        { id: 72, image1: "🛣️", label1: "Road", image2: "🗺️", label2: "Map", answer: "ROADMAP", difficulty: "medium", hint: "Map showing roads", charismaReward: 2 },
        { id: 73, image1: "💡", label1: "Flash", image2: "💡", label2: "Light", answer: "FLASHLIGHT", difficulty: "medium", hint: "Portable light", charismaReward: 2 },
        { id: 74, image1: "🔫", label1: "Gun", image2: "💨", label2: "Powder", answer: "GUNPOWDER", difficulty: "hard", hint: "Explosive powder", charismaReward: 3 },
        { id: 75, image1: "🥁", label1: "Drum", image2: "🥢", label2: "Stick", answer: "DRUMSTICK", difficulty: "medium", hint: "Stick for drum or chicken leg", charismaReward: 2 },
        { id: 76, image1: "❄️", label1: "Snow", image2: "⚽", label2: "Ball", answer: "SNOWBALL", difficulty: "easy", hint: "Ball made of snow", charismaReward: 1 },
        { id: 77, image1: "🔥", label1: "Fire", image2: "🧑‍🚒", label2: "Fighter", answer: "FIREFIGHTER", difficulty: "medium", hint: "Person who fights fires", charismaReward: 2 },
        { id: 78, image1: "🛒", label1: "Shop", image2: "👨", label2: "Keeper", answer: "SHOPKEEPER", difficulty: "medium", hint: "Person who keeps shop", charismaReward: 2 },
        { id: 79, image1: "📚", label1: "Book", image2: "📍", label2: "Mark", answer: "BOOKMARK", difficulty: "easy", hint: "Marks place in book", charismaReward: 1 },
        { id: 80, image1: "🚪", label1: "Gate", image2: "🛤️", label2: "Way", answer: "GATEWAY", difficulty: "medium", hint: "Way through gate", charismaReward: 2 },
        
        // Level 81-90 (Hard Difficulty)
        { id: 81, image1: "🏖️", label1: "Sand", image2: "🌪️", label2: "Storm", answer: "SANDSTORM", difficulty: "hard", hint: "Storm of sand", charismaReward: 3 },
        { id: 82, image1: "🌞", label1: "Sun", image2: "⬆️", label2: "Rise", answer: "SUNRISE", difficulty: "medium", hint: "Sun rising in morning", charismaReward: 2 },
        { id: 83, image1: "🌞", label1: "Sun", image2: "⬇️", label2: "Set", answer: "SUNSET", difficulty: "medium", hint: "Sun setting in evening", charismaReward: 2 },
        { id: 84, image1: "⭐", label1: "Star", image2: "💡", label2: "Light", answer: "STARLIGHT", difficulty: "medium", hint: "Light from stars", charismaReward: 2 },
        { id: 85, image1: "🌧️", label1: "Rain", image2: "💧", label2: "Drop", answer: "RAINDROP", difficulty: "easy", hint: "Drop of rain", charismaReward: 1 },
        { id: 86, image1: "⛰️", label1: "Hill", image2: "🔝", label2: "Top", answer: "HILLTOP", difficulty: "medium", hint: "Top of hill", charismaReward: 2 },
        { id: 87, image1: "🌳", label1: "Tree", image2: "🏠", label2: "House", answer: "TREEHOUSE", difficulty: "medium", hint: "House in tree", charismaReward: 2 },
        { id: 88, image1: "💡", label1: "Light", image2: "🏠", label2: "House", answer: "LIGHTHOUSE", difficulty: "hard", hint: "House with light for ships", charismaReward: 3 },
        { id: 89, image1: "🏠", label1: "Home", image2: "💼", label2: "Work", answer: "HOMEWORK", difficulty: "easy", hint: "Work done at home", charismaReward: 1 },
        { id: 90, image1: "🛁", label1: "Bath", image2: "👘", label2: "Robe", answer: "BATHROBE", difficulty: "medium", hint: "Robe for after bath", charismaReward: 2 },
        
        // Level 91-100
        { id: 91, image1: "💧", label1: "Water", image2: "⛽", label2: "Tank", answer: "WATERTANK", difficulty: "medium", hint: "Tank for water storage", charismaReward: 2 },
        { id: 92, image1: "❄️", label1: "Snow", image2: "❄️", label2: "Flake", answer: "SNOWFLAKE", difficulty: "easy", hint: "Flake of snow", charismaReward: 1 },
        { id: 93, image1: "💨", label1: "Wind", image2: "🛡️", label2: "Shield", answer: "WINDSHIELD", difficulty: "hard", hint: "Shield against wind", charismaReward: 3 },
        { id: 94, image1: "🔥", label1: "Fire", image2: "🪑", label2: "Place", answer: "FIREPLACE", difficulty: "medium", hint: "Place for fire", charismaReward: 2 },
        { id: 95, image1: "☕", label1: "Cup", image2: "🤲", label2: "Holder", answer: "CUPHOLDER", difficulty: "medium", hint: "Holder for cup", charismaReward: 2 },
        { id: 96, image1: "📚", label1: "Book", image2: "🗄️", label2: "Shelf", answer: "BOOKSHELF", difficulty: "easy", hint: "Shelf for books", charismaReward: 1 },
        { id: 97, image1: "🖊️", label1: "Pen", image2: "🗄️", label2: "Stand", answer: "PENSTAND", difficulty: "medium", hint: "Stand for pens", charismaReward: 2 },
        { id: 98, image1: "📄", label1: "Paper", image2: "📎", label2: "Clip", answer: "PAPERCLIP", difficulty: "easy", hint: "Clip for papers", charismaReward: 1 },
        { id: 99, image1: "💇", label1: "Hair", image2: "🎀", label2: "Band", answer: "HAIRBAND", difficulty: "easy", hint: "Band for hair", charismaReward: 1 },
        { id: 100, image1: "🌧️", label1: "Rain", image2: "💧", label2: "Water", answer: "RAINWATER", difficulty: "easy", hint: "Water from rain", charismaReward: 1 },
        
        // Level 101-110 (Expert Difficulty)
        { id: 101, image1: "🌙", label1: "Moon", image2: "💎", label2: "Stone", answer: "MOONSTONE", difficulty: "hard", hint: "Gemstone named after moon", charismaReward: 3 },
        { id: 102, image1: "⭐", label1: "Star", image2: "🚢", label2: "Ship", answer: "STARSHIP", difficulty: "hard", hint: "Ship for stars", charismaReward: 3 },
        { id: 103, image1: "🌞", label1: "Sun", image2: "🧴", label2: "Screen", answer: "SUNSCREEN", difficulty: "medium", hint: "Screen against sun", charismaReward: 2 },
        { id: 104, image1: "🌊", label1: "Sea", image2: "🏖️", label2: "Shore", answer: "SEASHORE", difficulty: "medium", hint: "Shore of sea", charismaReward: 2 },
        { id: 105, image1: "✈️", label1: "Air", image2: "✈️", label2: "Plane", answer: "AIRPLANE", difficulty: "easy", hint: "Plane in air", charismaReward: 1 },
        { id: 106, image1: "🦶", label1: "Foot", image2: "🛤️", label2: "Path", answer: "FOOTPATH", difficulty: "medium", hint: "Path for feet", charismaReward: 2 },
        { id: 107, image1: "✋", label1: "Hand", image2: "👣", label2: "Print", answer: "HANDPRINT", difficulty: "easy", hint: "Print made by hand", charismaReward: 1 },
        { id: 108, image1: "🚪", label1: "Door", image2: "🖼️", label2: "Frame", answer: "DOORFRAME", difficulty: "medium", hint: "Frame of door", charismaReward: 2 },
        { id: 109, image1: "🚂", label1: "Rail", image2: "🛣️", label2: "Road", answer: "RAILROAD", difficulty: "medium", hint: "Road with rails", charismaReward: 2 },
        { id: 110, image1: "🛏️", label1: "Bed", image2: "🛏️", label2: "Sheet", answer: "BEDSHEET", difficulty: "easy", hint: "Sheet for bed", charismaReward: 1 },
        
        // Level 111-120
        { id: 111, image1: "⌚", label1: "Watch", image2: "🗼", label2: "Tower", answer: "WATCHTOWER", difficulty: "hard", hint: "Tower for watching", charismaReward: 3 },
        { id: 112, image1: "❤️", label1: "Life", image2: "🦺", label2: "Guard", answer: "LIFEGUARD", difficulty: "medium", hint: "Guard of life", charismaReward: 2 },
        { id: 113, image1: "☁️", label1: "Sky", image2: "💡", label2: "Light", answer: "SKYLIGHT", difficulty: "hard", hint: "Light from sky", charismaReward: 3 },
        { id: 114, image1: "🌧️", label1: "Rain", image2: "🌳", label2: "Forest", answer: "RAINFOREST", difficulty: "hard", hint: "Forest with rain", charismaReward: 3 },
        { id: 115, image1: "💨", label1: "Wind", image2: "🧥", label2: "Breaker", answer: "WINDBREAKER", difficulty: "hard", hint: "Breaks wind", charismaReward: 3 },
        { id: 116, image1: "⛈️", label1: "Thunder", image2: "🌪️", label2: "Storm", answer: "THUNDERSTORM", difficulty: "hard", hint: "Storm with thunder", charismaReward: 3 },
        { id: 117, image1: "📚", label1: "Book", image2: "🐛", label2: "Worm", answer: "BOOKWORM", difficulty: "medium", hint: "Person who loves books", charismaReward: 2 },
        { id: 118, image1: "🏖️", label1: "Sand", image2: "💎", label2: "Stone", answer: "SANDSTONE", difficulty: "hard", hint: "Stone from sand", charismaReward: 3 },
        { id: 119, image1: "🧱", label1: "Clay", image2: "🏺", label2: "Pot", answer: "CLAYPOT", difficulty: "medium", hint: "Pot made of clay", charismaReward: 2 },
        { id: 120, image1: "🛁", label1: "Bath", image2: "🧂", label2: "Salt", answer: "BATHSALT", difficulty: "medium", hint: "Salt for bath", charismaReward: 2 },
        
        // Level 121-130
        { id: 121, image1: "🍵", label1: "Tea", image2: "🏺", label2: "Pot", answer: "TEAPOT", difficulty: "easy", hint: "Pot for tea", charismaReward: 1 },
        { id: 122, image1: "👨‍🍳", label1: "Cook", image2: "📚", label2: "Book", answer: "COOKBOOK", difficulty: "easy", hint: "Book for cooking", charismaReward: 1 },
        { id: 123, image1: "📖", label1: "Story", image2: "📚", label2: "Book", answer: "STORYBOOK", difficulty: "easy", hint: "Book with stories", charismaReward: 1 },
        { id: 124, image1: "🌞", label1: "Sun", image2: "🌟", label2: "Beam", answer: "SUNBEAM", difficulty: "medium", hint: "Beam from sun", charismaReward: 2 },
        { id: 125, image1: "❄️", label1: "Ice", image2: "🍦", label2: "Cream", answer: "ICECREAM", difficulty: "easy", hint: "Creamy frozen dessert", charismaReward: 1 },
        { id: 126, image1: "🍳", label1: "Pan", image2: "🤝", label2: "Handle", answer: "PANHANDLE", difficulty: "hard", hint: "Handle of pan or begging", charismaReward: 3 },
        { id: 127, image1: "🥛", label1: "Glass", image2: "🏠", label2: "House", answer: "GLASSHOUSE", difficulty: "hard", hint: "House made of glass", charismaReward: 3 },
        { id: 128, image1: "🛏️", label1: "Bed", image2: "⏰", label2: "Time", answer: "BEDTIME", difficulty: "easy", hint: "Time for bed", charismaReward: 1 },
        { id: 129, image1: "❤️", label1: "Life", image2: "💃", label2: "Style", answer: "LIFESTYLE", difficulty: "hard", hint: "Style of life", charismaReward: 3 },
        { id: 130, image1: "🚜", label1: "Farm", image2: "🟩", label2: "Land", answer: "FARMLAND", difficulty: "medium", hint: "Land for farming", charismaReward: 2 },
        
        // Level 131-140
        { id: 131, image1: "🐦", label1: "Bird", image2: "🏠", label2: "House", answer: "BIRDHOUSE", difficulty: "medium", hint: "House for birds", charismaReward: 2 },
        { id: 132, image1: "🔥", label1: "Fire", image2: "🚨", label2: "Alarm", answer: "FIREALARM", difficulty: "medium", hint: "Alarm for fire", charismaReward: 2 },
        { id: 133, image1: "🌙", label1: "Moon", image2: "🌟", label2: "Beam", answer: "MOONBEAM", difficulty: "medium", hint: "Beam from moon", charismaReward: 2 },
        { id: 134, image1: "🏠", label1: "Home", image2: "🏙️", label2: "Town", answer: "HOMETOWN", difficulty: "medium", hint: "Town of home", charismaReward: 2 },
        { id: 135, image1: "☀️", label1: "Day", image2: "🌅", label2: "Break", answer: "DAYBREAK", difficulty: "hard", hint: "Break of day", charismaReward: 3 },
        { id: 136, image1: "❄️", label1: "Snow", image2: "🍂", label2: "Fall", answer: "SNOWFALL", difficulty: "medium", hint: "Falling snow", charismaReward: 2 },
        { id: 137, image1: "✈️", label1: "Air", image2: "🎒", label2: "Bag", answer: "AIRBAG", difficulty: "medium", hint: "Bag with air for safety", charismaReward: 2 },
        { id: 138, image1: "💧", label1: "Water", image2: "🛡️", label2: "Proof", answer: "WATERPROOF", difficulty: "hard", hint: "Proof against water", charismaReward: 3 },
        { id: 139, image1: "🧹", label1: "Dust", image2: "🗑️", label2: "Bin", answer: "DUSTBIN", difficulty: "easy", hint: "Bin for dust", charismaReward: 1 },
        { id: 140, image1: "🛁", label1: "Bath", image2: "🧻", label2: "Towel", answer: "BATHTOWEL", difficulty: "easy", hint: "Towel for bath", charismaReward: 1 },
        
        // Level 141-150 (Final Levels - Expert)
        { id: 141, image1: "⏰", label1: "Time", image2: "📋", label2: "Table", answer: "TIMETABLE", difficulty: "hard", hint: "Table of times", charismaReward: 3 },
        { id: 142, image1: "🏖️", label1: "Sand", image2: "📄", label2: "Paper", answer: "SANDPAPER", difficulty: "hard", hint: "Paper with sand for smoothing", charismaReward: 3 },
        { id: 143, image1: "🚪", label1: "Door", image2: "🔒", label2: "Lock", answer: "DOORLOCK", difficulty: "medium", hint: "Lock for door", charismaReward: 2 },
        { id: 144, image1: "🔑", label1: "Key", image2: "🕳️", label2: "Hole", answer: "KEYHOLE", difficulty: "medium", hint: "Hole for key", charismaReward: 2 },
        { id: 145, image1: "👞", label1: "Shoe", image2: "👟", label2: "Lace", answer: "SHOELACE", difficulty: "easy", hint: "Lace for shoes", charismaReward: 1 },
        { id: 146, image1: "✋", label1: "Hand", image2: "🛤️", label2: "Rail", answer: "HANDRAIL", difficulty: "medium", hint: "Rail for hand", charismaReward: 2 },
        { id: 147, image1: "🦷", label1: "Tooth", image2: "🪥", label2: "Brush", answer: "TOOTHBRUSH", difficulty: "easy", hint: "Brush for teeth", charismaReward: 1 },
        { id: 148, image1: "🏠", label1: "House", image2: "🚤", label2: "Boat", answer: "HOUSEBOAT", difficulty: "hard", hint: "Boat that is a house", charismaReward: 3 },
        { id: 149, image1: "🌧️", label1: "Rain", image2: "🌪️", label2: "Storm", answer: "RAINSTORM", difficulty: "hard", hint: "Storm with rain", charismaReward: 3 },
        { id: 150, image1: "🌞", label1: "Sun", image2: "🌴", label2: "Shade", answer: "SUNSHADE", difficulty: "medium", hint: "Shade from sun", charismaReward: 2 }
    ];

    // Initialize game with all levels
    function initGame() {
        // Set all levels to game state
        gameState.levelData = allLevels;
        gameState.maxLevel = allLevels.length;
        
        loadGameState();
        setupEventListeners();
        setupKeyboardInput();
        setupTouchGestures();
        updateUI();
        
        // Apply device-specific optimizations
        if (isMobile) {
            document.body.classList.add('mobile-device');
            optimizeForMobile();
        } else {
            document.body.classList.add('desktop-device');
            optimizeForDesktop();
            setupDesktopKeyboardShortcuts();
        }
        
        // Simulate loading
        setTimeout(() => {
            screens.loading.classList.add('hidden');
            screens.home.classList.remove('hidden');
            checkAndShowTutorial();
        }, 1500);
        
        // Start play timer
        setInterval(() => {
            gameState.playTime++;
            saveGameState();
        }, 60000);
        
        // Check achievements periodically
        setInterval(checkAchievements, 5000);
    }

    // Enhanced level display with more details
    function generateLevelGrid() {
        const container = document.getElementById('levels-grid');
        container.innerHTML = '';
        
        gameState.levelData.forEach(level => {
            const levelCard = document.createElement('div');
            levelCard.className = 'level-card';
            
            // Check if level is completed
            if (gameState.completedLevels.includes(level.id)) {
                levelCard.classList.add('completed');
            } else if (level.id > Math.max(...gameState.completedLevels, 0) + 1) {
                levelCard.classList.add('locked');
            }
            
            // Calculate star rating based on difficulty
            let stars = '';
            if (level.difficulty === 'easy') stars = '★☆☆';
            else if (level.difficulty === 'medium') stars = '★★☆';
            else if (level.difficulty === 'hard') stars = '★★★';
            else stars = '★★★';
            
            levelCard.innerHTML = `
                <div class="difficulty-indicator ${level.difficulty}"></div>
                <div class="level-number">${level.id}</div>
                <div class="level-stars">${stars}</div>
                <div class="level-status">${gameState.completedLevels.includes(level.id) ? '✓' : ''}</div>
                <div class="level-charisma">+${level.charismaReward}</div>
            `;
            
            // Add hover effect showing puzzle
            levelCard.addEventListener('mouseenter', function() {
                if (!this.classList.contains('locked')) {
                    showLevelPreview(level);
                }
            });
            
            levelCard.addEventListener('mouseleave', function() {
                hideLevelPreview();
            });
            
            if (!levelCard.classList.contains('locked')) {
                levelCard.addEventListener('click', () => loadLevel(level.id));
            }
            
            container.appendChild(levelCard);
        });
    }

    // Show level preview on hover
    function showLevelPreview(level) {
        let preview = document.getElementById('level-preview');
        if (!preview) {
            preview = document.createElement('div');
            preview.id = 'level-preview';
            preview.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--card-bg);
                padding: 15px;
                border-radius: var(--border-radius);
                box-shadow: var(--box-shadow);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            `;
            document.body.appendChild(preview);
        }
        
        preview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="font-size: 2rem;">${level.image1}</div>
                <div style="font-size: 1.5rem;">+</div>
                <div style="font-size: 2rem;">${level.image2}</div>
                <div style="font-size: 1.5rem;">=</div>
                <div style="font-size: 1.2rem; color: var(--primary-color); font-weight: bold;">${gameState.completedLevels.includes(level.id) ? level.answer : '???'}</div>
            </div>
            <div style="margin-left: 10px; font-size: 0.9rem; color: var(--gray-color);">
                ${level.difficulty.charAt(0).toUpperCase() + level.difficulty.slice(1)} • +${level.charismaReward} Charisma
            </div>
        `;
    }

    function hideLevelPreview() {
        const preview = document.getElementById('level-preview');
        if (preview) {
            preview.remove();
        }
    }

    // Enhanced CSS for level display
    const levelGridCSS = `
        .level-stars {
            font-size: 0.8rem;
            color: var(--warning-color);
            margin-top: 2px;
        }
        
        .level-charisma {
            position: absolute;
            top: 5px;
            left: 5px;
            background: rgba(155, 89, 182, 0.9);
            color: white;
            font-size: 0.7rem;
            padding: 2px 5px;
            border-radius: 10px;
        }
        
        .level-preview-hint {
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 0.8rem;
            color: var(--gray-color);
        }
        
        .level-completion-rate {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9rem;
            color: var(--gray-color);
        }
        
        .progress-summary {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            padding: 10px;
            background: var(--card-bg);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
        }
        
        .progress-item {
            text-align: center;
            flex: 1;
        }
        
        .progress-count {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
        }
        
        .progress-label {
            font-size: 0.8rem;
            color: var(--gray-color);
        }
        
        /* Special level celebrations */
        .milestone-level {
            background: linear-gradient(45deg, #ff6b8b, #ff9966) !important;
            color: white !important;
            animation: pulse 2s infinite;
        }
        
        .milestone-level .level-number {
            font-size: 1.8rem;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        /* Level category badges */
        .level-category {
            position: absolute;
            top: -5px;
            right: -5px;
            background: var(--primary-color);
            color: white;
            font-size: 0.6rem;
            padding: 2px 5px;
            border-radius: 10px;
        }
    `;

    // Add CSS to document
    const levelStyle = document.createElement('style');
    levelStyle.textContent = levelGridCSS;
    document.head.appendChild(levelStyle);

    // Mark milestone levels (every 25 levels)
    function markMilestoneLevels() {
        document.querySelectorAll('.level-card').forEach(card => {
            const levelNumber = parseInt(card.querySelector('.level-number').textContent);
            if (levelNumber % 25 === 0 || levelNumber === 100 || levelNumber === 150) {
                card.classList.add('milestone-level');
                
                // Add category badge for milestone
                const categoryBadge = document.createElement('div');
                categoryBadge.className = 'level-category';
                if (levelNumber === 25) categoryBadge.textContent = 'Beginner';
                else if (levelNumber === 50) categoryBadge.textContent = 'Intermediate';
                else if (levelNumber === 75) categoryBadge.textContent = 'Advanced';
                else if (levelNumber === 100) categoryBadge.textContent = 'Expert';
                else if (levelNumber === 125) categoryBadge.textContent = 'Master';
                else if (levelNumber === 150) categoryBadge.textContent = 'Grand Master';
                card.appendChild(categoryBadge);
            }
        });
    }

    // Add progress summary to level screen
    function addProgressSummary() {
        const levelsContainer = document.querySelector('.levels-container');
        if (!levelsContainer.querySelector('.level-completion-rate')) {
            const completedCount = gameState.completedLevels.length;
            const totalCount = gameState.maxLevel;
            const completionRate = Math.round((completedCount / totalCount) * 100);
            
            const progressHTML = `
                <div class="level-completion-rate">
                    <p>Overall Progress: ${completionRate}% Complete</p>
                    <div class="progress-summary">
                        <div class="progress-item">
                            <div class="progress-count">${completedCount}</div>
                            <div class="progress-label">Completed</div>
                        </div>
                        <div class="progress-item">
                            <div class="progress-count">${totalCount - completedCount}</div>
                            <div class="progress-label">Remaining</div>
                        </div>
                        <div class="progress-item">
                            <div class="progress-count">${totalCount}</div>
                            <div class="progress-label">Total</div>
                        </div>
                        <div class="progress-item">
                            <div class="progress-count">${gameState.charismaPoints}</div>
                            <div class="progress-label">Charisma</div>
                        </div>
                    </div>
                    <p class="level-preview-hint">Hover over levels to preview puzzles</p>
                </div>
            `;
            
            levelsContainer.insertAdjacentHTML('beforeend', progressHTML);
        }
    }

    // Enhanced generateLevelGrid function
    const originalGenerateLevelGrid = generateLevelGrid;
    generateLevelGrid = function() {
        originalGenerateLevelGrid();
        markMilestoneLevels();
        addProgressSummary();
    };

    // Initialize the game with all 150+ levels
    initGame();
});