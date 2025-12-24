export default function Footer() {
    return (
        <footer className="bg-beige-900 text-beige-100 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-8 md:mb-0 text-center md:text-left">
                        <h3 className="text-2xl font-serif font-bold mb-2">Planner.</h3>
                        <p className="text-beige-400 text-sm">Organisez votre vie avec élégance.</p>
                    </div>

                    <div className="flex space-x-6 text-sm text-beige-300">
                        <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
                        <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    </div>
                </div>

                <div className="border-t border-beige-800 mt-12 pt-8 text-center text-beige-500 text-xs">
                    © {new Date().getFullYear()} Digital Planner. Tous droits réservés.
                </div>
            </div>
        </footer>
    )
}
