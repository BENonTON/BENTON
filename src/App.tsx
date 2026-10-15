import { motion } from 'framer-motion'
import { Scene } from './components/Scene'
import { WaitlistForm } from './components/WaitlistForm'

export default function App() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#030405]">
      <Scene />

      <div className="relative z-10 flex h-screen flex-col justify-between overflow-hidden p-6 pointer-events-none md:p-12">
        <header className="flex items-start justify-between gap-4">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-sm font-semibold tracking-[0.28em] text-white/90 uppercase"
          >
            Ghosted
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2 backdrop-blur-md"
          >
            <p className="font-display text-[10px] tracking-[0.22em] text-white/75 uppercase md:text-[11px]">
              Manifest — Status
            </p>
          </motion.div>
        </header>

        <section className="mx-auto flex w-full max-w-2xl flex-col items-center pb-2 text-center md:pb-4">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.75rem,9vw,5.75rem)] leading-[0.92] font-semibold tracking-[-0.03em] text-[var(--fg)]"
          >
            GHOSTED
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-md text-sm text-[var(--muted)] md:text-base"
          >
            Vanish on your own terms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 w-full md:mt-8"
          >
            <WaitlistForm />
          </motion.div>
        </section>
      </div>
    </main>
  )
}
