import { Bank } from '../src/bank';
import { AccountType } from '../src/types';

export class BankTest {
    private bank: Bank;

    constructor() {
        this.bank = new Bank(['user1', 'user2', 'user3']);
    }

    runTests() {
        console.log('Running Bank Tests...');
        this.testCreateAccount();
        this.testDepositMoney();
    }

    private testCreateAccount() {
        console.log('Testing Account Creation');

        // Scenario 1: Successful account creation
        try {
            const account = this.bank.createAccount('user1', 25);
            console.log('Scenario 1 - Successfully created account:', account);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Scenario 1 - Failed to create account (Scenario 1):', error.message);
            }
        }

        // Scenario 2: Account creation with invalid age
        try {
            this.bank.createAccount('user1', 17);
        } catch (error) {
            if (error instanceof Error) {
                console.log('Scenario 2 - Correctly rejected account creation for underage user:', error.message);
            }
        }

        // Scenario 3: Account creation with invalid username
        try {
            this.bank.createAccount('invalidUser', 25);
            console.error('Account should not be created for an invalid username.');
        } catch (error) {
            if (error instanceof Error) {
                console.log('Scenario 3 - Correctly rejected account creation for invalid username:', error.message);
            }
        }
    }

    private testDepositMoney() {
        console.log('Testing Deposit Money');

        // Create a valid account for testing
        const dupAccount = this.bank.createAccount('user2', 30);

        // Scenario 1: Successful deposit
        try {
            const newBalance = this.bank.deposit(dupAccount.id, 500);
            console.log('Scenario 1 - Successfully deposited money. New balance:', dupAccount.balance);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Scenario 1 - Failed to deposit money (Scenario 1):', error.message);
            }
        }

        // Scenario 2.1: Deposit invalid amount (negative)
        try {
            this.bank.deposit(dupAccount.id, -100);
        } catch (error) {
            if (error instanceof Error) {
                console.log('Scenario 2.1 - Correctly rejected deposit of negative amount:', error.message);
            }
        }

        // Scenario 2.2: Deposit invalid amount (zero)
        try {
            this.bank.deposit(dupAccount.id, 0);
        } catch (error) {
            if (error instanceof Error) {
                console.log('Scenario 2.2 - Correctly rejected deposit of zero amount:', error.message);
            }
        }

        // Scenario 3: Deposit to an invalid account
        try {
            this.bank.deposit(9999999999, 200);
        } catch (error) {
            if (error instanceof Error) {
                console.log('Scenario 3 - Correctly rejected deposit to invalid account:', error.message);
            }
        }
    }

}

// Run the tests
const bankTest = new BankTest();
bankTest.runTests();
