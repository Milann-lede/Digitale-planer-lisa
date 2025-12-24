import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
    {
        question: "Sur quels appareils fonctionne le planner ?",
        answer: "Le planner est un fichier PDF interactif. Il fonctionne sur tout appareil pouvant lire les PDF et supportant l'écriture manuscrite, comme l'iPad (avec GoodNotes, Notability) ou les tablettes Android (avec Xodo, Samsung Notes)."
    },
    {
        question: "Dois-je payer un abonnement ?",
        answer: "Non, c'est un achat unique. Une fois acheté, le planner est à vous pour toujours."
    },
    {
        question: "Comment télécharger mon planner ?",
        answer: "Immédiatement après votre paiement, vous recevrez un email avec un lien de téléchargement sécurisé."
    },
    {
        question: "Puis-je l'utiliser sur mon téléphone ?",
        answer: "Oui, via les mêmes applications (GoodNotes, etc.). C'est pratique pour consulter vos notes, mais pour l'écriture, nous recommandons une tablette."
    }
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-serif text-beige-900 mb-4 text-center">Questions Fréquentes</h2>
                <p className="text-center text-beige-600 mb-12">Tout ce que vous devez savoir avant de commencer.</p>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-beige-200">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                            >
                                <span className={`text-lg font-medium transition-colors ${openIndex === index ? 'text-beige-900' : 'text-beige-700 group-hover:text-beige-900'}`}>
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-beige-500" />
                                ) : (
                                    <ChevronDown className="text-beige-400 group-hover:text-beige-600 transition-colors" />
                                )}
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-6 text-beige-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
