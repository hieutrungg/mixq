import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const sampleRate = 24_000
const durationSeconds = 16
const sampleCount = sampleRate * durationSeconds
const outputDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../public/audio')

function createRandom(seed) {
  let value = seed >>> 0

  return () => {
    value += 0x6d2b79f5
    let result = value
    result = Math.imul(result ^ (result >>> 15), result | 1)
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61)
    return ((result ^ (result >>> 14)) >>> 0) / 4_294_967_296
  }
}

function createNoise(seed) {
  const random = createRandom(seed)
  return Float32Array.from({ length: sampleCount }, () => random() * 2 - 1)
}

function smoothCyclic(input, radius) {
  const output = new Float32Array(input.length)
  const windowSize = radius * 2 + 1
  let sum = 0

  for (let offset = -radius; offset <= radius; offset += 1) {
    sum += input[(offset + input.length) % input.length]
  }

  for (let index = 0; index < input.length; index += 1) {
    output[index] = sum / windowSize
    const leaving = (index - radius + input.length) % input.length
    const entering = (index + radius + 1) % input.length
    sum += input[entering] - input[leaving]
  }

  return output
}

function addTone(target, frequency, gain, phase = 0) {
  const cycles = Math.round(frequency * durationSeconds)

  for (let index = 0; index < target.length; index += 1) {
    target[index] += Math.sin((Math.PI * 2 * cycles * index) / target.length + phase) * gain
  }
}

function addEvent(target, centerSeconds, lengthSeconds, frequency, gain, noiseAmount = 0) {
  const start = Math.max(0, Math.floor((centerSeconds - lengthSeconds / 2) * sampleRate))
  const length = Math.floor(lengthSeconds * sampleRate)
  const random = createRandom(Math.floor(centerSeconds * 10_000 + frequency))

  for (let offset = 0; offset < length && start + offset < target.length; offset += 1) {
    const progress = offset / Math.max(1, length - 1)
    const envelope = Math.sin(Math.PI * progress) ** 2
    const tone = Math.sin((Math.PI * 2 * frequency * offset) / sampleRate)
    const noise = random() * 2 - 1
    target[start + offset] += (tone * (1 - noiseAmount) + noise * noiseAmount) * envelope * gain
  }
}

function normalize(samples, peak = 0.72) {
  let maximum = 0
  for (const sample of samples) maximum = Math.max(maximum, Math.abs(sample))
  const scale = maximum === 0 ? 1 : peak / maximum
  for (let index = 0; index < samples.length; index += 1) samples[index] *= scale
  return samples
}

function createRain() {
  const fine = smoothCyclic(createNoise(11), 2)
  const body = smoothCyclic(createNoise(12), 18)
  const output = new Float32Array(sampleCount)

  for (let index = 0; index < sampleCount; index += 1) {
    const pulse = 0.82 + Math.sin((Math.PI * 2 * 3 * index) / sampleCount) * 0.12
    output[index] = (fine[index] * 0.72 + body[index] * 0.85) * pulse
  }
  return normalize(output, 0.62)
}

function createCafe() {
  const room = smoothCyclic(createNoise(21), 85)
  const voices = smoothCyclic(createNoise(22), 24)
  const output = new Float32Array(sampleCount)

  for (let index = 0; index < sampleCount; index += 1) {
    output[index] = room[index] * 2.3 + voices[index] * 0.8
  }
  addTone(output, 60, 0.018)
  ;[2.4, 6.9, 11.7, 14.2].forEach((time, index) =>
    addEvent(output, time, 0.11, 1_100 + index * 170, 0.16, 0.08),
  )
  return normalize(output, 0.54)
}

function createFireplace() {
  const rumble = smoothCyclic(createNoise(31), 40)
  const hiss = smoothCyclic(createNoise(32), 4)
  const output = new Float32Array(sampleCount)

  for (let index = 0; index < sampleCount; index += 1) {
    const flicker = 0.68 + Math.sin((Math.PI * 2 * 7 * index) / sampleCount) * 0.22
    output[index] = (rumble[index] * 1.8 + hiss[index] * 0.24) * flicker
  }
  ;[1.3, 2.8, 5.1, 7.7, 9.4, 12.1, 14.5].forEach((time, index) =>
    addEvent(output, time, 0.035 + (index % 3) * 0.012, 220 + index * 13, 0.42, 0.82),
  )
  return normalize(output, 0.68)
}

function createForest() {
  const canopy = smoothCyclic(createNoise(41), 65)
  const leaves = smoothCyclic(createNoise(42), 9)
  const output = new Float32Array(sampleCount)

  for (let index = 0; index < sampleCount; index += 1) {
    const breeze = 0.55 + Math.sin((Math.PI * 2 * 2 * index) / sampleCount) * 0.28
    output[index] = canopy[index] * 1.6 + leaves[index] * 0.34 * breeze
  }
  ;[2.2, 4.8, 8.6, 12.9].forEach((time, index) => {
    addEvent(output, time, 0.22, 1_520 + index * 190, 0.16)
    addEvent(output, time + 0.28, 0.18, 1_850 + index * 160, 0.12)
  })
  return normalize(output, 0.5)
}

function createOcean() {
  const wash = smoothCyclic(createNoise(51), 105)
  const foam = smoothCyclic(createNoise(52), 5)
  const output = new Float32Array(sampleCount)

  for (let index = 0; index < sampleCount; index += 1) {
    const wave = (1 - Math.cos((Math.PI * 2 * 4 * index) / sampleCount)) / 2
    const swell = 0.18 + wave * 0.82
    output[index] = wash[index] * 2.4 * swell + foam[index] * 0.35 * wave ** 2
  }
  return normalize(output, 0.6)
}

function createKeyboard() {
  const room = smoothCyclic(createNoise(61), 120)
  const output = new Float32Array(sampleCount)

  for (let index = 0; index < sampleCount; index += 1) output[index] = room[index] * 0.28
  ;[1.1, 1.35, 2.4, 3.8, 4.05, 5.7, 6.8, 7.05, 8.9, 10.2, 10.48, 12.4, 13.7, 14.1]
    .forEach((time, index) => addEvent(output, time, 0.028, 820 + (index % 5) * 95, 0.42, 0.72))
  return normalize(output, 0.64)
}

function encodeWave(samples) {
  const dataSize = samples.length * 2
  const buffer = Buffer.alloc(44 + dataSize)
  buffer.write('RIFF', 0)
  buffer.writeUInt32LE(36 + dataSize, 4)
  buffer.write('WAVE', 8)
  buffer.write('fmt ', 12)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(1, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(sampleRate * 2, 28)
  buffer.writeUInt16LE(2, 32)
  buffer.writeUInt16LE(16, 34)
  buffer.write('data', 36)
  buffer.writeUInt32LE(dataSize, 40)

  for (let index = 0; index < samples.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, samples[index]))
    buffer.writeInt16LE(Math.round(sample * 32_767), 44 + index * 2)
  }
  return buffer
}

const soundGenerators = {
  rain: createRain,
  cafe: createCafe,
  fireplace: createFireplace,
  forest: createForest,
  'ocean-waves': createOcean,
  keyboard: createKeyboard,
}

mkdirSync(outputDirectory, { recursive: true })

for (const [name, createSound] of Object.entries(soundGenerators)) {
  const samples = createSound()
  let meanStep = 0
  for (let index = 1; index < samples.length; index += 1) {
    meanStep += Math.abs(samples[index] - samples[index - 1])
  }
  meanStep /= samples.length - 1
  const boundaryStep = Math.abs(samples[0] - samples.at(-1))
  const boundaryRatio = boundaryStep / Math.max(meanStep, Number.EPSILON)

  if (boundaryRatio > 5) {
    throw new Error(`${name} has an abrupt loop boundary (${boundaryRatio.toFixed(2)}x mean step).`)
  }

  const outputPath = resolve(outputDirectory, `${name}.wav`)
  writeFileSync(outputPath, encodeWave(samples))
  console.log(`${name}.wav: ${durationSeconds}s, boundary ${boundaryRatio.toFixed(2)}x mean step`)
}

