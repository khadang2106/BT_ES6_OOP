import { Person } from './person.js';

export class Employee extends Person {
  constructor(fullName, address, id, email, type, workDay, dailyWage) {
    super(fullName, address, id, email, type);

    this.workDay = workDay * 1;
    this.dailyWage = dailyWage * 1;
    this.totalSalary = 0;
  }

  getTotalSalary() {
    this.totalSalary = this.workDay * this.dailyWage;
  }
}
