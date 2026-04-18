interface MockChatMessage {
  id: string;
  role: string;
  content: string;
  created_at: string;
  widget?: string;
  widget_title?: string;
  widget_suggestions?: string[];
  points?: any[];
}

export const swarma: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "I own a shawarma shop in a very busy area downtown. I just updated my menu to keep up with the trends because I have seen a decrease in my sales over the last few months. I want to be able to show all the shawarma lovers in my city that go to all my competitors' locations the new items I have added and the discounts I'm giving out to let them try it. Can I simply just target all of my competitors' customers around my store?",
    created_at: new Date().toISOString()

  },
  {
    id: "2",
    role: "assistant",
    content: "Yes, I can definitely help you find those people. Let’s build this campaign to hit exactly the shawarma lovers who are already going to your competitors. We have three main ways to do this on Meta: Pin Point, Category, Target by Location. Which one feels right for you?",
    widget: "pin_point",
    points: [
      {
        id: "1",
        type: "Pin Point",
        content: "Targets people at specific shops you choose",
        created_at: new Date().toISOString()
      },
      {
        id: "2",
        type: "Target by Location",
        content: "Finds frequent visitors across all shawarma shops in the city (Best for capturing high-intent foodies)",
        created_at: new Date().toISOString()
      },
      {
        id: "3",
        type: "Location",
        content: "Broader area targeting for general awareness",
        created_at: new Date().toISOString()
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    role: "user",
    content: "Stick with Pin Point. I want the people going to my competitors.",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect. Let’s get this started. What’s the name of your shawarma shop?",
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    role: "user",
    content: "Shawarma Palace.",
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    role: "assistant",
    content: "Got it. What’s the exact address?",
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    role: "user",
    content: "456 Elm Street, Downtown Seattle.",
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    role: "assistant",
    content: "Location locked. Is this correct?",
    widget: "map_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    role: "user",
    content: "Yes, that’s me.",
    created_at: new Date().toISOString()
  },
  {
    id: "10",
    role: "assistant",
    content: "How far away from your shop do you want to reach?",
    widget: "radius_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "11",
    role: "user",
    content: "1 km is perfect.",
    created_at: new Date().toISOString()
  },
  {
    id: "12",
    role: "assistant",
    content: "Now pulling competitor locations inside that radius.",
    created_at: new Date().toISOString()
  },
  {
    id: "13",
    role: "assistant",
    content: "Competitors found: Shawarma King (0.3 km), Falafel Palace (0.6 km), Mediterranean Grill (0.9 km), Gyro Spot (0.4 km). Do you want to deselect any?",
    widget: "competitor_selection",
    points: [
      { id: "1", type: "Shawarma King", content: "0.3 km away (Seattle Downtown)", created_at: new Date().toISOString() },
      { id: "2", type: "Falafel Palace", content: "0.6 km away (Seattle Downtown)", created_at: new Date().toISOString() },
      { id: "3", type: "Mediterranean Grill", content: "0.9 km away (Seattle Downtown)", created_at: new Date().toISOString() },
      { id: "4", type: "Gyro Spot", content: "0.4 km away (Seattle Downtown)", created_at: new Date().toISOString() }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "14",
    role: "user",
    content: "Target all of them.",
    created_at: new Date().toISOString()
  },
  {
    id: "15",
    role: "assistant",
    content: "All competitors locked in. Now let's define how far around each shop you want to target. The red heat zones show visitor density around competitor locations.",
    widget: "radius_heatmap",
    created_at: new Date().toISOString()
  },
  {
    id: "16",

    role: "user",
    content: "50 meters around each shop and the last 30 days.",
    created_at: new Date().toISOString()
  },
  {
    id: "17",
    role: "assistant",
    content: "Any specific demographics?",
    created_at: new Date().toISOString()
  },
  {
    id: "18",
    role: "user",
    content: "18-45 is good.",
    created_at: new Date().toISOString()
  },
  {
    id: "19",
    role: "assistant",
    content: "I found 8,400 potential customers (94% confidence). Minimum budget required: $600. Does this look good?",
    widget: "pin_point",
    points: [
      { id: "1", type: "Audience Size", content: "8,400 potential customers", created_at: new Date().toISOString() },
      { id: "2", type: "Reach Estimate", content: "12k - 15k impressions / mo", created_at: new Date().toISOString() },
      { id: "3", type: "Target Type", content: "Frequent restaurant visitors", created_at: new Date().toISOString() }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "20",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString()
  },
  {
    id: "21",
    role: "assistant",
    content: "Let’s connect your Meta ad account.",
    created_at: new Date().toISOString()
  },
  {
    id: "22",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString()
  },
  {
    id: "23",
    role: "assistant",
    content: "Meta account connected. What is your monthly budget?",
    created_at: new Date().toISOString()
  },
  {
    id: "24",
    role: "user",
    content: "$1,200 per month.",
    created_at: new Date().toISOString()
  },
  {
    id: "25",
    role: "assistant",
    content: "What’s your creative direction, format, and campaign name?",
    widget: "pin_point",
    points: [
      { id: "1", type: "Carousel", content: "Best for showing multiple menu items", created_at: new Date().toISOString() },
      { id: "2", type: "Single Image", content: "Best for a specific discount offer", created_at: new Date().toISOString() },
      { id: "3", type: "Video", content: "Great for capturing kitchen background vibes", created_at: new Date().toISOString() }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "26",
    role: "user",
    content: "Creative: New menu items + big discounts. Format: Carousel. Campaign name: Shawarma Palace Competitor Steal.",
    created_at: new Date().toISOString()
  },
  {
    id: "27",
    role: "assistant",
    content: "Please upload creatives.",
    created_at: new Date().toISOString()
  },
  {
    id: "28",
    role: "user",
    content: "[Uploads 3 images + 1 video]",
    created_at: new Date().toISOString()
  },
  {
    id: "29",
    role: "assistant",
    content: "Everything is ready. Type PUSH LIVE to launch.",
    created_at: new Date().toISOString()
  },
  {
    id: "30",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString()
  },
  {
    id: "31",
    role: "assistant",
    content: "Campaign pushed live. Campaign ID: 2385xxxxxxxxxx. Monitoring available.",
    created_at: new Date().toISOString()
  }
]

export const vibe: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "I just vibecoded a CRM built for tattoo artists. It helps track their clients progress, follows up with them to help with their healing journey and even reminds me to text them every few months to keep up with them and to see if they want any new tattoos. I would really love to share this product with every tattoo artist in my city before expanding. Would it be possible to send ads to tattoo artists who have been seen at tattoo shops around the city for more than 3 days a week, over the course of the last month? I don't want to target the tattoo shops themselves because then it will also pick up on the client, not just the artist.",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    role: "assistant",
    content: "Yes, I can definitely help you find those people. Let’s build this campaign to hit exactly the tattoo artists who are at shops all the time — not the clients. We have three main ways to do this on Meta: Pin Point, Category, and Target by Location. Which one do you want to go with?",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    role: "user",
    content: "Category. I want every tattoo artist in the city who’s at shops 3+ days a week.",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect. Let’s get this started. What city are we targeting?",
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    role: "user",
    content: "Portland, OR.",
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    role: "assistant",
    content: "Location locked to Portland metro area (within 20 km). Now pulling tattoo shops across the metro so we can find the artists who visit them heavily. Here are the tattoo shops I found. Do you want to deselect any, or should I go ahead and find everyone who has been there recently?",
    widget: "map_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    role: "user",
    content: "Target all of them.",
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    role: "assistant",
    content: "All tattoo shops selected. What radius around each shop would you like me to use, and how far back should I look? I recommend 50 m around each shop and the last 30 days.",
    widget: "radius_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    role: "user",
    content: "50 m around each shop and the last 30 days.",
    created_at: new Date().toISOString()
  },
  {
    id: "10",
    role: "assistant",
    content: "Perfect. Now pulling all tattoo shops in Portland that match our criteria. Here are the locations I've pinpointed. Do you want to adjust the list before we finalize the audience?",
    widget: "competitor_selection",
    widget_title: "Tattoo Shops in Portland",
    widget_suggestions: ["Tattoo Studio", "Piercing Shop", "Artistic Studio", "Gallery"],
    points: [
      { id: "1", type: "Atlas Tattoo", content: "0.2 km away (NE Portland)", lat: 45.5485, lng: -122.6288, created_at: new Date().toISOString() },
      { id: "2", type: "Scrape the Sky", content: "0.5 km away (SE Portland)", lat: 45.5126, lng: -122.6512, created_at: new Date().toISOString() },
      { id: "3", type: "Sea Tramp Tattoo", content: "1.1 km away (NW Portland)", lat: 45.5262, lng: -122.6789, created_at: new Date().toISOString() },
      { id: "4", type: "Icon Tattoo", content: "0.8 km away (N Portland)", lat: 45.5592, lng: -122.6658, created_at: new Date().toISOString() }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "11",
    role: "user",
    content: "18-45 is good.",
    created_at: new Date().toISOString()
  },
  {
    id: "12",
    role: "assistant",
    content: "Demographics applied. Running Target People mode on Meta… Found 2,150 potential tattoo artists (94% confidence) who visited shops 3+ days a week in the last 30 days. To reach all of them effectively, you’ll need a minimum of $500. Does the audience look good?",
    created_at: new Date().toISOString()
  },
  {
    id: "13",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString()
  },
  {
    id: "14",
    role: "assistant",
    content: "Great — we’ve locked in the audience. Please connect your Meta account to proceed.",
    created_at: new Date().toISOString()
  },
  {
    id: "15",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString()
  },
  {
    id: "16",
    role: "assistant",
    content: "Meta account connected. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString()
  },
  {
    id: "17",
    role: "user",
    content: "$900 per month.",
    created_at: new Date().toISOString()
  },
  {
    id: "18",
    role: "assistant",
    content: "Budget set. Now let’s define the ad creative. What’s the main creative direction, preferred format, and campaign name?",
    created_at: new Date().toISOString()
  },
  {
    id: "19",
    role: "user",
    content: "Creative direction: Tattoo artist CRM that tracks clients, healing, and rebooking — built for you. Carousel format. Campaign name: Portland Tattoo Artists CRM Traffic.",
    created_at: new Date().toISOString()
  },
  {
    id: "20",
    role: "assistant",
    content: "Plan ready. Objective: Traffic. Audience: 2,150 tattoo artists. Ad format: Carousel. Please upload your creatives.",
    created_at: new Date().toISOString()
  },
  {
    id: "21",
    role: "user",
    content: "[Uploads creatives + CRM screenshots]",
    created_at: new Date().toISOString()
  },
  {
    id: "22",
    role: "assistant",
    content: "Creatives uploaded. Everything is set. Type 'PUSH LIVE' to launch the campaign.",
    created_at: new Date().toISOString()
  },
  {
    id: "23",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString()
  },
  {
    id: "24",
    role: "assistant",
    content: "Campaign pushed LIVE on Meta! You can now track real-time results. Want me to monitor performance for the next 24–48 hours?",
    created_at: new Date().toISOString()
  }
];
export const rock_bank: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "I manage a punk rock band. We are going on tour in a few months. I would love to be able to advertise our shows to every city we go to by seeing the last punk rock show they threw in that city and just targeting anyone who went to it and people with similar interests as them.",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    role: "assistant",
    content: "Got it — I think you want an Engagement campaign on Meta to promote your upcoming tour shows by targeting people who actually attended the last punk rock show in each city (plus similar high-interest fans). There are multiple ways to do this on Meta: Engagement, Awareness, and Traffic. Which one do you want to go with?",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    role: "user",
    content: "Engagement. I want the people who went to the last punk shows in each city.",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect. Let’s get this started. List the cities and approximate dates for your tour shows.",
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    role: "user",
    content: "Seattle June 15, Portland June 22, Austin July 10.",
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    role: "assistant",
    content: "Tour locked: Seattle (June 15), Portland (June 22), Austin (July 10). Found recent punk shows: The Crocodile (Seattle), Dante’s (Portland), Mohawk (Austin). Would you like to target all of these venues?",
    widget: "competitor_selection",
    points: [
      { id: "1", type: "The Crocodile", content: "0.5 km away (Seattle)", lat: 47.6128, lng: -122.3458, created_at: new Date().toISOString() },
      { id: "2", type: "Dante's", content: "0.8 km away (Portland)", lat: 45.5234, lng: -122.6762, created_at: new Date().toISOString() },
      { id: "3", type: "Mohawk", content: "1.2 km away (Austin)", lat: 30.2672, lng: -97.7431, created_at: new Date().toISOString() }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    role: "user",
    content: "Target all of them.",
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    role: "assistant",
    content: "All venues selected. How far around each venue should I target? I recommend 500 m.",
    widget: "radius_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    role: "user",
    content: "500 m is good.",
    created_at: new Date().toISOString()
  },
  {
    id: "10",
    role: "assistant",
    content: "Radius set to 500 m. Running Target People mode on Meta… Found 11,200 real punk fans (96% confidence) who attended those shows. To reach all of them, you’ll need a minimum of $700. Does the audience look good?",
    created_at: new Date().toISOString()
  },
  {
    id: "11",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString()
  },
  {
    id: "12",
    role: "assistant",
    content: "Great — we’ve identified the right audience. Please connect your Meta ad account to proceed.",
    created_at: new Date().toISOString()
  },
  {
    id: "13",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString()
  },
  {
    id: "14",
    role: "assistant",
    content: "Meta account connected. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString()
  },
  {
    id: "15",
    role: "user",
    content: "$1,400 per month.",
    created_at: new Date().toISOString()
  },
  {
    id: "16",
    role: "assistant",
    content: "Budget set. Now let’s define your ad creative. What’s the creative direction, format, and campaign name?",
    created_at: new Date().toISOString()
  },
  {
    id: "17",
    role: "user",
    content: "Creative direction: Your city’s last punk show was fire… wait till you see ours. Video format. Campaign name: Punk Tour 2026.",
    created_at: new Date().toISOString()
  },
  {
    id: "18",
    role: "assistant",
    content: "Plan ready. Objective: Engagement. Audience: 11,200 punk fans. Targeting: selected venues + 500 m radius. Ad format: Video. Please upload your creatives.",
    created_at: new Date().toISOString()
  },
  {
    id: "19",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString()
  },
  {
    id: "20",
    role: "assistant",
    content: "Creatives uploaded. Everything is set. Type 'PUSH LIVE' to launch the campaign.",
    created_at: new Date().toISOString()
  },
  {
    id: "21",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString()
  },
  {
    id: "22",
    role: "assistant",
    content: "Campaign pushed LIVE on Meta! You can now track real-time results. Want me to monitor performance and send a summary after 48 hours?",
    created_at: new Date().toISOString()
  }
];
export const realEstateLeads: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "I'm a real estate agent, I run free home valuation ads at home sellers.",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    role: "assistant",
    content: "Yes, I can definitely help you find those people. Let’s build this campaign to reach potential home sellers with your free home valuation offer. There are multiple ways to do this on Meta: Leads, Awareness, and Traffic. Which one do you want to go with?",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    role: "user",
    content: "Leads. I want people to fill out the form for the free valuation.",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect. Let’s get this started. What city or metro area are you targeting?",
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    role: "user",
    content: "Austin, TX metro.",
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    role: "assistant",
    content: "Location locked to Austin metro area. Found neighborhoods with recent home sales activity like Westlake Hills, Hyde Park, Mueller, and Tarrytown. Do you want to select all or refine?",
    widget: "map_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    role: "user",
    content: "Select the top 50 neighborhoods.",
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    role: "assistant",
    content: "Top 50 neighborhoods selected. How far around each neighborhood should I target? I recommend 1 km.",
    widget: "radius_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    role: "user",
    content: "Keep it at 1 km.",
    created_at: new Date().toISOString()
  },
  {
    id: "10",
    role: "assistant",
    content: "Radius set to 1 km. Any specific demographics? Most agents target 35–65.",
    created_at: new Date().toISOString()
  },
  {
    id: "11",
    role: "user",
    content: "35-65 is good.",
    created_at: new Date().toISOString()
  },
  {
    id: "12",
    role: "assistant",
    content: "Demographics applied. Running Target People mode… Found 14,600 potential sellers (92% confidence) in those neighborhoods. Minimum budget required is $800. Does the audience look good?",
    created_at: new Date().toISOString()
  },
  {
    id: "13",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString()
  },
  {
    id: "14",
    role: "assistant",
    content: "Great — we’ve identified the right audience. Please connect your Meta ad account to proceed.",
    created_at: new Date().toISOString()
  },
  {
    id: "15",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString()
  },
  {
    id: "16",
    role: "assistant",
    content: "Meta account connected. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString()
  },
  {
    id: "17",
    role: "user",
    content: "$1,800 per month.",
    created_at: new Date().toISOString()
  },
  {
    id: "18",
    role: "assistant",
    content: "Budget set. Now let’s define your ad creative. What’s the headline, format, and campaign name?",
    created_at: new Date().toISOString()
  },
  {
    id: "19",
    role: "user",
    content: "Creative direction: “Get a free home valuation in minutes — see what your house is worth today.” Carousel format. Campaign name: Austin Free Home Valuation Leads.",
    created_at: new Date().toISOString()
  },
  {
    id: "20",
    role: "assistant",
    content: "Plan ready. Objective: Lead Generation. Audience: 14,600 people. Targeting: top 50 neighborhoods + 1 km radius. Ad format: Carousel. Please upload creatives.",
    created_at: new Date().toISOString()
  },
  {
    id: "21",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString()
  },
  {
    id: "22",
    role: "assistant",
    content: "Creatives uploaded. Lead form configured to collect name, email, phone, and property address. Type 'PUSH LIVE' to launch.",
    created_at: new Date().toISOString()
  },
  {
    id: "23",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString()
  },
  {
    id: "24",
    role: "assistant",
    content: "Campaign pushed LIVE on Meta! You can now track impressions, reach, leads, and cost per lead. Want me to monitor performance and send a report after 48 hours?",
    created_at: new Date().toISOString()
  }
];
export const game: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "I just built an insane game in roblox, posted the link on Twitter, and only got 12 likes. I’d be down to spend like 300$ to see if I could advertise this on Meta to gamers. What should I do?",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    role: "assistant",
    content: "Yes, I can definitely help you find those people. With a $300 budget, the smartest move is to keep it hyper-local and focused on real gamers who already hang out at gaming spots. There are multiple ways to do this on Meta: App Promotion, Traffic, and Awareness. Which one do you want to go with?",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    role: "user",
    content: "App Promotion. I want people to play the game.",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect. Let’s get this started. What city or metro area do you want to target gamers in?",
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    role: "user",
    content: "Chicago metro.",
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    role: "assistant",
    content: "Location locked to Chicago metro area. Found gaming spots like gaming cafes, esports lounges, arcades, and university gaming clubs. Do you want to refine or proceed?",
    widget: "map_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    role: "user",
    content: "Select the top 40 gaming spots.",
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    role: "assistant",
    content: "Top 40 gaming spots selected. With a $300 budget, we’ll need to keep targeting tight. What radius should we use? I recommend 20–50 m.",
    widget: "radius_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    role: "user",
    content: "Keep it at 50 m.",
    created_at: new Date().toISOString()
  },
  {
    id: "10",
    role: "assistant",
    content: "Radius set to 50 m. Any age range? Most Roblox players are 13–24.",
    created_at: new Date().toISOString()
  },
  {
    id: "11",
    role: "user",
    content: "13-24 is good.",
    created_at: new Date().toISOString()
  },
  {
    id: "12",
    role: "assistant",
    content: "Demographics applied. Running Target People mode… Found 9,300 gamers (93% confidence) who visit these spots. With your $300 budget, we’ll keep delivery tight. Does the audience look good?",
    created_at: new Date().toISOString()
  },
  {
    id: "13",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString()
  },
  {
    id: "14",
    role: "assistant",
    content: "Great — we’ve identified the right audience. Please connect your Meta ad account to proceed.",
    created_at: new Date().toISOString()
  },
  {
    id: "15",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString()
  },
  {
    id: "16",
    role: "assistant",
    content: "Meta account connected. Let’s define your ad creative. What’s the hook, format, campaign name, and game link?",
    created_at: new Date().toISOString()
  },
  {
    id: "17",
    role: "user",
    content: "Creative direction: “Just built this insane Roblox game — come play it now!” Video format. Campaign name: Chicago Roblox Game Launch. Link: roblox.com/games/1234567890/MyInsaneGame",
    created_at: new Date().toISOString()
  },
  {
    id: "18",
    role: "assistant",
    content: "Plan ready. Objective: App Promotion. Audience: 9,300 gamers. Targeting: top 40 gaming spots + 50 m radius. Ad format: Video. Link attached. Please upload creatives.",
    created_at: new Date().toISOString()
  },
  {
    id: "19",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString()
  },
  {
    id: "20",
    role: "assistant",
    content: "Creatives uploaded. Roblox game link attached. Type 'PUSH LIVE' to launch.",
    created_at: new Date().toISOString()
  },
  {
    id: "21",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString()
  },
  {
    id: "22",
    role: "assistant",
    content: "Campaign pushed LIVE on Meta! Your $300 budget is active. You can now track impressions, clicks, and engagement. Want me to monitor performance and send a 48-hour report?",
    created_at: new Date().toISOString()
  }
];
export const matcha: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "I just launched my matcha brand in LA. I want to target matcha drinkers in the city. I’m thinking primarily of women 16-35.",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    role: "assistant",
    content: "Yes, I can definitely help you find those people. Let’s build this campaign to reach real matcha drinkers in LA and drive direct sales. There are multiple ways to do this on Meta: Sales, Traffic, and Awareness. Which one do you want to go with?",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    role: "user",
    content: "Sales. I want people to actually buy the matcha.",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect. Let’s get this started. What city or metro area are you targeting?",
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    role: "user",
    content: "LA metro.",
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    role: "assistant",
    content: "Location locked to LA metro area. Found matcha cafés, wellness spots, yoga studios, and health stores. Do you want to refine or proceed?",
    widget: "map_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    role: "user",
    content: "Select the top 60.",
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    role: "assistant",
    content: "Top 60 spots selected. What radius should we use? I recommend 1 km.",
    widget: "radius_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    role: "user",
    content: "Keep it at 1 km.",
    created_at: new Date().toISOString()
  },
  {
    id: "10",
    role: "assistant",
    content: "Radius set to 1 km. Confirming demographics: women 16–35?",
    created_at: new Date().toISOString()
  },
  {
    id: "11",
    role: "user",
    content: "Women 16-35 is perfect.",
    created_at: new Date().toISOString()
  },
  {
    id: "12",
    role: "assistant",
    content: "Demographics applied. Running Target People mode… Found 12,400 matcha drinkers (93% confidence). Minimum budget is $900. Does the audience look good?",
    created_at: new Date().toISOString()
  },
  {
    id: "13",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString()
  },
  {
    id: "14",
    role: "assistant",
    content: "Great — we’ve identified the right audience. Please connect your Meta ad account to proceed.",
    created_at: new Date().toISOString()
  },
  {
    id: "15",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString()
  },
  {
    id: "16",
    role: "assistant",
    content: "Meta account connected. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString()
  },
  {
    id: "17",
    role: "user",
    content: "$2,000 per month.",
    created_at: new Date().toISOString()
  },
  {
    id: "18",
    role: "assistant",
    content: "Budget set. Now let’s define your ad creative. What’s the headline, format, campaign name, and website link?",
    created_at: new Date().toISOString()
  },
  {
    id: "19",
    role: "user",
    content: "Creative direction: Fresh matcha, real energy — try it today. Carousel format. Campaign name: LA Matcha Launch Sales. Link: matchalove.com/shop",
    created_at: new Date().toISOString()
  },
  {
    id: "20",
    role: "assistant",
    content: "Plan ready. Objective: Sales. Audience: 12,400 matcha drinkers. Targeting: top 60 spots + 1 km radius. Ad format: Carousel. Link attached. Please upload creatives.",
    created_at: new Date().toISOString()
  },
  {
    id: "21",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString()
  },
  {
    id: "22",
    role: "assistant",
    content: "Creatives uploaded. Meta Pixel configured for sales tracking. Type 'PUSH LIVE' to launch.",
    created_at: new Date().toISOString()
  },
  {
    id: "23",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString()
  },
  {
    id: "24",
    role: "assistant",
    content: "Campaign pushed LIVE on Meta! You can now track impressions, clicks, add-to-carts, and purchases. Want me to monitor performance and send a 48-hour sales report?",
    created_at: new Date().toISOString()
  }
];
export const gamble: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "I want to promote a hockey promotion for my sports gambling app to men in Montreal. Can we send this ad to men aged 18-45 in the city who have been to a casino and who have also been to a habs game in the last year?",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    role: "assistant",
    content: "Yes, I can definitely help you find those people. Let’s build this campaign to reach men 18-45 in Montreal who have been to both a casino and a Habs game. There are multiple ways to do this on Meta: Sales, Traffic, and Awareness. Which one do you want to go with?",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    role: "user",
    content: "Sales. I want people to actually use the promotion in the app.",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect. Let’s get this started. Found Habs games at Bell Centre and casino locations in Montreal. Do you want to target these venues?",
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    role: "user",
    content: "Select Bell Centre and Casino de Montréal.",
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    role: "assistant",
    content: "Selected Bell Centre and Casino de Montréal. What radius should we use? I recommend 1 km.",
    widget: "map_selection",
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    role: "user",
    content: "Keep it at 1 km.",
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    role: "assistant",
    content: "Radius set to 1 km. Running Target People mode… Found 4,800 high-intent fans (95% confidence) who visited both locations. Minimum budget is $650. Does the audience look good?",
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString()
  },
  {
    id: "10",
    role: "assistant",
    content: "Great — we’ve identified the right audience. Please connect your Meta ad account to proceed.",
    created_at: new Date().toISOString()
  },
  {
    id: "11",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString()
  },
  {
    id: "12",
    role: "assistant",
    content: "Meta account connected. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString()
  },
  {
    id: "13",
    role: "user",
    content: "$1,200 per month.",
    created_at: new Date().toISOString()
  },
  {
    id: "14",
    role: "assistant",
    content: "Budget set. Now let’s define your ad creative. What’s the headline, format, campaign name, and app link?",
    created_at: new Date().toISOString()
  },
  {
    id: "15",
    role: "user",
    content: "Creative direction: Habs fans win bigger with this hockey promotion. Video format. Campaign name: Montreal Habs Hockey Promo. Link: myapp.com/habs-promo",
    created_at: new Date().toISOString()
  },
  {
    id: "16",
    role: "assistant",
    content: "Plan ready. Objective: Sales. Audience: 4,800 fans. Targeting: Bell Centre + Casino de Montréal + 1 km radius. Ad format: Video. Link attached. Please upload creatives.",
    created_at: new Date().toISOString()
  },
  {
    id: "17",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString()
  },
  {
    id: "18",
    role: "assistant",
    content: "Creatives uploaded. Meta Pixel configured for conversion tracking. Type 'PUSH LIVE' to launch.",
    created_at: new Date().toISOString()
  },
  {
    id: "19",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString()
  },
  {
    id: "20",
    role: "assistant",
    content: "Campaign pushed LIVE on Meta! You can now track impressions, clicks, and purchases. Want me to monitor performance and send a 48-hour report?",
    created_at: new Date().toISOString()
  }
];
export const ai: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "I’m an AI consultant for local service based businesses. I want to show plumbers how I can help them implement AI optimization workflows in their business. Can I only target plumbers and maybe electricians too?",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    role: "assistant",
    content: "Yes, I can definitely help you find those people. Let’s build this campaign to reach real plumbers and electricians and show them how your AI optimization workflows can transform their businesses. There are multiple ways to do this on Meta: Sales, Traffic, and Awareness. Which one do you want to go with?",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    role: "user",
    content: "Sales. I want them to book a call or sign up.",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect. Let’s get this started. What city or metro area do you want to target?",
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    role: "user",
    content: "Chicago metro.",
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    role: "assistant",
    content: "Location locked to Chicago metro. Found trade spots like supply houses, contractor yards, trade counters, and association offices. Do you want to refine or proceed?",
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    role: "user",
    content: "Select the top 55.",
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    role: "assistant",
    content: "Top 55 trade spots selected. What radius should we use? I recommend 1 km.",
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    role: "user",
    content: "Keep it at 1 km.",
    created_at: new Date().toISOString()
  },
  {
    id: "10",
    role: "assistant",
    content: "Radius set to 1 km. Running Target People mode… Found 6,900 service pros (93% confidence) who visit these locations. Minimum budget is $650. Does the audience look good?",
    created_at: new Date().toISOString()
  },
  {
    id: "11",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString()
  },
  {
    id: "12",
    role: "assistant",
    content: "Great — we’ve identified the right audience. Please connect your Meta ad account to proceed.",
    created_at: new Date().toISOString()
  },
  {
    id: "13",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString()
  },
  {
    id: "14",
    role: "assistant",
    content: "Meta account connected. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString()
  },
  {
    id: "15",
    role: "user",
    content: "$1,500 per month.",
    created_at: new Date().toISOString()
  },
  {
    id: "16",
    role: "assistant",
    content: "Budget set. Now let’s define your ad creative. What’s the headline, format, campaign name, and booking link?",
    created_at: new Date().toISOString()
  },
  {
    id: "17",
    role: "user",
    content: "Creative direction: Free AI Workflow Audit for Plumbers and Electricians – Save hours every week. Carousel format. Campaign name: Chicago Service Pros AI Optimization. Link: aiworkflowconsulting.com/book",
    created_at: new Date().toISOString()
  },
  {
    id: "18",
    role: "assistant",
    content: "Plan ready. Objective: Sales. Audience: 6,900 service pros. Targeting: top 55 trade spots + 1 km radius. Ad format: Carousel. Link attached. Please upload creatives.",
    created_at: new Date().toISOString()
  },
  {
    id: "19",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString()
  },
  {
    id: "20",
    role: "assistant",
    content: "Creatives uploaded. Meta Pixel configured for lead tracking. Type 'PUSH LIVE' to launch.",
    created_at: new Date().toISOString()
  },
  {
    id: "21",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString()
  },
  {
    id: "22",
    role: "assistant",
    content: "Campaign pushed LIVE on Meta! You can now track impressions, clicks, and leads. Want me to monitor performance and send a 48-hour report?",
    created_at: new Date().toISOString()
  }
];
export const chat_data: { chat: MockChatMessage[], id: number, title: string }[] = [
  {
    chat: swarma,
    id: 1,
    title: "Shawarma Palace"
  },
  {
    chat: vibe,
    id: 2,
    title: "Vibe"
  },
  {
    chat: rock_bank,
    id: 3,
    title: "Rock Bank"
  },
  {
    chat: realEstateLeads,
    id: 4,
    title: "Real Estate Leads"
  },
  {
    chat: game,
    id: 5,
    title: "Game"
  },
  {
    chat: matcha,
    id: 6,
    title: "Matcha"
  },
  {
    chat: gamble,
    id: 7,
    title: "Gamble"
  },
  {
    chat: ai,
    id: 8,
    title: "AI"
  }
];

export const findMockResponse = (content: string) => {
  const normalizedContent = content.toLowerCase().trim();
  for (const item of chat_data) {
    // Check for exact match or if the prompt is a subset of the start of the message
    const index = item.chat.findIndex(m => {
        const msgContent = m.content.toLowerCase();
        return msgContent.includes(normalizedContent) || normalizedContent.includes(msgContent);
    });
    
    if (index !== -1) {
      // Find the next assistant message after this match
      for (let i = index + 1; i < item.chat.length; i++) {
        if (item.chat[i].role === 'assistant') {
          return {
            question: item.chat[index],
            answer: item.chat[i],
            fullChat: item.chat,
            currentIndex: i
          };
        }
      }
    }
  }
  return null;
};