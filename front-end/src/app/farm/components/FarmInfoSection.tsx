import FarmerFarmCard from "../FarmerFarmCard";
import { Farm } from "../useFarmerFarm";

export default function FarmInfoSection({
  farm,
  cardClass,
}: {
  farm: Farm | null;
  cardClass: string;
}) {
  if (!farm)
    return <div className={cardClass}>Không có thông tin nông trại.</div>;
  return (
    <div className={cardClass}>
      <FarmerFarmCard farmId="farm1" />
    </div>
  );
}
