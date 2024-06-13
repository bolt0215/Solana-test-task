import { SolanaAccountManager } from './SolanaAccountManager';

(async () => {
    const manager = new SolanaAccountManager();
    const account1 = 'account1';
    const account2 = 'account2';

    const result = await manager.compareBalances(account1, account2);

    console.log('Tokens only in Account 1:', result.account1Only);
    console.log('Tokens only in Account 2:', result.account2Only);
    console.log('Common Tokens:', result.commonTokens);
})(); 