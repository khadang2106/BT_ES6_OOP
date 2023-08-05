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

    this.mathGrade = mathGrade * 1;
    this.physicsGrade = physicsGrade * 1;
    this.chemGrade = chemGrade * 1;
    this.averageGrade = 0;
  }

  getAverGrade() {
    this.averageGrade =
      (this.mathGrade + this.physicsGrade + this.chemGrade) / 3;
  }
}
