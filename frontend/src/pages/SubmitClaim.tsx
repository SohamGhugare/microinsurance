import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SubmitClaim = () => {
    const { policyId } = useParams();
    const navigate = useNavigate();
    const [delayDuration, setDelayDuration] = useState('');
    const [evidence, setEvidence] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // TODO: Upload evidence to IPFS and submit claim to smart contract
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
            navigate('/claims');
        } catch (error) {
            console.error('Error submitting claim:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cyber-dark bg-cyber-grid pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto bg-cyber-darker/50 backdrop-blur-md rounded-xl p-6 border border-cyber-aqua/20">
                    <h2 className="text-3xl font-bold text-white mb-6">Submit Flight Delay Claim</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-cyber-aqua mb-2">Delay Duration (hours)</label>
                            <input
                                type="number"
                                value={delayDuration}
                                onChange={(e) => setDelayDuration(e.target.value)}
                                min="2"
                                className="w-full bg-cyber-blue/10 border border-cyber-aqua/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyber-aqua"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-cyber-aqua mb-2">Evidence (Flight Delay Proof)</label>
                            <input
                                type="file"
                                onChange={(e) => setEvidence(e.target.files?.[0] || null)}
                                className="w-full bg-cyber-blue/10 border border-cyber-aqua/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyber-aqua"
                                required
                            />
                            <p className="text-gray-400 text-sm mt-1">Upload screenshot of flight status or airline notification</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyber-aqua to-cyber-accent text-white font-semibold py-3 rounded-lg transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Submit Claim'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitClaim; 