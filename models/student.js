import { Person } from './person.js';

export class Student extends Person {
  constructor(
    fullName,
    address,
    id,
    email,
    type,
    mathGrade,
    physicsGrade,
    chemGrade
  ) {
    super(fullName, address, id, email, type);

    this.mathGrade = mathGrade;
    this.physicsGrade = physicsGrade;
    this.chemGrade = chemGrade;
  }

  getAverGrade() {
    const averageGrade =
      (this.mathGrade + this.physicsGrade + this.chemGrade) / 3;

    return averageGrade;
  }
}
