import { SolanaAccountManager } from './SolanaAccountManager';

describe('SolanaAccountManager', () => {
    let manager: SolanaAccountManager;

    beforeEach(() => {
        manager = new SolanaAccountManager();
    });

    it('fetchTokens should return tokens for a given account', async () => {
        const tokens = await manager.fetchTokens('account1');
        expect(tokens).toEqual([
            { name: 'TokenA', balance: 100 },
            { name: 'TokenB', balance: 200 }
        ]);
    });

    it('compareBalances should correctly compare token balances', async () => {
        const result = await manager.compareBalances('account1', 'account2');
        expect(result).toEqual({
            account1Only: [
                { name: 'TokenA', balance: 100 }
            ],
            account2Only: [
                { name: 'TokenC', balance: 300 }
            ],
            commonTokens: [
                { name: 'TokenB', balance: 150 }
            ]
        });
    });
});