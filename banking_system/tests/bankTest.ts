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
    }

    // private testCreateAccount() {
    //     console.log('Testing Account Creation...');

    //     // Scenario 1: Successful account creation
    //     try {
    //         const account = this.bank.createAccount('user1', 25);
    //         console.log('Successfully created account:', account);
    //     } catch (error) {
    //         console.error('Failed to create account (Scenario 1):', error.message);
    //     }

    //     // Scenario 2: Account creation with invalid age
    //     try {
    //         this.bank.createAccount('user1', 17);
    //         console.error('Account should not be created for users under 18.');
    //     } catch (error) {
    //         console.log('Correctly rejected account creation for underage user:', error.message);
    //     }

    //     // Scenario 3: Account creation with invalid username
    //     try {
    //         this.bank.createAccount('invalidUser', 25);
    //         console.error('Account should not be created for an invalid username.');
    //     } catch (error) {
    //         console.log('Correctly rejected account creation for invalid username:', error.message);
    //     }
    // }

    private testCreateAccount() {
        console.log('Testing Account Creation...');
    
        // Scenario 1: Successful account creation
        try {
            const account = this.bank.createAccount('user1', 25);
            console.log('Successfully created account:', account);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Failed to create account (Scenario 1):', error.message);
            } else {
                console.error('Unexpected error (Scenario 1):', error);
            }
        }
    
        // Scenario 2: Account creation with invalid age
        try {
            this.bank.createAccount('user1', 17);
            console.error('Account should not be created for users under 18.');
        } catch (error) {
            if (error instanceof Error) {
                console.log('Correctly rejected account creation for underage user:', error.message);
            } else {
                console.error('Unexpected error (Scenario 2):', error);
            }
        }
    
        // Scenario 3: Account creation with invalid username
        try {
            this.bank.createAccount('invalidUser', 25);
            console.error('Account should not be created for an invalid username.');
        } catch (error) {
            if (error instanceof Error) {
                console.log('Correctly rejected account creation for invalid username:', error.message);
            } else {
                console.error('Unexpected error (Scenario 3):', error);
            }
        }
    }
    
}

// Run the tests
const bankTest = new BankTest();
bankTest.runTests();
