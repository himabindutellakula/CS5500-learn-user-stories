/**
 * Represents a bank account.
 * Contains an account ID, balance, and associated username.
 */
export type AccountType = {
    /**
     * Unique ID for the account.
     */
    id: number;

    /**
     * Current balance of the account.
     */
    balance: number;

    /**
     * Username associated with the account.
     */
    username: string;
};

/**
 * Defines the structure of the Bank class interface.
 * This interface outlines the methods required for creating accounts in the bank system.
 */
export interface BankType {
    /**
     * Creates a new account for a verified user with an age of 18 or above.
     * @param username The username of the account holder.
     * @param age The age of the account holder.
     * @returns The newly created account.
     * @throws Throws an error if the username is not verified or age is less than 18.
     */
    createAccount(username: string, age: number): AccountType;

    /**
     * Deposits a specified amount into an account.
     * @param accountNumber The account number to deposit into.
     * @param amount The amount to deposit.
     * @throws Throws an error if the deposit amount is less than or equal to zero, or if the account is not found.
     */
    deposit(accountNumber: number, amount: number): void;

    /**
     * Withdraws a specified amount from an account.
     * @param accountNumber The account number to withdraw from.
     * @param amount The amount to withdraw.
     * @throws Throws an error if the withdrawal amount is less than or equal to zero, if the account is not found, or if there are insufficient funds.
     */
    withdraw(accountNumber: number, amount: number): void;

    /**
     * Checks the balance of a specific account.
     * @param accountNumber The account number to check the balance of.
     * @returns The balance of the account.
     * @throws Throws an error if the account is not found.
     */
    checkBalance(accountNumber: number): number;
}