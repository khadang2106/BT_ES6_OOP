import { Person } from './person.js';

export class Customer extends Person {
  constructor(fullName, address, id, email, companyName, bill, review) {
    super(fullName, address, id, email);

    this.companyName = companyName;
    this.bill = bill;
    this.review = review;
  }
}
