// モンスター画像のリスト
const MONSTER_IMAGES = [
  '/monsters/monster_001.png',
  '/monsters/monster_002.png',
  '/monsters/monster_003.png',
  '/monsters/monster_004.png',
  '/monsters/monster_005.png',
  '/monsters/monster_006.png',
  '/monsters/monster_007.png',
];

// フロア番号からシードを生成し、一貫したランダム値を返す
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// フロア番号に基づいてモンスター画像を取得
export const getMonsterImageByFloor = (floor: number): string => {
  const randomIndex = Math.floor(seededRandom(floor) * MONSTER_IMAGES.length);
  return MONSTER_IMAGES[randomIndex];
};