import { Level } from '@death-tower/core/interfaces';

export const LEVELS: Level[] = [
  {
    id: 'training',
    name: 'Treino',
    platforms: {
      x: { min: 20, max: 20 },
      y: { min: 20, max: 20 },
    },
    jump: 0.6,
    acceleration: 0.04,
    speed: { min: 0.01, max: 0.12 },
    seconds: 60,
  },
  {
    id: 'easy',
    name: 'Fácil',
    platforms: {
      x: { min: 30, max: 40 },
      y: { min: 30, max: 30 },
    },
    jump: 0.6,
    acceleration: 0.04,
    speed: { min: 0.01, max: 0.12 },
    seconds: 60,
  },
  {
    id: 'medium',
    name: 'Médio',
    platforms: {
      x: { min: 20, max: 45 },
      y: { min: 20, max: 35 },
    },
    jump: 0.7,
    acceleration: 0.04,
    speed: { min: 0.01, max: 0.12 },
    seconds: 40,
  },
  {
    id: 'hard',
    name: 'Difícil',
    platforms: {
      x: { min: 15, max: 58 },
      y: { min: 15, max: 40 },
    },
    jump: 0.8,
    acceleration: 0.05,
    speed: { min: 0.01, max: 0.15 },
    seconds: 20,
  },
  {
    id: 'challenge',
    name: 'Desafio',
    platforms: {
      x: { min: 0, max: 0 },
      y: { min: 0, max: 0 },
    },
    jump: 0.8,
    acceleration: 0.05,
    speed: { min: 0.01, max: 0.15 },
    seconds: 0,
  },
];
