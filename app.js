const statuses = ["Idea", "Scripted", "Filming", "Editing", "Ready", "Posted"];

const templateEpisode = {
  title: "Founder Template: One Real Lesson",
  episodeNumber: "T01",
  hook: "Nobody sees this part, but this is where the brand gets built.",
  script:
    "Open on the after-hours work setup.\nName the problem in one sentence.\nShow the real action.\nTie it back to Start Young Live Rich.\nClose with one useful lesson.",
  voiceover: "The dream gets built when nobody is clapping yet.",
  shotList:
    "1. Laptop open after work\n2. Notes, orders, or product in frame\n3. Founder walking into the next task\n4. Close-up of the brand detail\n5. End frame with S.Y.L.R.",
  caption: "Building after hours still counts. Every focused rep compounds.",
  hashtags: "#SYLR #StartYoungLiveRich #FounderJourney #BuildInSilence #FuelzUS",
  productTieIn: "S.Y.L.R. founder story",
  platform: "TikTok",
  status: "Idea",
  scheduledPostDate: "2026-07-06T10:00",
};

let episodes = [
  {
    title: "Progress Over Perfection",
    episodeNumber: "06",
    hook: "Discipline beats motivation when no one's watching.",
    script:
      "We all want overnight success.\nBut real success is built in the moments no one sees.\nIt's choosing progress over perfection.\nIt's showing up, even on the hard days.\nThat's how you build a brand. That's how you build freedom.",
    voiceover: "Discipline beats motivation when no one's watching.",
    shotList:
      "1. Close up - laptop open, silent workspace\n2. Gym clip - early morning lift\n3. Brand notebook / FuelzUS product shot\n4. On the go - working on phone\n5. End frame - S.Y.L.R. logo",
    caption: "Progress isn't always loud. But it's always leading somewhere. #SYLR",
    hashtags: "#SYLR #StartYoungLiveRich #Discipline #FuelzUS #ProgressOverPerfection #FounderJourney",
    productTieIn: "FuelzUS Hydration",
    platform: "TikTok",
    status: "Ready",
    scheduledPostDate: "2026-07-02T10:00",
  },
  {
    title: "The Why Keeps You Up",
    episodeNumber: "03",
    hook: "Full-time job by day. Brand builder by night.",
    script:
      "Clocking out doesn't mean the mission clocks out.\nFuelzUS started as a problem I wanted to solve.\nS.Y.L.R. is the reminder that the work has a bigger purpose.",
    voiceover: "If your why is real, the late nights start to make sense.",
    shotList:
      "1. Leaving work\n2. Night desk setup\n3. FuelzUS route notes\n4. Packing sample product\n5. Founder reflection shot",
    caption: "The schedule is full because the vision is bigger.",
    hashtags: "#SYLR #FuelzUS #FounderLife #FullTimeFounder #StartYoungLiveRich",
    productTieIn: "FuelzUS launch story",
    platform: "Instagram",
    status: "Posted",
    scheduledPostDate: "2026-06-18T19:30",
  },
  {
    title: "Building in Silence",
    episodeNumber: "13",
    hook: "Some chapters are meant to be quiet until they are solid.",
    script:
      "Everybody wants the announcement.\nFew people respect the reps before it.\nThis week is about documenting the build, not performing success.",
    voiceover: "Build the thing before you ask the world to believe in it.",
    shotList:
      "1. Silent planning board\n2. Founder checking product notes\n3. Quick workout cutaway\n4. FuelzUS delivery prep\n5. S.Y.L.R. hoodie detail",
    caption: "Build in silence. Let the results introduce the standard.",
    hashtags: "#BuildInSilence #SYLR #StartYoungLiveRich #FounderJourney",
    productTieIn: "S.Y.L.R. hoodie",
    platform: "Instagram",
    status: "Idea",
    scheduledPostDate: "2026-07-12T09:00",
  },
  {
    title: "The Plan No One Sees",
    episodeNumber: "10",
    hook: "A brand is not built from vibes. It is built from systems.",
    script:
      "Content, product, delivery, follow-up.\nEvery part needs a system.\nFuelzUS taught me that the back end matters as much as the front camera.",
    voiceover: "The plan behind the brand is what makes the brand last.",
    shotList:
      "1. Weekly planning page\n2. Order tracker glance\n3. Recording setup\n4. Product tie-in close-up\n5. Founder walking out with purpose",
    caption: "The unseen system is the visible advantage.",
    hashtags: "#FounderSystems #SYLR #FuelzUS #BrandBuilding",
    productTieIn: "FuelzUS order workflow",
    platform: "TikTok",
    status: "Scripted",
    scheduledPostDate: "2026-07-08T12:00",
  },
  {
    title: "Day in the Life: Build + 9-5",
    episodeNumber: "09",
    hook: "This is what building after the job really looks like.",
    script:
      "Early alarm. Work day. Short break. Brand tasks. FuelzUS follow-ups.\nNo glamour edit. Just the real rhythm of building something while life is still moving.",
    voiceover: "You do not need more hours. You need more intention with the hours you have.",
    shotList:
      "1. Alarm clock\n2. Commute or work bag\n3. Lunch-break notes\n4. Evening brand work\n5. FuelzUS delivery prep",
    caption: "Full-time schedule. Founder standard.",
    hashtags: "#DayInTheLife #SYLR #FuelzUS #FullTimeFounder",
    productTieIn: "FuelzUS daily use",
    platform: "YouTube Shorts",
    status: "Filming",
    scheduledPostDate: "2026-07-05T18:00",
  },
  {
    title: "Why I Started FuelzUS",
    episodeNumber: "08",
    hook: "I did not want another idea. I wanted a real solution.",
    script:
      "FuelzUS came from seeing a simple gap: people need better access to fuel and essentials when time is tight.\nThe mission is convenience with discipline behind it.",
    voiceover: "The best brands start by solving something real.",
    shotList:
      "1. Founder talking to camera\n2. FuelzUS notes\n3. Product/service moment\n4. Local route shot\n5. S.Y.L.R. closing line",
    caption: "Start with a real problem. Build the solution with standards.",
    hashtags: "#FuelzUS #SYLR #StartupStory #FounderJourney",
    productTieIn: "FuelzUS origin",
    platform: "Instagram",
    status: "Editing",
    scheduledPostDate: "2026-07-04T11:30",
  },
];

let selectedIndex = 0;

const board = document.querySelector("#board");
const form = document.querySelector("#episodeForm");
const toast = document.querySelector("#toast");
const statusSelect = form.elements.status;

statuses.forEach((status) => {
  const option = document.createElement("option");
  option.value = status;
  option.textContent = status;
  statusSelect.append(option);
});

function formatEpisodeNumber(value) {
  return `EP. ${value}`;
}

function formatDate(value) {
  if (!value) return "Unscheduled";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function renderBoard() {
  board.innerHTML = "";

  statuses.forEach((status) => {
    const column = document.createElement("section");
    column.className = "status-column";
    column.setAttribute("aria-label", `${status} episodes`);

    const statusEpisodes = episodes
      .map((episode, index) => ({ episode, index }))
      .filter(({ episode }) => episode.status === status);

    column.innerHTML = `
      <div class="column-header">
        <h3 class="column-title">${status}</h3>
        <span class="column-count">${statusEpisodes.length}</span>
      </div>
      <div class="episode-list"></div>
      <button class="add-episode" type="button">+ Add Episode</button>
    `;

    const list = column.querySelector(".episode-list");
    statusEpisodes.forEach(({ episode, index }) => {
      const card = document.createElement("button");
      card.className = `episode-card${index === selectedIndex ? " selected" : ""}`;
      card.type = "button";
      card.innerHTML = `
        <span class="episode-meta">${formatEpisodeNumber(episode.episodeNumber)}</span>
        <strong>${episode.title}</strong>
        <span class="episode-meta">${episode.platform} · ${formatDate(episode.scheduledPostDate)}</span>
      `;
      card.addEventListener("click", () => {
        selectedIndex = index;
        syncSelection();
      });
      list.append(card);
    });

    column.querySelector(".add-episode").addEventListener("click", () => duplicateTemplate(status));
    board.append(column);
  });
}

function syncSelection() {
  const episode = episodes[selectedIndex];
  document.querySelector("#selectedEpisodeLabel").textContent = formatEpisodeNumber(episode.episodeNumber);
  document.querySelector("#selectedEpisodeTitle").textContent = episode.title;
  document.querySelector("#mobileEpisode").textContent = formatEpisodeNumber(episode.episodeNumber);
  document.querySelector("#mobileTitle").textContent = episode.title;

  Object.entries(episode).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });

  renderBoard();
}

function readForm() {
  const nextEpisode = { ...episodes[selectedIndex] };
  Object.keys(nextEpisode).forEach((key) => {
    if (form.elements[key]) nextEpisode[key] = form.elements[key].value;
  });
  return nextEpisode;
}

function duplicateTemplate(status = "Idea") {
  const nextNumber = String(Math.max(...episodes.map((episode) => Number(episode.episodeNumber) || 0)) + 1).padStart(2, "0");
  const duplicate = {
    ...templateEpisode,
    episodeNumber: nextNumber,
    title: `Founder Build Log ${nextNumber}`,
    status,
  };

  episodes = [duplicate, ...episodes];
  selectedIndex = 0;
  syncSelection();
  showToast("Episode template duplicated");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

form.addEventListener("input", () => {
  episodes[selectedIndex] = readForm();
  syncSelection();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  episodes[selectedIndex] = readForm();
  syncSelection();
  showToast("Episode updated");
});

document.querySelector("#duplicateTemplate").addEventListener("click", () => duplicateTemplate());
document.querySelector("#mobileDuplicate").addEventListener("click", () => duplicateTemplate());
document.querySelector("#saveDraft").addEventListener("click", () => showToast("Draft saved locally"));

syncSelection();
