type SoundName = "roll" | "select" | "winner";

const frequencies: Record<SoundName, number[]> = {
  roll: [130, 164, 196],
  select: [523, 659, 784],
  winner: [392, 523, 659, 1046]
};

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  audioContext ??= new AudioContext();
  return audioContext;
};

export const playSound = (name: SoundName) => {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  frequencies[name].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = name === "roll" ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.001, now + index * 0.075);
    gain.gain.exponentialRampToValueAtTime(name === "roll" ? 0.08 : 0.14, now + index * 0.075 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.075 + 0.16);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now + index * 0.075);
    oscillator.stop(now + index * 0.075 + 0.18);
  });
};
