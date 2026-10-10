import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import https from 'node:https'
import dns from 'node:dns'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const supabaseUrl = env.VITE_SUPABASE_URL || 'https://rtumumhgmxkdnjvtwkwz.supabase.co'

  // Public DNS resolver to handle ISP/router DNS resolution issues for supabase.co subdomains
  const publicResolver = new dns.Resolver()
  publicResolver.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4'])

  const customLookup = (hostname, opts, cb) => {
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }

    dns.lookup(hostname, opts, (err, address, family) => {
      if (!err && address) {
        return cb(null, address, family)
      }

      // If local DNS lookup failed, resolve through public DNS servers with Cloudflare fallback
      if (hostname.includes('supabase.co')) {
        publicResolver.resolve4(hostname, (resErr, addresses) => {
          const ips =
            !resErr && addresses && addresses.length
              ? addresses
              : ['172.64.149.246', '104.18.38.10']

          if (opts && opts.all) {
            return cb(
              null,
              ips.map((ip) => ({ address: ip, family: 4 }))
            )
          }
          return cb(null, ips[0], 4)
        })
        return
      }

      cb(err, address, family)
    })
  }

  const agent = new https.Agent({ lookup: customLookup })

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/supabase-proxy': {
          target: supabaseUrl,
          changeOrigin: true,
          secure: true,
          agent,
          rewrite: (path) => path.replace(/^\/supabase-proxy/, ''),
        },
      },
    },
  }
})
