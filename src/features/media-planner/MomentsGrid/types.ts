// Shape of one moment card, published by the legacy mp2RenderMomentCards() on
// window.mp2MomentCardsData. The legacy window functions the cards call back
// into are declared here too (single source of truth for the grid's globals).
export type MomentCardData = {
  name: string;
  score: number;
  assets: number;
  impM: string | number;
  cpm: number;
  inventory: number;
  channels: string[];
  refined: boolean;
  isHigh: boolean;
  supplyType: 'ads' | 'organic' | 'live';
};

declare global {
  interface Window {
    mp2MomentCardsData?: MomentCardData[];
    mp2NotifyMomentsGrid?: () => void;
    mp2SelectedMoments?: Record<string, boolean>;
    mp2ToggleMomentCard?: (name: string) => void;
    mp2OpenMomentModal?: (name: string, score: number, assets: number) => void;
    mp2ShowExamples?: (name: string, score: number, assets: number, btn: HTMLElement) => void;
    mp2ResetCard?: (name: string) => void;
  }
}
