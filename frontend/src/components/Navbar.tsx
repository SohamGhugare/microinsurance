import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ account }: { account: string | null }) => {
    const location = useLocation();
    
    return (
        <nav className="absolute top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    <Link 
                        to="/" 
                        className="text-[#4FD1C5] text-2xl font-bold tracking-wider hover:text-[#63E6BE] transition-colors"
                    >
                        Micro-Insurance
                    </Link>
                    
                    <div className="flex items-center gap-8">
                        {account && (
                            <>
                                <Link 
                                    to="/policies"
                                    className="text-gray-300 hover:text-[#4FD1C5] transition-colors text-sm uppercase tracking-wider"
                                >
                                    My Policies
                                </Link>
                                <Link 
                                    to="/claims"
                                    className="text-gray-300 hover:text-[#4FD1C5] transition-colors text-sm uppercase tracking-wider"
                                >
                                    Claims
                                </Link>
                                <div className="bg-[#0B1221]/40 backdrop-blur-sm border border-[#4FD1C5]/20 
                                            text-[#4FD1C5] px-4 py-2 rounded-lg text-sm">
                                    {account.slice(0, 6)}...{account.slice(-4)}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 