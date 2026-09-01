export type BowlSize = 'single-s' | 'duo-s';
export type BowlColor = 'crema' | 'oliva' | 'negro' | 'rosado' | 'lila';

export interface ConfiguratorState {
  size: BowlSize;
  color: BowlColor;
  customName: string;
}