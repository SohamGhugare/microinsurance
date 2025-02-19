import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

interface LandingPageProps {
    account: string | null;
    setAccount: (account: string | null) => void;
}

const LandingPage = ({ account, setAccount }: LandingPageProps) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const navigate = useNavigate();

    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to use this application');
            return;
        }

        try {
            setIsConnecting(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);
            
            // Navigate to policies page after successful connection
            navigate('/policies');
        } catch (error) {
            console.error('Error connecting wallet:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <div className="min-h-screen bg-cyber-dark bg-cyber-grid relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-darker to-cyber-dark opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-aqua/10 to-cyber-accent/10 animate-gradient bg-[length:200%_200%]"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-cyber-aqua/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyber-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '-3s' }}></div>

            {/* Main content */}
            <div className="relative container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-8 inline-block">
                        <span className="inline-block px-4 py-2 rounded-full text-cyber-aqua text-sm border border-cyber-aqua/30 backdrop-blur-sm">
                            Powered by Blockchain Technology
                        </span>
                    </div>

                    <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">
                        Welcome to{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-aqua to-cyber-accent">
                            Micro-Insurance
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-12 animate-fade-in-delay leading-relaxed">
                        Secure your future with blockchain-powered micro-insurance. 
                        <br />
                        Instant coverage, automated claims, and transparent staking rewards.
                    </p>
                    
                    {!account ? (
                        <button
                            onClick={connectWallet}
                            disabled={isConnecting}
                            className="relative group px-8 py-4 bg-gradient-to-r from-cyber-aqua to-cyber-accent rounded-lg text-white font-semibold 
                                     transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(79,209,197,0.4)] disabled:opacity-50"
                        >
                            <span className="relative z-10">
                                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyber-aqua to-cyber-accent rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/policies')}
                            className="relative group px-8 py-4 bg-gradient-to-r from-cyber-aqua to-cyber-accent rounded-lg text-white font-semibold 
                                     transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(79,209,197,0.4)]"
                        >
                            <span className="relative z-10">View My Policies</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyber-aqua to-cyber-accent rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </button>
                    )}

                    {/* Feature cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                        {[
                            { title: 'Instant Coverage', desc: 'Get insured in minutes with smart contracts' },
                            { title: 'Automated Claims', desc: 'AI-powered claim processing and instant payouts' },
                            { title: 'Stake & Earn', desc: 'Provide liquidity and earn rewards' }
                        ].map((feature, index) => (
                            <div key={index} 
                                 className="p-6 rounded-xl backdrop-blur-sm bg-cyber-blue/10 border border-cyber-aqua/20 
                                          transform transition-all duration-300 hover:scale-105 hover:border-cyber-aqua/40"
                            >
                                <h3 className="text-cyber-aqua text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 