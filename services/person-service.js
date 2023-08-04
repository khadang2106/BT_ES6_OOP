export class PersonService {
  list = [];

  addPerson(person) {
    this.list = [...this.list, person];
  }

  delPerson(id) {
    const index = this.list.findIndex((element) => {
      return element.id === id;
    });

    this.list.splice(index, 1);
  }

  findById(id) {
    return this.list.find((element) => {
      return element.id === id;
    });
  }

  updatePerson(person) {
    const index = this.list.findIndex((element) => {
      return element.id === person.id;
    });

    this.list[index] = person;
  }

  filterByType(type) {
    const data = this.list.filter((element) => {
      if (type === 'default') {
        return true;
      }

      return element.type === type;
    });

    return data;
  }

  // sortByName() {
  //   this.list.sort((a, b) => {
  //     if (a.fullName < b.fullName) {
  //       return -1;
  //     }
  //     if (a.fullName > b.fullName) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  // }
}
