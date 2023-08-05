const domId = (id) => document.getElementById(id);

const showField = (classField) => {
  document.querySelectorAll(classField).forEach((e) => {
    e.style.display = 'block';
  });
};

const hideField = (classField) => {
  document.querySelectorAll(classField).forEach((e) => {
    e.style.display = 'none';
  });
};

const showError = (id, sentence) => {
  domId(id).innerHTML = sentence;
  domId(id).style.display = 'block';
};

const hideError = (id) => {
  domId(id).innerHTML = '';
  domId(id).style.display = 'none';
};

const resetError = () => {
  hideError('errorPersonId');
  hideError('errorName');
  hideError('errorEmail');
  hideError('errorAddress');
  hideError('errorSelc');
  hideError('errorMath');
  hideError('errorPhysics');
  hideError('errorChemical');
  hideError('errorWorkDay');
  hideError('errorDailyWage');
  hideError('errorCompanyName');
  hideError('errorBill');
  hideError('errorReview');
};

const fillValue = (
  fullName = '',
  address = '',
  id = '',
  email = '',
  type = 'default',
  mathGrade = '',
  physicsGrade = '',
  chemGrade = '',
  workDay = '',
  dailyWage = '',
  companyName = '',
  bill = '',
  review = ''
) => {
  domId('userFullName').value = fullName;
  domId('userAddress').value = address;
  domId('userId').value = id;
  domId('userEmail').value = email;
  domId('selcType').value = type;
  domId('mathGrade').value = mathGrade;
  domId('physicsGrade').value = physicsGrade;
  domId('chemGrade').value = chemGrade;
  domId('workDay').value = workDay;
  domId('dailyWage').value = dailyWage;
  domId('companyName').value = companyName;
  domId('bill').value = bill;
  domId('review').value = review;
};

const getValues = () => {
  const fullName = domId('userFullName').value;
  const address = domId('userAddress').value;
  const id = domId('userId').value;
  const email = domId('userEmail').value;
  const type = domId('selcType').value;
  const mathGrade = domId('mathGrade').value;
  const physicsGrade = domId('physicsGrade').value;
  const chemGrade = domId('chemGrade').value;
  const workDay = domId('workDay').value;
  const dailyWage = domId('dailyWage').value;
  const companyName = domId('companyName').value;
  const bill = domId('bill').value;
  const review = domId('review').value;

  return {
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
  };
};

const resetFormValues = () => {
  const values = getValues();
  const { fullName, address, id, email, type } = values;

  if (
    fullName !== '' &&
    address !== '' &&
    id !== '' &&
    email !== '' &&
    type !== 'default'
  ) {
    fillValue();
    hideField('.employee-type');
    hideField('.student-type');
    hideField('.customer-type');
  }
};

const resetSelection = () => {
  domId('selcSort').value = 'default';
  domId('selcFilter').value = 'default';
};
