import { Star } from 'lucide-react'

const reviews = [
    {
        name: "Sophie M.",
        role: "Entrepreneuse",
        content: "Ce planner a littéralement changé ma façon de travailler. C'est comme avoir un coach d'organisation dans mon iPad. Le design est sublime et apaisant.",
        rating: 5
    },
    {
        name: "Thomas L.",
        role: "Étudiant",
        content: "Enfin un planner digital qui n'est pas surchargé. Simple, efficace et très beau. La navigation entre les mois est super fluide.",
        rating: 5
    },
    {
        name: "Clara D.",
        role: "Créatrice de contenu",
        content: "J'adore les trackers d'habitudes et la section finance. Tout est centralisé. Je ne peux plus m'en passer !",
        rating: 5
    }
]

export default function Testimonials() {
    return (
        <section id="reviews" className="py-24 bg-beige-100">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-serif text-beige-900 mb-16 text-center">Ce qu'ils en pensent</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-beige-200">
                            <div className="flex space-x-1 text-yellow-500 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-beige-700 italic mb-6">"{review.content}"</p>
                            <div>
                                <p className="font-semibold text-beige-900">{review.name}</p>
                                <p className="text-sm text-beige-500">{review.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
