import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Zap,
  ShoppingBag,
  Users,
  Trophy,
  Play,
  Home,
  X,
  Lock,
  Check,
  Flame,
  Shield,
  Gauge,
  Tv,
  Star,
  Crown,
} from "lucide-react";

// ─── SKINS ───────────────────────────────────────────────────────────────────
const SKIN_CATEGORIES = [
  "ALL",
  "EMOJI",
  "ANIMALS",
  "MYTHIC",
  "OBJECTS",
  "ELITE",
];

const SKINS = [
  // EMOJI
  {
    id: "fire_emoji",
    name: "🔥 BLAZE",
    cat: "EMOJI",
    cost: 0,
    emoji: "🔥",
    glow: "#FF6B00",
  },
  {
    id: "skull_emoji",
    name: "💀 SKULL",
    cat: "EMOJI",
    cost: 0,
    emoji: "💀",
    glow: "#E8FFF9",
  },
  {
    id: "alien_emoji",
    name: "👾 ALIEN",
    cat: "EMOJI",
    cost: 80,
    emoji: "👾",
    glow: "#00F0FF",
  },
  {
    id: "robot_emoji",
    name: "🤖 UNIT-01",
    cat: "EMOJI",
    cost: 80,
    emoji: "🤖",
    glow: "#7B61FF",
  },
  {
    id: "ghost_emoji",
    name: "👻 GHOST",
    cat: "EMOJI",
    cost: 80,
    emoji: "👻",
    glow: "#E8FFF9",
  },
  {
    id: "devil_emoji",
    name: "😈 DEVIL",
    cat: "EMOJI",
    cost: 120,
    emoji: "😈",
    glow: "#FF2A6D",
  },
  {
    id: "cool_emoji",
    name: "😎 COOL KID",
    cat: "EMOJI",
    cost: 50,
    emoji: "😎",
    glow: "#FFB800",
  },
  {
    id: "rage_emoji",
    name: "🤬 RAGE",
    cat: "EMOJI",
    cost: 50,
    emoji: "🤬",
    glow: "#FF2A6D",
  },
  // ANIMALS
  {
    id: "cat",
    name: "🐱 CAT",
    cat: "ANIMALS",
    cost: 0,
    emoji: "🐱",
    glow: "#FFB800",
  },
  {
    id: "wolf",
    name: "🐺 WOLF",
    cat: "ANIMALS",
    cost: 100,
    emoji: "🐺",
    glow: "#7B8CA3",
  },
  {
    id: "eagle",
    name: "🦅 EAGLE",
    cat: "ANIMALS",
    cost: 100,
    emoji: "🦅",
    glow: "#FFB800",
  },
  {
    id: "shark",
    name: "🦈 SHARK",
    cat: "ANIMALS",
    cost: 120,
    emoji: "🦈",
    glow: "#00F0FF",
  },
  {
    id: "dragon_a",
    name: "🐉 WYVERN",
    cat: "ANIMALS",
    cost: 200,
    emoji: "🐉",
    glow: "#FF6B00",
  },
  {
    id: "snake",
    name: "🐍 SERPENT",
    cat: "ANIMALS",
    cost: 150,
    emoji: "🐍",
    glow: "#00F0FF",
  },
  {
    id: "bear",
    name: "🐻 BEAR",
    cat: "ANIMALS",
    cost: 80,
    emoji: "🐻",
    glow: "#A0622A",
  },
  {
    id: "panther",
    name: "🐆 PANTHER",
    cat: "ANIMALS",
    cost: 180,
    emoji: "🐆",
    glow: "#FFB800",
  },
  // MYTHIC
  {
    id: "unicorn",
    name: "🦄 UNICORN",
    cat: "MYTHIC",
    cost: 300,
    emoji: "🦄",
    glow: "#FF61E7",
    paid: true,
  },
  {
    id: "phoenix",
    name: "🔥 PHOENIX",
    cat: "MYTHIC",
    cost: 350,
    emoji: "🦅",
    glow: "#FF6B00",
    paid: true,
    overrideEmoji: "🦅",
    badge: "MYTHIC",
  },
  {
    id: "dragon_m",
    name: "🐲 INFERNO",
    cat: "MYTHIC",
    cost: 400,
    emoji: "🐲",
    glow: "#FF2A6D",
    paid: true,
  },
  {
    id: "kraken",
    name: "🦑 KRAKEN",
    cat: "MYTHIC",
    cost: 380,
    emoji: "🦑",
    glow: "#7B61FF",
    paid: true,
  },
  {
    id: "cerberus",
    name: "🐕 CERBERUS",
    cat: "MYTHIC",
    cost: 420,
    emoji: "🐕",
    glow: "#FF2A6D",
    paid: true,
  },
  {
    id: "leviathan",
    name: "🌊 LEVIATHAN",
    cat: "MYTHIC",
    cost: 500,
    emoji: "🌊",
    glow: "#00F0FF",
    paid: true,
  },
  // OBJECTS
  {
    id: "sword",
    name: "⚔️ BLADE",
    cat: "OBJECTS",
    cost: 0,
    emoji: "⚔️",
    glow: "#E8FFF9",
  },
  {
    id: "bomb",
    name: "💣 BOMB",
    cat: "OBJECTS",
    cost: 60,
    emoji: "💣",
    glow: "#7B8CA3",
  },
  {
    id: "gem",
    name: "💎 GEM",
    cat: "OBJECTS",
    cost: 100,
    emoji: "💎",
    glow: "#00F0FF",
  },
  {
    id: "crown",
    name: "👑 CROWN",
    cat: "OBJECTS",
    cost: 200,
    emoji: "👑",
    glow: "#FFB800",
  },
  {
    id: "satellite",
    name: "🛸 SAUCER",
    cat: "OBJECTS",
    cost: 150,
    emoji: "🛸",
    glow: "#00F0FF",
  },
  {
    id: "comet",
    name: "☄️ COMET",
    cat: "OBJECTS",
    cost: 120,
    emoji: "☄️",
    glow: "#FF6B00",
  },
  {
    id: "lightning",
    name: "⚡ BOLT",
    cat: "OBJECTS",
    cost: 80,
    emoji: "⚡",
    glow: "#FFB800",
  },
  {
    id: "eye",
    name: "👁️ EYE",
    cat: "OBJECTS",
    cost: 90,
    emoji: "👁️",
    glow: "#7B61FF",
  },
  // ELITE (paid)
  {
    id: "glitch",
    name: "ERROR.EXE",
    cat: "ELITE",
    cost: 600,
    emoji: "🟪",
    glow: "#7B61FF",
    paid: true,
    badge: "ELITE",
  },
  {
    id: "void_ak",
    name: "VOID AK",
    cat: "ELITE",
    cost: 999,
    emoji: "⚫",
    glow: "#FF2A6D",
    paid: true,
    badge: "LEGEND",
  },
  {
    id: "aurora",
    name: "AURORA",
    cat: "ELITE",
    cost: 800,
    emoji: "🌌",
    glow: "#00F0FF",
    paid: true,
    badge: "ELITE",
  },
  {
    id: "reaper_x",
    name: "REAPER-X",
    cat: "ELITE",
    cost: 750,
    emoji: "💀",
    glow: "#FF2A6D",
    paid: true,
    badge: "ELITE",
  },
];

// ─── THEMES ──────────────────────────────────────────────────────────────────
const THEMES = [
  {
    id: "void",
    name: "VOID CORRIDOR",
    cost: 0,
    free: true,
    bg: "radial-gradient(ellipse at 50% 0%, #0D1B2A 0%, #05060A 70%)",
    gridCol: "rgba(123,97,255,0.18)",
    lineCol: "rgba(0,240,255,0.15)",
    obsCol: "#FF2A6D",
    shardCol: "#00F0FF",
    accentCol: "#7B61FF",
    scanlines: true,
  },
  {
    id: "neon",
    name: "NEON CITY",
    cost: 200,
    free: false,
    bg: "radial-gradient(ellipse at 50% 20%, #0A0018 0%, #000008 70%)",
    gridCol: "rgba(255,42,109,0.22)",
    lineCol: "rgba(255,184,0,0.15)",
    obsCol: "#FFB800",
    shardCol: "#FF2A6D",
    accentCol: "#FF2A6D",
    scanlines: true,
  },
  {
    id: "arctic",
    name: "ARCTIC BREACH",
    cost: 250,
    free: false,
    bg: "radial-gradient(ellipse at 50% 0%, #001A2C 0%, #000810 70%)",
    gridCol: "rgba(0,240,255,0.25)",
    lineCol: "rgba(150,230,255,0.1)",
    obsCol: "#5FF7FF",
    shardCol: "#FFFFFF",
    accentCol: "#00F0FF",
    scanlines: false,
  },
  {
    id: "lava",
    name: "LAVA CORE",
    cost: 300,
    free: false,
    bg: "radial-gradient(ellipse at 50% 100%, #200500 0%, #050000 70%)",
    gridCol: "rgba(255,107,0,0.2)",
    lineCol: "rgba(255,42,109,0.15)",
    obsCol: "#FF6B00",
    shardCol: "#FFB800",
    accentCol: "#FF2A6D",
    scanlines: true,
  },
  {
    id: "matrix",
    name: "DATA MATRIX",
    cost: 350,
    free: false,
    bg: "#000800",
    gridCol: "rgba(0,255,70,0.2)",
    lineCol: "rgba(0,255,70,0.1)",
    obsCol: "#00FF46",
    shardCol: "#00FF46",
    accentCol: "#00FF46",
    scanlines: true,
  },
  {
    id: "galaxy",
    name: "DEEP GALAXY",
    cost: 500,
    free: false,
    paid: true,
    bg: "radial-gradient(ellipse at 50% 50%, #0A0020 0%, #000008 70%)",
    gridCol: "rgba(180,100,255,0.18)",
    lineCol: "rgba(100,200,255,0.12)",
    obsCol: "#B464FF",
    shardCol: "#FFD700",
    accentCol: "#B464FF",
    scanlines: false,
  },
];

// ─── UPGRADES ─────────────────────────────────────────────────────────────────
const UPGRADES = [
  {
    id: "shield",
    name: "SHIELD CHARGE",
    desc: "+1 free hit absorb per run",
    baseCost: 200,
    icon: Shield,
  },
  {
    id: "magnet",
    name: "DATA MAGNET",
    desc: "Wider shard pickup radius",
    baseCost: 180,
    icon: Zap,
  },
  {
    id: "slowmo",
    name: "TIME DILATION",
    desc: "Brief slow-mo on near-miss",
    baseCost: 250,
    icon: Gauge,
  },
];

const CLANS = [
  { id: 1, name: "NULLSEC RUNNERS", members: 47, power: 18420, tag: "NSR" },
  { id: 2, name: "GHOST PROTOCOL", members: 32, power: 15100, tag: "GHP" },
  { id: 3, name: "VOID ASCENDANT", members: 58, power: 22950, tag: "VOID" },
  { id: 4, name: "SIGNAL BREAKERS", members: 21, power: 9870, tag: "SIG" },
];

const LEADERBOARD = [
  { rank: 1, name: "KAEL_0X", score: 48230, clan: "VOID" },
  { rank: 2, name: "NYX.exe", score: 44100, clan: "NSR" },
  { rank: 3, name: "rin_static", score: 39850, clan: "GHP" },
  { rank: 4, name: "driftwire", score: 35200, clan: "NSR" },
  { rank: 5, name: "echo_null", score: 31980, clan: "SIG" },
];

const OBSTACLE_BASE_SPEED = 4.2;
const SPAWN_BASE_INTERVAL = 950;
const PLAYER_SIZE = 34;

function loadState() {
  return {
    name: "RUNNER_07",
    tag: "NSR",
    shards: 500,
    bestScore: 0,
    totalRuns: 0,
    totalShardsEarned: 0,
    xp: 240,
    ownedSkins: ["fire_emoji", "skull_emoji", "cat", "sword"],
    equippedSkin: "fire_emoji",
    ownedThemes: ["void"],
    equippedTheme: "void",
    upgradeLevels: { shield: 0, magnet: 0, slowmo: 0 },
    level: 1,
  };
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function VoidAK() {
  const [screen, setScreen] = useState("home");
  const [state, setState] = useState(loadState());
  const [lastRun, setLastRun] = useState(null);

  const theme = THEMES.find((t) => t.id === state.equippedTheme) || THEMES[0];

  return (
    <div style={{ ...styles.appRoot, background: theme.bg }}>
      <style>{GLOBAL_CSS}</style>
      {screen === "home" && (
        <HomeScreen state={state} theme={theme} onNav={setScreen} />
      )}
      {screen === "game" && (
        <GameScreen
          state={state}
          theme={theme}
          onExit={(r) => {
            setLastRun(r);
            setState((s) => {
              const nx = s.xp + Math.floor(r.score / 10);
              let nl = s.level,
                rx = nx;
              while (rx >= nl * 500) {
                rx -= nl * 500;
                nl++;
              }
              return {
                ...s,
                shards: s.shards + r.shardsEarned,
                bestScore: Math.max(s.bestScore, r.score),
                totalRuns: s.totalRuns + 1,
                totalShardsEarned: s.totalShardsEarned + r.shardsEarned,
                xp: rx,
                level: nl,
              };
            });
            setScreen("gameover");
          }}
        />
      )}
      {screen === "gameover" && (
        <GameOverScreen
          result={lastRun}
          state={state}
          theme={theme}
          onNav={setScreen}
          onRevive={() => setScreen("game")}
        />
      )}
      {screen === "store" && (
        <StoreScreen
          state={state}
          setState={setState}
          theme={theme}
          onNav={setScreen}
        />
      )}
      {screen === "clan" && <ClanScreen theme={theme} onNav={setScreen} />}
      {screen === "leaderboard" && (
        <LeaderboardScreen state={state} theme={theme} onNav={setScreen} />
      )}
      {screen === "profile" && (
        <ProfileScreen
          state={state}
          setState={setState}
          theme={theme}
          onNav={setScreen}
        />
      )}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ state, theme, onNav }) {
  const skin = SKINS.find((s) => s.id === state.equippedSkin) || SKINS[0];
  return (
    <div style={styles.screen}>
      {theme.scanlines && <div style={styles.scanlines} />}
      <div style={{ ...styles.hudCorner, top: 16, left: 16 }}>
        <div style={styles.hudLabel}>SHARDS</div>
        <div style={styles.hudValue}>
          <Zap
            size={14}
            color={theme.shardCol}
            style={{ verticalAlign: "middle", marginRight: 4 }}
          />
          {state.shards}
        </div>
      </div>
      <div
        style={{ ...styles.hudCorner, top: 16, right: 16, textAlign: "right" }}
      >
        <div style={styles.hudLabel}>BEST</div>
        <div style={styles.hudValue}>{state.bestScore.toLocaleString()}</div>
      </div>
      <button style={styles.profileChip} onClick={() => onNav("profile")}>
        <div style={styles.profileChipAvatar}>
          <span style={{ fontSize: 20 }}>{skin.emoji}</span>
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={styles.profileChipName}>{state.name}</div>
          <div style={{ ...styles.profileChipTag, color: theme.accentCol }}>
            LV.{state.level} · {state.tag}
          </div>
        </div>
      </button>
      <div style={styles.homeCenter}>
        <div style={{ ...styles.gameTitle, color: theme.shardCol }}>VOID</div>
        <div
          style={{ ...styles.gameTitle, marginTop: -16, color: theme.obsCol }}
        >
          AK
        </div>
        <div style={{ ...styles.gameSubtitle, color: theme.accentCol }}>
          // CORRIDOR RUNNER PROTOCOL
        </div>
        <button
          style={{
            ...styles.playButton,
            background: theme.shardCol,
            boxShadow: `0 0 30px ${theme.shardCol}55`,
          }}
          onClick={() => onNav("game")}
        >
          <Play size={22} fill="#05060A" color="#05060A" />
          <span>RUN</span>
        </button>
        <div style={styles.homeNavRow}>
          <NavTile
            icon={ShoppingBag}
            label="STORE"
            color={theme.accentCol}
            onClick={() => onNav("store")}
          />
          <NavTile
            icon={Users}
            label="CLAN"
            color={theme.accentCol}
            onClick={() => onNav("clan")}
          />
          <NavTile
            icon={Trophy}
            label="RANKS"
            color={theme.accentCol}
            onClick={() => onNav("leaderboard")}
          />
        </div>
      </div>
      <div style={styles.homeFooter}>
        {skin.name} · {THEMES.find((t) => t.id === state.equippedTheme)?.name}
      </div>
    </div>
  );
}
function NavTile({ icon: Icon, label, color, onClick }) {
  return (
    <button
      style={{
        ...styles.navTile,
        border: `1px solid ${color}44`,
        background: `${color}11`,
      }}
      onClick={onClick}
    >
      <Icon size={22} color={color} />
      <span style={styles.navTileLabel}>{label}</span>
    </button>
  );
}

// ─── GAME ─────────────────────────────────────────────────────────────────────
function GameScreen({ state, theme, onExit }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const gs = useRef({
    player: { x: 0, y: 0 },
    obstacles: [],
    shards: [],
    streaks: [],
    distance: 0,
    score: 0,
    shardsEarned: 0,
    speed: OBSTACLE_BASE_SPEED,
    lastSpawn: 0,
    shield: state.upgradeLevels.shield > 0 ? 1 : 0,
    gridOffset: 0,
    flashAlpha: 0,
    slowmoUntil: 0,
    dead: false,
    lastFrame: 0,
  });
  const [hudScore, setHudScore] = useState(0);
  const [hudShards, setHudShards] = useState(0);
  const [shieldOn, setShieldOn] = useState(state.upgradeLevels.shield > 0);
  const [countIn, setCountIn] = useState(3);
  const started = useRef(false);
  const skin = SKINS.find((s) => s.id === state.equippedSkin) || SKINS[0];

  useEffect(() => {
    if (countIn <= 0) {
      started.current = true;
      return;
    }
    const t = setTimeout(() => setCountIn((c) => c - 1), 700);
    return () => clearTimeout(t);
  }, [countIn]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = canvas.clientWidth,
      H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    const g = gs.current;
    g.player.x = W / 2;
    g.player.y = H * 0.72;
    let ptr = { x: W / 2, y: H * 0.72, active: false };

    function onDown(e) {
      const p = e.touches ? e.touches[0] : e;
      const r = canvas.getBoundingClientRect();
      ptr = { x: p.clientX - r.left, y: p.clientY - r.top, active: true };
    }
    function onMove(e) {
      if (!ptr.active) return;
      const p = e.touches ? e.touches[0] : e;
      const r = canvas.getBoundingClientRect();
      ptr.x = p.clientX - r.left;
      ptr.y = p.clientY - r.top;
    }
    function onUp() {
      ptr.active = false;
    }
    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: true });
    canvas.addEventListener("touchmove", onMove, { passive: true });
    canvas.addEventListener("touchend", onUp);

    function dist(ax, ay, bx, by) {
      return Math.hypot(ax - bx, ay - by);
    }
    function spawnObs() {
      const w = 28 + Math.random() * 34;
      let x, vx, vy;
      if (Math.random() < 0.75) {
        x = 40 + Math.random() * (W - 80);
        vx = (Math.random() - 0.5) * 1.2;
        vy = g.speed * (0.9 + Math.random() * 0.5);
      } else {
        const fs = Math.random() < 0.5;
        x = fs ? -40 : W + 40;
        vx = (fs ? 1 : -1) * g.speed * 0.9;
        vy = g.speed * 0.5;
      }
      g.obstacles.push({
        x,
        y: -40,
        vx,
        vy,
        w,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.1,
      });
    }
    function spawnShard() {
      g.shards.push({
        x: 40 + Math.random() * (W - 80),
        y: -40,
        vy: g.speed * 0.85,
        collected: false,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    function render(now) {
      if (g.dead) return;
      ctx.clearRect(0, 0, W, H);
      const dt = Math.min((now - (g.lastFrame || now)) / 16.67, 2.2);
      g.lastFrame = now;
      const slow = now < g.slowmoUntil ? 0.4 : 1;

      if (started.current) {
        g.distance += g.speed * slow * dt;
        g.score = Math.floor(g.distance / 4);
        g.speed = OBSTACLE_BASE_SPEED + g.distance / 3200;
        if (
          now - g.lastSpawn >
          Math.max(280, SPAWN_BASE_INTERVAL - g.distance / 9)
        ) {
          spawnObs();
          if (Math.random() < 0.4) spawnShard();
          g.lastSpawn = now;
        }
        if (ptr.active) {
          const dx = ptr.x - g.player.x,
            dy = ptr.y - g.player.y,
            d = Math.hypot(dx, dy);
          if (d > 2) {
            const sp = Math.min(d * 0.18, 14) * dt,
              nx = dx / d,
              ny = dy / d;
            g.player.x += nx * sp;
            g.player.y += ny * sp;
            g.streaks.push({ x: g.player.x, y: g.player.y, life: 1 });
          }
        }
        g.player.x = Math.max(
          PLAYER_SIZE,
          Math.min(W - PLAYER_SIZE, g.player.x)
        );
        g.player.y = Math.max(H * 0.18, Math.min(H - PLAYER_SIZE, g.player.y));
      }

      // grid
      g.gridOffset = (g.gridOffset + g.speed * slow * dt * 0.6) % 60;
      ctx.save();
      ctx.strokeStyle = theme.gridCol;
      ctx.lineWidth = 1;
      const vx = W / 2,
        vy = H * 0.12;
      for (let i = -6; i <= 6; i++) {
        const tx = vx + i * 14,
          bx = vx + i * W * 0.5;
        ctx.beginPath();
        ctx.moveTo(tx, vy);
        ctx.lineTo(bx, H);
        ctx.stroke();
      }
      for (let j = 0; j < 14; j++) {
        const t = (j * 60 + g.gridOffset) / (14 * 60),
          y = vy + t * t * (H - vy) * 3.2;
        if (y > H) continue;
        const sp = t * W * 0.7;
        ctx.beginPath();
        ctx.moveTo(vx - sp, y);
        ctx.lineTo(vx + sp, y);
        ctx.strokeStyle = theme.lineCol.replace("0.15", `${0.05 + t * 0.2}`);
        ctx.stroke();
      }
      ctx.restore();

      // streaks
      g.streaks = g.streaks.filter((s) => s.life > 0);
      g.streaks.forEach((s) => {
        ctx.save();
        ctx.globalAlpha = s.life * 0.45;
        ctx.fillStyle = skin.glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, PLAYER_SIZE * 0.5 * s.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        s.life -= 0.08 * dt;
      });

      // shards
      g.shards = g.shards.filter((sh) => sh.y < H + 60 && !sh.collected);
      g.shards.forEach((sh) => {
        if (started.current) sh.y += sh.vy * slow * dt;
        sh.pulse += 0.1 * dt;
        const r = 9 + Math.sin(sh.pulse) * 2;
        ctx.save();
        ctx.shadowColor = theme.shardCol;
        ctx.shadowBlur = 14;
        ctx.fillStyle = theme.shardCol;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y - r);
        ctx.lineTo(sh.x + r * 0.7, sh.y);
        ctx.lineTo(sh.x, sh.y + r);
        ctx.lineTo(sh.x - r * 0.7, sh.y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        const pr = 24 + state.upgradeLevels.magnet * 14;
        if (started.current && dist(sh.x, sh.y, g.player.x, g.player.y) < pr) {
          sh.collected = true;
          g.shardsEarned += 5;
          setHudShards(g.shardsEarned);
        }
      });

      // obstacles
      g.obstacles = g.obstacles.filter(
        (o) => o.y < H + 80 && o.x > -100 && o.x < W + 100
      );
      g.obstacles.forEach((o) => {
        if (started.current) {
          o.y += o.vy * slow * dt;
          o.x += o.vx * slow * dt;
          o.rot += o.vr * dt;
        }
        ctx.save();
        ctx.translate(o.x, o.y);
        ctx.rotate(o.rot);
        ctx.shadowColor = theme.obsCol;
        ctx.shadowBlur = 16;
        ctx.strokeStyle = theme.obsCol;
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i <= 5; i++) {
          const a = (i / 5) * Math.PI * 2,
            px = Math.cos(a) * o.w * 0.5,
            py = Math.sin(a) * o.w * 0.5;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        if (started.current) {
          const d = dist(o.x, o.y, g.player.x, g.player.y);
          if (
            d < o.w * 0.5 + 26 &&
            now > g.slowmoUntil &&
            state.upgradeLevels.slowmo > 0 &&
            d > o.w * 0.5 + PLAYER_SIZE * 0.4
          )
            g.slowmoUntil = now + 260;
          if (d < o.w * 0.5 + PLAYER_SIZE * 0.4) {
            if (g.shield > 0) {
              g.shield = 0;
              setShieldOn(false);
              g.flashAlpha = 0.4;
              o.y = H + 999;
            } else {
              g.dead = true;
            }
          }
        }
      });

      if (g.flashAlpha > 0) {
        ctx.fillStyle = `rgba(123,97,255,${g.flashAlpha})`;
        ctx.fillRect(0, 0, W, H);
        g.flashAlpha -= 0.03 * dt;
      }

      // player emoji
      ctx.save();
      ctx.font = `${PLAYER_SIZE * 1.5}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = skin.glow;
      ctx.shadowBlur = 20;
      const bob = Math.sin(now / 400) * 2;
      ctx.fillText(skin.emoji, g.player.x, g.player.y + bob);
      if (g.shield > 0) {
        ctx.strokeStyle = "rgba(123,97,255,0.8)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(
          g.player.x,
          g.player.y + bob,
          PLAYER_SIZE * 0.6,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
      ctx.restore();

      setHudScore(g.score);
      if (g.dead) {
        cancelAnimationFrame(animRef.current);
        setTimeout(
          () => onExit({ score: g.score, shardsEarned: g.shardsEarned }),
          350
        );
        return;
      }
      animRef.current = requestAnimationFrame(render);
    }
    animRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      canvas.removeEventListener("touchmove", onMove);
      canvas.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div style={{ ...styles.screen, padding: 0, overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          touchAction: "none",
        }}
      />
      <div style={{ ...styles.hudCorner, top: 14, left: 14 }}>
        <div style={styles.hudLabel}>SCORE</div>
        <div style={{ ...styles.hudValueBig, color: theme.shardCol }}>
          {hudScore.toLocaleString()}
        </div>
      </div>
      <div
        style={{ ...styles.hudCorner, top: 14, right: 14, textAlign: "right" }}
      >
        <div style={styles.hudLabel}>SHARDS</div>
        <div style={{ ...styles.hudValueBig, color: theme.shardCol }}>
          +{hudShards}
        </div>
      </div>
      {shieldOn && (
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: 14,
            color: "#7B61FF",
            fontFamily: "Rajdhani,sans-serif",
            fontSize: 13,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Shield size={14} /> SHIELD
        </div>
      )}
      {countIn > 0 && (
        <div style={styles.countOverlay}>
          <div style={{ ...styles.countNum, color: theme.shardCol }}>
            {countIn}
          </div>
          <div style={{ ...styles.countLabel, color: theme.accentCol }}>
            DRAG TO DODGE
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GAME OVER ────────────────────────────────────────────────────────────────
function GameOverScreen({ result, state, theme, onNav, onRevive }) {
  const [adState, setAdState] = useState("idle"); // idle | watching | done
  const [adTimer, setAdTimer] = useState(5);
  const [revived, setRevived] = useState(false);
  const timerRef = useRef(null);

  const watchAd = () => {
    setAdState("watching");
    setAdTimer(5);
    timerRef.current = setInterval(() => {
      setAdTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setAdState("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };
  useEffect(() => () => clearInterval(timerRef.current), []);

  const claimRevive = () => {
    setRevived(true);
    onRevive();
  };
  const isNewBest = result && result.score >= state.bestScore;

  if (!result) return null;
  return (
    <div style={styles.screen}>
      {theme.scanlines && <div style={styles.scanlines} />}
      <div style={styles.homeCenter}>
        <div style={{ ...styles.gameTitle, fontSize: 28, color: theme.obsCol }}>
          SIGNAL LOST
        </div>
        {isNewBest && (
          <div
            style={{
              color: "#FFB800",
              fontFamily: "Rajdhani,sans-serif",
              letterSpacing: 2,
              marginBottom: 4,
              fontSize: 13,
            }}
          >
            ⭐ NEW BEST RUN
          </div>
        )}

        <div style={styles.resultCard}>
          <div style={styles.resultRow}>
            <span>SCORE</span>
            <span style={{ color: theme.shardCol }}>
              {result.score.toLocaleString()}
            </span>
          </div>
          <div style={styles.resultRow}>
            <span>SHARDS</span>
            <span style={{ color: "#FFB800" }}>+{result.shardsEarned}</span>
          </div>
        </div>

        {/* AD REVIVE */}
        {!revived && (
          <div style={styles.adCard}>
            <div style={{ ...styles.adTitle, color: theme.accentCol }}>
              ⚡ CONTINUE RUN?
            </div>
            <div style={styles.adSub}>
              Watch a short ad to revive at your position
            </div>
            {adState === "idle" && (
              <button
                style={{ ...styles.adBtn, background: theme.obsCol }}
                onClick={watchAd}
              >
                <Tv size={16} /> WATCH AD TO REVIVE
              </button>
            )}
            {adState === "watching" && (
              <div style={styles.adWatchBox}>
                <div style={styles.adFakeAd}>
                  <div style={{ fontSize: 28 }}>📺</div>
                  <div
                    style={{ color: "#7B8CA3", fontSize: 12, letterSpacing: 1 }}
                  >
                    AD PLAYING…
                  </div>
                  <div
                    style={{
                      fontFamily: "'Orbitron',sans-serif",
                      fontSize: 22,
                      color: theme.shardCol,
                    }}
                  >
                    {adTimer}s
                  </div>
                </div>
              </div>
            )}
            {adState === "done" && (
              <button
                style={{ ...styles.adBtn, background: "#00C853" }}
                onClick={claimRevive}
              >
                <Check size={16} /> CLAIM REVIVAL
              </button>
            )}
          </div>
        )}

        <button
          style={{
            ...styles.playButton,
            background: theme.shardCol,
            boxShadow: `0 0 24px ${theme.shardCol}44`,
          }}
          onClick={() => onNav("game")}
        >
          <Play size={22} fill="#05060A" color="#05060A" />
          <span>RETRY</span>
        </button>
        <button style={styles.secondaryButton} onClick={() => onNav("home")}>
          <Home size={16} /> HOME
        </button>
      </div>
    </div>
  );
}

// ─── STORE ────────────────────────────────────────────────────────────────────
function StoreScreen({ state, setState, theme, onNav }) {
  const [tab, setTab] = useState("skins");
  const [skinCat, setSkinCat] = useState("ALL");

  const buySkin = (sk) => {
    if (state.shards < sk.cost || state.ownedSkins.includes(sk.id)) return;
    setState((s) => ({
      ...s,
      shards: s.shards - sk.cost,
      ownedSkins: [...s.ownedSkins, sk.id],
    }));
  };
  const equipSkin = (sk) => setState((s) => ({ ...s, equippedSkin: sk.id }));
  const buyTheme = (th) => {
    if (state.shards < th.cost || state.ownedThemes.includes(th.id)) return;
    setState((s) => ({
      ...s,
      shards: s.shards - th.cost,
      ownedThemes: [...s.ownedThemes, th.id],
    }));
  };
  const equipTheme = (th) => setState((s) => ({ ...s, equippedTheme: th.id }));
  const buyUpgrade = (u) => {
    const lvl = state.upgradeLevels[u.id];
    const cost = u.baseCost * (lvl + 1);
    if (state.shards < cost || lvl >= 3) return;
    setState((s) => ({
      ...s,
      shards: s.shards - cost,
      upgradeLevels: { ...s.upgradeLevels, [u.id]: lvl + 1 },
    }));
  };

  const filteredSkins = SKINS.filter(
    (s) => skinCat === "ALL" || s.cat === skinCat
  );

  return (
    <div style={styles.screen}>
      <TopBar
        title="STORE"
        shards={state.shards}
        shardCol={theme.shardCol}
        onBack={() => onNav("home")}
      />
      <div style={styles.tabRow}>
        {["skins", "themes", "upgrades"].map((t) => (
          <TabButton
            key={t}
            active={tab === t}
            color={theme.accentCol}
            onClick={() => setTab(t)}
          >
            {t.toUpperCase()}
          </TabButton>
        ))}
      </div>
      <div style={styles.listScroll}>
        {tab === "skins" && (
          <>
            <div style={styles.catRow}>
              {SKIN_CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setSkinCat(c)}
                  style={{
                    ...styles.catChip,
                    ...(skinCat === c
                      ? { background: theme.accentCol, color: "#05060A" }
                      : {
                          border: `1px solid ${theme.accentCol}55`,
                          color: theme.accentCol,
                        }),
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            {filteredSkins.map((sk) => {
              const owned = state.ownedSkins.includes(sk.id);
              const equipped = state.equippedSkin === sk.id;
              return (
                <div
                  key={sk.id}
                  style={{
                    ...styles.storeRow,
                    borderColor: equipped
                      ? theme.shardCol
                      : "rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      ...styles.emojiThumb,
                      textShadow: `0 0 12px ${sk.glow}`,
                    }}
                  >
                    {sk.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.itemName}>
                      {sk.name}
                      {sk.badge && (
                        <span
                          style={{
                            ...styles.badge,
                            background:
                              sk.badge === "LEGEND"
                                ? "#FF2A6D"
                                : sk.badge === "MYTHIC"
                                ? "#7B61FF"
                                : "#00F0FF",
                          }}
                        >
                          {sk.badge}
                        </span>
                      )}
                      {sk.paid && !sk.badge && (
                        <span
                          style={{
                            ...styles.badge,
                            background: "#FFB800",
                            color: "#05060A",
                          }}
                        >
                          PAID
                        </span>
                      )}
                    </div>
                    <div style={styles.itemSub}>
                      {sk.cat} ·{" "}
                      {owned
                        ? equipped
                          ? "EQUIPPED"
                          : "OWNED"
                        : `${sk.cost} SHARDS`}
                    </div>
                  </div>
                  {!owned && (
                    <button
                      style={{
                        ...styles.smallBtn,
                        background:
                          state.shards >= sk.cost ? theme.shardCol : "#2A2A3A",
                        color: state.shards >= sk.cost ? "#05060A" : "#5A6070",
                      }}
                      onClick={() => buySkin(sk)}
                      disabled={state.shards < sk.cost}
                    >
                      {state.shards >= sk.cost ? "BUY" : <Lock size={14} />}
                    </button>
                  )}
                  {owned && !equipped && (
                    <button
                      style={{
                        ...styles.smallBtnGhost,
                        borderColor: theme.shardCol,
                        color: theme.shardCol,
                      }}
                      onClick={() => equipSkin(sk)}
                    >
                      EQUIP
                    </button>
                  )}
                  {equipped && <Check size={20} color={theme.shardCol} />}
                </div>
              );
            })}
          </>
        )}

        {tab === "themes" &&
          THEMES.map((th) => {
            const owned = state.ownedThemes.includes(th.id);
            const equipped = state.equippedTheme === th.id;
            return (
              <div
                key={th.id}
                style={{
                  ...styles.storeRow,
                  borderColor: equipped
                    ? theme.shardCol
                    : "rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: th.bg,
                    border: `1px solid ${th.gridCol}`,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 12,
                      borderRadius: 3,
                      background: `linear-gradient(90deg,${th.obsCol},${th.shardCol})`,
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={styles.itemName}>
                    {th.name}
                    {th.paid && (
                      <span
                        style={{
                          ...styles.badge,
                          background: "#FFB800",
                          color: "#05060A",
                        }}
                      >
                        PAID
                      </span>
                    )}
                  </div>
                  <div style={styles.itemSub}>
                    {owned
                      ? equipped
                        ? "ACTIVE"
                        : "OWNED"
                      : `${th.cost} SHARDS`}
                  </div>
                </div>
                {!owned && (
                  <button
                    style={{
                      ...styles.smallBtn,
                      background:
                        state.shards >= th.cost ? theme.shardCol : "#2A2A3A",
                      color: state.shards >= th.cost ? "#05060A" : "#5A6070",
                    }}
                    onClick={() => buyTheme(th)}
                    disabled={state.shards < th.cost}
                  >
                    {state.shards >= th.cost ? "BUY" : <Lock size={14} />}
                  </button>
                )}
                {owned && !equipped && (
                  <button
                    style={{
                      ...styles.smallBtnGhost,
                      borderColor: theme.shardCol,
                      color: theme.shardCol,
                    }}
                    onClick={() => equipTheme(th)}
                  >
                    USE
                  </button>
                )}
                {equipped && <Check size={20} color={theme.shardCol} />}
              </div>
            );
          })}

        {tab === "upgrades" &&
          UPGRADES.map((u) => {
            const lvl = state.upgradeLevels[u.id];
            const maxed = lvl >= 3;
            const cost = u.baseCost * (lvl + 1);
            const Icon = u.icon;
            return (
              <div key={u.id} style={styles.storeRow}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    border: `1.5px solid ${theme.accentCol}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color={theme.accentCol} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={styles.itemName}>
                    {u.name}{" "}
                    <span style={{ color: theme.accentCol }}>LV.{lvl}</span>
                  </div>
                  <div style={styles.itemSub}>{u.desc}</div>
                </div>
                <button
                  style={{
                    ...styles.smallBtn,
                    background: maxed
                      ? "#2A2A3A"
                      : state.shards >= cost
                      ? theme.shardCol
                      : "#2A2A3A",
                    color: maxed || state.shards < cost ? "#5A6070" : "#05060A",
                  }}
                  onClick={() => buyUpgrade(u)}
                  disabled={maxed || state.shards < cost}
                >
                  {maxed ? "MAX" : cost}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function TabButton({ active, color, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.tabBtn,
        ...(active
          ? { background: `${color}22`, color: color, borderColor: color }
          : {}),
      }}
    >
      {children}
    </button>
  );
}

// ─── CLAN ─────────────────────────────────────────────────────────────────────
function ClanScreen({ theme, onNav }) {
  return (
    <div style={styles.screen}>
      <TopBar
        title="CLANS"
        shardCol={theme.shardCol}
        onBack={() => onNav("home")}
      />
      <div style={styles.listScroll}>
        {CLANS.sort((a, b) => b.power - a.power).map((c, i) => (
          <div key={c.id} style={styles.clanRow}>
            <div
              style={{
                ...styles.clanRank,
                color: i < 3 ? "#FFB800" : theme.accentCol,
              }}
            >
              {i + 1}
            </div>
            <div
              style={{
                ...styles.clanTag,
                color: theme.shardCol,
                borderColor: theme.shardCol,
              }}
            >
              {c.tag}
            </div>
            <div style={{ flex: 1 }}>
              <div style={styles.itemName}>{c.name}</div>
              <div style={styles.itemSub}>{c.members} OPERATIVES</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  color: "#FFB800",
                  fontFamily: "'Orbitron',sans-serif",
                  fontSize: 14,
                }}
              >
                {c.power.toLocaleString()}
              </div>
              <div style={styles.itemSub}>POWER</div>
            </div>
          </div>
        ))}
        <button style={styles.secondaryButton}>
          <Users size={16} /> CREATE CLAN
        </button>
      </div>
    </div>
  );
}

// ─── LEADERBOARD ─────────────────────────────────────────────────────────────
function LeaderboardScreen({ state, theme, onNav }) {
  const entries = [...LEADERBOARD];
  if (state.bestScore > 0)
    entries.push({
      rank: 0,
      name: state.name,
      score: state.bestScore,
      clan: state.tag,
      isYou: true,
    });
  entries.sort((a, b) => b.score - a.score);
  entries.forEach((e, i) => (e.rank = i + 1));
  return (
    <div style={styles.screen}>
      <TopBar
        title="LEADERBOARD"
        shardCol={theme.shardCol}
        onBack={() => onNav("home")}
      />
      <div style={styles.listScroll}>
        {entries.map((e) => (
          <div
            key={e.name}
            style={{
              ...styles.clanRow,
              ...(e.isYou
                ? {
                    borderColor: theme.shardCol,
                    background: `${theme.shardCol}0D`,
                  }
                : {}),
            }}
          >
            <div
              style={{
                ...styles.clanRank,
                color: e.rank <= 3 ? "#FFB800" : theme.accentCol,
              }}
            >
              {e.rank}
            </div>
            <div style={{ flex: 1 }}>
              <div style={styles.itemName}>
                {e.name}
                {e.isYou && (
                  <span
                    style={{
                      ...styles.badge,
                      background: theme.accentCol,
                      color: "#05060A",
                      marginLeft: 8,
                    }}
                  >
                    YOU
                  </span>
                )}
              </div>
              <div style={styles.itemSub}>{e.clan}</div>
            </div>
            <div
              style={{
                color: theme.shardCol,
                fontFamily: "'Orbitron',sans-serif",
                fontSize: 14,
              }}
            >
              {e.score.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────
function ProfileScreen({ state, setState, theme, onNav }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(state.name);
  const skin = SKINS.find((s) => s.id === state.equippedSkin) || SKINS[0];
  const xpMax = state.level * 500;
  const pct = Math.min(100, Math.round((state.xp / xpMax) * 100));
  const save = () => {
    const t = draft.trim().slice(0, 16);
    if (t) setState((s) => ({ ...s, name: t }));
    setEditing(false);
  };
  return (
    <div style={styles.screen}>
      <TopBar
        title="PROFILE"
        shardCol={theme.shardCol}
        onBack={() => onNav("home")}
      />
      <div style={styles.listScroll}>
        <div style={styles.profileHero}>
          <div
            style={{
              ...styles.profileAvatarBig,
              border: `1px solid ${theme.accentCol}55`,
              boxShadow: `0 0 30px ${theme.accentCol}22`,
            }}
          >
            <span
              style={{
                fontSize: 56,
                filter: `drop-shadow(0 0 12px ${skin.glow})`,
              }}
            >
              {skin.emoji}
            </span>
          </div>
          {editing ? (
            <div style={styles.nameEditRow}>
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && save()}
                maxLength={16}
                style={styles.nameInput}
              />
              <button
                style={{
                  ...styles.smallBtn,
                  background: theme.shardCol,
                  color: "#05060A",
                }}
                onClick={save}
              >
                SAVE
              </button>
            </div>
          ) : (
            <button
              style={styles.nameDisplayBtn}
              onClick={() => setEditing(true)}
            >
              <span style={styles.profileName}>{state.name}</span>
              <span
                style={{ fontSize: 11, color: theme.accentCol, marginLeft: 8 }}
              >
                EDIT
              </span>
            </button>
          )}
          <div style={{ ...styles.profileTagRow, color: theme.accentCol }}>
            {state.tag} · {skin.name}
          </div>
          <div style={styles.xpBarOuter}>
            <div
              style={{
                ...styles.xpBarInner,
                width: `${pct}%`,
                background: `linear-gradient(90deg,${theme.accentCol},${theme.shardCol})`,
              }}
            />
          </div>
          <div style={styles.xpLabel}>
            LEVEL {state.level} · {state.xp}/{xpMax} XP
          </div>
        </div>
        <div style={styles.statGrid}>
          <StatTile
            label="BEST SCORE"
            value={state.bestScore.toLocaleString()}
            color={theme.shardCol}
          />
          <StatTile
            label="TOTAL RUNS"
            value={state.totalRuns}
            color={theme.shardCol}
          />
          <StatTile
            label="SHARDS EARNED"
            value={state.totalShardsEarned.toLocaleString()}
            color={theme.shardCol}
          />
          <StatTile
            label="SKINS OWNED"
            value={`${state.ownedSkins.length}/${SKINS.length}`}
            color={theme.shardCol}
          />
        </div>
        <div style={styles.sectionLabel}>SKIN COLLECTION</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: 8,
          }}
        >
          {SKINS.map((sk) => {
            const owned = state.ownedSkins.includes(sk.id);
            return (
              <div
                key={sk.id}
                style={{
                  ...styles.figureGridCell,
                  opacity: owned ? 1 : 0.3,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    filter: owned ? `drop-shadow(0 0 8px ${sk.glow})` : "none",
                  }}
                >
                  {sk.emoji}
                </span>
                {!owned && (
                  <Lock
                    size={11}
                    color="#7B8CA3"
                    style={{ position: "absolute", top: 3, right: 3 }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function StatTile({ label, value, color }) {
  return (
    <div style={styles.statTile}>
      <div style={{ ...styles.statValue, color }}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

// ─── SHARED ───────────────────────────────────────────────────────────────────
function TopBar({ title, shards, shardCol, onBack }) {
  return (
    <div style={styles.topBar}>
      <button style={styles.backBtn} onClick={onBack}>
        <X size={18} color="#E8FFF9" />
      </button>
      <div style={styles.topBarTitle}>{title}</div>
      {shards !== undefined ? (
        <div style={styles.hudValue}>
          <Zap size={14} color={shardCol} style={{ verticalAlign: "middle" }} />{" "}
          {shards}
        </div>
      ) : (
        <div style={{ width: 34 }} />
      )}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
button{font-family:'Rajdhani',sans-serif;cursor:pointer;border:none;}
input:focus{outline:none;}
`;
const styles = {
  appRoot: {
    width: "100%",
    height: "100vh",
    minHeight: 640,
    fontFamily: "'Rajdhani',sans-serif",
    color: "#E8FFF9",
    position: "relative",
    overflow: "hidden",
  },
  screen: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  scanlines: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.5,
    backgroundImage:
      "repeating-linear-gradient(0deg,rgba(0,240,255,0.025) 0px,transparent 2px,transparent 4px)",
  },
  hudCorner: { position: "absolute", zIndex: 5 },
  hudLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: "#7B61FF",
    fontWeight: 600,
  },
  hudValue: {
    fontSize: 16,
    fontFamily: "'Orbitron',sans-serif",
    color: "#E8FFF9",
  },
  hudValueBig: {
    fontSize: 22,
    fontFamily: "'Orbitron',sans-serif",
    color: "#E8FFF9",
  },
  homeCenter: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 24,
    zIndex: 2,
  },
  gameTitle: {
    fontFamily: "'Orbitron',sans-serif",
    fontWeight: 900,
    fontSize: 48,
    letterSpacing: 6,
    lineHeight: 1.1,
  },
  gameSubtitle: { fontSize: 12, letterSpacing: 3, marginBottom: 36 },
  playButton: {
    border: "none",
    borderRadius: 999,
    padding: "16px 52px",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 3,
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 28,
  },
  secondaryButton: {
    background: "transparent",
    color: "#E8FFF9",
    border: "1px solid rgba(232,255,249,0.25)",
    borderRadius: 999,
    padding: "12px 28px",
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
  },
  homeNavRow: { display: "flex", gap: 14, marginTop: 8 },
  navTile: {
    borderRadius: 14,
    padding: "14px 18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    width: 84,
  },
  navTileLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: "#B8C5D9",
    fontWeight: 600,
  },
  homeFooter: {
    textAlign: "center",
    padding: 16,
    fontSize: 11,
    color: "#3D4A5C",
    letterSpacing: 1,
  },
  profileChip: {
    position: "absolute",
    top: 14,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 5,
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(123,97,255,0.1)",
    border: "1px solid rgba(123,97,255,0.35)",
    borderRadius: 999,
    padding: "6px 16px 6px 6px",
  },
  profileChipAvatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "rgba(5,6,10,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileChipName: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#E8FFF9",
  },
  profileChipTag: { fontSize: 10, letterSpacing: 1 },
  countOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(5,6,10,0.5)",
    zIndex: 10,
  },
  countNum: { fontFamily: "'Orbitron',sans-serif", fontSize: 64 },
  countLabel: { fontSize: 13, letterSpacing: 3, marginTop: 8 },
  resultCard: {
    background: "rgba(123,97,255,0.08)",
    border: "1px solid rgba(123,97,255,0.25)",
    borderRadius: 16,
    padding: "18px 28px",
    minWidth: 260,
    marginTop: 18,
    marginBottom: 8,
  },
  resultRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    letterSpacing: 1,
    padding: "8px 0",
    fontFamily: "'Orbitron',sans-serif",
  },
  adCard: {
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: "16px 20px",
    width: "100%",
    maxWidth: 300,
    textAlign: "center",
    marginBottom: 12,
  },
  adTitle: {
    fontFamily: "'Orbitron',sans-serif",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 6,
  },
  adSub: { fontSize: 12, color: "#7B8CA3", marginBottom: 12 },
  adBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "none",
    borderRadius: 10,
    padding: "12px 22px",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1,
    width: "100%",
    color: "#E8FFF9",
  },
  adWatchBox: { width: "100%" },
  adFakeAd: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 18px",
    borderBottom: "1px solid rgba(123,97,255,0.15)",
    zIndex: 2,
  },
  backBtn: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    padding: 8,
    display: "flex",
  },
  topBarTitle: {
    fontFamily: "'Orbitron',sans-serif",
    fontSize: 15,
    letterSpacing: 3,
  },
  tabRow: { display: "flex", gap: 6, padding: "14px 18px 0" },
  tabBtn: {
    flex: 1,
    background: "transparent",
    color: "#7B61FF",
    border: "1px solid rgba(123,97,255,0.25)",
    borderRadius: 10,
    padding: "10px 0",
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 600,
  },
  catRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 },
  catChip: {
    borderRadius: 999,
    padding: "6px 12px",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    background: "transparent",
  },
  listScroll: {
    flex: 1,
    overflowY: "auto",
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  storeRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: "12px 14px",
  },
  emojiThumb: {
    fontSize: 28,
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.5,
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  itemSub: { fontSize: 11, color: "#7B8CA3", marginTop: 2, letterSpacing: 0.5 },
  badge: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1,
    padding: "2px 6px",
    borderRadius: 4,
    color: "#E8FFF9",
  },
  smallBtn: {
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
  },
  smallBtnGhost: {
    background: "transparent",
    borderRadius: 8,
    padding: "7px 13px",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1,
    border: "1px solid",
  },
  clanRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: "12px 14px",
  },
  clanRank: {
    fontFamily: "'Orbitron',sans-serif",
    fontSize: 16,
    width: 22,
    textAlign: "center",
  },
  clanTag: {
    fontFamily: "'Orbitron',sans-serif",
    fontSize: 10,
    border: "1px solid",
    borderRadius: 6,
    padding: "3px 6px",
    flexShrink: 0,
  },
  profileHero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 0 22px",
  },
  profileAvatarBig: {
    width: 110,
    height: 110,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  nameDisplayBtn: {
    background: "transparent",
    display: "flex",
    alignItems: "center",
  },
  profileName: {
    fontFamily: "'Orbitron',sans-serif",
    fontSize: 18,
    letterSpacing: 2,
    color: "#E8FFF9",
  },
  nameEditRow: { display: "flex", alignItems: "center", gap: 8 },
  nameInput: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid #00F0FF",
    borderRadius: 8,
    padding: "8px 12px",
    color: "#E8FFF9",
    fontFamily: "'Orbitron',sans-serif",
    fontSize: 14,
    letterSpacing: 1,
    width: 160,
  },
  profileTagRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
    fontSize: 12,
    letterSpacing: 1,
  },
  xpBarOuter: {
    width: 240,
    height: 8,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 16,
    border: "1px solid rgba(123,97,255,0.2)",
  },
  xpBarInner: { height: "100%", borderRadius: 999, transition: "width 0.4s" },
  xpLabel: { fontSize: 11, color: "#7B8CA3", letterSpacing: 1, marginTop: 8 },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 22,
  },
  statTile: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: "14px 12px",
    textAlign: "center",
  },
  statValue: { fontFamily: "'Orbitron',sans-serif", fontSize: 18 },
  statLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: "#7B8CA3",
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#7B61FF",
    marginBottom: 10,
    marginTop: 4,
  },
  figureGridCell: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "1",
  },
};
