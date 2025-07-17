import { useState, useEffect } from "react";
import { Farm } from "./useFarmerFarm";
import { useFarmItems, FarmItem } from "./useFarmItems";
import FarmItemModal from "./FarmItemModal";
import FarmAlert from "./FarmAlert";
import { useAddSchedule } from "./useAddSchedule";
import { useFarmSchedule } from "./useFarmSchedule";
import FarmInfoSection from "./components/FarmInfoSection";
import FarmItemSection from "./components/FarmItemSection";
import ScheduleSection from "./components/ScheduleSection";

interface Props {
  selected: string;
  farm: Farm | null;
}

export default function FarmContent({ selected, farm }: Props) {
  const [showAlert] = useState<null | "plants" | "fertilizers">(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "add">("add");
  const [selectedItem, setSelectedItem] = useState<FarmItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/"/g, "") || "";
  const cardClass = "bg-white dark:bg-black text-black dark:text-white rounded";

  // Items
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

  // Schedule
  const { schedules, loading, error, reloadSchedules } = useFarmSchedule(
    farm?.id ? String(farm.id) : undefined,
  );

  // Add schedule logic
  const {
    addScheduleOpen,
    setAddScheduleOpen,
    addLoading,
    alert,
    newSchedule,
    range,
    handleChange,
    handleRangeChange,
    handleSave,
  } = useAddSchedule(API_URL, farm?.id ? String(farm.id) : "", reloadSchedules);

  // Modal handlers
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
    if (selected === "schedule" && farm?.id) reloadSchedules();
  }, [selected, farm?.id, reloadSchedules]);

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
      {selected === "farm-info" && (
        <FarmInfoSection farm={farm} cardClass={cardClass} />
      )}
      {selected === "plants" && (
        <FarmItemSection
          title="Cây trồng"
          items={plantItems}
          loading={loadingPlants}
          error={errorPlants}
          onAdd={handleAdd}
          onEdit={handleEdit}
        />
      )}
      {selected === "fertilizers" && (
        <FarmItemSection
          title="Phân bón"
          items={fertilizerItems}
          loading={loadingFertilizers}
          error={errorFertilizers}
          onAdd={handleAdd}
          onEdit={handleEdit}
        />
      )}
      {selected === "schedule" && (
        <ScheduleSection
          schedules={schedules}
          loading={loading}
          error={error}
          alert={alert}
          addScheduleOpen={addScheduleOpen}
          setAddScheduleOpen={setAddScheduleOpen}
          addLoading={addLoading}
          newSchedule={newSchedule}
          range={range}
          handleChange={handleChange}
          handleRangeChange={handleRangeChange}
          handleSave={handleSave}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </>
  );
}
