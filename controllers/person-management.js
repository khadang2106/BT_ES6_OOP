import { Customer } from '../models/customer.js';
import { Employee } from '../models/employee.js';
import { Student } from '../models/student.js';
import { Validation } from '../models/validation.js';
import { PersonService } from '../services/person-service.js';

const personService = new PersonService();

const valid = new Validation();

const numberFormat = new Intl.NumberFormat('VN-vn');

const getPerson = () => {
  const value = getValues();
  const {
    fullName,
    address,
    id,
    email,
    type,
    mathGrade,
    physicsGrade,
    chemGrade,
    workDay,
    dailyWage,
    companyName,
    bill,
    review,
  } = value;

  checkValidWhenType();
  if (checkValid()) {
    switch (type) {
      case 'Student':
        return addStudent(
          fullName,
          address,
          id,
          email,
          type,
          mathGrade,
          physicsGrade,
          chemGrade
        );
      case 'Employee':
        return addEmployee(
          fullName,
          address,
          id,
          email,
          type,
          workDay,
          dailyWage
        );

      case 'Customer':
        return addCustomer(
          fullName,
          address,
          id,
          email,
          type,
          companyName,
          bill,
          review
        );

      default:
        break;
    }
  }

  return null;
};

domId('selcType').onchange = () => {
  const selc = domId('selcType').value;

  switch (selc) {
    case 'Student':
      showField('.student-type');
      hideField('.employee-type');
      hideField('.customer-type');
      break;
    case 'Employee':
      showField('.employee-type');
      hideField('.student-type');
      hideField('.customer-type');
      break;
    case 'Customer':
      showField('.customer-type');
      hideField('.student-type');
      hideField('.employee-type');
      break;
    default:
      hideField('.student-type');
      hideField('.employee-type');
      hideField('.customer-type');
      break;
  }
};

const renderTable = (data = personService.list) => {
  const content = data.reduce((total, element) => {
    const { fullName, address, id, email, type } = element;

    total += `
      <tr>
        <td class="text-center">${id}</td>
        <td>${fullName}</td>
        <td>${email}</td>
        <td>${address}</td>
        <td class="text-center">${type}</td>
        <td class="text-center">
          <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#detailModal" onclick="showDetail('${id}')">Show detail</button>
        </td>
        <td class="text-center">
          <button type="button" class="btn btn-danger mb-1"  onclick="deletePerson('${id}')"><i class="fa-solid fa-trash"></i></button>
          <button type="button" data-toggle="modal" data-target="#addingModal" class="btn btn-warning" onclick="modifyPerson('${id}')"><i class="fa-solid fa-wrench"></i></button>
        </td>
      </tr>
    `;

    return total;
  }, '');

  domId('tbdList').innerHTML = content;
};

const renderDetail = (obj) => {
  const {
    fullName,
    address,
    id,
    email,
    type,
    mathGrade,
    physicsGrade,
    chemGrade,
    workDay,
    dailyWage,
    companyName,
    bill,
    review,
    averageGrade,
    totalSalary,
  } = obj;

  let content = '';

  content += `
    <div class="container person-input-form">
              <div class="input-field">
                <label><i class="fa fa-id-card"></i>ID:</label>
                <span class="detail-span">${id}</span>
              </div>

              <div class="input-field">
                <label><i class="fa fa-user"></i>Full Name:</label>
                <span class="detail-span">${fullName}</span>
              </div>

              <div class="input-field">
                <label><i class="fa fa-envelope"></i>Email:</label>
                <span class="detail-span">${email}</span>
              </div>

              <div class="input-field">
                <label><i class="fa fa-home"></i>Address:</label>
                <span class="detail-span">${address}</span>
              </div>

              <div class="input-field">
                <label><i class="fa-solid fa-bars"></i>Type:</label>
                <span class="detail-span">${type}</span>
              </div>
  `;

  switch (type) {
    case 'Student':
      content += `
              <div class="input-field">
                <label><i class="fa fa-calculator"></i>Math Grade:</label>
                <span class="detail-span">${mathGrade}</span>
              </div>

              <div class="input-field">
                <label><i class="fa fa-atom"></i>Physics Grade:</label>
                <span class="detail-span">${physicsGrade}</span>
              </div>

              <div class="input-field">
                <label><i class="fa fa-flask"></i>Chemical Grade:</label>
                <span class="detail-span">${chemGrade}</span>
              </div>

              <div class="input-field">
                <label><i class="fa-solid fa-marker"></i>Average Grade:</label>
                <span class="detail-span">${averageGrade}</span>
              </div>
        `;
      break;

    case 'Employee':
      content += `
              <div class="input-field">
                <label
                  ><i class="fa-solid fa-business-time"></i>Work Day:</label
                >
                <span class="detail-span">${workDay}</span>
              </div>

              <div class="input-field">
                <label><i class="fa-solid fa-coins"></i>Daily Wage:</label>
                <span class="detail-span">${numberFormat.format(
                  dailyWage
                )} VND</span>
              </div>

              <div class="input-field">
                <label><i class="fa-solid fa-sack-dollar"></i>Total Salary:</label>
                <span class="detail-span">${numberFormat.format(
                  totalSalary
                )} VND</span>
              </div>
        `;
      break;

    case 'Customer':
      content += `
              <div class="input-field">
                <label
                  ><i class="fa-solid fa-building"></i>Company's Name:</label
                >
                <span class="detail-span">${companyName}</span>
              </div>

              <div class="input-field">
                <label
                  ><i class="fa-solid fa-money-check-dollar"></i>Bill:</label
                >
                <span class="detail-span">${numberFormat.format(
                  bill
                )} VND</span>
              </div>

              <div class="input-field">
                <label><i class="fa-solid fa-comment"></i>Review:</label>
                <span class="detail-span">${review}</span>
              </div>
            </div>
        `;
      break;

    default:
      break;
  }

  return content;
};

const addStudent = (
  fullName,
  address,
  id,
  email,
  type,
  mathGrade,
  physicsGrade,
  chemGrade
) => {
  const person = new Student(
    fullName,
    address,
    id,
    email,
    type,
    mathGrade,
    physicsGrade,
    chemGrade
  );

  person.getAverGrade();

  return person;
};

const addEmployee = (
  fullName,
  address,
  id,
  email,
  type,
  workDay,
  dailyWage
) => {
  const person = new Employee(
    fullName,
    address,
    id,
    email,
    type,
    workDay,
    dailyWage
  );

  person.getTotalSalary();

  return person;
};

const addCustomer = (
  fullName,
  address,
  id,
  email,
  type,
  companyName,
  bill,
  review
) => {
  const person = new Customer(
    fullName,
    address,
    id,
    email,
    type,
    companyName,
    bill,
    review
  );

  return person;
};

const setLocalStorage = () => {
  const stringify = JSON.stringify(personService.list);

  localStorage.setItem('PERSON_LIST_KEY', stringify);
};

const getLocalStorage = () => {
  const stringify = localStorage.getItem('PERSON_LIST_KEY');

  if (stringify) {
    personService.list = JSON.parse(stringify);
  }
};

const saveData = () => {
  setLocalStorage();
  renderTable();
};

window.onload = () => {
  getLocalStorage();
  renderTable();
};

//=====================================================

/**
 * Add Person
 */
domId('btnAdd').onclick = () => {
  document.querySelector(
    '.modal-footer-btn'
  ).innerHTML = `<button class="btn btn-info" type="button" onclick="addPerson()">Add</button>`;

  domId('userId').disabled = false;
  domId('userId').style.fontWeight = 'normal';
  domId('userId').style.borderBottom = 'solid 3px rgba(41, 82, 232, 0.301)';

  resetFormValues();
};

window.addPerson = () => {
  const person = getPerson();
  if (person) {
    personService.addPerson(person);

    saveData();

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${person.fullName} has been added successfully!`,
    });

    resetSelection();

    document.querySelectorAll('.modal-footer button')[1].click();
  }
};

/**
 * Delete Person
 */
window.deletePerson = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary mr-2',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          `Your user's info has been deleted!`,
          'success'
        );

        personService.delPerson(id);

        saveData();

        resetSelection();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          `Your file is safe :)`,
          'error'
        );
      }
    });
};

/**
 * Update Person
 */
// Open Modify Form
window.modifyPerson = (userId) => {
  document.querySelector('.modal-title').innerHTML = 'Modify Information';
  document.querySelector(
    '.modal-footer-btn'
  ).innerHTML = `<button class="btn btn-warning" type="button" onclick="updatePerson()">Update</button>`;

  domId('userId').disabled = true;
  domId('userId').style.fontWeight = 'bold';
  domId('userId').style.border = 'none';

  resetError();

  const person = personService.findById(userId);
  const {
    fullName,
    address,
    id,
    email,
    type,
    mathGrade,
    physicsGrade,
    chemGrade,
    workDay,
    dailyWage,
    companyName,
    bill,
    review,
  } = person;

  switch (type) {
    case 'Student':
      fillValue(
        fullName,
        address,
        id,
        email,
        type,
        mathGrade,
        physicsGrade,
        chemGrade
      );
      showField('.student-type');
      hideField('.employee-type');
      hideField('.customer-type');
      break;
    case 'Employee':
      fillValue(
        fullName,
        address,
        id,
        email,
        type,
        '',
        '',
        '',
        workDay,
        dailyWage
      );
      showField('.employee-type');
      hideField('.student-type');
      hideField('.customer-type');
      break;
    case 'Customer':
      fillValue(
        fullName,
        address,
        id,
        email,
        type,
        '',
        '',
        '',
        '',
        '',
        companyName,
        bill,
        review
      );
      showField('.customer-type');
      hideField('.student-type');
      hideField('.employee-type');
      break;
    default:
      break;
  }
};
//Update Info
window.updatePerson = () => {
  const person = getPerson();

  if (person) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        personService.updatePerson(person);

        saveData();

        Swal.fire('Saved!', ``, 'success');

        resetSelection();

        document.querySelectorAll('.modal-footer button')[1].click();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
};

/**
 * Show detail
 */
window.showDetail = (userId) => {
  document.querySelector(
    '#detailModal .modal-title'
  ).innerHTML = `Detail Information`;

  const person = personService.findById(userId);

  document.querySelector('#detailModal .modal-body').innerHTML =
    renderDetail(person);
};

/**
 * Filter by type
 */
domId('selcFilter').onchange = () => {
  const type = domId('selcFilter').value;

  const data = personService.filterByType(type);

  renderTable(data);
};

/**
 * Sort by name
 */

domId('selcSort').onchange = () => {
  const type = domId('selcSort').value;

  let newArr = [...personService.list];

  const { sortNameFromAToZ, sortNameFromZtoA } = personService;

  switch (type) {
    case 'a-z':
      newArr.sort(sortNameFromAToZ);

      renderTable(newArr);
      break;

    case 'z-a':
      newArr.sort(sortNameFromZtoA);

      renderTable(newArr);
      break;

    default:
      renderTable();
      break;
  }
};

/**
 * Validation Field Function
 */
const checkValid = () => {
  const values = getValues();
  const {
    fullName,
    address,
    id,
    email,
    type,
    mathGrade,
    physicsGrade,
    chemGrade,
    workDay,
    dailyWage,
    companyName,
    bill,
    review,
  } = values;

  const { checkEmpty, checkSelc, checkPattern, checkLimit, checkLength } =
    valid;

  let isValid = true;

  // ID
  isValid &=
    checkEmpty(id, 'errorPersonId') &&
    checkPattern(id, /^[a-zA-Z0-9]*$/, 'errorPersonId', `(*) Invalid ID`) &&
    checkPattern(
      id,
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
      'errorPersonId',
      `(*) ID must have at least 1 number and 1 character`
    );

  // Full Name
  isValid &=
    checkEmpty(fullName, 'errorName') &&
    checkPattern(
      fullName,
      '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
        'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
        'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$',
      'errorName',
      `(*) Invalid Name`
    );

  // Email
  isValid &=
    checkEmpty(email, 'errorEmail') &&
    checkPattern(
      email,
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'errorEmail',
      `(*) Invalid Email`
    );

  // Address
  isValid &=
    checkEmpty(address, 'errorAddress') &&
    checkPattern(
      address,
      /^(?=.*[a-zA-Z])([a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s 0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>~`\/?]+)$/,
      'errorAddress',
      `(*) Invalid Address`
    );

  // Type
  isValid &= checkSelc(
    'selcType',
    'errorSelc',
    `(*) Type need to be selected!`
  );

  switch (type) {
    case 'Student':
      // Math Grade
      isValid &=
        checkEmpty(mathGrade, 'errorMath') &&
        checkPattern(
          mathGrade,
          /^[+]?\d+([.]\d+)?$/,
          'errorMath',
          `(*) Grade must be positive number`
        ) &&
        checkPattern(
          mathGrade,
          /^\d*\.?\d{0,3}$/,
          'errorMath',
          `(*) Only allow maximum 3-decimal digit`
        ) &&
        checkLimit(
          mathGrade,
          'errorMath',
          `(*) Grade must be between 0 - 10`,
          10,
          0
        );

      // Physics Grade
      isValid &=
        checkEmpty(physicsGrade, 'errorPhysics') &&
        checkPattern(
          physicsGrade,
          /^[+]?\d+([.]\d+)?$/,
          'errorPhysics',
          `(*) Grade must be positive number`
        ) &&
        checkPattern(
          physicsGrade,
          /^\d*\.?\d{0,3}$/,
          'errorPhysics',
          `(*) Only allow maximum 3-decimal digit`
        ) &&
        checkLimit(
          physicsGrade,
          'errorPhysics',
          `(*) Grade must be between 0 - 10`,
          10,
          0
        );

      // Chemical Grade
      isValid &=
        checkEmpty(chemGrade, 'errorChemical') &&
        checkPattern(
          chemGrade,
          /^[+]?\d+([.]\d+)?$/,
          'errorChemical',
          `(*) Grade must be positive number`
        ) &&
        checkPattern(
          chemGrade,
          /^\d*\.?\d{0,3}$/,
          'errorChemical',
          `(*) Only allow maximum 3-decimal digit`
        ) &&
        checkLimit(
          chemGrade,
          'errorChemical',
          `(*) Grade must be between 0 - 10`,
          10,
          0
        );

      break;
    case 'Employee':
      // Work Day
      isValid &=
        checkEmpty(workDay, 'errorWorkDay') &&
        checkPattern(
          workDay,
          /^[+]?\d+([.]\d+)?$/,
          'errorWorkDay',
          `(*) Work day must be positive number`
        ) &&
        checkPattern(
          workDay,
          /^([+-]?[1-9]\d*|0)$/,
          'errorWorkDay',
          `(*) Work day must be integer`
        ) &&
        checkLimit(
          workDay,
          'errorWorkDay',
          `(*) Work day must be between 1 - 31`,
          31,
          1
        );

      // Daily Wage
      isValid &=
        checkEmpty(dailyWage, 'errorDailyWage') &&
        checkPattern(
          dailyWage,
          /^[+]?\d+([.]\d+)?$/,
          'errorDailyWage',
          `(*) Daily wage must be positive number`
        ) &&
        checkPattern(
          dailyWage,
          /^([+-]?[1-9]\d*|0)$/,
          'errorDailyWage',
          `(*) Daily wage must be integer`
        ) &&
        checkLimit(
          dailyWage,
          'errorDailyWage',
          `(*) Daily wage must be between 200,000 - 500,000VND`,
          500000,
          200000
        );

      break;
    case 'Customer':
      // Company Name
      isValid &=
        checkEmpty(companyName, 'errorCompanyName') &&
        checkPattern(
          companyName,
          /^(?=.*[a-zA-Z])([a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s 0-9]+)$/,
          'errorCompanyName',
          `(*) Invalid Company Name`
        );

      // Bill
      isValid &=
        checkEmpty(bill, 'errorBill') &&
        checkPattern(
          bill,
          /^[+]?\d+([.]\d+)?$/,
          'errorBill',
          `(*) Bill must be positive number`
        ) &&
        checkPattern(
          bill,
          /^([+-]?[1-9]\d*|0)$/,
          'errorBill',
          `(*) Bill must be integer`
        ) &&
        checkLimit(
          bill,
          'errorBill',
          `(*) Bill must be between 500,000 - 10,000,000VND`,
          10e6,
          500000
        );

      // Review
      isValid &=
        checkEmpty(review, 'errorReview') &&
        checkPattern(
          review,
          /^(?=.*[a-zA-Z])([a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s 0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>~`\/?]+)$/,
          'errorReview',
          `(*) Invalid Review`
        ) &&
        checkLength(
          review,
          'errorReview',
          `(*) Review must be between 10 - 50 characters long`,
          50,
          10
        );

      break;
    default:
      break;
  }

  return isValid;
};

const checkValidWhenType = () => {
  domId('userFullName').addEventListener('keyup', checkValid);
  domId('userAddress').addEventListener('keyup', checkValid);
  domId('userId').addEventListener('keyup', checkValid);
  domId('userEmail').addEventListener('keyup', checkValid);
  domId('selcType').addEventListener('change', checkValid);
  domId('mathGrade').addEventListener('keyup', checkValid);
  domId('physicsGrade').addEventListener('keyup', checkValid);
  domId('chemGrade').addEventListener('keyup', checkValid);
  domId('workDay').addEventListener('keyup', checkValid);
  domId('dailyWage').addEventListener('keyup', checkValid);
  domId('companyName').addEventListener('keyup', checkValid);
  domId('bill').addEventListener('keyup', checkValid);
  domId('review').addEventListener('keyup', checkValid);
};
