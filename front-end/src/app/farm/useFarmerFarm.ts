import { useEffect, useState } from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export interface Farm {
  id: string | number;
  name: string;
  description?: string;
  location?: string;
  size?: string | number;
  images?: string[] | string;
  ownerId?: string;
}

export function useFarmerFarm() {
  const [userFarm, setUserFarm] = useState<Farm | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      setUserRole(userObj.data?.user?.role || null);
    }
  }, []);

  useEffect(() => {
    if (userRole && userRole !== "FARMER") {
      window.location.href = "/";
    }
  }, [userRole]);

  useEffect(() => {
    const fetchFarmByOwner = async () => {
      try {
        const userData = localStorage.getItem("user");
        const userObj = userData ? JSON.parse(userData) : null;
        const ownerId = userObj?.data?.user?.id;
        const token = userObj?.data?.accessToken;
        if (!ownerId) {
          setUserFarm(null);
          return;
        }
        const url = `${apiURL}/farms/owner/${ownerId}`;
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const json = await res.json();
        const farm = json.data?.farm;
        setUserFarm(farm && farm.id ? farm : null);
      } catch {
        setUserFarm(null);
      }
    };
    if (userRole === "FARMER") {
      fetchFarmByOwner();
    }
  }, [userRole]);

  return { userFarm, userRole };
}