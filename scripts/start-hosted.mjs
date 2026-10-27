import path from 'node:path';
import { access, readFile } from 'node:fs/promises';
import { root } from '../shared/paths.js';

try {
  process.env.NODE_ENV='production';
  process.env.APP_NETWORK='sepolia';
  process.env.HOST ||= '0.0.0.0';
  process.env.PORT ||= '3002';
  process.env.SEPOLIA_DEPLOYMENT_FILE ||= path.join(root,'deployment/sepolia.json');
  process.env.SEPOLIA_DATA_DIR ||= path.join(root,'.runtime/hosted-sepolia');
  process.env.SEPOLIA_RPC_URL ||= 'https://ethereum-sepolia-rpc.publicnode.com';
  process.env.RPC_LOG_BLOCK_RANGE ||= '2000';
  if(!process.env.PUBLIC_BASE_URL && process.env.RENDER_EXTERNAL_URL)process.env.PUBLIC_BASE_URL=process.env.RENDER_EXTERNAL_URL;
  const deployment=JSON.parse(await readFile(process.env.SEPOLIA_DEPLOYMENT_FILE,'utf8'));
  if(deployment.chainId!==11155111)throw new Error('Expected the existing Sepolia deployment.');
  await access(path.join(root,'dist/index.html'));
  // Hosting only reads the chain. Signing and asset-upload credentials are unnecessary.
  delete process.env.SEPOLIA_PRIVATE_KEY;
  delete process.env.PINATA_JWT;
  await import('../server/index.js');
} catch {
  console.error('Hosting startup failed. Check dist/, deployment/sepolia.json, the RPC endpoint, and the writable data directory.');
  process.exitCode=1;
}
