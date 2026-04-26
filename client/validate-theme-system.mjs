import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = 'src';
const effectsPath = 'src/styles/effects.css';
const configPath = 'src/themes/theme.config.ts';
const jsxExtensions = /\.(jsx|tsx|ts)$/;

const themeContracts = {
  thunderstorm: ['thunderstormLightningFlash', 'thunderstormThunderGlow', 'thunderstormUiFlicker', 'thunderstormRainLines'],
  'ice-storm': ['iceStormSnowFall', 'iceStormFrostGlass', 'iceStormIceGlow'],
  'sci-fi': ['sciFiGridBG', 'sciFiScanLine', 'sciFiNeonGlow', 'sciFiHudPulse'],
  'hellish-fire': ['hellishFireEmberRise', 'hellishFireFireGlow', 'hellishFireHeatDistort'],
  ai: ['aiNodePulse', 'aiLinkFlow', 'aiGridBG', 'aiDataStream'],
  anime: ['animeSkyGradient', 'animeSpeedLines', 'animeCelGlow', 'animeCharacterFrame'],
  windy: ['windyWindLines', 'windyDriftParticles', 'windyBgFlow', 'windySmoothEase'],
};

const requiredThemeClasses = {
  thunderstorm: ['thunderstorm-lightning-flash', 'thunderstorm-ui-flicker', 'thunderstorm-bg', 'thunderstorm-edge-glow'],
  'ice-storm': ['ice-storm-snow-flake', 'ice-storm-frost-glass', 'ice-storm-ice-glow'],
  'sci-fi': ['sci-fi-neon-glow', 'sci-fi-grid-bg', 'sci-fi-scan-line'],
  'hellish-fire': ['hellish-fire-fire-glow', 'hellish-fire-ember', 'hellish-fire-heat-distort'],
  ai: ['ai-node-pulse', 'ai-link-flow', 'ai-data-stream'],
  anime: ['anime-sky-gradient', 'anime-speed-line', 'anime-cel-glow'],
  windy: ['windy-wind-line', 'windy-drift-particle', 'windy-smooth-ease'],
};

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return walk(filePath);
    }
    return jsxExtensions.test(filePath) ? [filePath] : [];
  });
}

function extractClassAnimationMap(css) {
  const classAnimations = new Map();
  const classBlockPattern = /\.([a-zA-Z][\w-]*)[^{]*{([^{}]*(?:{[^{}]*}[^{}]*)*)}/g;
  let match;

  while ((match = classBlockPattern.exec(css))) {
    const className = match[1];
    const block = match[2];
    const animationMatches = [...block.matchAll(/animation(?:-name)?\s*:\s*([^;]+)/g)];
    const animations = animationMatches.flatMap((animationMatch) => {
      return animationMatch[1]
        .split(',')
        .map((chunk) => chunk.trim().split(/\s+/)[0])
        .filter(Boolean);
    });

    if (animations.length) {
      classAnimations.set(className, [...new Set([...(classAnimations.get(className) ?? []), ...animations])]);
    }
  }

  return classAnimations;
}

const css = fs.readFileSync(effectsPath, 'utf8');
const config = fs.readFileSync(configPath, 'utf8');
const mountedSource = walk(sourceRoot).map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const keyframes = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((match) => match[1]);
const classAnimationMap = extractClassAnimationMap(css);
const visibleProperties = ['transform', 'opacity', 'box-shadow', 'filter', 'background-position', 'border-color'];

const errors = [];

const missingKeyframeUsage = keyframes.filter((keyframe) => {
  return !new RegExp(`animation(?:-name)?\\s*:[^;{}]*\\b${keyframe}\\b`).test(css);
});
if (missingKeyframeUsage.length) {
  errors.push(`KEYFRAME_CHECK missing CSS usage: ${missingKeyframeUsage.join(', ')}`);
}

const mountedAnimationClasses = [...classAnimationMap.keys()].filter((className) => mountedSource.includes(className));
const unmountedAnimationClasses = [...classAnimationMap.keys()].filter((className) => !mountedSource.includes(className));
if (unmountedAnimationClasses.length) {
  errors.push(`KEYFRAME_CHECK animation classes not mounted: ${unmountedAnimationClasses.join(', ')}`);
}

const mountedKeyframes = new Set(
  mountedAnimationClasses.flatMap((className) => classAnimationMap.get(className) ?? []),
);
const unmountedKeyframes = keyframes.filter((keyframe) => !mountedKeyframes.has(keyframe));
if (unmountedKeyframes.length) {
  errors.push(`KEYFRAME_CHECK keyframes not reachable from mounted classes: ${unmountedKeyframes.join(', ')}`);
}

const invisibleKeyframes = keyframes.filter((keyframe) => {
  const block = css.match(new RegExp(`@keyframes\\s+${keyframe}\\s*{([\\s\\S]*?)\\n}`))?.[1] ?? '';
  return !visibleProperties.some((property) => block.includes(property));
});
if (invisibleKeyframes.length) {
  errors.push(`VISIBILITY_CHECK weak keyframes: ${invisibleKeyframes.join(', ')}`);
}

const missingLayers = ['background', 'effect', 'ui'].filter((layer) => !mountedSource.includes(`data-layer="${layer}"`));
if (missingLayers.length) {
  errors.push(`LAYER_CHECK missing layers: ${missingLayers.join(', ')}`);
}

for (const [themeId, requiredKeyframes] of Object.entries(themeContracts)) {
  const missingKeyframes = requiredKeyframes.filter((keyframe) => !keyframes.includes(keyframe));
  const missingMountedKeyframes = requiredKeyframes.filter((keyframe) => !mountedKeyframes.has(keyframe));
  const missingClasses = requiredThemeClasses[themeId].filter((className) => !mountedSource.includes(className));

  if (requiredKeyframes.length < 3) {
    errors.push(`THEME_CHECK ${themeId} has fewer than 3 required animations`);
  }
  if (missingKeyframes.length) {
    errors.push(`THEME_CHECK ${themeId} missing keyframes: ${missingKeyframes.join(', ')}`);
  }
  if (missingMountedKeyframes.length) {
    errors.push(`THEME_CHECK ${themeId} keyframes not mounted: ${missingMountedKeyframes.join(', ')}`);
  }
  if (missingClasses.length) {
    errors.push(`THEME_CHECK ${themeId} missing required mounted classes: ${missingClasses.join(', ')}`);
  }
}

const tokenPairs = [...config.matchAll(/--bg': '([^']+)'[\s\S]*?--accent': '([^']+)'/g)].map((match) => {
  return `${match[1]}|${match[2]}`;
});
const duplicateTokenPairs = tokenPairs.length - new Set(tokenPairs).size;
if (duplicateTokenPairs) {
  errors.push('THEME_CHECK duplicate bg/accent token pairs');
}

const brokenAnchors = [...mountedSource.matchAll(/href="#([^"]+)"/g)]
  .map((match) => match[1])
  .filter((id) => !mountedSource.includes(`id="${id}"`));
if (brokenAnchors.length) {
  errors.push(`BUILD_CHECK broken anchors: ${[...new Set(brokenAnchors)].join(', ')}`);
}

if (mountedSource.includes('theme-${themeId}')) {
  errors.push('BUILD_CHECK dynamic Tailwind class theme-${themeId} is not statically generated');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('KEYFRAME_CHECK PASS');
console.log('VISIBILITY_CHECK PASS');
console.log('LAYER_CHECK PASS');
console.log('THEME_CHECK PASS');
console.log('BUILD_CHECK PASS');
console.log(`KEYFRAMES ${keyframes.length}`);
console.log(`MOUNTED_ANIMATION_CLASSES ${mountedAnimationClasses.length}`);
