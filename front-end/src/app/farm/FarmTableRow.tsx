import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

export function FarmTableRow({ farm, showMenu, setShowMenu, onEdit }: any) {
  return (
    <TableRow>
      <TableCell className="align-middle">
        <img
          src={
            farm.images?.[0] ||
            `https://api.dicebear.com/7.x/shapes/svg?seed=farm${farm.id}`
          }
          alt="Farm"
          className="w-12 h-12 rounded-lg object-cover border"
        />
      </TableCell>
      <TableCell className="font-bold align-middle">{farm.name}</TableCell>
      <TableCell className="align-middle">
        <div className="flex items-center gap-2">
          <img
            src={
              farm.owner?.avatar ||
              `https://api.dicebear.com/7.x/adventurer/svg?seed=owner${
                farm.owner?.id || ""
              }`
            }
            alt="owner"
            className="w-7 h-7 rounded-full border"
          />
          <span>{farm.owner?.name || "Chưa rõ"}</span>
        </div>
      </TableCell>
      <TableCell className="align-middle">{farm.location}</TableCell>
      <TableCell className="text-center align-middle">{farm.size}</TableCell>
      <TableCell className="align-middle">{farm.description}</TableCell>
      <TableCell className="align-middle" style={{ width: 48 }}>
        <div className="relative flex justify-center">
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800"
            onClick={() => setShowMenu(showMenu === farm.id ? null : farm.id)}
            type="button"
          >
            <MoreHorizontal size={18} />
          </button>
          {showMenu === farm.id && (
            <div className="absolute right-0 z-10 mt-2 w-28 bg-white dark:bg-neutral-900 border rounded shadow">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
                onMouseDown={() => {
                  onEdit(farm);
                  setShowMenu(null);
                }}
              >
                Sửa
              </button>
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
