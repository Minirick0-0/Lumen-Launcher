<template>
  <div class="mc-panorama" :class="themeClass">
    <div class="mc-panorama__scroll">
      <!-- Sky gradient layer -->
      <div class="mc-panorama__sky" />

      <!-- Terrain SVG silhouettes -->
      <div class="mc-panorama__terrain">
        <svg
          class="mc-panorama__svg"
          viewBox="0 0 2400 520"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <!-- Far mountain fog gradient -->
            <linearGradient id="mtnFarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="theme.mountainFar" stop-opacity="0.7" />
              <stop offset="100%" :stop-color="theme.mountainFar" stop-opacity="1" />
            </linearGradient>
            <!-- Mid mountain gradient -->
            <linearGradient id="mtnMidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="theme.mountainMid" stop-opacity="0.85" />
              <stop offset="100%" :stop-color="theme.mountainMid" stop-opacity="1" />
            </linearGradient>
            <!-- Ground gradient -->
            <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="theme.groundTop" />
              <stop offset="100%" :stop-color="theme.groundBottom" />
            </linearGradient>
            <!-- Clouds -->
            <filter id="cloudBlur">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          <!-- Distant mountain range -->
          <polygon
            points="0,340 120,210 280,270 440,155 600,230 760,120 920,200 1080,145 1240,215 1400,130 1560,200 1720,155 1880,215 2040,140 2200,200 2400,170 2400,520 0,520"
            fill="url(#mtnFarGrad)"
          />

          <!-- Mid mountain range -->
          <polygon
            points="0,420 100,360 200,385 320,340 440,370 560,335 680,365 800,330 920,360 1040,345 1160,375 1280,340 1400,372 1520,348 1640,375 1760,342 1880,368 2000,345 2120,370 2240,350 2400,360 2400,520 0,520"
            fill="url(#mtnMidGrad)"
          />

          <!-- Tree silhouettes (near) -->
          <g :fill="theme.trees">
            <!-- Left cluster -->
            <rect x="30" y="435" width="8" height="40" />
            <polygon points="20,430 38,410 56,430" />
            <polygon points="22,445 38,420 54,445" />

            <rect x="70" y="440" width="6" height="38" />
            <polygon points="62,436 73,418 84,436" />

            <rect x="100" y="432" width="9" height="42" />
            <polygon points="90,428 104,405 118,428" />
            <polygon points="92,444 104,418 116,444" />

            <!-- Scattered mid -->
            <rect x="280" y="437" width="7" height="38" />
            <polygon points="272,433 284,414 296,433" />

            <rect x="340" y="434" width="8" height="40" />
            <polygon points="331,430 344,410 357,430" />
            <polygon points="333,445 344,422 355,445" />

            <rect x="420" y="438" width="6" height="36" />
            <polygon points="414,434 423,416 432,434" />

            <!-- Right cluster -->
            <rect x="580" y="436" width="8" height="40" />
            <polygon points="571,432 584,412 597,432" />
            <polygon points="573,448 584,424 595,448" />

            <rect x="640" y="440" width="7" height="36" />
            <polygon points="633,436 644,418 655,436" />

            <rect x="700" y="434" width="9" height="42" />
            <polygon points="690,430 704,408 718,430" />

            <!-- Second repetition offset -->
            <rect x="830" y="435" width="8" height="40" />
            <polygon points="820,430 838,410 856,430" />

            <rect x="870" y="440" width="6" height="38" />
            <polygon points="862,436 873,418 884,436" />

            <rect x="950" y="432" width="9" height="42" />
            <polygon points="940,428 954,405 968,428" />
            <polygon points="942,444 954,418 966,444" />

            <rect x="1080" y="437" width="7" height="38" />
            <polygon points="1072,433 1084,414 1096,433" />

            <rect x="1140" y="434" width="8" height="40" />
            <polygon points="1131,430 1144,410 1157,430" />

            <rect x="1280" y="436" width="8" height="40" />
            <polygon points="1271,432 1284,412 1297,432" />

            <rect x="1340" y="440" width="7" height="36" />
            <polygon points="1333,436 1344,418 1355,436" />

            <rect x="1400" y="434" width="9" height="42" />
            <polygon points="1390,430 1404,408 1418,430" />

            <rect x="1480" y="435" width="8" height="40" />
            <polygon points="1470,430 1488,410 1506,430" />

            <rect x="1520" y="440" width="6" height="38" />
            <polygon points="1512,436 1523,418 1534,436" />

            <rect x="1600" y="432" width="9" height="42" />
            <polygon points="1590,428 1604,405 1618,428" />
            <polygon points="1592,444 1604,418 1616,444" />

            <rect x="1780" y="437" width="7" height="38" />
            <polygon points="1772,433 1784,414 1796,433" />

            <rect x="1840" y="434" width="8" height="40" />
            <polygon points="1831,430 1844,410 1857,430" />

            <rect x="1980" y="436" width="8" height="40" />
            <polygon points="1971,432 1984,412 1997,432" />

            <rect x="2040" y="440" width="7" height="36" />
            <polygon points="2033,436 2044,418 2055,436" />

            <rect x="2100" y="434" width="9" height="42" />
            <polygon points="2090,430 2104,408 2118,430" />

            <rect x="2280" y="435" width="8" height="40" />
            <polygon points="2270,430 2288,410 2306,430" />

            <rect x="2330" y="440" width="6" height="38" />
            <polygon points="2322,436 2333,418 2344,436" />
          </g>

          <!-- Ground layer -->
          <rect x="0" y="472" width="2400" height="48" fill="url(#groundGrad)" />
        </svg>
      </div>

      <!-- Clouds -->
      <div class="mc-panorama__clouds">
        <svg
          class="mc-panorama__clouds-svg"
          viewBox="0 0 2400 200"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g :fill="theme.clouds" fill-opacity="0.55" filter="url(#cloudBlur)">
            <ellipse cx="200" cy="60" rx="80" ry="28" />
            <ellipse cx="250" cy="48" rx="55" ry="22" />
            <ellipse cx="155" cy="52" rx="45" ry="18" />

            <ellipse cx="600" cy="80" rx="100" ry="32" />
            <ellipse cx="660" cy="66" rx="70" ry="26" />
            <ellipse cx="545" cy="74" rx="55" ry="20" />

            <ellipse cx="1000" cy="55" rx="90" ry="30" />
            <ellipse cx="1060" cy="42" rx="60" ry="22" />
            <ellipse cx="950" cy="50" rx="48" ry="18" />

            <ellipse cx="1400" cy="70" rx="110" ry="34" />
            <ellipse cx="1470" cy="55" rx="75" ry="27" />
            <ellipse cx="1340" cy="65" rx="60" ry="22" />

            <ellipse cx="1800" cy="62" rx="85" ry="29" />
            <ellipse cx="1855" cy="50" rx="58" ry="22" />
            <ellipse cx="1750" cy="56" rx="48" ry="18" />

            <ellipse cx="2200" cy="75" rx="95" ry="31" />
            <ellipse cx="2260" cy="60" rx="65" ry="24" />
            <ellipse cx="2145" cy="70" rx="52" ry="20" />
          </g>
        </svg>
      </div>
    </div>
    <!-- Vignette overlay -->
    <div class="mc-panorama__vignette" />
  </div>
</template>

<script lang="ts" setup>
interface PanoramaTheme {
  skyTop: string
  skyBottom: string
  mountainFar: string
  mountainMid: string
  trees: string
  groundTop: string
  groundBottom: string
  clouds: string
}

const props = defineProps<{
  minecraftVersion?: string
}>()

const themes: Record<string, PanoramaTheme> = {
  classic: {
    skyTop: '#1a2a5e',
    skyBottom: '#4a7cc7',
    mountainFar: '#2d4a7a',
    mountainMid: '#2a4a2e',
    trees: '#1a2e1a',
    groundTop: '#3a6b2a',
    groundBottom: '#2a4a1e',
    clouds: '#d8e8f8',
  },
  mesa: {
    skyTop: '#1a2a5e',
    skyBottom: '#6a90cc',
    mountainFar: '#6a3a1e',
    mountainMid: '#8a4a2e',
    trees: '#2e1a0e',
    groundTop: '#a06030',
    groundBottom: '#6a3a1e',
    clouds: '#f0e0d0',
  },
  nether: {
    skyTop: '#2a0808',
    skyBottom: '#8a2010',
    mountainFar: '#6a1a08',
    mountainMid: '#4a1008',
    trees: '#8a3010',
    groundTop: '#7a2010',
    groundBottom: '#3a0808',
    clouds: '#d04020',
  },
  deepcave: {
    skyTop: '#050a14',
    skyBottom: '#0a1a3a',
    mountainFar: '#0a1428',
    mountainMid: '#0e1e30',
    trees: '#0a0e14',
    groundTop: '#1a2a40',
    groundBottom: '#0a1428',
    clouds: '#2a4a70',
  },
  cherry: {
    skyTop: '#2a0a1e',
    skyBottom: '#c060a0',
    mountainFar: '#6a1a4a',
    mountainMid: '#3a1030',
    trees: '#8a2060',
    groundTop: '#e080b0',
    groundBottom: '#8a3060',
    clouds: '#f0c0e0',
  },
}

const themeClass = computed(() => {
  const ver = props.minecraftVersion || ''
  const parts = ver.split('.').map(Number)
  const major = parts[0] ?? 0
  const minor = parts[1] ?? 0

  if (major >= 26 || (major === 1 && minor >= 20)) return 'mc-panorama--cherry'
  if (major === 1 && minor >= 18) return 'mc-panorama--deepcave'
  if (major === 1 && minor >= 16) return 'mc-panorama--nether'
  if (major === 1 && minor >= 8) return 'mc-panorama--mesa'
  return ''
})

const theme = computed((): PanoramaTheme => {
  const ver = props.minecraftVersion || ''
  const parts = ver.split('.').map(Number)
  const major = parts[0] ?? 0
  const minor = parts[1] ?? 0

  if (major >= 26 || (major === 1 && minor >= 20)) return themes.cherry
  if (major === 1 && minor >= 18) return themes.deepcave
  if (major === 1 && minor >= 16) return themes.nether
  if (major === 1 && minor >= 8) return themes.mesa
  return themes.classic
})
</script>

<style scoped>
.mc-panorama {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.mc-panorama__scroll {
  position: absolute;
  inset: 0;
  width: 300%;
  height: 100%;
  animation: mcPanoramaPan 60s linear infinite alternate;
  will-change: transform;
}

@keyframes mcPanoramaPan {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-66.666%); }
}

/* Sky — gradient set per-theme via the class */
.mc-panorama__sky {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, var(--sky-top, #1a2a5e) 0%, var(--sky-bottom, #4a7cc7) 68%, var(--sky-bottom, #4a7cc7) 100%);
}

/* Theme CSS variables */
.mc-panorama { --sky-top: #1a2a5e; --sky-bottom: #4a7cc7; }
.mc-panorama--mesa { --sky-top: #1a2a5e; --sky-bottom: #6a90cc; }
.mc-panorama--nether { --sky-top: #2a0808; --sky-bottom: #8a2010; }
.mc-panorama--deepcave { --sky-top: #050a14; --sky-bottom: #0a1a3a; }
.mc-panorama--cherry { --sky-top: #2a0a1e; --sky-bottom: #c060a0; }

.mc-panorama__terrain {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
}

.mc-panorama__svg {
  width: 100%;
  height: 100%;
}

.mc-panorama__clouds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45%;
  animation: mcCloudsDrift 90s linear infinite;
}

@keyframes mcCloudsDrift {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-8%); }
}

.mc-panorama__clouds-svg {
  width: 100%;
  height: 100%;
}

.mc-panorama__vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%),
    linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.35) 100%);
  pointer-events: none;
}
</style>
