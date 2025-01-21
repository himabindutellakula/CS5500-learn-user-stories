import { Bank } from '../src/bank';

export class BankTest {
    private bank: Bank;

    constructor() {
        this.bank = new Bank(['user1', 'user2', 'user3', 'user4']);
    }

    runTests() {
        console.log('Running Bank Tests...');
        this.testCreateAccount();
        this.testDepositMoney();
        this.testWithdrawMoney();
        this.testCheckBalance();
    }

    private testCreateAccount() {
        console.log('---Testing Account Creation---');

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
        console.log('---Testing Deposit Money---');

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

    private testWithdrawMoney() {
        console.log('---Testing Withdraw Money---');

        // Create a valid account for testing
        const dupAccount2 = this.bank.createAccount('user3', 22);
        this.bank.deposit(dupAccount2.id, 1000);
        console.log('Initial Account Details Account Id: ',dupAccount2.id,' Balance: ',dupAccount2.balance);
        
        // Scenario 1: Successful withdrawal
        try {
            const newBalance = this.bank.withdraw(dupAccount2.id, 500);
            console.log('Scenario 1 - Successfully withdrew money. New balance:', dupAccount2.balance);
        } catch (error) {
            if (error instanceof Error){
                console.error('Failed to withdraw money (Scenario 1):', error.message);
            }
        }

        // Scenario 2: Withdrawal exceeding available funds
        try {
            this.bank.withdraw(dupAccount2.id, 1500);
            console.error('Withdrawal should not exceed available balance.');
        } catch (error) {
            if (error instanceof Error){
                console.log('Scenario 2 - Correctly rejected withdrawal exceeding balance:', error.message);
            }
        }

        // Scenario 3.1: Withdrawal of invalid amount (negative)
        try {
            this.bank.withdraw(dupAccount2.id, -100);
            console.error('Withdrawal should not allow negative amounts.');
        } catch (error) {
            if (error instanceof Error)
            console.log('Scenario 3.1 - Correctly rejected withdrawal of negative amount:', error.message);
        }

        // Scenario 3.2: Withdrawal of invalid amount (zero)
        try {
            this.bank.withdraw(dupAccount2.id, 0);
            console.error('Withdrawal should not allow negative amounts.');
        } catch (error) {
            if (error instanceof Error)
            console.log('Scenario 3.2 - Correctly rejected withdrawal of zero amount:', error.message);
        }

        // Scenario 4: Withdrawal from an invalid account
        try {
            this.bank.withdraw(9999999999, 100);
            console.error('Withdrawal should not be allowed from an invalid account.');
        } catch (error) {
            if (error instanceof Error)
            console.log('Scenario 4 - Correctly rejected withdrawal from invalid account:', error.message);
        }
    }

    private testCheckBalance() {
        console.log('---Testing Balance Check---');

        // Create a valid account for testing
        const dupAccount = this.bank.createAccount('user4', 22);
        this.bank.deposit(dupAccount.id, 1000);
        console.log('Initial Account Details Account Id: ',dupAccount.id,' Balance: ',dupAccount.balance);
        
        // Scenario 1: Successful balance inquiry
        try {
            const balance = this.bank.checkBalance(dupAccount.id);
            console.log('Scenario 1 - Successfully retrieved balance:', balance);
        } catch (error) {
            if (error instanceof Error)
            console.error('Scenario 1 - Failed to retrieve balance (Scenario 1):', error.message);
        }

        // Scenario 2: Balance inquiry for an invalid account
        try {
            this.bank.checkBalance(9999999999);
            console.error('Balance inquiry should not be allowed for an invalid account.');
        } catch (error) {
            if (error instanceof Error)
            console.log('Scenario 2 - Correctly rejected balance inquiry for invalid account:', error.message);
        }
    }

}

// Run the tests
const bankTest = new BankTest();
bankTest.runTests();
