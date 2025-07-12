import { useState, useCallback, useEffect } from 'react';
import { updateTower } from '../utils/indexedDB';
import type { Tower } from '../utils/models';

interface GameState {
  attackPoint: number;
  currentFloor: number;
  monsterHp: number;
  monsterMaxHp: number;
  isAttacking: boolean;
  isEnemyHit: boolean;
  isButtonDisabled: boolean;
  lastDamage: number;
  showDamage: boolean;
}

const INITIAL_AP = 10;
const HP_PER_FLOOR = 100;
const DAMAGE_MIN = 20;
const DAMAGE_MAX = 40;
const AP_COST = 1;

export const useGameLogic = (tower?: Tower) => {
  const [gameState, setGameState] = useState<GameState>({
    attackPoint: INITIAL_AP,
    currentFloor: 1,
    monsterHp: HP_PER_FLOOR,
    monsterMaxHp: HP_PER_FLOOR,
    isAttacking: false,
    isEnemyHit: false,
    isButtonDisabled: false,
    lastDamage: 0,
    showDamage: false,
  });

  // towerデータが読み込まれたときにゲーム状態を初期化
  useEffect(() => {
    if (tower) {
      const currentFloor = tower.currentFloor || 1;
      const attackPoint = tower.attackPoint !== undefined ? tower.attackPoint : INITIAL_AP;
      const maxHp = HP_PER_FLOOR * currentFloor;
      const monsterHp = tower.monsterHp !== undefined ? tower.monsterHp : maxHp;
      
      setGameState(prev => ({
        ...prev,
        attackPoint,
        currentFloor,
        monsterHp,
        monsterMaxHp: maxHp,
      }));
    }
  }, [tower]);

  const calculateDamage = useCallback(() => {
    return Math.floor(Math.random() * (DAMAGE_MAX - DAMAGE_MIN + 1)) + DAMAGE_MIN;
  }, []);

  const handleAttack = useCallback(() => {
    if (gameState.isButtonDisabled || gameState.attackPoint < AP_COST) return;

    setGameState(prev => ({
      ...prev,
      isAttacking: true,
      isButtonDisabled: true,
    }));

    // プレイヤーのアタックアニメーション
    setTimeout(() => {
      // ダメージ計算
      const damage = calculateDamage();
      
      setGameState(prev => ({
        ...prev,
        isAttacking: false,
        isEnemyHit: true,
        lastDamage: damage,
        showDamage: true,
      }));

      // ダメージ適用
      setGameState(prev => {
        const newHp = Math.max(prev.monsterHp - damage, 0);
        const shouldLevelUp = newHp === 0;
        const nextFloor = shouldLevelUp ? prev.currentFloor + 1 : prev.currentFloor;
        const nextMonsterHp = shouldLevelUp ? HP_PER_FLOOR * nextFloor : newHp;
        const nextMonsterMaxHp = shouldLevelUp ? HP_PER_FLOOR * nextFloor : prev.monsterMaxHp;

        return {
          ...prev,
          monsterHp: nextMonsterHp,
          monsterMaxHp: nextMonsterMaxHp,
          currentFloor: nextFloor,
          attackPoint: prev.attackPoint - AP_COST,
        };
      });

      // 敵のヒットアニメーション終了
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          isEnemyHit: false,
          isButtonDisabled: false,
          showDamage: false,
        }));
      }, 800);
    }, 200);
  }, [gameState.isButtonDisabled, gameState.attackPoint, calculateDamage]);

  const addAttackPoint = useCallback((amount: number = 10) => {
    setGameState(prev => ({
      ...prev,
      attackPoint: prev.attackPoint + amount,
    }));
  }, []);

  // ゲーム状態の保存
  const saveGameProgress = useCallback(async () => {
    if (!tower) return;
    
    try {
      const updatedTower: Tower = {
        ...tower,
        currentFloor: gameState.currentFloor,
        attackPoint: gameState.attackPoint,
        monsterHp: gameState.monsterHp,
        lastPlayedAt: new Date().toISOString(),
      };
      await updateTower(updatedTower);
    } catch (error) {
      console.error('ゲーム進行状況の保存に失敗しました:', error);
    }
  }, [tower, gameState.currentFloor, gameState.attackPoint, gameState.monsterHp]);

  // ゲーム状態が変更されたときに自動保存
  useEffect(() => {
    if (tower) {
      saveGameProgress();
    }
  }, [gameState.currentFloor, gameState.attackPoint, gameState.monsterHp, saveGameProgress]);

  const canAttack = gameState.attackPoint >= AP_COST && !gameState.isButtonDisabled;

  return {
    gameState,
    handleAttack,
    addAttackPoint,
    canAttack,
    saveGameProgress,
  };
};