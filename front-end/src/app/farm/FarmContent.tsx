import { useState, useEffect } from "react";
import FarmerFarmCard from "./FarmerFarmCard";
import { Farm } from "./useFarmerFarm";
import { useFarmItems, FarmItem } from "./useFarmItems";
import { getFarmSchedules } from "../api/farmScheduleApi";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import FarmItemCard from "./FarmItemCard";
import FarmItemModal from "./FarmItemModal";
import FarmAlert from "./FarmAlert";

interface Props {
  selected: string;
  farm: Farm | null;
}

interface Schedule {
  id: string;
  name: string;
  date: string;
}

export default function FarmContent({ selected, farm }: Props) {
  const [showAlert] = useState<null | "plants" | "fertilizers">(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "add">("add");
  const [selectedItem, setSelectedItem] = useState<FarmItem | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [errorSchedule, setErrorSchedule] = useState<string | null>(null);

  const cardClass =
    "bg-white dark:bg-black text-black dark:text-white rounded shadow p-4";

  // Lấy vật phẩm cây trồng
  const {
    items: plantItems,
    loading: loadingPlants,
    error: errorPlants,
  } = useFarmItems({
    farmId: farm?.id ?? "",
    type: "TREEROOT",
    page: 1,
    pageSize: 10,
  });

  // Lấy vật phẩm phân bón
  const {
    items: fertilizerItems,
    loading: loadingFertilizers,
    error: errorFertilizers,
  } = useFarmItems({
    farmId: farm?.id ?? "",
    type: "FERTILIZER",
    page: 1,
    pageSize: 10,
  });

  // Hàm mở modal sửa/thêm
  const handleEdit = (item: FarmItem) => {
    setSelectedItem(item);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setModalMode("add");
    setModalOpen(true);
  };

  useEffect(() => {
    if (selected === "schedule" && farm?.id) {
      setLoadingSchedule(true);
      getFarmSchedules(String(farm.id))
        .then((data) => {
          const tasks = Array.isArray(data?.data?.schedule?.tasks)
            ? data.data.schedule.tasks
            : [];
          setSchedules(tasks);
          setErrorSchedule(null);
        })
        .catch(() => setErrorSchedule("Không lấy được lịch chăm sóc!"))
        .finally(() => setLoadingSchedule(false));
    }
  }, [selected, farm?.id]);

  return (
    <>
      {showAlert === "plants" && (
        <FarmAlert message="Chức năng tạo cây trồng đang phát triển..." />
      )}
      {showAlert === "fertilizers" && (
        <FarmAlert message="Chức năng tạo phân bón đang phát triển..." />
      )}
      <FarmItemModal
        open={modalOpen}
        mode={modalMode}
        item={selectedItem}
        onClose={() => setModalOpen(false)}
        onSave={() => setModalOpen(false)}
      />
      {selected === "farm-info" &&
        (!farm ? (
          <div className={cardClass}>Không có thông tin nông trại.</div>
        ) : (
          <div className={cardClass}>
            <FarmerFarmCard farm={farm} />
          </div>
        ))}
      {selected === "plants" && (
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Cây trồng</h2>
            <Button
              variant="outline"
              className="font-semibold flex items-center gap-2"
              onClick={handleAdd}
            >
              <Plus size={18} /> Tạo vật phẩm
            </Button>
          </div>
          {loadingPlants ? (
            <div>Đang tải...</div>
          ) : errorPlants ? (
            <div className="text-red-500">{errorPlants}</div>
          ) : plantItems.length === 0 ? (
            <div>Không có vật phẩm cây trồng nào.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {plantItems.map((item) => (
                <FarmItemCard key={item.id} item={item} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </div>
      )}
      {selected === "fertilizers" && (
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Phân bón</h2>
            <Button
              variant="outline"
              className="font-semibold flex items-center gap-2"
              onClick={handleAdd}
            >
              <Plus size={18} /> Tạo vật phẩm
            </Button>
          </div>
          {loadingFertilizers ? (
            <div>Đang tải...</div>
          ) : errorFertilizers ? (
            <div className="text-red-500">{errorFertilizers}</div>
          ) : fertilizerItems.length === 0 ? (
            <div>Không có vật phẩm phân bón nào.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {fertilizerItems.map((item) => (
                <FarmItemCard key={item.id} item={item} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </div>
      )}
      {selected === "schedule" && (
        <div className={cardClass}>
          <h2 className="text-xl font-semibold mb-2">
            Lịch chăm sóc cây trồng
          </h2>
          {loadingSchedule ? (
            <div>Đang tải...</div>
          ) : errorSchedule ? (
            <div className="text-red-500">{errorSchedule}</div>
          ) : schedules.length === 0 ? (
            <div>Không có lịch chăm sóc nào.</div>
          ) : (
            <ul className="list-disc pl-5">
              {schedules.map((task: Schedule) => (
                <li key={task.id}>{task.name} - {task.date}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
