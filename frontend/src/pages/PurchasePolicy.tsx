import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FlightDetails {
    flightNumber: string;
    departureDate: string;
    airline: string;
}

const PurchasePolicy = () => {
    const navigate = useNavigate();
    const [flightDetails, setFlightDetails] = useState<FlightDetails>({
        flightNumber: '',
        departureDate: '',
        airline: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // TODO: Integrate with smart contract to purchase policy
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
            navigate('/policies');
        } catch (error) {
            console.error('Error purchasing policy:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cyber-dark bg-cyber-grid pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto bg-cyber-darker/50 backdrop-blur-md rounded-xl p-6 border border-cyber-aqua/20">
                    <h2 className="text-3xl font-bold text-white mb-6">Purchase Flight Delay Insurance</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-cyber-aqua mb-2">Airline</label>
                            <input
                                type="text"
                                value={flightDetails.airline}
                                onChange={(e) => setFlightDetails({...flightDetails, airline: e.target.value})}
                                className="w-full bg-cyber-blue/10 border border-cyber-aqua/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyber-aqua"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-cyber-aqua mb-2">Flight Number</label>
                            <input
                                type="text"
                                value={flightDetails.flightNumber}
                                onChange={(e) => setFlightDetails({...flightDetails, flightNumber: e.target.value})}
                                className="w-full bg-cyber-blue/10 border border-cyber-aqua/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyber-aqua"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-cyber-aqua mb-2">Departure Date</label>
                            <input
                                type="date"
                                value={flightDetails.departureDate}
                                onChange={(e) => setFlightDetails({...flightDetails, departureDate: e.target.value})}
                                className="w-full bg-cyber-blue/10 border border-cyber-aqua/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyber-aqua"
                                required
                            />
                        </div>

                        <div className="bg-cyber-blue/10 rounded-lg p-4 border border-cyber-aqua/30">
                            <h3 className="text-white font-semibold mb-2">Coverage Details</h3>
                            <ul className="text-gray-300 space-y-2">
                                <li>• Coverage Amount: 500 USDC</li>
                                <li>• Premium: 50 USDC</li>
                                <li>• Delay Threshold: 2 hours</li>
                            </ul>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyber-aqua to-cyber-accent text-white font-semibold py-3 rounded-lg transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Purchase Policy'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PurchasePolicy; 