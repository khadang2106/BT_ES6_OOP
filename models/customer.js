import { Person } from './person.js';

export class Customer extends Person {
  constructor(fullName, address, id, email, type, companyName, bill, review) {
    super(fullName, address, id, email, type);

    this.companyName = companyName;
    this.bill = bill;
    this.review = review;
  }
}
