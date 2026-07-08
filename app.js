const APP_VERSION = "0.1.0";

const storageKeys = {
  workspaces: "creatorOS.workspaces",
  series: "creatorOS.series",
  episodes: "creatorOS.episodes",
  assets: "creatorOS.assets",
  templates: "creatorOS.templates",
  settings: "creatorOS.settings",
  promptHistory: "creatorOS.promptHistory",
  version: "creatorOS.version",
};

const statuses = ["Idea", "Scripted", "Filming", "Editing", "Ready", "Posted"];
const platforms = ["TikTok", "Instagram", "YouTube Shorts", "LinkedIn"];
const defaultWorkspaceId = "workspace-sylr-mini-series-studio";
const defaultSeriesId = "series-founder-build";

const board = document.querySelector("#board");
const form = document.querySelector("#episodeForm");
const toast = document.querySelector("#toast");
const modulePanel = document.querySelector("#modulePanel");
const moduleTitle = document.querySelector("#moduleTitle");
const moduleSubtitle = document.querySelector("#moduleSubtitle");
const workspaceSelect = document.querySelector("#workspaceSelect");
const seriesSelect = document.querySelector("#seriesSelect");
const importFile = document.querySelector("#importFile");
const workspaceShell = document.querySelector(".workspace");
const statusSelect = form.elements.status;
const episodeSeriesSelect = form.elements.seriesId;

let state = loadState();
let selectedEpisodeId = state.settings.selectedEpisodeId || state.episodes[0]?.id || "";

statuses.forEach((status) => {
  const option = document.createElement("option");
  option.value = status;
  option.textContent = status;
  statusSelect.append(option);
});

function now() {
  return new Date().toISOString();
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function createWorkspace(input = {}) {
  const timestamp = now();
  return {
    id: input.id || uid("workspace"),
    name: input.name || "Untitled Workspace",
    description: input.description || "",
    logo: input.logo || "./assets/sylr-brand-icon.jpg",
    brandColors: input.brandColors || { primary: "#050505", accent: "#d8a84d" },
    tagline: input.tagline || "",
    mission: input.mission || "",
    audience: input.audience || "",
    brandVoice: input.brandVoice || "Professional, educational, founder-focused, optimistic, practical.",
    platforms: input.platforms || ["TikTok", "Instagram", "YouTube Shorts"],
    defaultCTA: input.defaultCTA || "",
    defaultHashtags: input.defaultHashtags || "",
    notes: input.notes || "",
    archived: Boolean(input.archived),
    archivedAt: input.archivedAt || "",
    deleted: Boolean(input.deleted),
    deletedAt: input.deletedAt || "",
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp,
  };
}

function createSeries(input = {}) {
  const timestamp = now();
  return {
    id: input.id || uid("series"),
    workspaceId: input.workspaceId || getActiveWorkspaceId(),
    name: input.name || "Untitled Series",
    description: input.description || "",
    status: input.status || "Active",
    primaryIntent: input.primaryIntent || "Document and organize creator content.",
    targetAudience: input.targetAudience || "",
    platforms: input.platforms || ["TikTok", "Instagram"],
    frequency: input.frequency || "Weekly",
    episodeStructure: input.episodeStructure || "Hook, story, useful lesson, CTA.",
    notes: input.notes || "",
    archived: Boolean(input.archived),
    archivedAt: input.archivedAt || "",
    deleted: Boolean(input.deleted),
    deletedAt: input.deletedAt || "",
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp,
  };
}

function splitScheduledDate(value) {
  if (!value) return { publishDate: "", publishTime: "" };
  const [publishDate, publishTime = ""] = value.split("T");
  return { publishDate, publishTime: publishTime.slice(0, 5) };
}

function joinScheduledDate(date, time) {
  if (!date) return "";
  return `${date}T${time || "09:00"}`;
}

function createEpisode(input = {}) {
  const timestamp = now();
  const schedule = splitScheduledDate(input.scheduledPostDate);
  const workspaceId = input.workspaceId || getActiveWorkspaceId();
  const seriesId = input.seriesId || getActiveSeriesId(workspaceId);
  const platformList = input.platforms || [input.platform || "TikTok"];
  const publishDate = input.publishDate || schedule.publishDate;
  const publishTime = input.publishTime || schedule.publishTime;

  return {
    id: input.id || uid("episode"),
    workspaceId,
    seriesId,
    episodeNumber: input.episodeNumber || "01",
    title: input.title || "Untitled Episode",
    status: input.status || "Idea",
    priority: input.priority || "Medium",
    strategicImportance: input.strategicImportance || "Support brand consistency and creator momentum.",
    contentType: input.contentType || "Short-form Video",
    sourceType: input.sourceType || "Founder Original",
    platforms: platformList,
    publishDate,
    publishTime,
    summary: input.summary || input.hook || "",
    tags: input.tags || hashtagsToTags(input.hashtags || ""),
    overview: input.overview || {
      hook: input.hook || "",
      script: input.script || "",
      voiceover: input.voiceover || "",
      shotList: input.shotList || "",
      caption: input.caption || "",
      hashtags: input.hashtags || "",
      productTieIn: input.productTieIn || "",
    },
    creative: input.creative || {
      hook: input.hook || "",
      script: input.script || "",
      voiceover: input.voiceover || "",
      shotList: input.shotList || "",
      thumbnailIdea: "",
      brollIdeas: "",
    },
    production: input.production || {
      shotList: input.shotList || "",
      filmingNotes: "",
      editingNotes: "",
    },
    publishing: input.publishing || {
      caption: input.caption || "",
      hashtags: input.hashtags || "",
      cta: "",
      publishDate,
      publishTime,
    },
    business: input.business || {
      productTieIn: input.productTieIn || "",
      strategicImportance: input.strategicImportance || "",
    },
    attachments: input.attachments || [],
    ai: input.ai || { promptHistoryIds: [] },
    history: input.history || [{ at: timestamp, event: "Episode created" }],
    archived: Boolean(input.archived),
    archivedAt: input.archivedAt || "",
    deleted: Boolean(input.deleted),
    deletedAt: input.deletedAt || "",
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp,
  };
}

function createAsset(input = {}) {
  const timestamp = now();
  return {
    id: input.id || uid("asset"),
    workspaceId: input.workspaceId || getActiveWorkspaceId(),
    episodeId: input.episodeId || "",
    type: input.type || "Link",
    title: input.title || "Untitled Asset",
    url: input.url || "",
    note: input.note || "",
    archived: Boolean(input.archived),
    archivedAt: input.archivedAt || "",
    deleted: Boolean(input.deleted),
    deletedAt: input.deletedAt || "",
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp,
  };
}

function createTemplate(input = {}) {
  const timestamp = now();
  return {
    id: input.id || uid("template"),
    workspaceId: input.workspaceId || getActiveWorkspaceId(),
    name: input.name || "Untitled Template",
    category: input.category || "Episode",
    content: input.content || "",
    archived: Boolean(input.archived),
    archivedAt: input.archivedAt || "",
    deleted: Boolean(input.deleted),
    deletedAt: input.deletedAt || "",
    createdAt: input.createdAt || timestamp,
    updatedAt: input.updatedAt || timestamp,
  };
}

function createPromptHistory(input = {}) {
  return {
    id: input.id || uid("prompt"),
    workspaceId: input.workspaceId || getActiveWorkspaceId(),
    episodeId: input.episodeId || "",
    promptType: input.promptType || "Hook generation",
    input: input.input || "",
    output: input.output || "",
    createdAt: input.createdAt || now(),
    savedToEpisode: Boolean(input.savedToEpisode),
  };
}

function createDefaultSettings(input = {}) {
  return {
    activeWorkspaceId: input.activeWorkspaceId || defaultWorkspaceId,
    activeSeriesId: input.activeSeriesId || defaultSeriesId,
    activeModule: input.activeModule || "dashboard",
    selectedEpisodeId: input.selectedEpisodeId || "",
    inspectorOpen: input.inspectorOpen !== false,
    dailyMission: input.dailyMission || {
      date: new Date().toISOString().slice(0, 10),
      currentFocus: "Move one founder episode closer to posting.",
      streak: 1,
      checklist: [
        { id: "mission-1", label: "Choose today's episode priority", done: false },
        { id: "mission-2", label: "Improve hook or script", done: false },
        { id: "mission-3", label: "Attach one useful asset or note", done: false },
      ],
    },
    createdAt: input.createdAt || now(),
    updatedAt: input.updatedAt || now(),
  };
}

function defaultSeedData() {
  const workspace = createWorkspace({
    id: defaultWorkspaceId,
    name: "S.Y.L.R. Mini-Series Studio",
    description: "Default Creator OS workspace for S.Y.L.R. short-form founder content.",
    tagline: "Start Young Live Rich",
    mission: "Document the process of building a brand while working full-time and launching FuelzUS.",
    audience: "Solo creators, entrepreneurs, founders, and personal brands.",
    defaultCTA: "Build the proof. Live intentional. Leave legacy.",
    defaultHashtags: "#SYLR #StartYoungLiveRich #FounderJourney #FuelzUS",
    notes: "Seeded workspace for Creator OS v0.1.",
  });

  const series = createSeries({
    id: defaultSeriesId,
    workspaceId: workspace.id,
    name: "Founder Build Mini-Series",
    description: "A founder mini-series about building S.Y.L.R. while working full-time and launching FuelzUS.",
    primaryIntent: "Turn the real founder journey into consistent short-form episodes.",
    targetAudience: "Builders, creators, founders, and personal brands.",
    platforms: ["TikTok", "Instagram", "YouTube Shorts"],
    frequency: "3x weekly",
    notes: "Default seeded series.",
  });

  const episodes = seedEpisodes(workspace.id, series.id);

  return {
    workspaces: [workspace],
    series: [series],
    episodes,
    assets: [
      createAsset({
        id: "asset-sylr-logo",
        workspaceId: workspace.id,
        episodeId: episodes[0].id,
        type: "Image",
        title: "S.Y.L.R. brand icon",
        url: "./assets/sylr-brand-icon.jpg",
        note: "Primary workspace brand asset.",
      }),
    ],
    templates: [
      createTemplate({
        id: "template-founder-lesson",
        workspaceId: workspace.id,
        name: "Founder Lesson Episode",
        category: "Episode",
        content: "Hook -> real founder moment -> lesson -> product/brand tie-in -> CTA.",
      }),
      createTemplate({
        id: "template-ai-hook",
        workspaceId: workspace.id,
        name: "Hook Generator Prompt",
        category: "AI",
        content: "Generate a practical short-form hook for this founder episode.",
      }),
    ],
    settings: createDefaultSettings({
      activeWorkspaceId: workspace.id,
      activeSeriesId: series.id,
      selectedEpisodeId: episodes[0].id,
    }),
    promptHistory: [],
  };
}

function seedEpisodes(workspaceId, seriesId) {
  return [
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
      priority: "High",
      contentType: "Short-form Video",
      platforms: ["TikTok"],
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
      priority: "Medium",
      contentType: "Short-form Video",
      platforms: ["Instagram"],
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
      priority: "High",
      contentType: "Short-form Video",
      platforms: ["Instagram"],
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
      priority: "Medium",
      contentType: "Short-form Video",
      platforms: ["TikTok"],
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
      priority: "Medium",
      contentType: "Short-form Video",
      platforms: ["YouTube Shorts"],
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
      priority: "High",
      contentType: "Short-form Video",
      platforms: ["Instagram"],
      scheduledPostDate: "2026-07-04T11:30",
    },
  ].map((episode) => createEpisode({ ...episode, workspaceId, seriesId }));
}

function hashtagsToTags(value) {
  return String(value)
    .split(/\s+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function loadState() {
  const seed = defaultSeedData();
  const version = localStorage.getItem(storageKeys.version);
  if (!version) {
    saveAll(seed);
    localStorage.setItem(storageKeys.version, APP_VERSION);
    return seed;
  }

  const loaded = {
    workspaces: parseStored(storageKeys.workspaces, seed.workspaces),
    series: parseStored(storageKeys.series, seed.series),
    episodes: parseStored(storageKeys.episodes, seed.episodes),
    assets: parseStored(storageKeys.assets, seed.assets),
    templates: parseStored(storageKeys.templates, seed.templates),
    settings: { ...createDefaultSettings(), ...parseStored(storageKeys.settings, seed.settings) },
    promptHistory: parseStored(storageKeys.promptHistory, seed.promptHistory),
  };

  normalizeCollections(loaded);
  if (!loaded.workspaces.length) loaded.workspaces = seed.workspaces;
  if (!loaded.series.length) loaded.series = seed.series;
  if (!loaded.episodes.length) loaded.episodes = seed.episodes;
  ensureValidSettings(loaded);
  saveAll(loaded);
  localStorage.setItem(storageKeys.version, APP_VERSION);
  return loaded;
}

function saveAll(nextState = state) {
  localStorage.setItem(storageKeys.workspaces, JSON.stringify(nextState.workspaces));
  localStorage.setItem(storageKeys.series, JSON.stringify(nextState.series));
  localStorage.setItem(storageKeys.episodes, JSON.stringify(nextState.episodes));
  localStorage.setItem(storageKeys.assets, JSON.stringify(nextState.assets));
  localStorage.setItem(storageKeys.templates, JSON.stringify(nextState.templates));
  localStorage.setItem(storageKeys.settings, JSON.stringify(nextState.settings));
  localStorage.setItem(storageKeys.promptHistory, JSON.stringify(nextState.promptHistory));
  localStorage.setItem(storageKeys.version, APP_VERSION);
}

function isActiveItem(item) {
  return item && item.deleted !== true && !item.deletedAt && item.archived !== true && !item.archivedAt;
}

function isArchivedItem(item) {
  return item && item.deleted !== true && !item.deletedAt && (item.archived === true || Boolean(item.archivedAt));
}

function isDeletedItem(item) {
  return item && (item.deleted === true || Boolean(item.deletedAt));
}

function ensureUniqueIds(collection, prefix) {
  const seen = new Set();
  return collection.map((item) => {
    const next = { ...item };
    if (!next.id || seen.has(next.id)) next.id = uid(prefix);
    seen.add(next.id);
    return next;
  });
}

function normalizeCollections(target) {
  target.workspaces = ensureUniqueIds(Array.isArray(target.workspaces) ? target.workspaces : [], "workspace");
  target.series = ensureUniqueIds(Array.isArray(target.series) ? target.series : [], "series");
  target.episodes = ensureUniqueIds(Array.isArray(target.episodes) ? target.episodes : [], "episode");
  target.assets = ensureUniqueIds(Array.isArray(target.assets) ? target.assets : [], "asset");
  target.templates = ensureUniqueIds(Array.isArray(target.templates) ? target.templates : [], "template");
  target.promptHistory = ensureUniqueIds(Array.isArray(target.promptHistory) ? target.promptHistory : [], "prompt");
  ["workspaces", "series", "episodes", "assets", "templates"].forEach((key) => {
    target[key] = target[key].map((item) => ({
      ...item,
      archived: Boolean(item.archived || item.archivedAt),
      archivedAt: item.archivedAt || "",
      deleted: Boolean(item.deleted || item.deletedAt),
      deletedAt: item.deletedAt || "",
    }));
  });
  target.settings = { ...createDefaultSettings(), ...(target.settings || {}) };
  return target;
}

function getActiveWorkspaces(target = state) {
  return (target.workspaces || []).filter(isActiveItem);
}

function getActiveSeriesItems(workspaceId = getActiveWorkspaceId(), target = state) {
  return (target.series || []).filter((item) => isActiveItem(item) && item.workspaceId === workspaceId);
}

function getActiveEpisodes(target = state) {
  return (target.episodes || []).filter(isActiveItem);
}

function getActiveAssets(workspaceId = getActiveWorkspaceId(), target = state) {
  return (target.assets || []).filter((asset) => isActiveItem(asset) && asset.workspaceId === workspaceId);
}

function getActiveTemplates(workspaceId = getActiveWorkspaceId(), target = state) {
  return (target.templates || []).filter((item) => isActiveItem(item) && item.workspaceId === workspaceId);
}

function getArchivedWorkspaces(target = state) {
  return (target.workspaces || []).filter(isArchivedItem);
}

function getArchivedSeriesItems(workspaceId = getActiveWorkspaceId(), target = state) {
  return (target.series || []).filter((item) => isArchivedItem(item) && item.workspaceId === workspaceId);
}

function getArchivedEpisodes(workspaceId = getActiveWorkspaceId(), seriesId = getActiveSeriesId(), target = state) {
  return (target.episodes || []).filter((episode) => {
    return isArchivedItem(episode) &&
      episode.workspaceId === workspaceId &&
      (!seriesId || episode.seriesId === seriesId);
  });
}

function getArchivedAssets(workspaceId = getActiveWorkspaceId(), target = state) {
  return (target.assets || []).filter((asset) => isArchivedItem(asset) && asset.workspaceId === workspaceId);
}

function getArchivedTemplates(workspaceId = getActiveWorkspaceId(), target = state) {
  return (target.templates || []).filter((item) => isArchivedItem(item) && item.workspaceId === workspaceId);
}

function ensureValidSettings(target = state) {
  const workspaces = getActiveWorkspaces(target);
  if (!workspaces.some((workspace) => workspace.id === target.settings.activeWorkspaceId)) {
    target.settings.activeWorkspaceId = workspaces[0]?.id || "";
  }
  const workspaceSeries = getActiveSeriesItems(target.settings.activeWorkspaceId, target);
  if (!workspaceSeries.some((item) => item.id === target.settings.activeSeriesId)) {
    target.settings.activeSeriesId = workspaceSeries[0]?.id || "";
  }
  const visibleEpisodes = getActiveEpisodes(target).filter((episode) => {
    return episode.workspaceId === target.settings.activeWorkspaceId &&
      (!target.settings.activeSeriesId || episode.seriesId === target.settings.activeSeriesId);
  });
  if (!visibleEpisodes.some((episode) => episode.id === target.settings.selectedEpisodeId)) {
    target.settings.selectedEpisodeId = visibleEpisodes[0]?.id || "";
  }
}

function getActiveWorkspaceId() {
  return state?.settings?.activeWorkspaceId || defaultWorkspaceId;
}

function getActiveSeriesId(workspaceId = getActiveWorkspaceId()) {
  return state?.settings?.activeSeriesId ||
    state?.series?.find((item) => isActiveItem(item) && item.workspaceId === workspaceId)?.id ||
    defaultSeriesId;
}

function getActiveWorkspace() {
  return getActiveWorkspaces().find((workspace) => workspace.id === getActiveWorkspaceId()) || getActiveWorkspaces()[0];
}

function getActiveSeries() {
  return getActiveSeriesItems().find((item) => item.id === getActiveSeriesId()) ||
    getActiveSeriesItems()[0];
}

function getVisibleEpisodes() {
  return getActiveEpisodes().filter((episode) => {
    return episode.workspaceId === getActiveWorkspaceId() &&
      (!getActiveSeriesId() || episode.seriesId === getActiveSeriesId());
  });
}

function getSelectedEpisode() {
  return getActiveEpisodes().find((episode) => episode.id === selectedEpisodeId) || getVisibleEpisodes()[0];
}

function getLegacyEpisodeFields(episode) {
  return {
    hook: episode.overview?.hook || episode.creative?.hook || "",
    script: episode.overview?.script || episode.creative?.script || "",
    voiceover: episode.overview?.voiceover || episode.creative?.voiceover || "",
    shotList: episode.overview?.shotList || episode.production?.shotList || "",
    caption: episode.overview?.caption || episode.publishing?.caption || "",
    hashtags: episode.overview?.hashtags || episode.publishing?.hashtags || "",
    productTieIn: episode.overview?.productTieIn || episode.business?.productTieIn || "",
    platform: episode.platforms?.[0] || "TikTok",
    scheduledPostDate: joinScheduledDate(episode.publishDate, episode.publishTime),
  };
}

function formatEpisodeNumber(value) {
  return `EP. ${value}`;
}

function formatDate(episodeOrValue) {
  const value = typeof episodeOrValue === "string"
    ? episodeOrValue
    : joinScheduledDate(episodeOrValue?.publishDate, episodeOrValue?.publishTime);
  if (!value) return "Unscheduled";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function setActiveModule(moduleName) {
  state.settings.activeModule = moduleName;
  state.settings.updatedAt = now();
  saveAll();
  renderAll();
}

function openInspector() {
  state.settings.inspectorOpen = true;
}

function closeInspector() {
  state.settings.inspectorOpen = false;
  state.settings.updatedAt = now();
  saveAll();
  renderAll();
}

function renderAll() {
  ensureValidSettings();
  selectedEpisodeId = state.settings.selectedEpisodeId;
  workspaceShell.classList.toggle("inspector-closed", state.settings.inspectorOpen === false);
  renderWorkspaceControls();
  renderBoard();
  syncSelection();
  renderModulePanel();
  renderNav();
  saveAll();
}

function renderNav() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.module === state.settings.activeModule);
  });
}

function renderWorkspaceControls() {
  const workspaces = getActiveWorkspaces();
  workspaceSelect.innerHTML = workspaces.map((workspace) => {
    return `<option value="${escapeHtml(workspace.id)}">${escapeHtml(workspace.name)}</option>`;
  }).join("");
  workspaceSelect.value = getActiveWorkspaceId();

  const workspaceSeries = getActiveSeriesItems(getActiveWorkspaceId());
  seriesSelect.innerHTML = workspaceSeries.map((item) => {
    return `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`;
  }).join("");
  seriesSelect.value = getActiveSeriesId();

  episodeSeriesSelect.innerHTML = workspaceSeries.map((item) => {
    return `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`;
  }).join("");
}

function renderBoard() {
  board.innerHTML = "";
  const visibleEpisodes = getVisibleEpisodes();
  const seriesIsEmpty = visibleEpisodes.length === 0;

  statuses.forEach((status) => {
    const column = document.createElement("section");
    column.className = "status-column";
    column.setAttribute("aria-label", `${status} episodes`);

    const statusEpisodes = visibleEpisodes.filter((episode) => episode.status === status);

    column.innerHTML = `
      <div class="column-header">
        <h3 class="column-title">${escapeHtml(status)}</h3>
        <span class="column-count">${statusEpisodes.length}</span>
      </div>
      <div class="episode-list"></div>
      <button class="add-episode" type="button">+ Add Episode</button>
    `;

    const list = column.querySelector(".episode-list");
    if (seriesIsEmpty && status === "Idea") {
      const firstEpisode = document.createElement("button");
      firstEpisode.className = "create-first-episode";
      firstEpisode.type = "button";
      firstEpisode.innerHTML = `
        <strong>Create First Episode</strong>
        <span>Start with an Idea episode for this active series.</span>
      `;
      firstEpisode.addEventListener("click", () => createNewEpisode("Idea"));
      list.append(firstEpisode);
    }
    statusEpisodes.forEach((episode) => {
      const card = document.createElement("button");
      card.className = `episode-card${episode.id === selectedEpisodeId ? " selected" : ""}`;
      card.type = "button";
      card.innerHTML = `
        <span class="episode-meta">${escapeHtml(formatEpisodeNumber(episode.episodeNumber))} · ${escapeHtml(episode.priority)}</span>
        <strong>${escapeHtml(episode.title)}</strong>
        <span class="episode-meta">${escapeHtml(episode.platforms?.[0] || "TikTok")} · ${escapeHtml(formatDate(episode))}</span>
      `;
      card.addEventListener("click", () => {
        selectedEpisodeId = episode.id;
        state.settings.selectedEpisodeId = episode.id;
        state.settings.activeModule = "episodes";
        openInspector();
        renderAll();
      });
      list.append(card);
    });

    column.querySelector(".add-episode").addEventListener("click", () => createNewEpisode(status));
    board.append(column);
  });
}

function syncSelection() {
  const episode = getSelectedEpisode();
  if (!episode) {
    form.reset();
    document.querySelector("#selectedEpisodeLabel").textContent = "No episode";
    document.querySelector("#selectedEpisodeTitle").textContent = "Create an episode";
    return;
  }

  selectedEpisodeId = episode.id;
  state.settings.selectedEpisodeId = episode.id;
  const legacy = getLegacyEpisodeFields(episode);

  document.querySelector("#selectedEpisodeLabel").textContent = formatEpisodeNumber(episode.episodeNumber);
  document.querySelector("#selectedEpisodeTitle").textContent = episode.title;
  document.querySelector("#mobileEpisode").textContent = formatEpisodeNumber(episode.episodeNumber);
  document.querySelector("#mobileTitle").textContent = episode.title;

  const values = {
    episodeNumber: episode.episodeNumber,
    status: episode.status,
    seriesId: episode.seriesId,
    priority: episode.priority,
    title: episode.title,
    hook: legacy.hook,
    script: legacy.script,
    voiceover: legacy.voiceover,
    shotList: legacy.shotList,
    caption: legacy.caption,
    hashtags: legacy.hashtags,
    productTieIn: legacy.productTieIn,
    platform: legacy.platform,
    contentType: episode.contentType,
    sourceType: episode.sourceType,
    publishDate: episode.publishDate,
    publishTime: episode.publishTime,
    scheduledPostDate: legacy.scheduledPostDate,
  };

  Object.entries(values).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value || "";
  });
}

function readForm() {
  const episode = getSelectedEpisode();
  if (!episode) return null;
  const scheduled = splitScheduledDate(form.elements.scheduledPostDate.value);
  const publishDate = form.elements.publishDate.value || scheduled.publishDate;
  const publishTime = form.elements.publishTime.value || scheduled.publishTime;
  const timestamp = now();

  return {
    ...episode,
    workspaceId: getActiveWorkspaceId(),
    seriesId: form.elements.seriesId.value || getActiveSeriesId(),
    episodeNumber: form.elements.episodeNumber.value,
    title: form.elements.title.value,
    status: form.elements.status.value,
    priority: form.elements.priority.value,
    contentType: form.elements.contentType.value,
    sourceType: form.elements.sourceType.value,
    platforms: [form.elements.platform.value],
    publishDate,
    publishTime,
    summary: form.elements.hook.value,
    tags: hashtagsToTags(form.elements.hashtags.value),
    overview: {
      hook: form.elements.hook.value,
      script: form.elements.script.value,
      voiceover: form.elements.voiceover.value,
      shotList: form.elements.shotList.value,
      caption: form.elements.caption.value,
      hashtags: form.elements.hashtags.value,
      productTieIn: form.elements.productTieIn.value,
    },
    creative: {
      ...episode.creative,
      hook: form.elements.hook.value,
      script: form.elements.script.value,
      voiceover: form.elements.voiceover.value,
      shotList: form.elements.shotList.value,
    },
    production: {
      ...episode.production,
      shotList: form.elements.shotList.value,
    },
    publishing: {
      ...episode.publishing,
      caption: form.elements.caption.value,
      hashtags: form.elements.hashtags.value,
      publishDate,
      publishTime,
    },
    business: {
      ...episode.business,
      productTieIn: form.elements.productTieIn.value,
    },
    updatedAt: timestamp,
    history: [
      ...(episode.history || []),
      { at: timestamp, event: "Episode updated" },
    ].slice(-20),
  };
}

function updateSelectedEpisode() {
  const nextEpisode = readForm();
  if (!nextEpisode) return;
  state.episodes = state.episodes.map((episode) => episode.id === nextEpisode.id ? nextEpisode : episode);
  if (nextEpisode.seriesId !== state.settings.activeSeriesId) {
    state.settings.activeSeriesId = nextEpisode.seriesId;
  }
  saveAll();
  renderAll();
}

function getNextEpisodeNumber() {
  const activeSeriesEpisodes = getActiveEpisodes().filter((episode) => {
    return episode.workspaceId === getActiveWorkspaceId() && episode.seriesId === getActiveSeriesId();
  });
  return String(
    Math.max(...activeSeriesEpisodes.map((episode) => Number(episode.episodeNumber) || 0), 0) + 1
  ).padStart(2, "0");
}

function ensureActiveSeriesForEpisode() {
  const workspaceId = getActiveWorkspaceId();
  let seriesId = getActiveSeriesId(workspaceId);
  if (getActiveSeriesItems(workspaceId).some((item) => item.id === seriesId)) return seriesId;

  const series = createSeries({
    workspaceId,
    name: "First Series",
    description: "Default series for new episodes.",
  });
  state.series = [...state.series, series];
  state.settings.activeSeriesId = series.id;
  seriesId = series.id;
  return seriesId;
}

function createNewEpisode(status = "Idea") {
  const visibleEpisodes = getVisibleEpisodes();
  const seriesId = ensureActiveSeriesForEpisode();
  const nextNumber = getNextEpisodeNumber();
  const baseTemplate = getActiveTemplates(getActiveWorkspaceId()).find((item) => item.category === "Episode");
  const duplicate = createEpisode({
    workspaceId: getActiveWorkspaceId(),
    seriesId,
    episodeNumber: nextNumber,
    title: `Founder Build Log ${nextNumber}`,
    status,
    priority: "Medium",
    hook: "Nobody sees this part, but this is where the brand gets built.",
    script: baseTemplate?.content || "Open on the after-hours work setup.\nName the problem in one sentence.\nShow the real action.\nTie it back to Start Young Live Rich.\nClose with one useful lesson.",
    voiceover: "The dream gets built when nobody is clapping yet.",
    shotList: "1. Laptop open after work\n2. Notes, orders, or product in frame\n3. Founder walking into the next task\n4. Close-up of the brand detail\n5. End frame with S.Y.L.R.",
    caption: "Building after hours still counts. Every focused rep compounds.",
    hashtags: "#SYLR #StartYoungLiveRich #FounderJourney #BuildInSilence",
    productTieIn: "S.Y.L.R. founder story",
    platform: visibleEpisodes[0]?.platforms?.[0] || "TikTok",
    scheduledPostDate: joinScheduledDate(new Date().toISOString().slice(0, 10), "10:00"),
  });

  state.episodes = [duplicate, ...state.episodes];
  selectedEpisodeId = duplicate.id;
  state.settings.selectedEpisodeId = duplicate.id;
  state.settings.activeWorkspaceId = duplicate.workspaceId;
  state.settings.activeSeriesId = duplicate.seriesId;
  state.settings.activeModule = "episodes";
  openInspector();
  saveAll();
  renderAll();
  showToast(status === "Idea" ? "New episode created" : "Episode template duplicated");
}

function duplicateTemplate(status = "Idea") {
  createNewEpisode(status);
}

function renderModulePanel() {
  const module = state.settings.activeModule || "dashboard";
  const workspace = getActiveWorkspace();
  const series = getActiveSeries();
  const episodes = getVisibleEpisodes();
  const moduleLabels = {
    dashboard: ["Dashboard", "Usable daily overview for the active Workspace and Series."],
    dailyMission: ["Daily Mission", "Daily checklist, streak, progress, and current focus."],
    workspaces: ["Workspaces", "Create, edit, and switch Creator OS Workspaces."],
    series: ["Series", "Create and edit Series inside the active Workspace."],
    episodes: ["Episodes", "Create, edit, prioritize, and move episodes through status columns."],
    assets: ["Media Center", "Save manual assets, links, and notes, then attach them to episodes."],
    calendar: ["Calendar", "Basic scheduled episode view for the active Series."],
    templates: ["Templates", "Reusable content templates and simulated AI output."],
    settings: ["Settings", "Reset, export, import, and basic local app settings."],
  };

  moduleTitle.textContent = moduleLabels[module]?.[0] || "Dashboard";
  moduleSubtitle.textContent = moduleLabels[module]?.[1] || "Manage creator operations.";

  const renderers = {
    dashboard: renderMissionControlPanel,
    dailyMission: renderDailyMissionPanel,
    workspaces: renderWorkspacesLifecyclePanel,
    series: renderSeriesLifecyclePanel,
    episodes: renderEpisodesLifecyclePanel,
    assets: renderAssetsLifecyclePanel,
    calendar: renderCalendarPanel,
    templates: renderTemplatesLifecyclePanel,
    settings: renderSettingsPanel,
  };

  modulePanel.innerHTML = renderers[module]?.(workspace, series, episodes) || "";
  bindModulePanelEvents(module);
}

function renderMissionControlPanel(workspace, series, episodes) {
  const assetsCount = getActiveAssets(workspace.id).length;
  const readyCount = episodes.filter((episode) => episode.status === "Ready").length;
  const postedCount = episodes.filter((episode) => episode.status === "Posted").length;
  const inMotionCount = episodes.filter((episode) => !["Idea", "Posted"].includes(episode.status)).length;
  const blocked = episodes.filter((episode) => {
    const legacy = getLegacyEpisodeFields(episode);
    return !legacy.hook || !legacy.caption || !episode.publishDate || !episode.platforms?.length;
  });
  const nextAction = episodes.find((episode) => episode.priority === "Urgent" && episode.status !== "Posted") ||
    episodes.find((episode) => episode.priority === "High" && episode.status !== "Posted") ||
    episodes.find((episode) => episode.status === "Ready") ||
    episodes.find((episode) => episode.status !== "Posted") ||
    episodes[0];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);
  const scheduled = episodes
    .filter((episode) => episode.publishDate)
    .sort((a, b) => `${a.publishDate}${a.publishTime}`.localeCompare(`${b.publishDate}${b.publishTime}`));
  const thisWeek = scheduled.filter((episode) => {
    const date = new Date(`${episode.publishDate}T${episode.publishTime || "09:00"}`);
    return date >= today && date <= weekEnd;
  });
  const statusSummary = statuses.map((status) => {
    return `${status}: ${episodes.filter((episode) => episode.status === status).length}`;
  }).join(" / ");
  const health = episodes.length
    ? `${Math.round(((readyCount + postedCount + inMotionCount) / episodes.length) * 100)}% active pipeline`
    : "No active episodes yet";

  return `
    <div class="module-grid dashboard-grid">
      <button class="module-card drill-card" type="button" data-action="gotoModule" data-module="workspaces">
        <h3>Workspace Brief</h3>
        <p><strong>${escapeHtml(workspace.name)}</strong></p>
        <p>${escapeHtml(workspace.mission || workspace.description || "No mission written yet.")}</p>
        <p>${assetsCount} saved assets / ${escapeHtml(workspace.defaultHashtags || "No default hashtags")}</p>
      </button>
      <button class="module-card drill-card" type="button" data-action="gotoModule" data-module="series">
        <h3>Series Command Center</h3>
        <p><strong>${escapeHtml(series?.name || "No series selected")}</strong></p>
        <p>${escapeHtml(statusSummary)}</p>
        <p>Health: ${escapeHtml(health)}</p>
      </button>
      <article class="module-card accent-card">
        <h3>Next Action</h3>
        ${nextAction ? `
          <p><strong>${escapeHtml(nextAction.title)}</strong></p>
          <p>${escapeHtml(nextAction.status)} / ${escapeHtml(nextAction.priority)} / ${escapeHtml(formatDate(nextAction))}</p>
          <button class="ghost-btn" type="button" data-action="openEpisode" data-id="${escapeHtml(nextAction.id)}">Open Episode</button>
        ` : `
          <p>Create the first episode for this series.</p>
          <button class="primary-btn" type="button" data-action="createEpisode">Start Episode</button>
        `}
      </article>
      <article class="module-card">
        <h3>Blockers / Needs Attention</h3>
        <ul class="module-list action-list">
          ${blocked.slice(0, 4).map((episode) => `
            <li><button type="button" data-action="openEpisode" data-id="${escapeHtml(episode.id)}">${escapeHtml(episode.title)} needs hook, caption, platform, or schedule.</button></li>
          `).join("") || "<li>No obvious blockers in this series.</li>"}
        </ul>
      </article>
      <button class="module-card drill-card" type="button" data-action="gotoModule" data-module="calendar">
        <h3>This Week</h3>
        <p>${thisWeek.length} scheduled episode${thisWeek.length === 1 ? "" : "s"} in the next 7 days.</p>
        <p>${thisWeek.slice(0, 2).map((episode) => `${episode.episodeNumber}: ${episode.title}`).join(" / ") || "No dates scheduled this week."}</p>
      </button>
      <article class="module-card">
        <h3>Upcoming</h3>
        <ul class="module-list action-list">
          ${scheduled.slice(0, 4).map((episode) => `
            <li><button type="button" data-action="openEpisode" data-id="${escapeHtml(episode.id)}">${escapeHtml(formatDate(episode))} / ${escapeHtml(episode.title)}</button></li>
          `).join("") || "<li>No upcoming scheduled episodes.</li>"}
        </ul>
      </article>
    </div>
  `;
}

function renderDashboardPanel(workspace, series, episodes) {
  const readyCount = episodes.filter((episode) => episode.status === "Ready").length;
  const postedCount = episodes.filter((episode) => episode.status === "Posted").length;
  const assetsCount = state.assets.filter((asset) => asset.workspaceId === workspace.id).length;
  return `
    <div class="module-grid">
      <article class="module-card">
        <h3>${escapeHtml(workspace.name)}</h3>
        <p>${escapeHtml(workspace.mission || workspace.description)}</p>
      </article>
      <article class="module-card">
        <h3>${episodes.length} Episodes</h3>
        <p>${readyCount} ready · ${postedCount} posted · ${assetsCount} saved assets.</p>
      </article>
      <article class="module-card">
        <h3>Current Series</h3>
        <p>${escapeHtml(series?.name || "No series selected")}</p>
      </article>
    </div>
  `;
}

function renderDailyMissionPanel() {
  const mission = state.settings.dailyMission;
  const completed = mission.checklist.filter((item) => item.done).length;
  return `
    <div class="module-grid">
      <article class="module-card">
        <h3>Current Focus</h3>
        <p>${escapeHtml(mission.currentFocus)}</p>
      </article>
      <article class="module-card">
        <h3>Progress</h3>
        <p>${completed}/${mission.checklist.length} complete · ${mission.streak} day streak.</p>
      </article>
      <article class="module-card">
        <h3>Checklist</h3>
        <ul class="module-list">
          ${mission.checklist.map((item) => `
            <li>
              <label>
                <input type="checkbox" data-action="toggleMission" data-id="${escapeHtml(item.id)}" ${item.done ? "checked" : ""} />
                ${escapeHtml(item.label)}
              </label>
            </li>
          `).join("")}
        </ul>
      </article>
    </div>
  `;
}

function renderWorkspacesPanel(workspace) {
  const workspaces = getActiveWorkspaces();
  return `
    <div class="module-grid">
      <form class="module-card module-form" data-action="saveWorkspace">
        <h3 class="full">Active Workspace</h3>
        <label class="full"><span>Name</span><input name="name" value="${escapeHtml(workspace.name)}" /></label>
        <label class="full"><span>Description</span><textarea name="description" rows="2">${escapeHtml(workspace.description)}</textarea></label>
        <label><span>Tagline</span><input name="tagline" value="${escapeHtml(workspace.tagline)}" /></label>
        <label><span>Audience</span><input name="audience" value="${escapeHtml(workspace.audience)}" /></label>
        <label class="full"><span>Mission</span><textarea name="mission" rows="2">${escapeHtml(workspace.mission)}</textarea></label>
        <label class="full"><span>Brand Voice</span><textarea name="brandVoice" rows="2">${escapeHtml(workspace.brandVoice)}</textarea></label>
        <label><span>Default CTA</span><input name="defaultCTA" value="${escapeHtml(workspace.defaultCTA)}" /></label>
        <label><span>Default Hashtags</span><input name="defaultHashtags" value="${escapeHtml(workspace.defaultHashtags)}" /></label>
        <label class="full"><span>Notes</span><textarea name="notes" rows="2">${escapeHtml(workspace.notes)}</textarea></label>
        <div class="module-actions full">
          <button class="primary-btn" type="submit">Save Workspace</button>
          <button class="danger-btn" type="button" data-action="archiveWorkspace" data-id="${escapeHtml(workspace.id)}">Archive Workspace</button>
        </div>
      </form>
      <article class="module-card">
        <h3>All Workspaces</h3>
        <ul class="module-list">
          ${workspaces.map((item) => `
            <li>
              <button type="button" data-action="switchWorkspace" data-id="${escapeHtml(item.id)}">${escapeHtml(item.name)}</button>
              <button type="button" data-action="archiveWorkspace" data-id="${escapeHtml(item.id)}">Archive</button>
            </li>
          `).join("")}
        </ul>
      </article>
    </div>
  `;
}

function renderSeriesPanel(workspace, series) {
  const workspaceSeries = getActiveSeriesItems(workspace.id);
  return `
    <div class="module-grid">
      <form class="module-card module-form" data-action="saveSeries">
        <h3 class="full">Active Series</h3>
        <label class="full"><span>Name</span><input name="name" value="${escapeHtml(series?.name || "")}" /></label>
        <label class="full"><span>Description</span><textarea name="description" rows="2">${escapeHtml(series?.description || "")}</textarea></label>
        <label><span>Status</span><input name="status" value="${escapeHtml(series?.status || "Active")}" /></label>
        <label><span>Frequency</span><input name="frequency" value="${escapeHtml(series?.frequency || "")}" /></label>
        <label><span>Primary Intent</span><input name="primaryIntent" value="${escapeHtml(series?.primaryIntent || "")}" /></label>
        <label><span>Target Audience</span><input name="targetAudience" value="${escapeHtml(series?.targetAudience || "")}" /></label>
        <label class="full"><span>Episode Structure</span><textarea name="episodeStructure" rows="2">${escapeHtml(series?.episodeStructure || "")}</textarea></label>
        <label class="full"><span>Notes</span><textarea name="notes" rows="2">${escapeHtml(series?.notes || "")}</textarea></label>
        <div class="module-actions full">
          <button class="primary-btn" type="submit">Save Series</button>
          <button class="danger-btn" type="button" data-action="archiveSeries" data-id="${escapeHtml(series?.id || "")}">Archive Series</button>
        </div>
      </form>
      <article class="module-card">
        <h3>Workspace Series</h3>
        <ul class="module-list">
          ${workspaceSeries.map((item) => `<li>${escapeHtml(item.name)} · ${escapeHtml(item.status)}</li>`).join("")}
        </ul>
      </article>
    </div>
  `;
}

function renderEpisodesPanel(workspace, series, episodes) {
  return `
    <div class="module-grid">
      <article class="module-card">
        <h3>Active Filter</h3>
        <p>${escapeHtml(workspace.name)} / ${escapeHtml(series?.name || "All Series")}</p>
      </article>
      <article class="module-card">
        <h3>Episode Count</h3>
        <p>${episodes.length} visible episodes. Use the status board and right-side editor to update details.</p>
        <button class="ghost-btn" type="button" data-action="gotoModule" data-module="episodes">Open Filtered Episodes</button>
      </article>
      <article class="module-card">
        <h3>Priority</h3>
        <p>${episodes.filter((episode) => episode.priority === "High" || episode.priority === "Urgent").length} high-priority episodes.</p>
        <button class="danger-btn" type="button" data-action="archiveEpisode" data-id="${escapeHtml(getSelectedEpisode()?.id || "")}">Archive Selected Episode</button>
      </article>
    </div>
  `;
}

function renderAssetsPanel() {
  const assets = getActiveAssets(getActiveWorkspaceId());
  return `
    <div class="module-grid">
      <form class="module-card module-form" data-action="saveAsset">
        <h3 class="full">Save Asset / Link / Note</h3>
        <label><span>Type</span><select name="type"><option>Link</option><option>Image</option><option>Note</option><option>Video</option></select></label>
        <label><span>Episode</span><select name="episodeId"><option value="">Workspace-level</option>${getVisibleEpisodes().map((episode) => `<option value="${escapeHtml(episode.id)}">${escapeHtml(episode.title)}</option>`).join("")}</select></label>
        <label class="full"><span>Title</span><input name="title" required /></label>
        <label class="full"><span>URL</span><input name="url" /></label>
        <label class="full"><span>Note</span><textarea name="note" rows="2"></textarea></label>
        <button class="primary-btn full" type="submit">Save Asset</button>
      </form>
      <article class="module-card">
        <h3>Saved Assets</h3>
        <div class="module-actions">
          ${assets.map((asset) => `<button class="danger-btn" type="button" data-action="archiveAsset" data-id="${escapeHtml(asset.id)}">Archive ${escapeHtml(asset.title)}</button>`).join("")}
        </div>
        <ul class="module-list">
          ${assets.map((asset) => `<li>${escapeHtml(asset.type)} · ${escapeHtml(asset.title)}</li>`).join("") || "<li>No saved assets yet.</li>"}
        </ul>
      </article>
    </div>
  `;
}

function renderCalendarPanel() {
  const scheduled = getVisibleEpisodes()
    .filter((episode) => episode.publishDate)
    .sort((a, b) => `${a.publishDate}${a.publishTime}`.localeCompare(`${b.publishDate}${b.publishTime}`));
  return `
    <article class="module-card">
      <h3>Scheduled Episodes</h3>
      <table class="mini-table">
        <thead><tr><th>Date</th><th>Episode</th><th>Status</th><th>Platform</th></tr></thead>
        <tbody>
          ${scheduled.map((episode) => `
            <tr>
              <td>${escapeHtml(episode.publishDate)} ${escapeHtml(episode.publishTime)}</td>
              <td>${escapeHtml(episode.title)}</td>
              <td>${escapeHtml(episode.status)}</td>
              <td>${escapeHtml(episode.platforms?.[0] || "")}</td>
            </tr>
          `).join("") || '<tr><td colspan="4">No scheduled episodes yet.</td></tr>'}
        </tbody>
      </table>
    </article>
  `;
}

function renderTemplatesPanel() {
  const templates = getActiveTemplates(getActiveWorkspaceId());
  const history = state.promptHistory.filter((item) => item.workspaceId === getActiveWorkspaceId()).slice(-5).reverse();
  return `
    <div class="module-grid">
      <form class="module-card module-form" data-action="saveTemplate">
        <h3 class="full">Reusable Template</h3>
        <label><span>Name</span><input name="name" required /></label>
        <label><span>Category</span><input name="category" value="Episode" /></label>
        <label class="full"><span>Content</span><textarea name="content" rows="3" required></textarea></label>
        <button class="primary-btn full" type="submit">Save Template</button>
      </form>
      <form class="module-card module-form" data-action="simulateAi">
        <h3 class="full">Simulated AI</h3>
        <label><span>Prompt Type</span><select name="promptType"><option>Hook generation</option><option>Script generation</option><option>Caption generation</option><option>CTA suggestions</option><option>Hashtag suggestions</option><option>Thumbnail ideas</option><option>B-roll suggestions</option></select></label>
        <label><span>Episode</span><select name="episodeId"><option value="">Workspace-level</option>${getVisibleEpisodes().map((episode) => `<option value="${escapeHtml(episode.id)}">${escapeHtml(episode.title)}</option>`).join("")}</select></label>
        <label class="full"><span>Input</span><textarea name="input" rows="2" required></textarea></label>
        <button class="primary-btn full" type="submit">Generate Template Output</button>
        <div class="ai-output full" id="aiOutput">No simulated output yet.</div>
      </form>
      <article class="module-card">
        <h3>Templates</h3>
        <div class="module-actions">
          ${templates.map((item) => `<button class="danger-btn" type="button" data-action="archiveTemplate" data-id="${escapeHtml(item.id)}">Archive ${escapeHtml(item.name)}</button>`).join("")}
        </div>
        <ul class="module-list">${templates.map((item) => `<li>${escapeHtml(item.name)} · ${escapeHtml(item.category)}</li>`).join("") || "<li>No templates yet.</li>"}</ul>
        <h3>Prompt History</h3>
        <ul class="module-list">${history.map((item) => `<li>${escapeHtml(item.promptType)} · ${escapeHtml(item.createdAt.slice(0, 10))}</li>`).join("") || "<li>No prompt history yet.</li>"}</ul>
      </article>
    </div>
  `;
}

function renderWorkspacesLifecyclePanel(workspace) {
  const activeWorkspaces = getActiveWorkspaces();
  const archivedWorkspaces = getArchivedWorkspaces();
  return `
    <div class="module-grid">
      <form class="module-card module-form" data-action="saveWorkspace">
        <h3 class="full">Edit Workspace</h3>
        <label class="full"><span>Name</span><input name="name" value="${escapeHtml(workspace.name)}" /></label>
        <label class="full"><span>Description</span><textarea name="description" rows="2">${escapeHtml(workspace.description)}</textarea></label>
        <label><span>Tagline</span><input name="tagline" value="${escapeHtml(workspace.tagline)}" /></label>
        <label><span>Audience</span><input name="audience" value="${escapeHtml(workspace.audience)}" /></label>
        <label class="full"><span>Mission</span><textarea name="mission" rows="2">${escapeHtml(workspace.mission)}</textarea></label>
        <label class="full"><span>Brand Voice</span><textarea name="brandVoice" rows="2">${escapeHtml(workspace.brandVoice)}</textarea></label>
        <label><span>Default CTA</span><input name="defaultCTA" value="${escapeHtml(workspace.defaultCTA)}" /></label>
        <label><span>Default Hashtags</span><input name="defaultHashtags" value="${escapeHtml(workspace.defaultHashtags)}" /></label>
        <label class="full"><span>Notes</span><textarea name="notes" rows="2">${escapeHtml(workspace.notes)}</textarea></label>
        <div class="module-actions full">
          <button class="primary-btn" type="submit">Save Workspace</button>
          <button class="ghost-btn" type="button" data-action="duplicateWorkspace" data-id="${escapeHtml(workspace.id)}">Duplicate</button>
          <button class="danger-btn" type="button" data-action="archiveWorkspace" data-id="${escapeHtml(workspace.id)}">Archive</button>
          <button class="danger-btn" type="button" data-action="deleteWorkspace" data-id="${escapeHtml(workspace.id)}">Delete</button>
        </div>
      </form>
      <article class="module-card">
        <h3>Active Workspaces</h3>
        <ul class="module-list lifecycle-list">
          ${activeWorkspaces.map((item) => `
            <li>
              <strong>${escapeHtml(item.name)}</strong>
              <div class="module-actions">
                <button type="button" data-action="switchWorkspace" data-id="${escapeHtml(item.id)}">Edit</button>
                <button type="button" data-action="duplicateWorkspace" data-id="${escapeHtml(item.id)}">Duplicate</button>
                <button type="button" data-action="archiveWorkspace" data-id="${escapeHtml(item.id)}">Archive</button>
                <button type="button" data-action="deleteWorkspace" data-id="${escapeHtml(item.id)}">Delete</button>
              </div>
            </li>
          `).join("")}
        </ul>
      </article>
      <article class="module-card">
        <h3>Archived Workspaces</h3>
        <ul class="module-list lifecycle-list">
          ${archivedWorkspaces.map((item) => `
            <li>
              <strong>${escapeHtml(item.name)}</strong>
              <div class="module-actions">
                <button type="button" data-action="restoreWorkspace" data-id="${escapeHtml(item.id)}">Restore</button>
                <button type="button" data-action="duplicateWorkspace" data-id="${escapeHtml(item.id)}">Duplicate</button>
                <button type="button" data-action="deleteWorkspace" data-id="${escapeHtml(item.id)}">Delete</button>
              </div>
            </li>
          `).join("") || "<li>No archived workspaces.</li>"}
        </ul>
      </article>
    </div>
  `;
}

function renderSeriesLifecyclePanel(workspace, series) {
  const activeSeries = getActiveSeriesItems(workspace.id);
  const archivedSeries = getArchivedSeriesItems(workspace.id);
  return `
    <div class="module-grid">
      <form class="module-card module-form" data-action="saveSeries">
        <h3 class="full">Edit Series</h3>
        <label class="full"><span>Name</span><input name="name" value="${escapeHtml(series?.name || "")}" /></label>
        <label class="full"><span>Description</span><textarea name="description" rows="2">${escapeHtml(series?.description || "")}</textarea></label>
        <label><span>Status</span><input name="status" value="${escapeHtml(series?.status || "Active")}" /></label>
        <label><span>Frequency</span><input name="frequency" value="${escapeHtml(series?.frequency || "")}" /></label>
        <label><span>Primary Intent</span><input name="primaryIntent" value="${escapeHtml(series?.primaryIntent || "")}" /></label>
        <label><span>Target Audience</span><input name="targetAudience" value="${escapeHtml(series?.targetAudience || "")}" /></label>
        <label class="full"><span>Episode Structure</span><textarea name="episodeStructure" rows="2">${escapeHtml(series?.episodeStructure || "")}</textarea></label>
        <label class="full"><span>Notes</span><textarea name="notes" rows="2">${escapeHtml(series?.notes || "")}</textarea></label>
        <div class="module-actions full">
          <button class="primary-btn" type="submit">Save Series</button>
          <button class="ghost-btn" type="button" data-action="duplicateSeries" data-id="${escapeHtml(series?.id || "")}">Duplicate</button>
          <button class="danger-btn" type="button" data-action="archiveSeries" data-id="${escapeHtml(series?.id || "")}">Archive</button>
          <button class="danger-btn" type="button" data-action="deleteSeries" data-id="${escapeHtml(series?.id || "")}">Delete</button>
        </div>
      </form>
      <article class="module-card">
        <h3>Active Series</h3>
        <ul class="module-list lifecycle-list">
          ${activeSeries.map((item) => `
            <li>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(item.status)}</span>
              <div class="module-actions">
                <button type="button" data-action="switchSeries" data-id="${escapeHtml(item.id)}">Edit</button>
                <button type="button" data-action="duplicateSeries" data-id="${escapeHtml(item.id)}">Duplicate</button>
                <button type="button" data-action="archiveSeries" data-id="${escapeHtml(item.id)}">Archive</button>
                <button type="button" data-action="deleteSeries" data-id="${escapeHtml(item.id)}">Delete</button>
              </div>
            </li>
          `).join("") || "<li>No active series.</li>"}
        </ul>
      </article>
      <article class="module-card">
        <h3>Archived Series</h3>
        <ul class="module-list lifecycle-list">
          ${archivedSeries.map((item) => `
            <li>
              <strong>${escapeHtml(item.name)}</strong>
              <div class="module-actions">
                <button type="button" data-action="restoreSeries" data-id="${escapeHtml(item.id)}">Restore</button>
                <button type="button" data-action="duplicateSeries" data-id="${escapeHtml(item.id)}">Duplicate</button>
                <button type="button" data-action="deleteSeries" data-id="${escapeHtml(item.id)}">Delete</button>
              </div>
            </li>
          `).join("") || "<li>No archived series.</li>"}
        </ul>
      </article>
    </div>
  `;
}

function renderEpisodesLifecyclePanel(workspace, series, episodes) {
  const archivedEpisodes = getArchivedEpisodes(workspace.id, series?.id || "");
  const selected = getSelectedEpisode();
  return `
    <div class="module-grid">
      <article class="module-card">
        <h3>Active Episodes</h3>
        <p>${escapeHtml(workspace.name)} / ${escapeHtml(series?.name || "All Series")} / ${episodes.length} active episodes.</p>
        <div class="module-actions">
          <button class="primary-btn" type="button" data-action="createEpisode">New Episode</button>
          <button class="ghost-btn" type="button" data-action="openEpisode" data-id="${escapeHtml(selected?.id || "")}">Edit Selected</button>
          <button class="ghost-btn" type="button" data-action="duplicateEpisode" data-id="${escapeHtml(selected?.id || "")}">Duplicate Selected</button>
          <button class="danger-btn" type="button" data-action="archiveEpisode" data-id="${escapeHtml(selected?.id || "")}">Archive Selected</button>
          <button class="danger-btn" type="button" data-action="deleteEpisode" data-id="${escapeHtml(selected?.id || "")}">Delete Selected</button>
        </div>
      </article>
      <article class="module-card">
        <h3>Series Health</h3>
        <p>${episodes.filter((episode) => episode.priority === "High" || episode.priority === "Urgent").length} high-priority / ${episodes.filter((episode) => episode.status === "Ready").length} ready / ${episodes.filter((episode) => episode.status === "Posted").length} posted.</p>
      </article>
      <article class="module-card">
        <h3>Archived Episodes</h3>
        <ul class="module-list lifecycle-list">
          ${archivedEpisodes.map((episode) => `
            <li>
              <strong>${escapeHtml(formatEpisodeNumber(episode.episodeNumber))} / ${escapeHtml(episode.title)}</strong>
              <span>${escapeHtml(episode.status)} / archived ${escapeHtml((episode.archivedAt || "").slice(0, 10))}</span>
              <div class="module-actions">
                <button type="button" data-action="restoreEpisode" data-id="${escapeHtml(episode.id)}">Restore</button>
                <button type="button" data-action="duplicateEpisode" data-id="${escapeHtml(episode.id)}">Duplicate</button>
                <button type="button" data-action="deleteEpisodePermanent" data-id="${escapeHtml(episode.id)}">Delete Permanently</button>
              </div>
            </li>
          `).join("") || "<li>No archived episodes for this filter.</li>"}
        </ul>
      </article>
    </div>
  `;
}

function renderAssetsLifecyclePanel() {
  const assets = getActiveAssets(getActiveWorkspaceId());
  const archivedAssets = getArchivedAssets(getActiveWorkspaceId());
  return `
    <div class="module-grid">
      <form class="module-card module-form" data-action="saveAsset">
        <h3 class="full">Save Asset / Link / Note</h3>
        <label><span>Type</span><select name="type"><option>Link</option><option>Image</option><option>Note</option><option>Video</option></select></label>
        <label><span>Episode</span><select name="episodeId"><option value="">Workspace-level</option>${getVisibleEpisodes().map((episode) => `<option value="${escapeHtml(episode.id)}">${escapeHtml(episode.title)}</option>`).join("")}</select></label>
        <label class="full"><span>Title</span><input name="title" required /></label>
        <label class="full"><span>URL</span><input name="url" /></label>
        <label class="full"><span>Note</span><textarea name="note" rows="2"></textarea></label>
        <button class="primary-btn full" type="submit">Save Asset</button>
      </form>
      <article class="module-card">
        <h3>Active Assets</h3>
        <ul class="module-list lifecycle-list">
          ${assets.map((asset) => `
            <li>
              <strong>${escapeHtml(asset.type)} / ${escapeHtml(asset.title)}</strong>
              <div class="module-actions">
                <button type="button" data-action="editAsset" data-id="${escapeHtml(asset.id)}">Edit</button>
                <button type="button" data-action="duplicateAsset" data-id="${escapeHtml(asset.id)}">Duplicate</button>
                <button type="button" data-action="archiveAsset" data-id="${escapeHtml(asset.id)}">Archive</button>
                <button type="button" data-action="deleteAsset" data-id="${escapeHtml(asset.id)}">Delete</button>
              </div>
            </li>
          `).join("") || "<li>No active assets.</li>"}
        </ul>
      </article>
      <article class="module-card">
        <h3>Archived Assets</h3>
        <ul class="module-list lifecycle-list">
          ${archivedAssets.map((asset) => `
            <li>
              <strong>${escapeHtml(asset.type)} / ${escapeHtml(asset.title)}</strong>
              <div class="module-actions">
                <button type="button" data-action="restoreAsset" data-id="${escapeHtml(asset.id)}">Restore</button>
                <button type="button" data-action="duplicateAsset" data-id="${escapeHtml(asset.id)}">Duplicate</button>
                <button type="button" data-action="deleteAsset" data-id="${escapeHtml(asset.id)}">Delete</button>
              </div>
            </li>
          `).join("") || "<li>No archived assets.</li>"}
        </ul>
      </article>
    </div>
  `;
}

function renderTemplatesLifecyclePanel() {
  const templates = getActiveTemplates(getActiveWorkspaceId());
  const archivedTemplates = getArchivedTemplates(getActiveWorkspaceId());
  const history = state.promptHistory.filter((item) => item.workspaceId === getActiveWorkspaceId()).slice(-5).reverse();
  return `
    <div class="module-grid">
      <form class="module-card module-form" data-action="saveTemplate">
        <h3 class="full">Reusable Template</h3>
        <label><span>Name</span><input name="name" required /></label>
        <label><span>Category</span><input name="category" value="Episode" /></label>
        <label class="full"><span>Content</span><textarea name="content" rows="3" required></textarea></label>
        <button class="primary-btn full" type="submit">Save Template</button>
      </form>
      <form class="module-card module-form" data-action="simulateAi">
        <h3 class="full">Simulated AI</h3>
        <label><span>Prompt Type</span><select name="promptType"><option>Hook generation</option><option>Script generation</option><option>Caption generation</option><option>CTA suggestions</option><option>Hashtag suggestions</option><option>Thumbnail ideas</option><option>B-roll suggestions</option></select></label>
        <label><span>Episode</span><select name="episodeId"><option value="">Workspace-level</option>${getVisibleEpisodes().map((episode) => `<option value="${escapeHtml(episode.id)}">${escapeHtml(episode.title)}</option>`).join("")}</select></label>
        <label class="full"><span>Input</span><textarea name="input" rows="2" required></textarea></label>
        <button class="primary-btn full" type="submit">Generate Template Output</button>
        <div class="ai-output full" id="aiOutput">No simulated output yet.</div>
      </form>
      <article class="module-card">
        <h3>Active Templates</h3>
        <ul class="module-list lifecycle-list">
          ${templates.map((item) => `
            <li>
              <strong>${escapeHtml(item.name)} / ${escapeHtml(item.category)}</strong>
              <div class="module-actions">
                <button type="button" data-action="editTemplate" data-id="${escapeHtml(item.id)}">Edit</button>
                <button type="button" data-action="duplicateTemplateItem" data-id="${escapeHtml(item.id)}">Duplicate</button>
                <button type="button" data-action="archiveTemplate" data-id="${escapeHtml(item.id)}">Archive</button>
                <button type="button" data-action="deleteTemplate" data-id="${escapeHtml(item.id)}">Delete</button>
              </div>
            </li>
          `).join("") || "<li>No active templates.</li>"}
        </ul>
        <h3>Archived Templates</h3>
        <ul class="module-list lifecycle-list">
          ${archivedTemplates.map((item) => `
            <li>
              <strong>${escapeHtml(item.name)} / ${escapeHtml(item.category)}</strong>
              <div class="module-actions">
                <button type="button" data-action="restoreTemplate" data-id="${escapeHtml(item.id)}">Restore</button>
                <button type="button" data-action="duplicateTemplateItem" data-id="${escapeHtml(item.id)}">Duplicate</button>
                <button type="button" data-action="deleteTemplate" data-id="${escapeHtml(item.id)}">Delete</button>
              </div>
            </li>
          `).join("") || "<li>No archived templates.</li>"}
        </ul>
        <h3>Prompt History</h3>
        <ul class="module-list">${history.map((item) => `<li>${escapeHtml(item.promptType)} / ${escapeHtml(item.createdAt.slice(0, 10))}</li>`).join("") || "<li>No prompt history yet.</li>"}</ul>
      </article>
    </div>
  `;
}

function renderSettingsPanel() {
  const activeWorkspaces = getActiveWorkspaces().length;
  const activeEpisodes = getActiveEpisodes().length;
  return `
    <div class="module-grid">
      <article class="module-card">
        <h3>Local Data</h3>
        <p>Version ${escapeHtml(APP_VERSION)} / ${activeWorkspaces} active workspaces / ${activeEpisodes} active episodes.</p>
        <div class="module-actions">
          <button class="ghost-btn" type="button" data-action="exportData">Export JSON</button>
          <button class="ghost-btn" type="button" data-action="importData">Import JSON</button>
          <button class="ghost-btn" type="button" data-action="resetData">Reset Local Data</button>
        </div>
      </article>
      <article class="module-card">
        <h3>Storage Keys</h3>
        <ul class="module-list">
          ${Object.values(storageKeys).map((key) => `<li>${escapeHtml(key)}</li>`).join("")}
        </ul>
      </article>
    </div>
  `;
}

function openEpisodeById(id) {
  const episode = getActiveEpisodes().find((item) => item.id === id);
  if (!episode) return;
  selectedEpisodeId = episode.id;
  state.settings.selectedEpisodeId = episode.id;
  state.settings.activeWorkspaceId = episode.workspaceId;
  state.settings.activeSeriesId = episode.seriesId;
  state.settings.activeModule = "episodes";
  openInspector();
  saveAll();
  renderAll();
}

function archiveWorkspace(id) {
  const activeWorkspaces = getActiveWorkspaces();
  const workspace = activeWorkspaces.find((item) => item.id === id);
  if (!workspace) return;
  if (activeWorkspaces.length <= 1) {
    showToast("Creator OS needs at least one active workspace");
    return;
  }
  if (!confirm(`Archive "${workspace.name}"? Related series, episodes, assets, and templates will be hidden from normal views.`)) return;
  const timestamp = now();
  state.workspaces = state.workspaces.map((item) => item.id === id ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp } : item);
  state.series = state.series.map((item) => item.workspaceId === id ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp } : item);
  state.episodes = state.episodes.map((item) => item.workspaceId === id ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp } : item);
  state.assets = state.assets.map((item) => item.workspaceId === id ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp } : item);
  state.templates = state.templates.map((item) => item.workspaceId === id ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp } : item);
  if (state.settings.activeWorkspaceId === id) {
    state.settings.activeWorkspaceId = getActiveWorkspaces().find((item) => item.id !== id)?.id || "";
    state.settings.activeSeriesId = "";
    state.settings.selectedEpisodeId = "";
  }
  state.settings.updatedAt = timestamp;
  ensureValidSettings();
  saveAll();
  renderAll();
  showToast("Workspace archived");
}

function archiveSeries(id) {
  const series = getActiveSeriesItems(getActiveWorkspaceId()).find((item) => item.id === id);
  if (!series) return;
  if (!confirm(`Archive "${series.name}"? Episodes in this series will also be hidden from normal views.`)) return;
  const timestamp = now();
  state.series = state.series.map((item) => item.id === id ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp } : item);
  state.episodes = state.episodes.map((item) => item.seriesId === id ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp } : item);
  if (state.settings.activeSeriesId === id) {
    state.settings.activeSeriesId = "";
    state.settings.selectedEpisodeId = "";
  }
  state.settings.updatedAt = timestamp;
  ensureValidSettings();
  saveAll();
  renderAll();
  showToast("Series archived");
}

function archiveEpisode(id) {
  const episode = getActiveEpisodes().find((item) => item.id === id);
  if (!episode) return;
  if (!confirm(`Archive "${episode.title}"? It will be hidden from normal episode views.`)) return;
  const timestamp = now();
  state.episodes = state.episodes.map((item) => item.id === id ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp } : item);
  if (state.settings.selectedEpisodeId === id) state.settings.selectedEpisodeId = "";
  state.settings.updatedAt = timestamp;
  ensureValidSettings();
  saveAll();
  renderAll();
  showToast("Episode archived");
}

function archiveAsset(id) {
  const asset = getActiveAssets(getActiveWorkspaceId()).find((item) => item.id === id);
  if (!asset) return;
  if (!confirm(`Archive "${asset.title}"?`)) return;
  const timestamp = now();
  state.assets = state.assets.map((item) => item.id === id ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp } : item);
  state.settings.updatedAt = timestamp;
  saveAll();
  renderAll();
  showToast("Asset archived");
}

function archiveTemplate(id) {
  const template = getActiveTemplates(getActiveWorkspaceId()).find((item) => item.id === id);
  if (!template) return;
  if (!confirm(`Archive "${template.name}"?`)) return;
  const timestamp = now();
  state.templates = state.templates.map((item) => item.id === id ? { ...item, archived: true, archivedAt: timestamp, updatedAt: timestamp } : item);
  state.settings.updatedAt = timestamp;
  saveAll();
  renderAll();
  showToast("Template archived");
}

function markDeleted(collectionName, predicate, timestamp = now()) {
  state[collectionName] = state[collectionName].map((item) => {
    if (!predicate(item)) return item;
    return { ...item, deleted: true, deletedAt: timestamp, updatedAt: timestamp };
  });
}

function markRestored(collectionName, predicate, timestamp = now()) {
  state[collectionName] = state[collectionName].map((item) => {
    if (!predicate(item)) return item;
    return { ...item, archived: false, archivedAt: "", updatedAt: timestamp };
  });
}

function duplicateWorkspace(id) {
  const source = state.workspaces.find((item) => item.id === id && !isDeletedItem(item));
  if (!source) return;
  const workspace = createWorkspace({
    ...source,
    id: "",
    name: `${source.name} Copy`,
    archived: false,
    archivedAt: "",
    deleted: false,
    deletedAt: "",
  });
  const series = createSeries({
    workspaceId: workspace.id,
    name: "First Series",
    description: "Default series for duplicated workspace.",
  });
  state.workspaces = [...state.workspaces, workspace];
  state.series = [...state.series, series];
  state.settings.activeWorkspaceId = workspace.id;
  state.settings.activeSeriesId = series.id;
  state.settings.activeModule = "workspaces";
  saveAll();
  renderAll();
  showToast("Workspace duplicated");
}

function restoreWorkspace(id) {
  const timestamp = now();
  markRestored("workspaces", (item) => item.id === id, timestamp);
  markRestored("series", (item) => item.workspaceId === id, timestamp);
  markRestored("episodes", (item) => item.workspaceId === id, timestamp);
  markRestored("assets", (item) => item.workspaceId === id, timestamp);
  markRestored("templates", (item) => item.workspaceId === id, timestamp);
  state.settings.activeWorkspaceId = id;
  ensureValidSettings();
  saveAll();
  renderAll();
  showToast("Workspace restored");
}

function deleteWorkspace(id) {
  const workspace = state.workspaces.find((item) => item.id === id && !isDeletedItem(item));
  if (!workspace) return;
  if (getActiveWorkspaces().length <= 1 && isActiveItem(workspace)) {
    showToast("Creator OS needs at least one active workspace");
    return;
  }
  if (state.workspaces.filter((item) => !isDeletedItem(item)).length <= 1) {
    showToast("Creator OS needs at least one workspace");
    return;
  }
  if (!confirm(`Delete "${workspace.name}"? Related series, episodes, assets, and templates may be affected. This hides them from normal views.`)) return;
  const timestamp = now();
  markDeleted("workspaces", (item) => item.id === id, timestamp);
  markDeleted("series", (item) => item.workspaceId === id, timestamp);
  markDeleted("episodes", (item) => item.workspaceId === id, timestamp);
  markDeleted("assets", (item) => item.workspaceId === id, timestamp);
  markDeleted("templates", (item) => item.workspaceId === id, timestamp);
  if (state.settings.activeWorkspaceId === id) {
    state.settings.activeWorkspaceId = getActiveWorkspaces()[0]?.id || "";
    state.settings.activeSeriesId = "";
    state.settings.selectedEpisodeId = "";
  }
  ensureValidSettings();
  saveAll();
  renderAll();
  showToast("Workspace deleted");
}

function duplicateSeries(id) {
  const source = state.series.find((item) => item.id === id && !isDeletedItem(item));
  if (!source) return;
  const series = createSeries({
    ...source,
    id: "",
    name: `${source.name} Copy`,
    archived: false,
    archivedAt: "",
    deleted: false,
    deletedAt: "",
  });
  state.series = [...state.series, series];
  state.settings.activeWorkspaceId = series.workspaceId;
  state.settings.activeSeriesId = series.id;
  state.settings.activeModule = "series";
  saveAll();
  renderAll();
  showToast("Series duplicated");
}

function restoreSeries(id) {
  const series = state.series.find((item) => item.id === id && !isDeletedItem(item));
  if (!series) return;
  const timestamp = now();
  markRestored("series", (item) => item.id === id, timestamp);
  markRestored("episodes", (item) => item.seriesId === id, timestamp);
  state.settings.activeWorkspaceId = series.workspaceId;
  state.settings.activeSeriesId = series.id;
  ensureValidSettings();
  saveAll();
  renderAll();
  showToast("Series restored");
}

function deleteSeries(id) {
  const series = state.series.find((item) => item.id === id && !isDeletedItem(item));
  if (!series) return;
  if (!confirm(`Delete "${series.name}"? Episodes in this series will be hidden from normal views.`)) return;
  const timestamp = now();
  markDeleted("series", (item) => item.id === id, timestamp);
  markDeleted("episodes", (item) => item.seriesId === id, timestamp);
  if (state.settings.activeSeriesId === id) {
    state.settings.activeSeriesId = "";
    state.settings.selectedEpisodeId = "";
  }
  ensureValidSettings();
  saveAll();
  renderAll();
  showToast("Series deleted");
}

function duplicateEpisode(id) {
  const source = state.episodes.find((item) => item.id === id && !isDeletedItem(item));
  if (!source) return;
  const episode = createEpisode({
    ...source,
    id: "",
    episodeNumber: getNextEpisodeNumber(),
    title: `${source.title} Copy`,
    archived: false,
    archivedAt: "",
    deleted: false,
    deletedAt: "",
  });
  state.episodes = [episode, ...state.episodes];
  selectedEpisodeId = episode.id;
  state.settings.selectedEpisodeId = episode.id;
  state.settings.activeWorkspaceId = episode.workspaceId;
  state.settings.activeSeriesId = episode.seriesId;
  state.settings.activeModule = "episodes";
  openInspector();
  saveAll();
  renderAll();
  showToast("Episode duplicated");
}

function restoreEpisode(id) {
  const episode = state.episodes.find((item) => item.id === id && !isDeletedItem(item));
  if (!episode) return;
  const timestamp = now();
  markRestored("episodes", (item) => item.id === id, timestamp);
  state.settings.activeWorkspaceId = episode.workspaceId;
  state.settings.activeSeriesId = episode.seriesId;
  state.settings.selectedEpisodeId = episode.id;
  openInspector();
  saveAll();
  renderAll();
  showToast("Episode restored");
}

function deleteEpisode(id) {
  const episode = state.episodes.find((item) => item.id === id && !isDeletedItem(item));
  if (!episode) return;
  if (!confirm(`Delete "${episode.title}"? This hides it from normal views.`)) return;
  const timestamp = now();
  markDeleted("episodes", (item) => item.id === id, timestamp);
  if (state.settings.selectedEpisodeId === id) state.settings.selectedEpisodeId = "";
  ensureValidSettings();
  saveAll();
  renderAll();
  showToast("Episode deleted");
}

function deleteEpisodePermanent(id) {
  const episode = state.episodes.find((item) => item.id === id);
  if (!episode) return;
  if (!confirm(`Permanently delete "${episode.title}"? This cannot be recovered from the app.`)) return;
  state.episodes = state.episodes.filter((item) => item.id !== id);
  if (state.settings.selectedEpisodeId === id) state.settings.selectedEpisodeId = "";
  ensureValidSettings();
  saveAll();
  renderAll();
  showToast("Episode permanently deleted");
}

function editAsset(id) {
  const asset = state.assets.find((item) => item.id === id && !isDeletedItem(item));
  if (!asset) return;
  const title = prompt("Asset title", asset.title);
  if (title === null) return;
  const url = prompt("Asset URL", asset.url || "");
  if (url === null) return;
  const note = prompt("Asset note", asset.note || "");
  if (note === null) return;
  const timestamp = now();
  state.assets = state.assets.map((item) => item.id === id ? { ...item, title, url, note, updatedAt: timestamp } : item);
  saveAll();
  renderAll();
  showToast("Asset edited");
}

function duplicateAsset(id) {
  const source = state.assets.find((item) => item.id === id && !isDeletedItem(item));
  if (!source) return;
  state.assets = [createAsset({ ...source, id: "", title: `${source.title} Copy`, archived: false, archivedAt: "", deleted: false, deletedAt: "" }), ...state.assets];
  saveAll();
  renderAll();
  showToast("Asset duplicated");
}

function restoreAsset(id) {
  markRestored("assets", (item) => item.id === id);
  saveAll();
  renderAll();
  showToast("Asset restored");
}

function deleteAsset(id) {
  const asset = state.assets.find((item) => item.id === id && !isDeletedItem(item));
  if (!asset) return;
  if (!confirm(`Delete "${asset.title}"?`)) return;
  markDeleted("assets", (item) => item.id === id);
  saveAll();
  renderAll();
  showToast("Asset deleted");
}

function editTemplate(id) {
  const template = state.templates.find((item) => item.id === id && !isDeletedItem(item));
  if (!template) return;
  const name = prompt("Template name", template.name);
  if (name === null) return;
  const content = prompt("Template content", template.content || "");
  if (content === null) return;
  const timestamp = now();
  state.templates = state.templates.map((item) => item.id === id ? { ...item, name, content, updatedAt: timestamp } : item);
  saveAll();
  renderAll();
  showToast("Template edited");
}

function duplicateTemplateItem(id) {
  const source = state.templates.find((item) => item.id === id && !isDeletedItem(item));
  if (!source) return;
  state.templates = [createTemplate({ ...source, id: "", name: `${source.name} Copy`, archived: false, archivedAt: "", deleted: false, deletedAt: "" }), ...state.templates];
  saveAll();
  renderAll();
  showToast("Template duplicated");
}

function restoreTemplate(id) {
  markRestored("templates", (item) => item.id === id);
  saveAll();
  renderAll();
  showToast("Template restored");
}

function deleteTemplate(id) {
  const template = state.templates.find((item) => item.id === id && !isDeletedItem(item));
  if (!template) return;
  if (!confirm(`Delete "${template.name}"?`)) return;
  markDeleted("templates", (item) => item.id === id);
  saveAll();
  renderAll();
  showToast("Template deleted");
}

function bindModulePanelEvents(module) {
  modulePanel.querySelectorAll("[data-action='toggleMission']").forEach((input) => {
    input.addEventListener("change", () => {
      const item = state.settings.dailyMission.checklist.find((entry) => entry.id === input.dataset.id);
      if (item) item.done = input.checked;
      state.settings.updatedAt = now();
      saveAll();
      renderModulePanel();
    });
  });

  const workspaceForm = modulePanel.querySelector("[data-action='saveWorkspace']");
  if (workspaceForm) {
    workspaceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const workspace = getActiveWorkspace();
      Object.assign(workspace, {
        name: workspaceForm.elements.name.value,
        description: workspaceForm.elements.description.value,
        tagline: workspaceForm.elements.tagline.value,
        mission: workspaceForm.elements.mission.value,
        audience: workspaceForm.elements.audience.value,
        brandVoice: workspaceForm.elements.brandVoice.value,
        defaultCTA: workspaceForm.elements.defaultCTA.value,
        defaultHashtags: workspaceForm.elements.defaultHashtags.value,
        notes: workspaceForm.elements.notes.value,
        updatedAt: now(),
      });
      saveAll();
      renderAll();
      showToast("Workspace saved");
    });
  }

  const seriesForm = modulePanel.querySelector("[data-action='saveSeries']");
  if (seriesForm) {
    seriesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const series = getActiveSeries();
      if (!series) {
        showToast("Create a series before saving");
        return;
      }
      Object.assign(series, {
        name: seriesForm.elements.name.value,
        description: seriesForm.elements.description.value,
        status: seriesForm.elements.status.value,
        frequency: seriesForm.elements.frequency.value,
        primaryIntent: seriesForm.elements.primaryIntent.value,
        targetAudience: seriesForm.elements.targetAudience.value,
        episodeStructure: seriesForm.elements.episodeStructure.value,
        notes: seriesForm.elements.notes.value,
        updatedAt: now(),
      });
      saveAll();
      renderAll();
      showToast("Series saved");
    });
  }

  const assetForm = modulePanel.querySelector("[data-action='saveAsset']");
  if (assetForm) {
    assetForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const asset = createAsset({
        type: assetForm.elements.type.value,
        episodeId: assetForm.elements.episodeId.value,
        title: assetForm.elements.title.value,
        url: assetForm.elements.url.value,
        note: assetForm.elements.note.value,
      });
      state.assets = [asset, ...state.assets];
      if (asset.episodeId) {
        state.episodes = state.episodes.map((episode) => {
          if (episode.id !== asset.episodeId) return episode;
          return { ...episode, attachments: [...(episode.attachments || []), asset.id], updatedAt: now() };
        });
      }
      saveAll();
      renderAll();
      showToast("Asset saved");
    });
  }

  const templateForm = modulePanel.querySelector("[data-action='saveTemplate']");
  if (templateForm) {
    templateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      state.templates = [
        createTemplate({
          name: templateForm.elements.name.value,
          category: templateForm.elements.category.value,
          content: templateForm.elements.content.value,
        }),
        ...state.templates,
      ];
      saveAll();
      renderAll();
      showToast("Template saved");
    });
  }

  const aiForm = modulePanel.querySelector("[data-action='simulateAi']");
  if (aiForm) {
    aiForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const output = simulateAiOutput(aiForm.elements.promptType.value, aiForm.elements.input.value);
      const prompt = createPromptHistory({
        episodeId: aiForm.elements.episodeId.value,
        promptType: aiForm.elements.promptType.value,
        input: aiForm.elements.input.value,
        output,
        savedToEpisode: Boolean(aiForm.elements.episodeId.value),
      });
      state.promptHistory = [...state.promptHistory, prompt];
      if (prompt.episodeId) {
        state.episodes = state.episodes.map((episode) => {
          if (episode.id !== prompt.episodeId) return episode;
          return {
            ...episode,
            ai: { ...(episode.ai || {}), promptHistoryIds: [...(episode.ai?.promptHistoryIds || []), prompt.id] },
            history: [...(episode.history || []), { at: now(), event: `Simulated AI: ${prompt.promptType}` }].slice(-20),
            updatedAt: now(),
          };
        });
      }
      saveAll();
      const outputBox = modulePanel.querySelector("#aiOutput");
      if (outputBox) outputBox.textContent = output;
      showToast("Prompt history saved");
    });
  }

  modulePanel.querySelectorAll("[data-action]").forEach((button) => {
    if (button.dataset.bound) return;
    button.dataset.bound = "true";
    if (button.dataset.action === "exportData") button.addEventListener("click", exportData);
    if (button.dataset.action === "importData") button.addEventListener("click", () => importFile.click());
    if (button.dataset.action === "resetData") button.addEventListener("click", resetData);
    if (button.dataset.action === "gotoModule") button.addEventListener("click", () => setActiveModule(button.dataset.module || "dashboard"));
    if (button.dataset.action === "openEpisode") button.addEventListener("click", () => openEpisodeById(button.dataset.id));
    if (button.dataset.action === "createEpisode") button.addEventListener("click", () => createNewEpisode("Idea"));
    if (button.dataset.action === "switchWorkspace") {
      button.addEventListener("click", () => {
        state.settings.activeWorkspaceId = button.dataset.id;
        state.settings.activeSeriesId = getActiveSeriesItems(button.dataset.id)[0]?.id || "";
        state.settings.selectedEpisodeId = "";
        state.settings.updatedAt = now();
        renderAll();
      });
    }
    if (button.dataset.action === "switchSeries") {
      button.addEventListener("click", () => {
        state.settings.activeSeriesId = button.dataset.id;
        state.settings.selectedEpisodeId = "";
        state.settings.updatedAt = now();
        renderAll();
      });
    }
    if (button.dataset.action === "archiveWorkspace") button.addEventListener("click", () => archiveWorkspace(button.dataset.id));
    if (button.dataset.action === "archiveSeries") button.addEventListener("click", () => archiveSeries(button.dataset.id));
    if (button.dataset.action === "archiveEpisode") button.addEventListener("click", () => archiveEpisode(button.dataset.id));
    if (button.dataset.action === "archiveAsset") button.addEventListener("click", () => archiveAsset(button.dataset.id));
    if (button.dataset.action === "archiveTemplate") button.addEventListener("click", () => archiveTemplate(button.dataset.id));
    if (button.dataset.action === "duplicateWorkspace") button.addEventListener("click", () => duplicateWorkspace(button.dataset.id));
    if (button.dataset.action === "restoreWorkspace") button.addEventListener("click", () => restoreWorkspace(button.dataset.id));
    if (button.dataset.action === "deleteWorkspace") button.addEventListener("click", () => deleteWorkspace(button.dataset.id));
    if (button.dataset.action === "duplicateSeries") button.addEventListener("click", () => duplicateSeries(button.dataset.id));
    if (button.dataset.action === "restoreSeries") button.addEventListener("click", () => restoreSeries(button.dataset.id));
    if (button.dataset.action === "deleteSeries") button.addEventListener("click", () => deleteSeries(button.dataset.id));
    if (button.dataset.action === "duplicateEpisode") button.addEventListener("click", () => duplicateEpisode(button.dataset.id));
    if (button.dataset.action === "restoreEpisode") button.addEventListener("click", () => restoreEpisode(button.dataset.id));
    if (button.dataset.action === "deleteEpisode") button.addEventListener("click", () => deleteEpisode(button.dataset.id));
    if (button.dataset.action === "deleteEpisodePermanent") button.addEventListener("click", () => deleteEpisodePermanent(button.dataset.id));
    if (button.dataset.action === "editAsset") button.addEventListener("click", () => editAsset(button.dataset.id));
    if (button.dataset.action === "duplicateAsset") button.addEventListener("click", () => duplicateAsset(button.dataset.id));
    if (button.dataset.action === "restoreAsset") button.addEventListener("click", () => restoreAsset(button.dataset.id));
    if (button.dataset.action === "deleteAsset") button.addEventListener("click", () => deleteAsset(button.dataset.id));
    if (button.dataset.action === "editTemplate") button.addEventListener("click", () => editTemplate(button.dataset.id));
    if (button.dataset.action === "duplicateTemplateItem") button.addEventListener("click", () => duplicateTemplateItem(button.dataset.id));
    if (button.dataset.action === "restoreTemplate") button.addEventListener("click", () => restoreTemplate(button.dataset.id));
    if (button.dataset.action === "deleteTemplate") button.addEventListener("click", () => deleteTemplate(button.dataset.id));
  });
}

function simulateAiOutput(promptType, input) {
  const workspace = getActiveWorkspace();
  const base = input.trim() || "this founder episode";
  const defaults = {
    "Hook generation": `Try this hook: "Nobody sees the ${base} part, but this is where the brand gets built."`,
    "Script generation": `1. Open with the real moment.\n2. Explain why ${base} matters.\n3. Show the practical action.\n4. Tie it back to ${workspace.name}.\n5. Close with a clear creator-owned CTA.`,
    "Caption generation": `Building in public starts with honest reps. ${base} is part of the process, not the finish line.`,
    "CTA suggestions": `Save this if you are building after hours. Then choose one action you can finish today.`,
    "Hashtag suggestions": `${workspace.defaultHashtags || "#CreatorOS #FounderJourney #BuildInPublic"} #ContentSystem`,
    "Thumbnail ideas": `Founder at desk, one bold text line, ${workspace.name} icon in frame, high-contrast black and gold treatment.`,
    "B-roll suggestions": `Laptop close-up, notes, workspace icon, phone planning shot, product/brand detail, walking transition.`,
  };
  return defaults[promptType] || `Template output for ${base}`;
}

function exportData() {
  const payload = {
    version: APP_VERSION,
    exportedAt: now(),
    workspaces: state.workspaces,
    series: state.series,
    episodes: state.episodes,
    assets: state.assets,
    templates: state.templates,
    settings: state.settings,
    promptHistory: state.promptHistory,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `creator-os-export-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Export started");
}

function resetData() {
  if (!confirm("Reset Creator OS local data? This only clears localStorage for this app.")) return;
  Object.values(storageKeys).forEach((key) => localStorage.removeItem(key));
  state = loadState();
  selectedEpisodeId = state.settings.selectedEpisodeId;
  renderAll();
  showToast("Local data reset");
}

function importDataFromObject(payload) {
  const next = {
    workspaces: Array.isArray(payload.workspaces) ? payload.workspaces : [],
    series: Array.isArray(payload.series) ? payload.series : [],
    episodes: Array.isArray(payload.episodes) ? payload.episodes : [],
    assets: Array.isArray(payload.assets) ? payload.assets : [],
    templates: Array.isArray(payload.templates) ? payload.templates : [],
    settings: { ...createDefaultSettings(), ...(payload.settings || {}) },
    promptHistory: Array.isArray(payload.promptHistory) ? payload.promptHistory : [],
  };
  if (!next.workspaces.length || !next.series.length) throw new Error("Import must include workspaces and series.");
  normalizeCollections(next);
  ensureValidSettings(next);
  state = next;
  selectedEpisodeId = state.settings.selectedEpisodeId;
  saveAll();
  renderAll();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

workspaceSelect.addEventListener("change", () => {
  state.settings.activeWorkspaceId = workspaceSelect.value;
  const workspaceSeries = getActiveSeriesItems(workspaceSelect.value);
  state.settings.activeSeriesId = workspaceSeries[0]?.id || "";
  state.settings.selectedEpisodeId = "";
  state.settings.updatedAt = now();
  renderAll();
});

seriesSelect.addEventListener("change", () => {
  state.settings.activeSeriesId = seriesSelect.value;
  state.settings.selectedEpisodeId = "";
  state.settings.updatedAt = now();
  renderAll();
});

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => setActiveModule(button.dataset.module));
});

document.querySelector(".close-button").addEventListener("click", closeInspector);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.settings.inspectorOpen !== false) {
    closeInspector();
  }
});

document.querySelector("#newWorkspace").addEventListener("click", () => {
  const workspace = createWorkspace({
    name: `Workspace ${getActiveWorkspaces().length + 1}`,
    description: "New Creator OS workspace.",
  });
  const series = createSeries({
    workspaceId: workspace.id,
    name: "First Series",
    description: "Default series for this workspace.",
  });
  state.workspaces = [...state.workspaces, workspace];
  state.series = [...state.series, series];
  state.settings.activeWorkspaceId = workspace.id;
  state.settings.activeSeriesId = series.id;
  state.settings.activeModule = "workspaces";
  renderAll();
  showToast("Workspace created");
});

document.querySelector("#newSeries").addEventListener("click", () => {
  const series = createSeries({
    workspaceId: getActiveWorkspaceId(),
    name: `Series ${getActiveSeriesItems(getActiveWorkspaceId()).length + 1}`,
    description: "New series foundation.",
  });
  state.series = [...state.series, series];
  state.settings.activeSeriesId = series.id;
  state.settings.activeModule = "series";
  renderAll();
  showToast("Series created");
});

form.addEventListener("input", () => {
  updateSelectedEpisode();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateSelectedEpisode();
  showToast("Episode updated");
});

document.querySelector("#duplicateTemplate").addEventListener("click", () => duplicateTemplate());
document.querySelector("#mobileDuplicate").addEventListener("click", () => duplicateTemplate());
document.querySelector("#newEpisode").addEventListener("click", () => createNewEpisode("Idea"));
document.querySelector("#saveDraft").addEventListener("click", () => {
  updateSelectedEpisode();
  showToast("Draft saved locally");
});

importFile.addEventListener("change", () => {
  const file = importFile.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      importDataFromObject(JSON.parse(String(reader.result)));
      showToast("Local data imported");
    } catch (error) {
      showToast(error.message || "Import failed");
    } finally {
      importFile.value = "";
    }
  };
  reader.readAsText(file);
});

renderAll();
