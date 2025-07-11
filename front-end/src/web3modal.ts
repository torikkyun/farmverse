declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: Array<unknown> }) => Promise<unknown>;

    };
  }
}
export async function connectMetamask() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
      return accounts[0]; 
    } catch (error) {
      throw error;
    }
  } else {
    alert('Bạn cần cài đặt Metamask!');
    return null;
  }
}
