import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Policy {
    id: number;
    flightNumber: string;
    departureDate: string;
    status: 'active' | 'expired' | 'claimed';
    coverageAmount: number;
}

const MyPolicies = () => {
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch policies from smart contract
        const fetchPolicies = async () => {
            try {
                // Simulated data
                setPolicies([
                    {
                        id: 1,
                        flightNumber: 'AA123',
                        departureDate: '2024-03-15',
                        status: 'active',
                        coverageAmount: 500,
                    },
                ]);
            } catch (error) {
                console.error('Error fetching policies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    return (
        <div className="min-h-screen bg-cyber-dark bg-cyber-grid pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white">My Policies</h2>
                    <Link
                        to="/purchase"
                        className="bg-gradient-to-r from-cyber-aqua to-cyber-accent text-white px-6 py-2 rounded-lg transform transition-all duration-300 hover:scale-105"
                    >
                        New Policy
                    </Link>
                </div>

                {loading ? (
                    <div className="text-cyber-aqua">Loading...</div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {policies.map((policy) => (
                            <div
                                key={policy.id}
                                className="bg-cyber-darker/50 backdrop-blur-md rounded-xl p-6 border border-cyber-aqua/20"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-white">Flight {policy.flightNumber}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        policy.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                        policy.status === 'expired' ? 'bg-gray-500/20 text-gray-400' :
                                        'bg-blue-500/20 text-blue-400'
                                    }`}>
                                        {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                                    </span>
                                </div>
                                
                                <div className="space-y-2 text-gray-300">
                                    <p>Departure: {policy.departureDate}</p>
                                    <p>Coverage: {policy.coverageAmount} USDC</p>
                                </div>

                                {policy.status === 'active' && (
                                    <Link
                                        to={`/claims/new/${policy.id}`}
                                        className="mt-4 block text-center bg-cyber-blue/20 text-cyber-aqua px-4 py-2 rounded-lg border border-cyber-aqua/30 hover:bg-cyber-blue/30 transition-colors"
                                    >
                                        File Claim
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPolicies; 