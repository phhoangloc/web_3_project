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
    private_key: "0xc75aec258b339d74f70d50830d618dc4c7ac286e83ac7a8157ab4996f17bfa32",
    // rpc_url: 'https://sepolia.infura.io/v3/7ae10b016de24dc2883aa614f54b852b'
    rpc_url: "HTTP://127.0.0.1:7545",
    contractAddress: "0x4e0A3474cE262C347a986B500ab6a5b773D4354B"
  }
};

export default nextConfig;
