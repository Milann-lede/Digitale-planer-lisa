import { Calendar, CheckCircle, PenTool, Layout } from 'lucide-react'

const features = [
    {
        icon: Calendar,
        title: "Planification Annuelle",
        description: "Vues annuelles, mensuelles et hebdomadaires pour une vision claire de votre temps."
    },
    {
        icon: CheckCircle,
        title: "Suivi d'Habitudes",
        description: "Trackers intégrés pour vos objectifs, finances et bien-être quotidien."
    },
    {
        icon: PenTool,
        title: "100% Manuscrit",
        description: "Optimisé pour une utilisation fluide avec stylet sur iPad et tablettes."
    },
    {
        icon: Layout,
        title: "Navigation Intuitive",
        description: "Des milliers de liens hypertextes pour naviguer instantanément entre les pages."
    }
]

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-beige-900 mb-4">Tout ce dont vous avez besoin</h2>
                    <p className="text-beige-700 max-w-xl mx-auto">
                        Une structure complète pour organiser chaque aspect de votre vie, sans la complexité.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-beige-50 hover:bg-beige-100 transition-colors border border-transparent hover:border-beige-200">
                            <div className="w-12 h-12 bg-beige-200 rounded-xl flex items-center justify-center text-beige-800 mb-6">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-beige-900 mb-2">{feature.title}</h3>
                            <p className="text-beige-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
