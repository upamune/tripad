export interface Memo {
  id: number;
  content: string;
}

export interface MemoState {
  activeTab: number;
  memos: Memo[];
}