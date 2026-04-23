export interface MockChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  widget?: string;
  widget_title?: string;
  widget_suggestions?: string[];
  points?: unknown[];
}

export const swarma: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content:
      "I own a shawarma shop in a very busy area downtown. I just updated my menu to keep up with the trends because I have seen a decrease in my sales over the last few months. I want to be able to show all the shawarma lovers in my city that go to all my competitors' locations the new items I have added and the discounts I'm giving out to let them try it. Can I simply just target all of my competitors' customers around my store?",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Yes, I can definitely help you find those people. Let’s build this campaign to hit exactly the shawarma lovers who are already going to your competitors. We have three main ways to do this on Meta: Pin Point, Category, Target by Location. Which one feels right for you?",
    widget: "pin_point",
    points: [
      {
        id: "1",
        type: "Pin Point",
        content: "Targets people at specific shops you choose",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Target by Location",
        content:
          "Finds frequent visitors across all shawarma shops in the city (Best for capturing high-intent foodies)",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Location",
        content: "Broader area targeting for general awareness",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    role: "user",
    content: "Stick with Pin Point. I want the people going to my competitors.",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Perfect. Let’s get this started. What’s the name of your shawarma shop?",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    role: "user",
    content: "Shawarma Palace.",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    role: "assistant",
    content: "Got it. What’s the exact address?",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    role: "user",
    content: "456 Elm Street, Downtown Seattle.",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    role: "assistant",
    content: "Location locked. Is this correct?",
    widget: "map_selection",
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    role: "user",
    content: "Yes, that’s me.",
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    role: "assistant",
    content: "How far away from your shop do you want to reach?",
    widget: "radius_selection",
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    role: "user",
    content: "1 km is perfect.",
    created_at: new Date().toISOString(),
  },
  {
    id: "12",
    role: "assistant",
    content: "Now pulling competitor locations inside that radius.",
    created_at: new Date().toISOString(),
  },
  {
    id: "13",
    role: "assistant",
    content:
      "Competitors found: Shawarma King (0.3 km), Falafel Palace (0.6 km), Mediterranean Grill (0.9 km), Gyro Spot (0.4 km). Do you want to deselect any?",
    widget: "competitor_selection",
    points: [
      {
        id: "1",
        type: "Shawarma King",
        content: "0.3 km away (Seattle Downtown)",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Falafel Palace",
        content: "0.6 km away (Seattle Downtown)",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Mediterranean Grill",
        content: "0.9 km away (Seattle Downtown)",
        created_at: new Date().toISOString(),
      },
      {
        id: "4",
        type: "Gyro Spot",
        content: "0.4 km away (Seattle Downtown)",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "14",
    role: "user",
    content: "Target all of them.",
    created_at: new Date().toISOString(),
  },
  {
    id: "15",
    role: "assistant",
    content:
      "All target locations confirmed. I've mapped out the primary points for Shawarma Palace, Shawarma King, Falafel Palace, Mediterranean Grill, and Gyro Spot. Ready to see the visitor density heatmap for these areas?",
    widget: "selected_locations",
    points: [
      {
        id: "1",
        name: "Shawarma Palace",
        address: "456 Elm Street.",
        lat: 47.6062,
        lng: -122.3321,
      },
      {
        id: "2",
        name: "Shawarma King",
        address: "0.3 km away",
        lat: 47.6082,
        lng: -122.3351,
      },
      {
        id: "3",
        name: "Falafel Palace",
        address: "0.6 km away",
        lat: 47.6042,
        lng: -122.3291,
      },
      {
        id: "4",
        name: "Mediterranean Grill",
        address: "0.9 km away",
        lat: 47.6102,
        lng: -122.3301,
      },
      {
        id: "5",
        name: "Gyro Spot",
        address: "0.4 km away",
        lat: 47.6032,
        lng: -122.3341,
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "16",
    role: "user",
    content: "Yes, show me the heatmap.",
    created_at: new Date().toISOString(),
  },
  {
    id: "17",
    role: "assistant",
    content:
      "Now let's define how far around each shop you want to target. The red heat zones show visitor density around competitor locations.",
    widget: "radius_heatmap",
    created_at: new Date().toISOString(),
  },
  {
    id: "18",

    role: "user",
    content: "50 meters around each shop and the last 30 days.",
    created_at: new Date().toISOString(),
  },
  {
    id: "19",
    role: "assistant",
    content: "Any specific demographics?",
    created_at: new Date().toISOString(),
  },
  {
    id: "20",
    role: "user",
    content: "18-45 is good.",
    created_at: new Date().toISOString(),
  },
  {
    id: "21",
    role: "assistant",
    content:
      "I found 8,400 potential customers (94% confidence). Minimum budget required: $600. Does this look good?",
    widget: "pin_point",
    points: [
      {
        id: "1",
        type: "Audience Size",
        content: "8,400 potential customers",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Reach Estimate",
        content: "12k - 15k impressions / mo",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Target Type",
        content: "Frequent restaurant visitors",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "22",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString(),
  },
  {
    id: "23",
    role: "assistant",
    content: "Let’s connect your Meta ad account.",
    widget: "account_connect",
    created_at: new Date().toISOString(),
  },
  {
    id: "24",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString(),
  },
  {
    id: "25",
    role: "assistant",
    content: "Meta account connected. What is your monthly budget?",
    created_at: new Date().toISOString(),
  },
  {
    id: "26",
    role: "user",
    content: "$1,200 per month.",
    created_at: new Date().toISOString(),
  },
  {
    id: "27",
    role: "assistant",
    content:
      "Now that we’ve identified the right group, let’s figure out exactly what we’re going to say to them and how the ad should look.",
    widget: "QuickQuestion",
    points: [
      {
        id: "1",
        type: "Question 1",
        content:
          "What’s the main message or creative direction you want? (Example: “New menu just dropped + big discounts — come try us instead”)",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Question 2",
        content:
          "Preferred ad format? (Single image, carousel, short video, etc.)",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Question 3",
        content:
          "Campaign name? (Something like “Shawarma Palace – Competitor Steal”)",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "28",
    role: "user",
    content:
      "Creative: New menu items + big discounts. Format: Carousel. Campaign name: Shawarma Palace Competitor Steal.",
    created_at: new Date().toISOString(),
  },
  {
    id: "29",
    role: "assistant",
    content: "Please upload creatives.",
    widget: "upload_creatives",
    created_at: new Date().toISOString(),
  },
  {
    id: "30",
    role: "user",
    content: "[Uploads 3 images + 1 video]",
    created_at: new Date().toISOString(),
  },
  {
    id: "31",
    role: "assistant",
    content: "Everything is ready. Type PUSH LIVE to launch.",
    created_at: new Date().toISOString(),
  },
  {
    id: "32",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString(),
  },
  {
    id: "33",
    role: "assistant",
    content:
      "Campaign pushed live. Campaign ID: 2385xxxxxxxxxx. Monitoring available.",
    created_at: new Date().toISOString(),
  },
];

export const vibe: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content:
      "I just vibecoded a CRM built for tattoo artists. It helps track their clients progress, follows up with them to help with their healing journey and even reminds me to text them every few months to keep up with them and to see if they want any new tattoos. I would really love to share this product with every tattoo artist in my city before expanding. Would it be possible to send ads to tattoo artists who have been seen at tattoo shops around the city for more than 3 days a week, over the course of the last month? I don't want to target the tattoo shops themselves because then it will also pick up on the client, not just the artist.",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Yes, I can definitely help you find those people. Let’s build this campaign to hit exactly the tattoo artists who are at shops all the time — not the clients. We have three main ways to do this on Meta: Pin Point, Category, and Target by Location. Which one do you want to go with?",
    widget: "pin_point",
    points: [
      {
        id: "1",
        type: "Pin Point",
        content: "Targets people at specific shops you choose",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Category",
        content:
          "Finds anyone who visits tattoo shops frequently across the whole city (great for high-frequency artists)",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Target by Location",
        content: "Broader area targeting for general awareness",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    role: "user",
    content:
      "Category. I want every tattoo artist in the city who’s at shops 3+ days a week.",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect. Let’s get this started. What city are we targeting?",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    role: "user",
    content: "Portland, OR.",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    role: "assistant",
    content:
      "Location locked to Portland metro area (within 20 km to cover the full city). Now pulling tattoo shops across the metro so we can find the artists who visit them heavily.",
    widget: "map_selection",
    widget_title: "Split Map View",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    role: "assistant",
    content:
      "Here are the tattoo shops I found in Portland. Do you want to deselect any, or should I go ahead and find everyone who has been there recently?",
    widget: "competitor_selection",
    points: [
      {
        id: "1",
        type: "Ink & Iron Tattoo",
        content: "Downtown Portland",
        lat: 45.5231,
        lng: -122.6765,
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Black Rose Tattoo Parlor",
        content: "Hawthorne",
        lat: 45.5123,
        lng: -122.6486,
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Sacred Art Tattoo",
        content: "North Portland",
        lat: 45.5592,
        lng: -122.6658,
        created_at: new Date().toISOString(),
      },
      {
        id: "4",
        type: "Lucky Devil Tattoo",
        content: "Alberta Arts",
        lat: 45.5582,
        lng: -122.6438,
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    role: "user",
    content: "Target all of them.",
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    role: "assistant",
    content:
      "All tattoo shops selected. What radius around each shop would you like me to use, and how far back should I look? I recommend 50 m around each shop and the last 30 days to focus on real artists (not one-time clients).",
    widget: "radius_selection",
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    role: "user",
    content: "50 m around each shop and the last 30 days.",
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    role: "assistant",
    content:
      "Radius and lookback window set. Any specific demographics for the artists? (I recommend 18-45, but you can narrow it.)",
    created_at: new Date().toISOString(),
  },
  {
    id: "12",
    role: "user",
    content: "18-45 is good.",
    created_at: new Date().toISOString(),
  },
  {
    id: "13",
    role: "assistant",
    content:
      "Demographics applied. Running Target People mode on Meta… Map updates with heatmap showing high-frequency zones and exact count.",
    widget: "radius_heatmap",
    created_at: new Date().toISOString(),
  },
  {
    id: "14",
    role: "assistant",
    content:
      "Great news! I found 2,150 potential tattoo artists (94% confidence) who visited shops 3+ days a week in the last 30 days. These are the exact high-frequency artists you described. When the campaign runs, they will be the ones seeing your ads — this is Target People mode. To reach all of them effectively, you’ll need a minimum of $500 on this Meta campaign. If $500 feels too high, you can make changes to your audience. Does the audience and map look good as-is, or would you like to change anything?",
    widget: "pin_point",
    points: [
      {
        id: "1",
        type: "Audience Size",
        content: "2,150 potential tattoo artists",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Confidence",
        content: "94% match confidence",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Minimum Budget",
        content: "$500 to reach full audience",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "15",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString(),
  },
  {
    id: "16",
    role: "assistant",
    content:
      "Great — we’ve locked in the audience to reach. Before we can send off this ad to your audience, we need to set up the campaign requirements from Meta.",
    widget: "account_connect",
    widget_title: "Meta Account Validation",
    created_at: new Date().toISOString(),
  },
  {
    id: "17",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString(),
  },
  {
    id: "18",
    role: "assistant",
    content:
      "Meta account connected. $500 is the minimum to reach all 2,150 artists. Spending more will also help Meta build strong lookalike audiences from this data. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString(),
  },
  {
    id: "19",
    role: "user",
    content: "$900 per month.",
    created_at: new Date().toISOString(),
  },
  {
    id: "20",
    role: "assistant",
    content:
      "Budget set. Now that we’ve identified the right group, let’s figure out exactly what we’re going to say to them and how the ad should look.",
    widget: "QuickQuestion",
    points: [
      {
        id: "1",
        type: "Question 1",
        content:
          "What’s the main creative direction? (Example: “Tattoo artist CRM that tracks clients, healing, and rebooking — built for you”)",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Question 2",
        content: "Preferred ad format? (Single image, carousel, video, etc.)",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Question 3",
        content: "Campaign name?",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "21",
    role: "user",
    content:
      "Creative direction: Tattoo artist CRM that tracks clients, healing, and rebooking — built for you. Carousel format. Campaign name: Portland Tattoo Artists CRM Traffic.",
    created_at: new Date().toISOString(),
  },
  {
    id: "22",
    role: "assistant",
    content:
      "Plan ready. Objective: Traffic (to website). Audience: 2,150 Target People — high-frequency tattoo artists. Targeting: All Portland tattoo shops + 50 m radius. Creative direction: Tattoo artist CRM that tracks clients, healing, and rebooking — built for you. Ad format: Carousel.",
    widget: "pin_point",
    points: [
      {
        id: "1",
        type: "Objective",
        content: "Traffic (to website)",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Audience",
        content: "2,150 Target People — high-frequency tattoo artists",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Targeting",
        content: "All Portland tattoo shops + 50 m radius",
        created_at: new Date().toISOString(),
      },
      {
        id: "4",
        type: "Ad Format",
        content: "Carousel",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "23",
    role: "assistant",
    content:
      "Ad Creative Step (Manual Only): Please upload your creatives (plus CRM screenshots or short clips so artists can instantly see how it works).",
    widget: "upload_creatives",
    created_at: new Date().toISOString(),
  },
  {
    id: "24",
    role: "user",
    content: "[Uploads creatives + CRM screenshots]",
    created_at: new Date().toISOString(),
  },
  {
    id: "25",
    role: "assistant",
    content:
      "Creatives uploaded and attached. All right, everything is set. We have your audience, messaging, and creative ready to go. Give me the green light and I’ll activate this campaign through your Meta ad account. Type 'PUSH LIVE' to launch it now.",
    created_at: new Date().toISOString(),
  },
  {
    id: "26",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString(),
  },
  {
    id: "27",
    role: "assistant",
    content:
      "Campaign pushed LIVE on Meta! Meta Campaign ID: 2385xxxxxxxxxx. You can now track real-time results (impressions, reach, link clicks, cost, conversions) directly in the Campaigns tab inside Punk AI. Want me to keep an eye on it for the first 24–48 hours and send you a quick performance summary?",
    created_at: new Date().toISOString(),
  },
];
export const rock_bank: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content:
      "I manage a punk rock band. We are going on tour in a few months. I would love to be able to advertise our shows to every city we go to by seeing the last punk rock show they threw in that city and just targeting anyone who went to it and people with similar interests as them.",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Got it — I think you want an Engagement campaign on Meta to promote your upcoming tour shows by targeting people who actually attended the last punk rock show in each city (plus similar high-interest fans).There are multiple ways to do this on Meta:",
    widget: "pin_point",
    points: [
      {
        id: "1",
        type: "Engagement",
        content:
          "boosts likes, comments, shares, saves, video views, and messages from real fans (perfect for building hype around your tour)",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Awareness",
        content:
          "maximizes reach and brand recall so more people remember your band and shows",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Traffic",
        content: "drives clicks to your ticket link or website",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    role: "user",
    content:
      "Engagement. I want the people who went to the last punk shows in each city.",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Perfect. Let’s get this started.List the cities and approximate dates for your tour shows. (Example: “Seattle June 15, Portland June 22, Austin July 10”)",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    role: "user",
    content: "Seattle June 15, Portland June 22, Austin July 10.",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    role: "assistant",
    content:
      "Tour locked: Seattle (June 15), Portland (June 22), Austin (July 10). Now running web search for the most recent punk rock shows in each city so we can find the exact fans who were there.",
    widget: "competitor_selection",
    points: [
      {
        id: "1",
        type: "Seattle",
        content: " Last major punk show was at The Crocodile on March 28.",
        lat: 47.6128,
        lng: -122.3458,
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Portland",
        content: " Last major punk show was at Dante’s on April 12.",
        lat: 45.5234,
        lng: -122.6762,
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Austin",
        content: " Last major punk show was at Mohawk on May 5.",
        lat: 30.2672,
        lng: -97.7431,
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    role: "user",
    content: "Target all of them.",
    created_at: new Date().toISOString(),
  },
  {
    id: "7.5",
    role: "assistant",
    content:
      "All venues confirmed. Here are the target points I've mapped out for your tour shows. Now let's define the reach around each location.",
    widget: "selected_locations",
    points: [
      {
        id: "1",
        name: "The Crocodile",
        address: "Seattle",
        lat: 47.6128,
        lng: -122.3458,
      },
      {
        id: "2",
        name: "Dante's",
        address: "Portland",
        lat: 45.5234,
        lng: -122.6762,
      },
      {
        id: "3",
        name: "Mohawk",
        address: "Austin",
        lat: 30.2672,
        lng: -97.7431,
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    role: "assistant",
    content:
      " All 3 venues selected. How far around each venue do you want me to look for the people who attended? I recommend 500 m so we stay focused on real fans who were actually there.",
    widget: "radius_selection",
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    role: "user",
    content: "500 m is good.",
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    role: "assistant",
    content:
      " Radius set to 500 m per venue. Running Target People mode on Meta… Our agents are now going through our data and finding the exact people who physically attended those last punk shows in each city.I found 11,200 real punk fans (96% confidence) who were physically at the last punk shows in Seattle, Portland, and Austin. These are the exact people you want: real fans who showed up to the last shows, not just people who “like” punk online. When the campaign runs, they will be the ones seeing your tour ads — this is Target People mode at its best. To reach all of them effectively, you’ll need a minimum of $700 on this Meta campaign. If $700 feels too high, you can make changes to your audience. Does the audience and map look good as-is, or would you like to make changes?",
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString(),
  },
  {
    id: "12",
    role: "assistant",
    content:
      "Great — we’ve now identified the right group of real punk fans. Before we build the campaign and launch it through Meta, let’s connect your Meta ad account (one-time step — super easy, just one click and you’re done).",
    widget: "account_connect",
    created_at: new Date().toISOString(),
  },
  {
    id: "13",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString(),
  },
  {
    id: "14",
    role: "assistant",
    content:
      " Meta account connected. $700 is the minimum to reach all 11,200 fans. Spending more will also help Meta build strong lookalike audiences from this data. What’s your monthly budget for this tour campaign?",
    created_at: new Date().toISOString(),
  },
  {
    id: "15",
    role: "user",
    content: "$1,400 per month.",
    created_at: new Date().toISOString(),
  },
  {
    id: "16",
    role: "assistant",
    content:
      "Now that we’ve found the right people, let’s figure out exactly what we’re going to say to them and how the ad should look.",
    created_at: new Date().toISOString(),
  },
  {
    id: "17",
    role: "user",
    content:
      "Creative direction: Your city’s last punk show was fire… wait till you see ours. Video format. Campaign name: Punk Tour 2026.",
    created_at: new Date().toISOString(),
  },
  {
    id: "18",
    role: "assistant",
    content:
      "Plan ready. Objective: Engagement. Audience: 11,200 punk fans. Targeting: selected venues + 500 m radius. Ad format: Video. Please upload your creatives.",
    widget: "upload_creatives",
    created_at: new Date().toISOString(),
  },
  {
    id: "19",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString(),
  },
  {
    id: "20",
    role: "assistant",
    content:
      "All right, everything is set. We have your audience, messaging, and creative ready to go. Give me the green light and I’ll activate this campaign through your Meta ad account. Type “PUSH LIVE” to launch it now.",
    created_at: new Date().toISOString(),
  },
  {
    id: "21",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString(),
  },
  {
    id: "22",
    role: "assistant",
    content:
      "Meta Campaign ID: 2385xxxxxxxxxx You can now track real-time results (impressions, reach, post engagements, link clicks, cost) directly in the Campaigns tab inside Punk AI. Want me to monitor performance across all three cities and send you a summary after the first 48 hours?",
    created_at: new Date().toISOString(),
  },
];
export const realEstateLeads: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content:
      "I'm a real estate agent, I run free home valuation ads at home sellers.",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Yes, I can definitely help you find those people. Let’s build this campaign to reach potential home sellers with your free home valuation offer.",
    widget: "pin_point",
    points: [
      {
        id: "1",
        type: "Leads",
        contect:
          "collects contact info through instant forms (perfect for free home valuation offers)",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Awareness",
        contect:
          "maximizes reach and brand recall so more people see your offer",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Traffic",
        contect: "drives clicks to your website or landing page",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    role: "user",
    content:
      "Leads. I want people to fill out the form for the free valuation.",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Perfect. Let’s get this started. What city or metro area are you targeting?",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    role: "user",
    content: "Austin, TX metro.",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    role: "assistant",
    content: "Location locked to Austin metro area",
    widget: "map_selection",
    widget_title: "Split Map View",
    points: [
      {
        id: "1",
        name: "Westlake Hills",
        address: "Austin, TX",
        lat: 30.2974,
        lng: -97.8083,
      },
      {
        id: "2",
        name: "Hyde Park",
        address: "Austin, TX",
        lat: 30.3025,
        lng: -97.7281,
      },
      {
        id: "3",
        name: "Mueller",
        address: "Austin, TX",
        lat: 30.2941,
        lng: -97.7061,
      },
      {
        id: "4",
        name: "Tarrytown",
        address: "Austin, TX",
        lat: 30.2982,
        lng: -97.7712,
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    role: "user",
    content: "Select the top 50 neighborhoods.",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    role: "assistant",
    content:
      "Top 50 neighborhoods selected. How far around each neighborhood do you want me to look? Since you’re going broad, I recommend 1 km so we reach people who actually live or spend time there.",
    widget: "radius_selection",
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    role: "user",
    content: "Keep it at 1 km.",
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    role: "assistant",
    content:
      "Radius set to 1 km. Any specific demographics you want to focus on? (For home valuation leads, most agents target 35–65 year olds, but you can narrow it.)",
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    role: "user",
    content: "35-65 is good.",
    created_at: new Date().toISOString(),
  },
  {
    id: "12",
    role: "assistant",
    content: "Demographics applied. Running Target People mode on Meta…",
    widget: "radius_heatmap",
    created_at: new Date().toISOString(),
  },
  {
    id: "13",
    role: "assistant",
    content:
      "Great news! I found 14,600 potential customers (92% confidence) in those 50 neighborhoods who match the profile of people likely to be thinking about selling. These are real people who live or spend time in areas with active home sales. When the campaign runs, they will be the ones seeing your free home valuation ads — this is Target People mode. To reach all of them effectively, you’ll need a minimum of $800 on this Meta campaign. If $800 feels too high, you can make changes to your audience. Does the audience and map look good as-is, or would you like to make changes?",
    created_at: new Date().toISOString(),
  },
  {
    id: "14",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString(),
  },
  {
    id: "15",
    role: "assistant",
    content:
      "Great — we’ve now identified the right group. Before we can send off this ad to your audience, we need to set up the campaign requirements from Meta.",
    widget: "account_connect",
    widget_title: "Meta Account Validation",
    created_at: new Date().toISOString(),
  },
  {
    id: "16",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString(),
  },
  {
    id: "17",
    role: "assistant",
    content:
      "Meta account connected. $800 is the minimum to reach all 14,600 people. Spending more will also help Meta build strong lookalike audiences from this data. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString(),
  },
  {
    id: "18",
    role: "user",
    content: "$1,800 per month.",
    created_at: new Date().toISOString(),
  },
  {
    id: "19",
    role: "assistant",
    content: "Budget set.",
    created_at: new Date().toISOString(),
  },
  {
    id: "20",
    role: "assistant",
    content:
      "Now that we’ve found the right people, let’s figure out exactly what we’re going to say to them and how the ad should look.",
    widget: "QuickQuestion",
    points: [
      {
        id: "1",
        type: "Question 1",
        content:
          "What’s the main creative direction or headline for the free home valuation offer?",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        type: "Question 2",
        content: "Preferred ad format? (Single image, carousel, video, etc.)",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        type: "Question 3",
        content: "Campaign name?",
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "21",
    role: "user",
    content:
      "Creative direction: “Get a free home valuation in minutes — see what your house is worth today.” Carousel format. Campaign name: Austin Free Home Valuation Leads.",
    created_at: new Date().toISOString(),
  },
  {
    id: "22",
    role: "assistant",
    content:
      "Plan ready. Objective: Lead Generation. Audience: 14,600 people. Targeting: top 50 neighborhoods + 1 km radius. Ad format: Carousel. Please upload creatives.",
    widget: "upload_creatives",
    created_at: new Date().toISOString(),
  },
  {
    id: "23",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString(),
  },
  {
    id: "24",
    role: "assistant",
    content:
      "Creatives uploaded and attached. Lead Form is now configured and ready. All right, everything is set. We have your audience, messaging, and creative ready to go. Give me the green light and I’ll activate this campaign through your Meta ad account. Type “PUSH LIVE” to launch it now.",
    created_at: new Date().toISOString(),
  },
  {
    id: "25",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString(),
  },
  {
    id: "26",
    role: "assistant",
    content:
      "Campaign pushed LIVE on Meta! Meta Campaign ID: 2385xxxxxxxxxx. You can now track real-time results (impressions, reach, leads generated, cost per lead) directly in the Campaigns tab inside Punk AI. Want me to monitor it for the first 24–48 hours and send you a quick performance summary with the number of leads captured?",
    created_at: new Date().toISOString(),
  },
];
export const game: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content:
      "I just built an insane game in roblox, posted the link on Twitter, and only got 12 likes. I’d be down to spend like 300$ to see if I could advertise this on Meta to gamers. What should I do?",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Yes, I can definitely help you find those people. With a $300 budget, the smartest move is to keep it hyper-local and focused on real gamers who already hang out at gaming spots. There are multiple ways to do this on Meta: App Promotion, Traffic, and Awareness. Which one do you want to go with?",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    role: "user",
    content: "App Promotion. I want people to play the game.",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Perfect. Let’s get this started. What city or metro area do you want to target gamers in?",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    role: "user",
    content: "Chicago metro.",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    role: "assistant",
    content:
      "Location locked to Chicago metro area. Found gaming spots like gaming cafes, esports lounges, arcades, and university gaming clubs. Do you want to refine or proceed?",
    widget: "map_selection",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    role: "user",
    content: "Select the top 40 gaming spots.",
    created_at: new Date().toISOString(),
  },
  {
    id: "7.5",
    role: "assistant",
    content:
      "Gaming locations locked. I've pinned all 40 hotspots across Chicago. With these selected, we'll now set a tight radius to maximize your $300 budget.",
    widget: "selected_locations",
    points: [
      {
        id: "1",
        name: "Gaming Cafe",
        address: "Chicago, IL",
        lat: 41.8781,
        lng: -87.6298,
      },
      {
        id: "2",
        name: "Esports Lounge",
        address: "Chicago, IL",
        lat: 41.8818,
        lng: -87.6231,
      },
      {
        id: "3",
        name: "Retro Arcade",
        address: "Chicago, IL",
        lat: 41.8889,
        lng: -87.6358,
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    role: "assistant",
    content:
      "Top 40 gaming spots selected. With a $300 budget, we’ll need to keep targeting tight. What radius should we use? I recommend 20–50 m.",
    widget: "radius_selection",
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    role: "user",
    content: "Keep it at 50 m.",
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    role: "assistant",
    content:
      "Radius set to 50 m. Any age range? Most Roblox players are 13–24.",
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    role: "user",
    content: "13-24 is good.",
    created_at: new Date().toISOString(),
  },
  {
    id: "12",
    role: "assistant",
    content:
      "Demographics applied. Running Target People mode… Found 9,300 gamers (93% confidence) who visit these spots. With your $300 budget, we’ll keep delivery tight. Does the audience look good?",
    created_at: new Date().toISOString(),
  },
  {
    id: "13",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString(),
  },
  {
    id: "14",
    role: "assistant",
    content:
      "Great — we’ve identified the right audience. Please connect your Meta ad account to proceed.",
    widget: "account_connect",
    created_at: new Date().toISOString(),
  },
  {
    id: "15",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString(),
  },
  {
    id: "16",
    role: "assistant",
    content:
      "Meta account connected. Let’s define your ad creative. What’s the hook, format, campaign name, and game link?",
    created_at: new Date().toISOString(),
  },
  {
    id: "17",
    role: "user",
    content:
      "Creative direction: “Just built this insane Roblox game — come play it now!” Video format. Campaign name: Chicago Roblox Game Launch. Link: roblox.com/games/1234567890/MyInsaneGame",
    created_at: new Date().toISOString(),
  },
  {
    id: "18",
    role: "assistant",
    content:
      "Plan ready. Objective: App Promotion. Audience: 9,300 gamers. Targeting: top 40 gaming spots + 50 m radius. Ad format: Video. Link attached. Please upload creatives.",
    widget: "upload_creatives",
    created_at: new Date().toISOString(),
  },
  {
    id: "19",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString(),
  },
  {
    id: "20",
    role: "assistant",
    content:
      "Creatives uploaded. Roblox game link attached. Type 'PUSH LIVE' to launch.",
    created_at: new Date().toISOString(),
  },
  {
    id: "21",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString(),
  },
  {
    id: "22",
    role: "assistant",
    content:
      "Campaign pushed LIVE on Meta! Your $300 budget is active. You can now track impressions, clicks, and engagement. Want me to monitor performance and send a 48-hour report?",
    created_at: new Date().toISOString(),
  },
];
export const matcha: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content:
      "I just launched my matcha brand in LA. I want to target matcha drinkers in the city. I’m thinking primarily of women 16-35.",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Yes, I can definitely help you find those people. Let’s build this campaign to reach real matcha drinkers in LA and drive direct sales. There are multiple ways to do this on Meta: Sales, Traffic, and Awareness. Which one do you want to go with?",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    role: "user",
    content: "Sales. I want people to actually buy the matcha.",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Perfect. Let’s get this started. What city or metro area are you targeting?",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    role: "user",
    content: "LA metro.",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    role: "assistant",
    content:
      "Location locked to LA metro area. Found matcha cafés, wellness spots, yoga studios, and health stores. Do you want to refine or proceed?",
    widget: "map_selection",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    role: "user",
    content: "Select the top 60.",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    role: "assistant",
    content:
      "Top 60 spots selected. What radius should we use? I recommend 1 km.",
    widget: "radius_selection",
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    role: "user",
    content: "Keep it at 1 km.",
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    role: "assistant",
    content: "Radius set to 1 km. Confirming demographics: women 16–35?",
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    role: "user",
    content: "Women 16-35 is perfect.",
    created_at: new Date().toISOString(),
  },
  {
    id: "12",
    role: "assistant",
    content:
      "Demographics applied. Running Target People mode… Found 12,400 matcha drinkers (93% confidence). Minimum budget is $900. Does the audience look good?",
    created_at: new Date().toISOString(),
  },
  {
    id: "13",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString(),
  },
  {
    id: "14",
    role: "assistant",
    content:
      "Great — we’ve identified the right audience. Please connect your Meta ad account to proceed.",
    widget: "account_connect",
    created_at: new Date().toISOString(),
  },
  {
    id: "15",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString(),
  },
  {
    id: "16",
    role: "assistant",
    content:
      "Meta account connected. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString(),
  },
  {
    id: "17",
    role: "user",
    content: "$2,000 per month.",
    created_at: new Date().toISOString(),
  },
  {
    id: "18",
    role: "assistant",
    content:
      "Budget set. Now let’s define your ad creative. What’s the headline, format, campaign name, and website link?",
    created_at: new Date().toISOString(),
  },
  {
    id: "19",
    role: "user",
    content:
      "Creative direction: Fresh matcha, real energy — try it today. Carousel format. Campaign name: LA Matcha Launch Sales. Link: matchalove.com/shop",
    created_at: new Date().toISOString(),
  },
  {
    id: "20",
    role: "assistant",
    content:
      "Plan ready. Objective: Sales. Audience: 12,400 matcha drinkers. Targeting: top 60 spots + 1 km radius. Ad format: Carousel. Link attached. Please upload creatives.",
    widget: "upload_creatives",
    created_at: new Date().toISOString(),
  },
  {
    id: "21",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString(),
  },
  {
    id: "22",
    role: "assistant",
    content:
      "Creatives uploaded. Meta Pixel configured for sales tracking. Type 'PUSH LIVE' to launch.",
    created_at: new Date().toISOString(),
  },
  {
    id: "23",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString(),
  },
  {
    id: "24",
    role: "assistant",
    content:
      "Campaign pushed LIVE on Meta! You can now track impressions, clicks, add-to-carts, and purchases. Want me to monitor performance and send a 48-hour sales report?",
    created_at: new Date().toISOString(),
  },
];
export const gamble: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content:
      "I want to promote a hockey promotion for my sports gambling app to men in Montreal. Can we send this ad to men aged 18-45 in the city who have been to a casino and who have also been to a habs game in the last year?",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Yes, I can definitely help you find those people. Let’s build this campaign to reach men 18-45 in Montreal who have been to both a casino and a Habs game. There are multiple ways to do this on Meta: Sales, Traffic, and Awareness. Which one do you want to go with?",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    role: "user",
    content: "Sales. I want people to actually use the promotion in the app.",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Perfect. Let’s get this started. Found Habs games at Bell Centre and casino locations in Montreal. Do you want to target these venues?",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    role: "user",
    content: "Select Bell Centre and Casino de Montréal.",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    role: "assistant",
    content:
      "Selected Bell Centre and Casino de Montréal. What radius should we use? I recommend 1 km.",
    widget: "map_selection",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    role: "user",
    content: "Keep it at 1 km.",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    role: "assistant",
    content:
      "Radius set to 1 km. Running Target People mode… Found 4,800 high-intent fans (95% confidence) who visited both locations. Minimum budget is $650. Does the audience look good?",
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    role: "assistant",
    content:
      "Great — we’ve identified the right audience. Please connect your Meta ad account to proceed.",
    widget: "account_connect",
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString(),
  },
  {
    id: "12",
    role: "assistant",
    content:
      "Meta account connected. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString(),
  },
  {
    id: "13",
    role: "user",
    content: "$1,200 per month.",
    created_at: new Date().toISOString(),
  },
  {
    id: "14",
    role: "assistant",
    content:
      "Budget set. Now let’s define your ad creative. What’s the headline, format, campaign name, and app link?",
    created_at: new Date().toISOString(),
  },
  {
    id: "15",
    role: "user",
    content:
      "Creative direction: Habs fans win bigger with this hockey promotion. Video format. Campaign name: Montreal Habs Hockey Promo. Link: myapp.com/habs-promo",
    created_at: new Date().toISOString(),
  },
  {
    id: "16",
    role: "assistant",
    content:
      "Plan ready. Objective: Sales. Audience: 4,800 fans. Targeting: Bell Centre + Casino de Montréal + 1 km radius. Ad format: Video. Link attached. Please upload creatives.",
    widget: "upload_creatives",
    created_at: new Date().toISOString(),
  },
  {
    id: "17",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString(),
  },
  {
    id: "18",
    role: "assistant",
    content:
      "Creatives uploaded. Meta Pixel configured for conversion tracking. Type 'PUSH LIVE' to launch.",
    created_at: new Date().toISOString(),
  },
  {
    id: "19",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString(),
  },
  {
    id: "20",
    role: "assistant",
    content:
      "Campaign pushed LIVE on Meta! You can now track impressions, clicks, and purchases. Want me to monitor performance and send a 48-hour report?",
    created_at: new Date().toISOString(),
  },
];
export const ai: MockChatMessage[] = [
  {
    id: "1",
    role: "user",
    content:
      "I’m an AI consultant for local service based businesses. I want to show plumbers how I can help them implement AI optimization workflows in their business. Can I only target plumbers and maybe electricians too?",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Yes, I can definitely help you find those people. Let’s build this campaign to reach real plumbers and electricians and show them how your AI optimization workflows can transform their businesses. There are multiple ways to do this on Meta: Sales, Traffic, and Awareness. Which one do you want to go with?",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    role: "user",
    content: "Sales. I want them to book a call or sign up.",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Perfect. Let’s get this started. What city or metro area do you want to target?",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    role: "user",
    content: "Chicago metro.",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    role: "assistant",
    content:
      "Location locked to Chicago metro. Found trade spots like supply houses, contractor yards, trade counters, and association offices. Do you want to refine or proceed?",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    role: "user",
    content: "Select the top 55.",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    role: "assistant",
    content:
      "Top 55 trade spots selected. What radius should we use? I recommend 1 km.",
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    role: "user",
    content: "Keep it at 1 km.",
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    role: "assistant",
    content:
      "Radius set to 1 km. Running Target People mode… Found 6,900 service pros (93% confidence) who visit these locations. Minimum budget is $650. Does the audience look good?",
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    role: "user",
    content: "Yes, looks perfect.",
    created_at: new Date().toISOString(),
  },
  {
    id: "12",
    role: "assistant",
    content:
      "Great — we’ve identified the right audience. Please connect your Meta ad account to proceed.",
    widget: "account_connect",
    created_at: new Date().toISOString(),
  },
  {
    id: "13",
    role: "user",
    content: "[Connects account]",
    created_at: new Date().toISOString(),
  },
  {
    id: "14",
    role: "assistant",
    content:
      "Meta account connected. What’s your monthly budget for this campaign?",
    created_at: new Date().toISOString(),
  },
  {
    id: "15",
    role: "user",
    content: "$1,500 per month.",
    created_at: new Date().toISOString(),
  },
  {
    id: "16",
    role: "assistant",
    content:
      "Budget set. Now let’s define your ad creative. What’s the headline, format, campaign name, and booking link?",
    created_at: new Date().toISOString(),
  },
  {
    id: "17",
    role: "user",
    content:
      "Creative direction: Free AI Workflow Audit for Plumbers and Electricians – Save hours every week. Carousel format. Campaign name: Chicago Service Pros AI Optimization. Link: aiworkflowconsulting.com/book",
    created_at: new Date().toISOString(),
  },
  {
    id: "18",
    role: "assistant",
    content:
      "Plan ready. Objective: Sales. Audience: 6,900 service pros. Targeting: top 55 trade spots + 1 km radius. Ad format: Carousel. Link attached. Please upload creatives.",
    widget: "upload_creatives",
    created_at: new Date().toISOString(),
  },
  {
    id: "19",
    role: "user",
    content: "[Uploads creatives]",
    created_at: new Date().toISOString(),
  },
  {
    id: "20",
    role: "assistant",
    content:
      "Creatives uploaded. Meta Pixel configured for lead tracking. Type 'PUSH LIVE' to launch.",
    created_at: new Date().toISOString(),
  },
  {
    id: "21",
    role: "user",
    content: "PUSH LIVE",
    created_at: new Date().toISOString(),
  },
  {
    id: "22",
    role: "assistant",
    content:
      "Campaign pushed LIVE on Meta! You can now track impressions, clicks, and leads. Want me to monitor performance and send a 48-hour report?",
    created_at: new Date().toISOString(),
  },
];
export const chat_data: {
  chat: MockChatMessage[];
  id: number;
  title: string;
}[] = [
  {
    chat: swarma,
    id: 1,
    title: "Shawarma Palace",
  },
  {
    chat: vibe,
    id: 2,
    title: "Vibe",
  },
  {
    chat: rock_bank,
    id: 3,
    title: "Rock Bank",
  },
  {
    chat: realEstateLeads,
    id: 4,
    title: "Real Estate Leads",
  },
  {
    chat: game,
    id: 5,
    title: "Game",
  },
  {
    chat: matcha,
    id: 6,
    title: "Matcha",
  },
  {
    chat: gamble,
    id: 7,
    title: "Gamble",
  },
  {
    chat: ai,
    id: 8,
    title: "AI",
  },
];

export const findMockResponse = (content: string) => {
  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const normalizedContent = normalizeText(content);
  for (const item of chat_data) {
    // Match only user turns so we always resolve the correct next assistant step.
    const index = item.chat.findIndex((m) => {
      if (m.role !== "user") return false;
      const msgContent = normalizeText(m.content);
      return (
        msgContent.includes(normalizedContent) ||
        normalizedContent.includes(msgContent)
      );
    });

    if (index !== -1) {
      // Find the next assistant message after this match
      for (let i = index + 1; i < item.chat.length; i++) {
        if (item.chat[i].role === "assistant") {
          return {
            question: item.chat[index],
            answer: item.chat[i],
            fullChat: item.chat,
            currentIndex: i,
          };
        }
      }
    }
  }
  return null;
};

export const findNextUserMessage = (
  assistantContent: string,
): string | null => {
  const normalizedContent = assistantContent.toLowerCase().trim();
  for (const item of chat_data) {
    const index = item.chat.findIndex((m) => {
      if (m.role !== "assistant") return false;
      const msgContent = m.content.toLowerCase().trim();
      return (
        msgContent === normalizedContent ||
        msgContent.includes(normalizedContent) ||
        normalizedContent.includes(msgContent)
      );
    });

    if (index !== -1) {
      // Find the next user message after this assistant message
      for (let i = index + 1; i < item.chat.length; i++) {
        if (item.chat[i].role === "user") {
          return item.chat[i].content;
        }
      }
    }
  }
  return null;
};
