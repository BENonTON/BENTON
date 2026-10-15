import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function fakeQueuePosition(email: string) {
  let hash = 0
  for (let i = 0; i < email.length; i += 1) {
    hash = (hash * 31 + email.charCodeAt(i)) >>> 0
  }
  return 1200 + (hash % 4800)
}

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [joined, setJoined] = useState(false)
  const [queue, setQueue] = useState<number | null>(null)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = email.trim().toLowerCase()

    if (!EMAIL_RE.test(value)) {
      setError('Enter a valid email to request access.')
      return
    }

    setError(null)
    setQueue(fakeQueuePosition(value))
    setJoined(true)
  }

  return (
    <div className="pointer-events-auto mx-auto w-full max-w-xl">
      <AnimatePresence mode="wait">
        {!joined ? (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <label className="sr-only" htmlFor="waitlist-email">
              Email
            </label>
            <div className="flex min-h-12 flex-1 items-center rounded-full border border-white/15 bg-white/5 px-5 backdrop-blur-md transition focus-within:border-white/35 focus-within:bg-white/10">
              <input
                id="waitlist-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (error) setError(null)
                }}
                className="w-full bg-transparent text-sm text-[var(--fg)] outline-none placeholder:text-white/35 md:text-[15px]"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative min-h-12 overflow-hidden rounded-full bg-[var(--fg)] px-6 text-sm font-semibold tracking-wide text-[#0a0b0d] shadow-[0_0_28px_var(--accent-glow)] transition hover:bg-white"
            >
              <span className="relative z-10">Request Access</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,180,131,0.55),transparent_55%)]"
              />
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-full border border-white/15 bg-white/5 px-6 py-4 text-center backdrop-blur-md"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-display text-sm tracking-[0.18em] text-[var(--accent)] uppercase"
            >
              You're on the list
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-1 text-sm text-[var(--muted)]"
            >
              Queue position{' '}
              <span className="font-semibold text-[var(--fg)]">
                #{queue?.toLocaleString()}
              </span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-center text-xs text-[#f0b4a8]"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
