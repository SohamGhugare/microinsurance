module micro_insurance::staking_pool {
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};

    /// Custom errors
    const E_INSUFFICIENT_BALANCE: u64 = 1;
    const E_NO_STAKE_FOUND: u64 = 2;
    const E_MINIMUM_STAKE_NOT_MET: u64 = 3;

    struct StakeInfo has store {
        amount: u64,
        staked_at: u64,
        last_reward_claim: u64,
    }

    struct StakingPool has key {
        total_staked: u64,
        stakes: Table<address, StakeInfo>,
        reward_rate: u64, // Annual reward rate in basis points (1/100 of 1%)
        minimum_stake: u64,
    }

    /// Initialize the staking pool
    fun init_module(account: &signer) {
        move_to(account, StakingPool {
            total_staked: 0,
            stakes: table::new(),
            reward_rate: 500, // 5% annual reward rate
            minimum_stake: 1000, // Minimum stake amount
        });
    }

    /// Stake tokens into the pool
    public entry fun stake(
        account: &signer,
        amount: u64,
    ) acquires StakingPool {
        let pool = borrow_global_mut<StakingPool>(@micro_insurance);
        assert!(amount >= pool.minimum_stake, E_MINIMUM_STAKE_NOT_MET);

        let staker_addr = signer::address_of(account);
        let current_time = timestamp::now_seconds();

        if (table::contains(&pool.stakes, staker_addr)) {
            let stake_info = table::borrow_mut(&mut pool.stakes, staker_addr);
            stake_info.amount = stake_info.amount + amount;
        } else {
            table::add(&mut pool.stakes, staker_addr, StakeInfo {
                amount,
                staked_at: current_time,
                last_reward_claim: current_time,
            });
        };

        pool.total_staked = pool.total_staked + amount;
    }

    /// Calculate rewards for a staker
    public fun calculate_rewards(staker: address): u64 acquires StakingPool {
        let pool = borrow_global<StakingPool>(@micro_insurance);
        assert!(table::contains(&pool.stakes, staker), E_NO_STAKE_FOUND);

        let stake_info = table::borrow(&pool.stakes, staker);
        let current_time = timestamp::now_seconds();
        let time_staked = current_time - stake_info.last_reward_claim;
        
        // Calculate rewards: (amount * rate * time) / (365 days * 10000)
        // rate is in basis points, hence divided by 10000
        let rewards = (stake_info.amount * pool.reward_rate * time_staked) / (365 * 24 * 60 * 60 * 10000);
        rewards
    }

    /// Claim staking rewards
    public entry fun claim_rewards(account: &signer) acquires StakingPool {
        let staker = signer::address_of(account);
        let pool = borrow_global_mut<StakingPool>(@micro_insurance);
        
        assert!(table::contains(&pool.stakes, staker), E_NO_STAKE_FOUND);
        let stake_info = table::borrow_mut(&mut pool.stakes, staker);
        
        let rewards = calculate_rewards(staker);
        stake_info.last_reward_claim = timestamp::now_seconds();

        // Transfer rewards logic would go here
        // Note: Actual token transfer implementation would depend on your token setup
    }
} 