import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import https from 'node:https'
import dns from 'node:dns'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const supabaseUrl = env.VITE_SUPABASE_URL || 'https://rtumumhgmxkdnjvtwkwz.supabase.co'

  // Custom DNS lookup agent in case local router DNS has not propagated newly created subdomains
  const customLookup = (hostname, opts, cb) => {
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }
    if (hostname.includes('supabase.co')) {
      if (opts && opts.all) {
        return cb(null, [{ address: '172.64.149.246', family: 4 }])
      }
      return cb(null, '172.64.149.246', 4)
    }
    dns.lookup(hostname, opts, cb)
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
