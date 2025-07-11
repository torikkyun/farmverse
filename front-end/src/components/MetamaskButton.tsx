import { useState, useEffect } from 'react';
import { connectMetamask } from '../web3modal';

export function MetamaskButton() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0.00');
  const [loading, setLoading] = useState(false);
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

  const handleConnect: () => Promise<void> = async () => {
    setLoading(true);
    try {
      const addr = await connectMetamask();
      setAddress(addr);
      localStorage.setItem('metamask_address', addr ?? '');
    } catch {
      alert('Kết nối thất bại hoặc bị từ chối!');
    }
    setLoading(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('metamask_address');
    setAddress(null);
  };

  return (
    <>
      {!address ? (
        <button
          className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? 'Đang kết nối...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <a
            href={`/${address}`}
            className="cursor-pointer no-underline inline-flex items-center whitespace-nowrap rounded-md transition duration-200 justify-center font-medium focus-visible:outline-hidden hover:bg-bg-additional-1-transparent focus:bg-bg-additional-1-transparent active:bg-bg-additional-1-transparent h-10 text-sm disabled:pointer-events-none disabled:opacity-40 px-4 gap-1"
            aria-label="Profile"
          >
            <div className="flex items-center gap-2 text-sm">
              <div className="relative inline-block shrink-0">
                {/* Avatar mặc định, có thể thay bằng blockie hoặc icon */}
                <div className="rounded-full overflow-hidden bg-gray-700 size-6 flex items-center justify-center">
                  <span className="text-xs text-white">{address.slice(2, 8)}</span>
                </div>
              </div>
              <span className="leading-normal text-sm font-normal">{address.slice(2, 8)}</span>
            </div>
          </a>
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-400">Ξ {balance}</span>
          </div>
          <button
            className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
