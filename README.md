# NETPUNKS Public Classroom Hosting

This hosting-only package uses the existing Sepolia contracts. It contains no deployment wallet key, Pinata JWT, contracts, or signed recovery records.

Install and build with `npm ci` and `npm run build`. Start with `npm run start:hosted`. The default HTTP port is 3002; the hosting platform can supply PORT.

Connect this repository to Render as a Blueprint. The supplied render.yaml requests only the free Node.js service in Singapore and provides its public RPC endpoint. No private deployment credentials are needed.

Free hosting may sleep and its SQLite cache is ephemeral. The index is reconstructed from Sepolia; NFTs and funds remain on-chain. Allow startup to finish before the class.

For another Node.js host, use .env.hosting.example as a reference and inject those values through the provider environment. start:hosted does not load a private instructor .env file. Set PUBLIC_BASE_URL to the final HTTPS origin for API-generated metadata.

The health probe is /api/live; /api/health also checks chain synchronization.

NFT: 0x3b3d6b593Ae42D1Bd5fA8322947C42747D8A78ea

Market: 0xA8bd5c1bab1F676c423b045f0A70C82CAEfa89cF

Chain ID: 11155111
