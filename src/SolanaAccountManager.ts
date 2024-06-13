interface Token {
    name: string;
    balance: number;
}

interface ComparisonResult {
    account1Only: Token[];
    account2Only: Token[];
    commonTokens: Token[];
}

class SolanaAccountManager {
    async fetchTokens(publicKey: string): Promise<Token[]> {
        const mockData: { [key: string]: Token[] } = {
            'account1': [
                { name: 'TokenA', balance: 100 },
                { name: 'TokenB', balance: 200 }
            ],
            'account2': [
                { name: 'TokenB', balance: 150 },
                { name: 'TokenC', balance: 300 }
            ]
        };
        return new Promise(resolve => setTimeout(() => resolve(mockData[publicKey] || []), 100));
    }

    async compareBalances(account1: string, account2: string): Promise<ComparisonResult> {
        const tokens1 = await this.fetchTokens(account1);
        const tokens2 = await this.fetchTokens(account2);

        const tokens1Map = new Map(tokens1.map(token => [token.name, token.balance]));
        const tokens2Map = new Map(tokens2.map(token => [token.name, token.balance]));

        const account1Only: Token[] = [];
        const account2Only: Token[] = [];
        const commonTokens: Token[] = [];

        tokens1Map.forEach((balance, name) => {
            if (tokens2Map.has(name)) {
                commonTokens.push({ name, balance: tokens2Map.get(name)! });
                tokens2Map.delete(name);
            } else {
                account1Only.push({ name, balance });
            }
        });

        tokens2Map.forEach((balance, name) => {
            account2Only.push({ name, balance });
        });

        return { account1Only, account2Only, commonTokens };
    }
}

export { SolanaAccountManager, Token, ComparisonResult };