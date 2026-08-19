/** Thock audio engine for vintage keyboard */

import { AUDIO_SAMPLE } from '@/components/ui/vintage-keyboard-assets';

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
  const duration = 0.2;
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
    return await ctx.decodeAudioData(arrayBuffer);
  } catch {
    return null;
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
    compressor.threshold.value = -20;
    compressor.knee.value = 12;
    compressor.ratio.value = 5;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.08;

    const master = ctx.createGain();
    master.gain.value = 0.9;
    compressor.connect(master);
    master.connect(ctx.destination);

    const dry = ctx.createGain();
    dry.gain.value = 0.85;
    dry.connect(compressor);

    const wet = ctx.createGain();
    wet.gain.value = 0.3;
    const convolver = ctx.createConvolver();
    convolver.normalize = true;
    convolver.buffer = buildCaseImpulse(ctx);
    wet.connect(convolver);
    convolver.connect(compressor);

    const buffer = await decodeSample(ctx, AUDIO_SAMPLE);

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
  normal: { rate: [0.97, 1.04], gain: 0.85, filterHz: null },
  spacebar: { rate: [0.72, 0.78], gain: 1.0, filterHz: 1600 },
  modifier: { rate: [0.86, 0.92], gain: 0.68, filterHz: 3000 },
};

export function playKeySound(category: SoundCategory, muted: boolean, panHint = 0) {
  if (typeof window === "undefined") return;
  getThockEngine().then((engine) => {
    if (!engine || !engine.buffer) return;
    const { ctx, dry, wet, supportsPanning, buffer } = engine;
    if (ctx.state === "suspended") void ctx.resume();

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
