export const DEFAULT_COLORS = [
  '#4A90E2', // Blue
  '#7ED321', // Green
  '#F5A623', // Orange
  '#D0021B', // Red
  '#BD10E0', // Purple
  '#F8E71C', // Yellow
  '#50E3C2', // Teal
  '#B8E986', // Light Green
  '#9013FE', // Violet
  '#417505', // Dark Green
  '#E94B3C', // Coral
  '#0E5A8A', // Navy
];

export const getRandomColor = (): string => {
  return DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];
};
