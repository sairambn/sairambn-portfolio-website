/** Thock audio engine for vintage keyboard */

import { AUDIO_SAMPLE } from '@/components/ui/vintage-keyboard-sample';

export type SoundCategory = "normal" | "spacebar" | "modifier";

interface ThockEngine {
  ctx: AudioContext;
  dry: GainNode;
  wet: GainNode;
  supportsPanning: boolean;
  buffer: AudioBuffer | null;
}

let thockEngine: ThockEngine | null = null;
let thockEnginePromise: Promise<ThockEngine | null> | null = null;

function buildCaseImpulse(ctx: AudioContext): AudioBuffer {
  const duration = 0.18;
  const length = Math.ceil(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < length; i++) {
      const t = i / length;
      const decay = Math.pow(1 - t, 2.8);
      const raw = (Math.random() * 2 - 1) * decay;
      lp += (raw - lp) * 0.3;
      data[i] = lp;
    }
  }
  return buffer;
}

/** Procedural key thock — works in every browser (no Ogg needed). */
function buildSyntheticThock(ctx: AudioContext): AudioBuffer {
  const duration = 0.09;
  const sampleRate = ctx.sampleRate;
  const length = Math.ceil(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    // Fast click transient
    const click = Math.exp(-t * 180) * (Math.random() * 2 - 1) * 0.55;
    // Body / thock body around ~180–320 Hz range via noise + envelope
    const body =
      Math.exp(-t * 42) *
      Math.sin(2 * Math.PI * (210 + t * 40) * t) *
      0.35;
    // Soft low rumble
    const rumble =
      Math.exp(-t * 28) * Math.sin(2 * Math.PI * 95 * t) * 0.22;
    data[i] = click + body + rumble;
  }
  return buffer;
}

function base64ToArrayBuffer(dataUri: string): ArrayBuffer | null {
  try {
    const commaIndex = dataUri.indexOf(",");
    const base64 = commaIndex >= 0 ? dataUri.slice(commaIndex + 1) : dataUri;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  } catch {
    return null;
  }
}

async function decodeSample(
  ctx: AudioContext,
  dataUri: string,
): Promise<AudioBuffer | null> {
  const arrayBuffer = base64ToArrayBuffer(dataUri);
  if (!arrayBuffer || arrayBuffer.byteLength === 0) return null;
  try {
    // copy so the buffer can be decoded again if needed
    const copy = arrayBuffer.slice(0);
    return await ctx.decodeAudioData(copy);
  } catch {
    return null;
  }
}

async function unlockContext(ctx: AudioContext) {
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      // ignore — will retry on next press
    }
  }
}

export function getThockEngine(): Promise<ThockEngine | null> {
  if (thockEngine) return Promise.resolve(thockEngine);
  if (thockEnginePromise) return thockEnginePromise;

  thockEnginePromise = (async () => {
    if (typeof window === "undefined") return null;
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;

    const ctx = new Ctor();

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 10;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.08;

    const master = ctx.createGain();
    master.gain.value = 1.0;
    compressor.connect(master);
    master.connect(ctx.destination);

    const dry = ctx.createGain();
    dry.gain.value = 0.9;
    dry.connect(compressor);

    const wet = ctx.createGain();
    wet.gain.value = 0.28;
    const convolver = ctx.createConvolver();
    convolver.normalize = true;
    convolver.buffer = buildCaseImpulse(ctx);
    wet.connect(convolver);
    convolver.connect(compressor);

    // Prefer real sample; fall back to synthetic (Safari cannot decode Ogg)
    let buffer = await decodeSample(ctx, AUDIO_SAMPLE);
    if (!buffer) {
      buffer = buildSyntheticThock(ctx);
    }

    const engine: ThockEngine = {
      ctx,
      dry,
      wet,
      supportsPanning: typeof ctx.createStereoPanner === "function",
      buffer,
    };
    thockEngine = engine;
    return engine;
  })();

  return thockEnginePromise;
}

const CATEGORY_PROFILE: Record<
  SoundCategory,
  { rate: [number, number]; gain: number; filterHz: number | null }
> = {
  normal: { rate: [0.97, 1.04], gain: 0.95, filterHz: null },
  spacebar: { rate: [0.72, 0.78], gain: 1.15, filterHz: 1600 },
  modifier: { rate: [0.86, 0.92], gain: 0.78, filterHz: 3000 },
};

export function playKeySound(
  category: SoundCategory,
  muted: boolean,
  panHint = 0,
) {
  if (typeof window === "undefined") return;

  void getThockEngine().then(async (engine) => {
    if (!engine || !engine.buffer) return;
    const { ctx, dry, wet, supportsPanning, buffer } = engine;

    await unlockContext(ctx);
    if (ctx.state === "suspended") return;

    const profile = CATEGORY_PROFILE[category];
    const now = ctx.currentTime;

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const [minRate, maxRate] = profile.rate;
    src.playbackRate.value = minRate + Math.random() * (maxRate - minRate);

    const gain = ctx.createGain();
    const baseGain = muted ? profile.gain * 0.75 : profile.gain;
    gain.gain.value = baseGain * (0.96 + Math.random() * 0.08);

    const nodes: AudioNode[] = [src, gain];
    src.connect(gain);
    let tail: AudioNode = gain;

    if (profile.filterHz) {
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = profile.filterHz;
      filter.Q.value = 0.7;
      tail.connect(filter);
      tail = filter;
      nodes.push(filter);
    }

    if (supportsPanning) {
      const panner = ctx.createStereoPanner();
      panner.pan.value = Math.max(
        -1,
        Math.min(1, panHint + (Math.random() - 0.5) * 0.08),
      );
      tail.connect(panner);
      tail = panner;
      nodes.push(panner);
    }

    tail.connect(dry);
    tail.connect(wet);

    src.onended = () => {
      for (const node of nodes) node.disconnect();
    };
    src.start(now);
  });
}
