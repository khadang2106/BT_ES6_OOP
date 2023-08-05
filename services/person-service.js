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

  getFirstName = (fullName) => {
    const splitName = fullName.split(' ');

    return splitName[splitName.length - 1];
  };

  sortNameFromAToZ = (a, b) => {
    const nameA = this.getFirstName(a.fullName.toLowerCase());
    const nameB = this.getFirstName(b.fullName.toLowerCase());

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  sortNameFromZtoA = (a, b) => {
    const nameA = this.getFirstName(a.fullName.toLowerCase());
    const nameB = this.getFirstName(b.fullName.toLowerCase());

    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  };
}
