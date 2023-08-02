import { Person } from './person.js';

export class Employee extends Person {
  constructor(fullName, address, id, email, workDay, dailyWage) {
    super(fullName, address, id, email);

    this.workDay = workDay;
    this.dailyWage = dailyWage;
  }

  getTotalSalary() {
    const totalSalary = this.workDay * this.dailyWage;

    return totalSalary;
  }
}
