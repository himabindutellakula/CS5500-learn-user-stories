import { BankType, AccountType } from "./types";

export class Bank implements BankType {
    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    public constructor(usernames: string[]) {
        this.usernames = usernames;
    }

    private isUsernameExists(username: string): boolean {
        return this.usernames.includes(username);
    }

    private findAccount(accountNumber: number): AccountType | undefined {
        return this.accounts.find(account => account.id === accountNumber);
    }

    private generateAccountNumber(): number {
        let accountNumber: number;
        do {
            accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        } while (this.findAccount(accountNumber)); // Ensure uniqueness
        return accountNumber;
    }

    public createAccount(username: string, age: number): AccountType {
        if (!this.isUsernameExists(username)) {
            throw new Error("Username is not verified.");
        }
        if (age < 18) {
            throw new Error("Age must be 18 or above.");
        }

        const accountNumber = this.generateAccountNumber();
        const newAccount: AccountType = { id: accountNumber, balance: 0, username };

        this.accounts.push(newAccount);
        return newAccount;
    }

    public deposit(accountNumber: number, amount: number): void {
        if (amount <= 0) {
            throw new Error("Deposit amount must be greater than zero.");
        }

        const account = this.findAccount(accountNumber);
        if (!account) {
            throw new Error("Account not found.");
        }

        account.balance += amount;
    }
}