import type { Tower } from './models';
import { getRandomPlayerImage } from './playerUtils';

const DB_NAME = 'TowerOfEffortisDB';
const DB_VERSION = 1;

interface Database {
  towers: Tower;
  tasks: any;  // 将来の実装用
  users: any;  // 将来の実装用
}

const STORES = {
  towers: 'towers',
  tasks: 'tasks',
  users: 'users'
} as const;

let db: IDBDatabase | null = null;

const openDB = async (): Promise<IDBDatabase> => {
  if (db) return db;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onerror = () => {
      reject(request.error);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      // towersストアを作成
      if (!database.objectStoreNames.contains(STORES.towers)) {
        const towerStore = database.createObjectStore(STORES.towers, {
          keyPath: 'id',
          autoIncrement: true
        });
        towerStore.createIndex('name', 'name', { unique: false });
        towerStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // 将来の実装用のストア
      if (!database.objectStoreNames.contains(STORES.tasks)) {
        database.createObjectStore(STORES.tasks, {
          keyPath: 'id',
          autoIncrement: true
        });
      }

      if (!database.objectStoreNames.contains(STORES.users)) {
        database.createObjectStore(STORES.users, {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    };
  });
};

// 汎用的なCRUD操作
export const add = async <T extends keyof Database>(
  storeName: T,
  data: Omit<Database[T], 'id'>
): Promise<number> => {
  const database = await openDB();
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  
  return new Promise((resolve, reject) => {
    const request = store.add(data);
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
};

export const get = async <T extends keyof Database>(
  storeName: T,
  id: number
): Promise<Database[T] | undefined> => {
  const database = await openDB();
  const transaction = database.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);
  
  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAll = async <T extends keyof Database>(
  storeName: T
): Promise<Database[T][]> => {
  const database = await openDB();
  const transaction = database.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);
  
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const update = async <T extends keyof Database>(
  storeName: T,
  data: Database[T]
): Promise<void> => {
  const database = await openDB();
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  
  return new Promise((resolve, reject) => {
    const request = store.put(data);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const remove = async <T extends keyof Database>(
  storeName: T,
  id: number
): Promise<void> => {
  const database = await openDB();
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Tower specific functions
export const saveTower = async (name: string): Promise<number> => {
  const tower = {
    name,
    createdAt: new Date().toISOString(),
    playerImage: getRandomPlayerImage()
  };
  return add('towers', tower);
};

export const getTower = async (id: number): Promise<Tower | undefined> => {
  return get('towers', id);
};

export const getAllTowers = async (): Promise<Tower[]> => {
  return getAll('towers');
};

export const updateTower = async (tower: Tower): Promise<void> => {
  return update('towers', tower);
};

export const deleteTower = async (id: number): Promise<void> => {
  return remove('towers', id);
};