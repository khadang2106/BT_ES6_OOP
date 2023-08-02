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

domId('selcType').onchange = () => {
  const selc = domId('selcType').value;

  if (selc === 'student') {
    showField('.student-type');
    hideField('.employee-type');
    hideField('.customer-type');
  }
  if (selc === 'employee') {
    showField('.employee-type');
    hideField('.student-type');
    hideField('.customer-type');
  }
  if (selc === 'customer') {
    showField('.customer-type');
    hideField('.student-type');
    hideField('.employee-type');
  }
  if (selc === 'default') {
    hideField('.student-type');
    hideField('.employee-type');
    hideField('.customer-type');
  }
};
