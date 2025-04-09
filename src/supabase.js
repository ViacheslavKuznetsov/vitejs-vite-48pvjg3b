import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials not found!')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'vue3-uploader/1.0'
    }
  }
})

supabase.auth.onAuthStateChange((event, session) => {
  console.log(`Auth state changed: ${event}`)
  
  switch(event) {
    case 'SIGNED_IN':
    case 'TOKEN_REFRESHED':
      if (session) {
        localStorage.setItem('sb_token', session.access_token)
      }
      break
      
    case 'SIGNED_OUT':
      localStorage.removeItem('sb_token')
      break
  }
})

export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

// Инициализация при загрузке
const initializeAuth = async () => {
  try {
    const session = await getCurrentSession()
    if (session) {
      localStorage.setItem('sb_token', session.access_token)
    }
  } catch (error) {
    console.error('Session init error:', error)
    localStorage.removeItem('sb_token')
  }
}

initializeAuth()