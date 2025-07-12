// プレイヤー画像のリスト
const PLAYER_IMAGES = [
  '/players/player_001.png',
  '/players/player_002.png',
];

// ランダムにプレイヤー画像を選択
export const getRandomPlayerImage = (): string => {
  const randomIndex = Math.floor(Math.random() * PLAYER_IMAGES.length);
  return PLAYER_IMAGES[randomIndex];
};

// デフォルトのプレイヤー画像
export const getDefaultPlayerImage = (): string => {
  return '/players/player_001.png';
};