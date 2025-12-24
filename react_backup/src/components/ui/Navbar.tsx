import { Menu, ShoppingBag } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 bg-beige-50/80 backdrop-blur-md border-b border-beige-200">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-serif font-bold text-beige-900 tracking-tight">
                    Planner.
                </div>

                <div className="hidden md:flex space-x-8 text-beige-800 font-medium">
                    <a href="#features" className="hover:text-beige-600 transition-colors">Fonctionnalités</a>
                    <a href="#benefits" className="hover:text-beige-600 transition-colors">Bénéfices</a>
                    <a href="#reviews" className="hover:text-beige-600 transition-colors">Avis</a>
                    <a href="#faq" className="hover:text-beige-600 transition-colors">FAQ</a>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="hidden md:flex items-center space-x-2 bg-beige-900 text-beige-50 px-5 py-2 rounded-full hover:bg-beige-800 transition-all shadow-sm">
                        <span>Acheter</span>
                        <ShoppingBag size={18} />
                    </button>
                    <button className="md:hidden text-beige-900">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    )
}
