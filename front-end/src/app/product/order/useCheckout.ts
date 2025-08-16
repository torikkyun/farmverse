import { useRouter } from "next/navigation";
import { formatDate, dataURLtoFile } from "../order/orderUtils";
import { Item } from "../utils/checkoutUtils";
import { useCallback } from "react";
import { useAccount } from "wagmi";
import { useTreeRental } from "@/libs/blockchain/hooks/useTreeRental";
import { useApproveFVT } from "@/libs/blockchain/hooks/useApproveFVT";

interface Farm {
  name: string;
  address: {
    houseNumber?: string;
    street?: string;
    commune?: string;
    province?: string;
    city?: string;
  };
  user?: { email?: string };
  signatureUrl?: string;
}

type ContractData = {
  lesseeName: string;
  lesseeAddress: string;
  lesseeEmail: string;
};

type UseCheckoutProps = {
  itemsByTypeWithQuantity: { tree: Item[]; fertilizer: Item[] };
  totalTreeQuantity: number;
  grandTotal: number;
  iotSelections: { [id: string]: boolean };
  contractData: ContractData;
  lesseeSignature?: string;
  farm: Farm;
  setAlert: (v: { type: "success" | "error"; message: string | null }) => void;
  setLoading: (v: boolean) => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useCheckout({
  itemsByTypeWithQuantity,
  totalTreeQuantity,
  grandTotal,
  iotSelections,
  contractData,
  lesseeSignature,
  farm,
  setAlert,
  setLoading,
}: UseCheckoutProps) {
  const router = useRouter();
  const { address } = useAccount();
  const { rentTree } = useTreeRental();
  const { approveFVT } = useApproveFVT();
  const tokenAddress = process.env.NEXT_PUBLIC_FVT_ADDRESS as `0x${string}`;
  const contractAddress = process.env
    .NEXT_PUBLIC_TREE_RENTAL_ADDRESS as `0x${string}`;

  return useCallback(async () => {
    setAlert({ type: "success", message: null });
    setLoading(true);
    try {
      const token = JSON.parse(
        localStorage.getItem("user") || "{}"
      )?.accessToken;
      if (!token) throw new Error("Không tìm thấy token đăng nhập!");
      if (
        !lesseeSignature ||
        lesseeSignature.trim() === "" ||
        lesseeSignature === "data:image/png;base64,"
      )
        throw new Error("Bạn chưa ký tên!");

      // Upload signature
      const formData = new FormData();
      formData.append(
        "signatureImage",
        dataURLtoFile(lesseeSignature, "signature.png")
      );
      const signRes = await fetch(
        `${API_URL}/transactions/contract/signature`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const signJson = await signRes.json();
      if (!signRes.ok)
        throw new Error(signJson.message || "Lưu chữ ký thất bại!");
      const signatureFileName = signJson?.data?.signatureFileName;
      if (!signatureFileName)
        throw new Error("Không lấy được tên file chữ ký!");

      // Prepare contract data
      const today = new Date();
      const endDate = new Date(today);
      endDate.setFullYear(endDate.getFullYear() + 1);
      const addressArr = [
        farm.address.houseNumber,
        farm.address.street,
        farm.address.commune,
        farm.address.province,
        farm.address.city,
      ].filter(Boolean);
      const items = itemsByTypeWithQuantity.tree.map((item) => ({
        itemId: item.id,
        quantity: item.quantity ?? 1,
        iot: !!iotSelections[item.id],
      }));

      const contractPayload = {
        items,
        contract: {
          lessorName: farm.name,
          lessorAddress: addressArr.join(", "),
          lessorEmail: farm.user?.email || "",
          lesseeName: contractData.lesseeName,
          lesseeAddress: contractData.lesseeAddress,
          lesseeEmail: contractData.lesseeEmail,
          treeNames: itemsByTypeWithQuantity.tree.map((item) => item.name),
          totalTree: totalTreeQuantity,
          farmAddress: addressArr.join(", "),
          startDate: formatDate(today),
          endDate: formatDate(endDate),
          totalPrice: grandTotal,
          currentDate: today.getDate(),
          currentMonth: today.getMonth() + 1,
          currentYear: today.getFullYear(),
          lessorSignature: signatureFileName,
          lesseeSignature: signatureFileName,
        },
      };

      const contractRes = await fetch(`${API_URL}/transactions/contract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contractPayload),
      });
      const contractJson = await contractRes.json();
      if (!contractRes.ok)
        throw new Error(contractJson.message || "Gửi hợp đồng thất bại!");

      const signatureHash = signJson.data.signatureHash;

      if (!address) throw new Error("Vui lòng kết nối ví!");

      await approveFVT({
        tokenAddress,
        spender: contractAddress,
        amount: grandTotal.toString(),
        account: address,
      });

      const txHash = await rentTree({
        contractAddress,
        costPerYear: grandTotal.toString(),
        contractHash: signatureHash,
        account: address,
      });

      // await fetch(`${API_URL}/transactions/contract/confirm-payment`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     transactionId: contractJson.payment.transactionId,
      //     transactionHash: txHash,
      //   }),
      // });

      setAlert({
        type: "success",
        message: "Ký hợp đồng thành công! Đang chuyển trang...",
      });
      setTimeout(() => router.push("/tree"), 2000);
    } catch (error) {
      console.log(error);
      setAlert({ type: "error", message: "Có lỗi xảy ra!" });
    } finally {
      setLoading(false);
    }
  }, [
    itemsByTypeWithQuantity,
    totalTreeQuantity,
    grandTotal,
    iotSelections,
    contractData,
    lesseeSignature,
    farm,
    setAlert,
    setLoading,
    router,
    address,
    rentTree,
    approveFVT,
    contractAddress,
    tokenAddress,
  ]);
}
