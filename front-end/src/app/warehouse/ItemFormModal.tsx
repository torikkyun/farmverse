import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Thermometer,
  Droplets,
  Leaf,
  FlaskConical,
  Sprout,
  Zap,
} from "lucide-react";

type WarehouseItemForm = {
  name: string;
  type: string;
  description: string;
  images: string;
  price: number;
  quantity: number;
};

function getRandomFloat(min: number, max: number, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

export function ItemFormModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  isEdit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: WarehouseItemForm;
  setForm: React.Dispatch<React.SetStateAction<WarehouseItemForm>>;
  isEdit: boolean;
}) {
  // Random IOT info liên tục khi modal mở
  const [iotInfo, setIotInfo] = React.useState({
    temperature: 0,
    humidity: 0,
    nitogenLevel: 0,
    phosphorusLevel: 0,
    kaliumLevel: 0,
    semiconductorLevel: 0,
  });

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (open) {
      setIotInfo({
        temperature: getRandomFloat(18, 40, 1),
        humidity: getRandomFloat(30, 90, 1),
        nitogenLevel: 30, 
        phosphorusLevel: 12, 
        kaliumLevel: 25,
        semiconductorLevel: getRandomFloat(100, 1000, 0),
      });
      interval = setInterval(() => {
        setIotInfo({
          temperature: getRandomFloat(18, 40, 1),
          humidity: getRandomFloat(30, 90, 1),
          nitogenLevel: 30, 
          phosphorusLevel: 12, 
          kaliumLevel: 25,
          semiconductorLevel: getRandomFloat(100, 1000, 0),
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className={`bg-white text-black rounded-2xl shadow-2xl p-5 ${
          form.type === "FERTILIZER" ? "max-w-md w-full" : "w-auto"
        }`}
        style={form.type === "FERTILIZER" ? { minWidth: 400 } : { minWidth: 900 }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl m-4 font-bold text-black">
            {isEdit ? "Sửa vật phẩm" : "Thông tin vật phẩm"}
          </DialogTitle>
        </DialogHeader>
        <div className={`flex ${form.type === "FERTILIZER" ? "flex-col" : "flex-col md:flex-row gap-8"} py-2`}>
          {/* Cột trái: Form */}
          <form
            onSubmit={onSubmit}
            className="flex-1 flex flex-col gap-4 bg-white p-6 rounded-2xl shadow"
          >
            <input
              type="text"
              placeholder="Tên vật phẩm"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="border border-neutral-300 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 transition"
              disabled={!isEdit}
            />
            <select
              required
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="border border-neutral-300 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 transition"
              disabled={!isEdit}
            >
              <option value="">Chọn loại</option>
              <option value="FERTILIZER">Phân bón</option>
              <option value="TREEROOT">Cây trồng</option>
            </select>
            <input
              type="text"
              placeholder="Ảnh (nhiều link, phẩy)"
              required
              value={form.images}
              onChange={(e) =>
                setForm((f) => ({ ...f, images: e.target.value }))
              }
              className="border border-neutral-300 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 transition"
              disabled={!isEdit}
            />
            <input
              type="number"
              placeholder="Giá"
              required
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: Number(e.target.value) }))
              }
              className="border border-neutral-300 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 transition"
              disabled={!isEdit}
            />
            <input
              type="number"
              placeholder="Số lượng"
              required
              value={form.quantity}
              onChange={(e) =>
                setForm((f) => ({ ...f, quantity: Number(e.target.value) }))
              }
              className="border border-neutral-300 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/30 transition"
              disabled={!isEdit}
            />
            <DialogFooter className="flex gap-2 mt-2">
              {isEdit && (
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-neutral-900 transition"
                >
                  Lưu
                </button>
              )}
            </DialogFooter>
          </form>
          {/* Cột phải: Thông số IOT chỉ hiện khi là cây trồng */}
          {form.type === "TREEROOT" && (
            <div className="flex-[1.5] rounded-2xl p-6 flex flex-col gap-5 border border-neutral-200 shadow min-w-[380px]">
              <div className="text-xl font-bold mb-2 text-black">
                Thông số IOT
              </div>
              <div className="flex flex-col gap-3 text-black text-base">
                <div className="flex flex-wrap items-center gap-2">
                  <Thermometer size={18} className="text-orange-500" />
                  <span className="font-semibold">Nhiệt độ:</span>
                  <span className="text-blue-700">{iotInfo.temperature} °C</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Droplets size={18} className="text-blue-500" />
                  <span className="font-semibold">Độ ẩm:</span>
                  <span className="text-blue-700">{iotInfo.humidity} %</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Leaf size={18} className="text-green-600" />
                  <span className="font-semibold">Hàm lượng Nitơ:</span>
                  <span className="text-blue-700">
                    {iotInfo.nitogenLevel} mg/kg
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <FlaskConical size={18} className="text-purple-600" />
                  <span className="font-semibold">Hàm lượng Photpho:</span>
                  <span className="text-blue-700">
                    {iotInfo.phosphorusLevel} mg/kg
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Sprout size={18} className="text-lime-600" />
                  <span className="font-semibold">Hàm lượng Kali:</span>
                  <span className="text-blue-700">
                    {iotInfo.kaliumLevel} mg/kg
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Zap size={18} className="text-yellow-500" />
                  <span className="font-semibold">Độ dẫn điện:</span>
                  <span className="text-blue-700">
                    {iotInfo.semiconductorLevel} µS/cm
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
