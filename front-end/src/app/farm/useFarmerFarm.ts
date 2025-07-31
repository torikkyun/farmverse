import { useEffect, useState } from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export interface User {
  name?: string;
}

export interface Address {
  houseNumber?: string;
  street?: string;
  commune?: string;
  city?: string;
  country?: string;
}

export interface Farm {
  id: string | number;
  name: string;
  description?: string;
  location?: string;
  size?: string | number;
  images?: string[] | string;
  ownerId?: string;
  user?: User;
  address?: Address;
}

export function useFarmerFarm(ownerId?: string) {
  const [userFarm, setUserFarm] = useState<Farm | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const userObj = userData ? JSON.parse(userData) : null;
    const role = userObj?.user?.role || null;
    setUserRole(role);

    if (role !== "FARMER") {
      window.location.href = "/";
      return;
    }

    const fetchFarm = async () => {
      const id = ownerId || userObj?.user?.id;
      if (!id) return setUserFarm(null);
      try {
        const res = await fetch(`${apiURL}/farms/owner/${id}`, {
          headers: {
            "Content-Type": "application/json",
            ...(userObj?.accessToken
              ? { Authorization: `Bearer ${userObj.accessToken}` }
              : {}),
          },
        });
        const json = await res.json();
        setUserFarm(json.data?.farm?.id ? json.data.farm : null);
      } catch {
        setUserFarm(null);
      }
    };

    fetchFarm();
  }, [ownerId]);

  return { userFarm, userRole };
}
