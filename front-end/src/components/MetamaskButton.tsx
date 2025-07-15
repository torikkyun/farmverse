import { useState, useEffect } from 'react';
import { connectMetamask } from '../web3modal';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function MetamaskButton() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0.00');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem('metamask_address');
    if (cached) setAddress(cached);
  }, []);
  useEffect(() => {
    async function fetchBalance() {
      if (window.ethereum && address) {
        try {
          const result = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [address, 'latest']
          });
          setBalance((parseInt(result as string, 16) / 1e18).toFixed(4));
        } catch {
          setBalance('0.00');
        }
      } else {
        setBalance('0.00');
      }
    }
    fetchBalance();
  }, [address]);

  // Tự động ẩn thông báo sau 1.5s
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleConnect: () => Promise<void> = async () => {
    setLoading(true);
    try {
      const addr = await connectMetamask();
      setAddress(addr);
      localStorage.setItem('metamask_address', addr ?? '');
      setAlert({ type: "success", message: "Kết nối Metamask thành công!" });
    } catch {
      setAlert({ type: "error", message: "Kết nối thất bại hoặc bị từ chối!" });
    }
    setLoading(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('metamask_address');
    setAddress(null);
    setAlert({ type: "success", message: "Đã đăng xuất ví!" });
  };

  return (
    <>
      {alert && (
        <Alert
          variant={alert.type === "success" ? "default" : "destructive"}
          className="fixed left-1/2 top-6 z-50 w-full max-w-xs -translate-x-1/2"
        >
          <AlertTitle>{alert.type === "success" ? "Thành công" : "Lỗi"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      {!address ? (
        <button
          className="px-3 py-1 rounded bg-black text-white hover:bg-neutral-800 transition"
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? 'Đang kết nối...' : 'Kết nối ví'}
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <a
            href={`/${address}`}
            className="cursor-pointer no-underline inline-flex items-center whitespace-nowrap rounded-md transition duration-200 justify-center font-medium focus-visible:outline-none hover:bg-neutral-100 focus:bg-neutral-100 active:bg-neutral-200 h-10 text-sm disabled:pointer-events-none disabled:opacity-40 px-4 gap-1 bg-white text-black border border-neutral-200"
            aria-label="Profile"
          >
            <div className="flex items-center gap-2 text-sm">
              <div className="relative inline-block shrink-0">
                <div className="rounded-full overflow-hidden bg-black size-6 flex items-center justify-center">
                  <span className="text-xs text-white">{address.slice(2, 8)}</span>
                </div>
              </div>
              <span className="leading-normal text-sm font-normal">{address.slice(2, 8)}</span>
            </div>
          </a>
          <div className="flex flex-col items-start">
            <span className="text-xs text-neutral-500">Ξ {balance}</span>
          </div>
          <button
            className="px-2 py-1 rounded bg-neutral-900 text-white hover:bg-neutral-700 transition"
            onClick={handleLogout}
          >
            Đăng xuất ví
          </button>
        </div>
      )}
    </>
  );
}
