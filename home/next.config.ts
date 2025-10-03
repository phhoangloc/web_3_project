import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "indigo-abstract-toad-910.mypinata.cloud",
        port: "",
        pathname: "/**"
      },
    ],
  },
  env: {
    api_url: "http://localhost:4000/",
    PINATA_JWT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhZmI3OTBmOS0xZmZhLTRjYmItYmRlNC0wNDk3NzZhMmI1NjIiLCJlbWFpbCI6InBoLmhvYW5nbG9jQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5YmM2YzQ5YmVjNjkxMDc2NjhkZCIsInNjb3BlZEtleVNlY3JldCI6ImFlZTkyMWQ4YTRlNTVlOWY1OTI4Mjk1M2E3YjJhMmEwZGIxMmQzODEwZWM3Y2E1NTAzMzBiYzYxZTliZmVhZDUiLCJleHAiOjE3ODA1NjEwNDF9.0f7XFXoZqvLq2gtXjQvXzZcMm39t-4vCJ9WVlRXMH5s",
    PINATA_HOST: "indigo-abstract-toad-910.mypinata.cloud",
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    private_key: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    // rpc_url: 'https://sepolia.infura.io/v3/7ae10b016de24dc2883aa614f54b852b'
    rpc_url: "HTTP://127.0.0.1:8545",
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    contractMarketAddress: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
  }
};

export default nextConfig;
