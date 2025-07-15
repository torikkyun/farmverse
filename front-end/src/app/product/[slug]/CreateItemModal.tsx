import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  onClose: () => void;
  farmId: string;
  onCreated?: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

export default function CreateItemModal({
  open,
  onClose,
  farmId,
  onCreated,
}: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("TREEROOT");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [dungs, setDungs] = useState<any[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    images.forEach((img) => formData.append("images", img));
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("farmId", farmId);

    // Lấy accessToken từ localStorage
    const userStr = localStorage.getItem("user");
    let accessToken = "";
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        accessToken = userObj?.data?.accessToken || "";
      } catch {}
    }

    try {
      const res = await fetch(`${API_URL}/items`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) throw new Error("Tạo vật phẩm thất bại");
      setName("");
      setType("TREEROOT");
      setDescription("");
      setImages([]);
      setPrice("");
      setQuantity("");
      onClose();
      if (onCreated) onCreated();
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!farmId) return;
    fetch(`${API_URL}/items/farm/${farmId}?type=TREEROOT`)
      .then((res) => res.json())
      .then((json) =>
        setItems(
          (json?.data?.items || []).map((item: any) => ({
            ...item,
            image: Array.isArray(item.images) ? item.images[0] : "",
          }))
        )
      );
    fetch(`${API_URL}/items/farm/${farmId}?type=FERTILIZER`)
      .then((res) => res.json())
      .then((json) =>
        setDungs(
          (json?.data?.items || []).map((item: any) => ({
            ...item,
            image: Array.isArray(item.images) ? item.images[0] : "",
          }))
        )
      );
  }, [farmId]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md w-full bg-white text-black border border-black rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Tạo vật phẩm mới
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="font-semibold">Tên vật phẩm</Label>
            <Input
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label className="font-semibold">Loại</Label>
            <select
              className="mt-1 w-full border border-black rounded px-2 py-1 bg-white text-black"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="TREEROOT">Cây trồng</option>
              <option value="FERTILIZER">Phân bón</option>
            </select>
          </div>
          <div>
            <Label className="font-semibold">Mô tả</Label>
            <Textarea
              className="mt-1"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
          <div>
            <Label className="font-semibold">Ảnh</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              className="mt-1"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label className="font-semibold">Giá</Label>
              <Input
                type="number"
                className="mt-1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <Label className="font-semibold">Số lượng</Label>
              <Input
                type="number"
                className="mt-1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <DialogFooter className="flex justify-end gap-2 mt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border border-black bg-white text-black hover:bg-black hover:text-white"
                onClick={onClose}
                disabled={loading}
              >
                Hủy
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="border border-black bg-black text-white hover:bg-white hover:text-black"
              disabled={loading}
            >
              {loading ? "Đang tạo..." : "Tạo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
