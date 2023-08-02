import { Person } from './person.js';

export class Student extends Person {
  constructor(fullName, address, id, email, mathGrade, physicGrade, chemGrade) {
    super(fullName, address, id, email);

    this.mathGrade = mathGrade;
    this.physicGrade = physicGrade;
    this.chemGrade = chemGrade;
  }

  getAverGrade() {
    const averageGrade =
      (this.mathGrade + this.physicGrade + this.chemGrade) / 3;

    return averageGrade;
  }
}
