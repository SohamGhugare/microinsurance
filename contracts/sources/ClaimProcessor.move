module micro_insurance::claim_processor {
    use std::string::{Self, String};
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};
    use micro_insurance::policy_factory::{Self, Policy};

    /// Custom errors
    const E_CLAIM_NOT_FOUND: u64 = 1;
    const E_UNAUTHORIZED: u64 = 2;
    const E_INVALID_CLAIM_AMOUNT: u64 = 3;

    /// Claim status enum
    const CLAIM_STATUS_PENDING: u8 = 0;
    const CLAIM_STATUS_APPROVED: u8 = 1;
    const CLAIM_STATUS_REJECTED: u8 = 2;

    struct Claim has store {
        id: u64,
        policy_id: u64,
        claimer: address,
        amount: u64,
        evidence_hash: String, // IPFS hash of evidence
        status: u8,
        created_at: u64,
        processed_at: u64,
    }

    struct ClaimStore has key {
        claims: Table<u64, Claim>,
        claim_count: u64,
    }

    /// Initialize the ClaimStore
    fun init_module(account: &signer) {
        move_to(account, ClaimStore {
            claims: table::new(),
            claim_count: 0,
        });
    }

    /// Submit a new claim
    public entry fun submit_claim(
        account: &signer,
        policy_id: u64,
        amount: u64,
        evidence_hash: String,
    ) acquires ClaimStore {
        let policy = policy_factory::get_policy(policy_id);
        assert!(amount <= policy.coverage_amount, E_INVALID_CLAIM_AMOUNT);

        let claim_store = borrow_global_mut<ClaimStore>(@micro_insurance);
        let claim_id = claim_store.claim_count + 1;

        let new_claim = Claim {
            id: claim_id,
            policy_id,
            claimer: account::get_address(account),
            amount,
            evidence_hash,
            status: CLAIM_STATUS_PENDING,
            created_at: timestamp::now_seconds(),
            processed_at: 0,
        };

        table::add(&mut claim_store.claims, claim_id, new_claim);
        claim_store.claim_count = claim_id;
    }

    /// Process a claim (only callable by authorized processors)
    public entry fun process_claim(
        account: &signer,
        claim_id: u64,
        approved: bool,
    ) acquires ClaimStore {
        // In production, add proper authorization checks here
        let claim_store = borrow_global_mut<ClaimStore>(@micro_insurance);
        assert!(table::contains(&claim_store.claims, claim_id), E_CLAIM_NOT_FOUND);

        let claim = table::borrow_mut(&mut claim_store.claims, claim_id);
        claim.status = if (approved) CLAIM_STATUS_APPROVED else CLAIM_STATUS_REJECTED;
        claim.processed_at = timestamp::now_seconds();

        // If approved, trigger payout logic
        if (approved) {
            // Implement payout logic here
            // This would typically involve interaction with your payment system
            // and potentially cross-chain communication with XRPL
        };
    }

    /// Get claim details
    public fun get_claim(claim_id: u64): Claim acquires ClaimStore {
        let claim_store = borrow_global<ClaimStore>(@micro_insurance);
        assert!(table::contains(&claim_store.claims, claim_id), E_CLAIM_NOT_FOUND);
        *table::borrow(&claim_store.claims, claim_id)
    }
} 