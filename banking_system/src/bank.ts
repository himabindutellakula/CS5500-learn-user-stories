import { BankType, AccountType } from "./types";

/**
 * The Bank class implements the BankType interface, 
 * simulates a simple banking system that allows users to create accounts,
 * deposit and withdraw funds, and check their account balances.
 */
export class Bank implements BankType {
    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    /**
     * Creates an instance of the Bank class.
     * @param usernames List of verified usernames allowed to create accounts.
     */
    public constructor(usernames: string[]) {
        this.usernames = usernames;
    }

    /**
     * Checks if a given username already exists in the list of usernames.
     * @param username The username to check for existence.
     * @returns True if the username exists, otherwise false.
     */
    private isUsernameExists(username: string): boolean {
        return this.usernames.includes(username);
    }

    /**
     * Finds an account by its account number.
     * @param accountNumber The unique account number.
     * @returns The account if found, otherwise undefined.
     */
    private findAccount(accountNumber: number): AccountType | undefined {
        return this.accounts.find(account => account.id === accountNumber);
    }

    /**
     * Generates a unique 10-digit account number.
     * @returns A unique account number.
     */
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

    public withdraw(accountNumber: number, amount: number): void {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be greater than zero.");
        }

        const account = this.findAccount(accountNumber);
        if (!account) {
            throw new Error("Account not found.");
        }
        if (account.balance < amount) {
            throw new Error("Insufficient funds.");
        }

        account.balance -= amount;
    }

    public checkBalance(accountNumber: number): number {
        const account = this.findAccount(accountNumber);
        if (!account) {
            throw new Error("Account not found.");
        }

        return account.balance;
    }
}
