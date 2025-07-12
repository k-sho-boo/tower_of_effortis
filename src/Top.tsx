import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TowerModal from "./components/TowerModal.tsx";
import { getAllTowers, saveTower, deleteTower as deleteTowerDB } from "./utils/indexedDB.ts";
import type { Tower } from "./utils/models.ts";
import Layout from "./components/common/Layout.tsx";
import Card from "./components/common/Card.tsx";
import Button from "./components/common/Button.tsx";

const Top = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTowers = useCallback(async () => {
    try {
      setIsLoading(true);
      const allTowers = await getAllTowers();
      setTowers(allTowers);
    } catch (error) {
      console.error("塔の取得に失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const showModal = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const closeModal = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  const handleSubmit = useCallback(async (name: string) => {
    try {
      await saveTower(name);
      closeModal();
      await fetchTowers();
    } catch (error) {
      console.error('塔の保存に失敗しました:', error);
    }
  }, [closeModal, fetchTowers]);

  const deleteTower = useCallback(async (id: number) => {
    if (!window.confirm("本当に削除しますか？")) {
      return;
    }

    try {
      await deleteTowerDB(id);
      await fetchTowers();
    } catch (error) {
      console.error("塔の削除に失敗しました:", error);
    }
  }, [fetchTowers]);

  useEffect(() => {
    fetchTowers();
  }, [fetchTowers]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-game-primary mb-4">
            塔の攻略
          </h1>
          <p className="text-gray-400 text-lg">
            挑戦する塔を選択して、最上階を目指しましょう
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-game-primary"></div>
          </div>
        ) : towers.length === 0 ? (
          <Card className="text-center py-16">
            <p className="text-gray-400 text-lg mb-6">
              まだ塔が作成されていません
            </p>
            <Button onClick={showModal} size="lg">
              最初の塔を作成
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {towers.map(tower => (
              <Card key={tower.id} className="group relative overflow-hidden">
                <Link to={`/floor/${tower.id}`} className="block">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-game-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <h3 className="text-2xl font-bold mb-2 text-game-text group-hover:text-game-primary transition-colors">
                    {tower.name}
                  </h3>
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">現在のフロア:</span>
                      <span className="text-game-primary font-bold">{tower.currentFloor || 1}F</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">アタックポイント:</span>
                      <span className="text-blue-400 font-bold">{tower.attackPoint || 10}AP</span>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/floor/${tower.id}`}>
                    <span className="text-game-primary font-semibold hover:text-game-primary/80 transition-colors">
                      挑戦する →
                    </span>
                  </Link>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      deleteTower(tower.id);
                    }}
                    className="!py-1"
                  >
                    削除
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button onClick={showModal} size="lg">
            新しい塔を作成
          </Button>
        </div>
      </div>

      <TowerModal ref={dialogRef} handleSubmit={handleSubmit} />
    </Layout>
  );
};

export default Top;
