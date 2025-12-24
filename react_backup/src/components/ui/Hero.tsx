import { motion } from 'framer-motion'
import { Planner3D } from '../3d'

export default function Hero() {
    return (
        <section className="relative min-h-screen pt-20 flex flex-col md:flex-row items-center overflow-hidden bg-beige-50">
            <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center">

                {/* Text Content */}
                <div className="w-full md:w-1/2 z-10 flex flex-col justify-center py-10 md:py-0">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif text-beige-900 leading-tight mb-6"
                    >
                        Retrouvez <br />
                        <span className="italic">l'équilibre</span> & <br />
                        la clarté.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-beige-700 mb-8 max-w-md"
                    >
                        Le planner digital interactif conçu pour organiser votre vie, atteindre vos objectifs et apaiser votre esprit.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
                    >
                        <button className="px-8 py-3 bg-beige-900 text-beige-50 rounded-full font-medium hover:bg-beige-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Télécharger le planner
                        </button>
                        <button className="px-8 py-3 border border-beige-300 text-beige-900 rounded-full font-medium hover:bg-beige-100 transition-all">
                            Découvrir en vidéo
                        </button>
                    </motion.div>
                </div>

                {/* 3D Content */}
                <div className="absolute top-20 right-[-10%] w-[120%] md:w-[60%] md:right-0 md:relative h-[60vh] md:h-[80vh] pointer-events-none md:pointer-events-auto opacity-50 md:opacity-100">
                    <Planner3D />
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-beige-100/50 to-transparent -z-10" />
        </section>
    )
}
