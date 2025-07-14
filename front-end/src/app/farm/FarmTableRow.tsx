import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

type FarmTableRowProps = {
  farm: {
    id: string | number;
    images?: string[];
    name: string;
    owner?: {
      id?: string | number;
      avatar?: string;
      name?: string;
    };
    location?: string;
    size?: string | number;
    description?: string;
  };
  showMenu: string | number | null;
  setShowMenu: (id: string | number | null) => void;
  onEdit: (farm: FarmTableRowProps["farm"]) => void;
};

export function FarmTableRow({
  farm,
  showMenu,
  setShowMenu,
  onEdit,
}: FarmTableRowProps) {
  return (
    <TableRow className="bg-white dark:bg-black border-b border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition">
      <TableCell className="align-middle w-20 min-w-20 max-w-20">
        <img
          src={
            farm.images?.[0] ||
            `https://api.dicebear.com/7.x/shapes/svg?seed=farm${farm.id}`
          }
          alt="Farm"
          className="w-12 h-12 rounded-lg object-cover border border-black/20 dark:border-white/20 bg-white dark:bg-black"
        />
      </TableCell>
      <TableCell className="font-bold align-middle text-black dark:text-white w-40 min-w-40 max-w-40 truncate">
        {farm.name}
      </TableCell>
      <TableCell className="align-middle w-40 min-w-40 max-w-40">
        <div className="flex items-center gap-2">
          <img
            src={
              farm.owner?.avatar ||
              `https://api.dicebear.com/7.x/adventurer/svg?seed=owner${
                farm.owner?.id || ""
              }`
            }
            alt="owner"
            className="w-7 h-7 rounded-full border border-black/20 dark:border-white/20 bg-white dark:bg-black"
          />
          <span className="text-black dark:text-white truncate">
            {farm.owner?.name || "Chưa rõ"}
          </span>
        </div>
      </TableCell>
      <TableCell className="align-middle text-black dark:text-white w-40 min-w-40 max-w-40 truncate">
        {farm.location}
      </TableCell>
      <TableCell className="text-center align-middle text-black dark:text-white w-24 min-w-24 max-w-24">
        {farm.size !== undefined && farm.size !== null
          ? Math.round(Number(farm.size))
          : ""}
      </TableCell>
      <TableCell className="align-middle text-black dark:text-white w-56 min-w-56 max-w-xs truncate">
        {farm.description}
      </TableCell>
      <TableCell className="align-middle w-16 min-w-16 max-w-16">
        <div className="relative flex justify-center">
          <button
            className="p-2 rounded-full border border-black/20 dark:border-white/20 bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            onClick={() => setShowMenu(showMenu === farm.id ? null : farm.id)}
            type="button"
          >
            <MoreHorizontal size={18} />
          </button>
          {showMenu === farm.id && (
            <div className="absolute right-0 z-10 mt-2 w-28 bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
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
