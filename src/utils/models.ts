export type Tower = {
  id: number;
  name: string;
  createdAt: string; // IndexedDBではDateは文字列として保存される
  currentFloor?: number;
  attackPoint?: number;
  monsterHp?: number;
  lastPlayedAt?: string;
  playerImage?: string;
}
