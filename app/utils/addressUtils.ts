export function abbreviateAddress(address: string): string {
  if (address.length < 10) return address; // Return as is if it's too short
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
