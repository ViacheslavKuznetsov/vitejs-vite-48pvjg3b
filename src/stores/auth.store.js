import { defineStore } from 'pinia'
import { supabase } from '@/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    loading: false,
    error: null
  }),

  actions: {
    async initialize() {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        this.session = data.session
        this.user = data.session?.user ?? null
      } catch (err) {
        this.handleError(err)
      }
    },

    async signIn({ email, phone, password }) {
      try {
        this.loading = true
        const { data, error } = await supabase.auth.signInWithPassword({
          ...(email ? { email } : { phone }),
          password
        })
        if (error) throw error
        this.user = data.user
        this.session = data.session
      } catch (err) {
        this.handleError(err)
      } finally {
        this.loading = false
      }
    },

    async signOut() {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.reset()
      } catch (err) {
        this.handleError(err)
      }
    },

    async refreshSession() {
      try {
        const { data, error } = await supabase.auth.refreshSession()
        if (error) throw error
        this.session = data.session
        this.user = data.user
      } catch (err) {
        this.handleError(err)
      }
    },

    reset() {
      this.user = null
      this.session = null
      this.error = null
    },

    handleError(error) {
      this.error = {
        code: error.code,
        message: this.parseAuthError(error)
      }
      setTimeout(() => this.error = null, 5000)
    },

    parseAuthError(error) {
      switch (error.code) {
        case 'invalid_credentials':
          return 'Неверные учетные данные'
        case 'email_rate_limit':
          return 'Слишком много попыток'
        default:
          return 'Ошибка аутентификации'
      }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    authError: (state) => state.error
  }
})