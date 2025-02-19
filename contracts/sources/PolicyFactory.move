module micro_insurance::policy_factory {
    use std::string::{Self, String};
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_framework::coin::{Self, Coin};
    use aptos_std::table::{Self, Table};

    /// Custom errors
    const E_INVALID_PREMIUM: u64 = 1;
    const E_INVALID_DURATION: u64 = 2;
    const E_POLICY_NOT_FOUND: u64 = 3;

    struct Policy has store {
        id: u64,
        coverage_type: String,
        premium_amount: u64,
        coverage_amount: u64,
        start_time: u64,
        end_time: u64,
        policyholder: address,
        is_active: bool
    }

    struct PolicyStore has key {
        policies: Table<u64, Policy>,
        policy_count: u64,
    }

    /// Initialize the PolicyStore
    fun init_module(account: &signer) {
        move_to(account, PolicyStore {
            policies: table::new(),
            policy_count: 0,
        });
    }

    /// Create a new insurance policy
    public entry fun create_policy(
        account: &signer,
        coverage_type: String,
        premium_amount: u64,
        coverage_amount: u64,
        duration_days: u64,
    ) acquires PolicyStore {
        assert!(premium_amount > 0, E_INVALID_PREMIUM);
        assert!(duration_days > 0, E_INVALID_DURATION);

        let policy_store = borrow_global_mut<PolicyStore>(@micro_insurance);
        let policy_id = policy_store.policy_count + 1;
        
        let current_time = timestamp::now_seconds();
        let end_time = current_time + (duration_days * 86400); // Convert days to seconds

        let new_policy = Policy {
            id: policy_id,
            coverage_type,
            premium_amount,
            coverage_amount,
            start_time: current_time,
            end_time,
            policyholder: account::get_address(account),
            is_active: true,
        };

        table::add(&mut policy_store.policies, policy_id, new_policy);
        policy_store.policy_count = policy_id;
    }

    /// Get policy details
    public fun get_policy(policy_id: u64): Policy acquires PolicyStore {
        let policy_store = borrow_global<PolicyStore>(@micro_insurance);
        assert!(table::contains(&policy_store.policies, policy_id), E_POLICY_NOT_FOUND);
        *table::borrow(&policy_store.policies, policy_id)
    }

    /// Deactivate a policy
    public entry fun deactivate_policy(
        account: &signer,
        policy_id: u64
    ) acquires PolicyStore {
        let policy_store = borrow_global_mut<PolicyStore>(@micro_insurance);
        let policy = table::borrow_mut(&mut policy_store.policies, policy_id);
        assert!(policy.policyholder == account::get_address(account), 0);
        policy.is_active = false;
    }
} 