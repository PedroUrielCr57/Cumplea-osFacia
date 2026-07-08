import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'

import recuerdo1 from './assets/Recuerdo 1.jpeg'
import recuerdo2 from './assets/Recuerdo 2.jpeg'
import recuerdo3 from './assets/Recuerdo 3.jpeg'
import recuerdo4 from './assets/Recuerdo 4.jpeg'
import recuerdo5 from './assets/Recuerdo 5.jpeg'
import recuerdo6 from './assets/Recuerdo 6.jpeg'
import recuerdo7 from './assets/Recuerdo 7.jpeg'
import recuerdo8 from './assets/Recuerdo 8.jpeg'
import recuerdo9 from './assets/Recuerdo 9.jpeg'
import recuerdo10 from './assets/Recuerdo 10.jpeg'
import recuerdo11 from './assets/Recuerdo 11.jpeg'

type TapHeart = {
  id: number
  x: number
  y: number
  emoji: string
}

const photos = [
  { src: recuerdo1, alt: 'Recuerdo 1' },
  { src: recuerdo2, alt: 'Recuerdo 2' },
  { src: recuerdo3, alt: 'Recuerdo 3' },
  { src: recuerdo4, alt: 'Recuerdo 4' },
  { src: recuerdo5, alt: 'Recuerdo 5' },
  { src: recuerdo6, alt: 'Recuerdo 6' },
  { src: recuerdo7, alt: 'Recuerdo 7' },
  { src: recuerdo8, alt: 'Recuerdo 8' },
  { src: recuerdo9, alt: 'Recuerdo 9' },
  { src: recuerdo10, alt: 'Recuerdo 10' },
  { src: recuerdo11, alt: 'Recuerdo 11' },
]

const hearts = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${6 + Math.random() * 8}s`,
  size: `${18 + Math.random() * 22}px`,
}))

const fireworks = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${10 + Math.random() * 80}%`,
  top: `${8 + Math.random() * 42}%`,
  delay: `${Math.random() * 4}s`,
}))

const introHearts = Array.from({ length: 35 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 6}s`,
  duration: `${5 + Math.random() * 6}s`,
  size: `${14 + Math.random() * 24}px`,
}))

const modalHearts = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3}s`,
}))

function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/40 backdrop-blur-sm px-4 py-6 animate-fadeIn"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl animate-popIn border border-rose-100"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-700 transition hover:scale-110 hover:bg-rose-200"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  )
}

function App() {
  const tapsNeeded = 25

  const [showIntro, setShowIntro] = useState(true)
  const [isOpeningLetter, setIsOpeningLetter] = useState(false)
  const [tapHearts, setTapHearts] = useState<TapHeart[]>([])

  const heartTaps = useRef(0)

  const [showGiftModal, setShowGiftModal] = useState(false)
  const [showMemoriesModal, setShowMemoriesModal] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const handleHeartTap = (event: MouseEvent<HTMLButtonElement>) => {
    if (isOpeningLetter || heartTaps.current >= tapsNeeded) return

    const emojis = ['❤️', '💖', '💕', '💗', '💘', '💝']
    const rect = event.currentTarget.getBoundingClientRect()

    const newHeart: TapHeart = {
      id: Date.now() + Math.random(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      emoji: emojis[Math.floor(Math.random() * emojis.length)] ?? '❤️',
    }

    setTapHearts((currentHearts) => [...currentHearts, newHeart])

    setTimeout(() => {
      setTapHearts((currentHearts) =>
        currentHearts.filter((heart) => heart.id !== newHeart.id),
      )
    }, 1200)

    heartTaps.current += 1

    if (heartTaps.current >= tapsNeeded) {
      setIsOpeningLetter(true)

      setTimeout(() => {
        setShowIntro(false)
      }, 1400)
    }
  }

  if (showIntro) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-6">
        <div className="absolute inset-0 pointer-events-none">
          {introHearts.map((heart) => (
            <span
              key={heart.id}
              className="intro-floating-heart"
              style={{
                left: heart.left,
                animationDelay: heart.delay,
                animationDuration: heart.duration,
                fontSize: heart.size,
              }}
            >
              ❤️
            </span>
          ))}
        </div>

        <section
          className={`relative z-10 text-center ${
            isOpeningLetter ? 'intro-open' : ''
          }`}
        >
          <p className="mb-6 text-lg font-semibold text-rose-200 tracking-wide">
            Toca el corazón ❤️
          </p>

          <button
            onClick={handleHeartTap}
            className="relative select-none text-[170px] md:text-[250px] leading-none transition active:scale-90 hover:scale-105 intro-heart"
            aria-label="Corazón"
          >
            ❤️

            {tapHearts.map((heart) => (
              <span
                key={heart.id}
                className="tiktok-like-heart"
                style={{
                  left: heart.x,
                  top: heart.y,
                }}
              >
                {heart.emoji}
              </span>
            ))}
          </button>

          <p className="mt-6 text-sm text-rose-100">
            Cada "Tap, tap" es un te amo Facia ❤️
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-yellow-100 flex items-center justify-center px-6 py-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size,
            }}
          >
            ❤️
          </span>
        ))}

        {fireworks.map((firework) => (
          <span
            key={firework.id}
            className="firework"
            style={{
              left: firework.left,
              top: firework.top,
              animationDelay: firework.delay,
            }}
          />
        ))}
      </div>

      <section className="relative z-10 max-w-2xl w-full bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-8 text-center border border-white animate-letterUnfold">
        <p className="text-5xl mb-4 animate-bounceSlow">🎂💐</p>

        <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-4 animate-titleGlow">
          ¡Feliz cumpleaños, Facia!
        </h1>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
          Hoy en este dia tan bonito, quiero recordarte la gran madre que eres,
          sin dudad alguna, si Dios me diera la oportunidad de volver a nacer,
          te eligiria a ti como mamá. Te amo con todo mi corazón y gracias a ti,
          soy la persona que soy hoy.
        </p>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
          Gracias por todos los consejos, regaños, risas y todos los momentos
          que hemos pasado juntos, Dios nos siga prestando mucha mucha vida para
          seguir compartiendo y creando mas momentos contigo, eres toda mi vida
          y adoración.
        </p>

        <div className="bg-rose-50 rounded-2xl p-5 mb-8 transition hover:scale-[1.03] hover:shadow-xl">
          <p className="text-2xl font-semibold text-rose-700">
            Te amo muchísimo ❤️
          </p>

          <p className="text-gray-600 mt-2">
            Espero que este día y todos los demás, estén llenos de amor, alegría
            y felicidad. ¡Feliz cumpleaños, mamá!
          </p>
        </div>

        <div className="grid gap-4">
          <button
            onClick={() => setShowGiftModal(true)}
            className="group bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition hover:scale-105 active:scale-95"
          >
            <span className="inline-block transition group-hover:rotate-6 group-hover:scale-110">
              Presiona aquí 🎁
            </span>
          </button>

          <button
            onClick={() => setShowMemoriesModal(true)}
            className="rounded-full border-2 border-rose-300 bg-white/70 px-6 py-3 font-semibold text-rose-700 shadow-md transition hover:scale-105 hover:bg-rose-100 active:scale-95"
          >
            Por estos y mas recuerdos con la mejor mamá 📸
          </button>
        </div>
      </section>

      <Modal isOpen={showGiftModal} onClose={() => setShowGiftModal(false)}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 via-pink-50 to-yellow-100 p-8 text-center">
          <div className="absolute inset-0 pointer-events-none">
            {modalHearts.map((heart) => (
              <span
                key={heart.id}
                className="modal-heart"
                style={{
                  left: heart.left,
                  animationDelay: heart.delay,
                }}
              >
                ❤️
              </span>
            ))}
          </div>

          <p className="relative text-6xl mb-4 animate-bounceSlow">🎉🎂🎁</p>

          <h2 className="relative text-4xl md:text-5xl font-bold text-rose-600 mb-4">
            ¡Feliz cumpleaños, mamá!
          </h2>

          <p className="relative mx-auto max-w-2xl text-lg text-gray-700 leading-relaxed">
            Este pequeño detalle está hecho con todo mi amor. Gracias por ser mi
            mamá, mi guía, mi apoyo y una de las personas más importantes de mi
            vida.
          </p>

          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-white px-5 py-3 text-rose-600 shadow-md">
              💖 Amor infinito
            </span>

            <span className="rounded-full bg-white px-5 py-3 text-rose-600 shadow-md">
              🌟 Mi inspiración
            </span>

            <span className="rounded-full bg-white px-5 py-3 text-rose-600 shadow-md">
              🫶 La mejor mamá
            </span>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showMemoriesModal}
        onClose={() => setShowMemoriesModal(false)}
      >
        <div className="text-center">
          <p className="text-5xl mb-3">📸❤️</p>

          <h2 className="text-3xl md:text-5xl font-bold text-rose-600 mb-3">
            Por estos y mas recuerdos con la mejor mamá
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Cada foto guarda un pedacito de nuestra historia. Y todavía nos
            faltan muchísimos momentos más por vivir juntos.
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                onClick={() => setSelectedPhoto(photo.src)}
                className="group relative h-40 overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100 to-yellow-100 shadow-lg transition hover:scale-105 hover:shadow-2xl active:scale-95 md:h-52"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-rose-500/10 opacity-0 transition group-hover:opacity-100">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-rose-600 shadow">
                    Ver recuerdo ❤️
                  </span>
                </div>

                <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-4 text-rose-500">
                  <span className="text-4xl">📷</span>

                  <span className="mt-2 text-sm font-semibold">
                    Agrega foto {index + 1}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 animate-fadeIn"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-rose-600 shadow-lg transition hover:scale-110"
            aria-label="Cerrar foto"
          >
            ✕
          </button>

          <img
            src={selectedPhoto}
            alt="Recuerdo seleccionado"
            className="max-h-[85vh] max-w-[95vw] rounded-3xl object-contain shadow-2xl animate-popIn"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}

export default App