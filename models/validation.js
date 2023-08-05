export class Validation {
  checkSelc = (selcID, errorId, mess) => {
    if (domId(selcID).selectedIndex !== 0) {
      hideError(errorId);
      return true;
    }
    showError(errorId, mess);
    return false;
  };

  checkEmpty = (value, errorId) => {
    if (value.trim() === '') {
      showError(errorId, '(*) This field cannot be blank!');
      return false;
    }

    hideError(errorId);
    return true;
  };

  checkPattern = (value, pattern, errorId, mess) => {
    if (value.match(pattern)) {
      hideError(errorId);
      return true;
    }

    showError(errorId, mess);
    return false;
  };

  checkLimit = (value, errorId, mess, max, min) => {
    if (min <= value && value <= max) {
      hideError(errorId);
      return true;
    }

    showError(errorId, mess);
    return false;
  };

  checkLength = (value, errorId, mess, max, min = 1) => {
    if (
      min <= value.trim().replace(/\s/g, '').length &&
      value.trim().replace(/\s/g, '').length <= max
    ) {
      hideError(errorId);
      return true;
    }

    showError(errorId, mess);
    return false;
  };

  checkExist = (value, data, errorId, mess, obj) => {
    let isExist = false;

    data.forEach((element) => {
      switch (obj) {
        case 'id':
          if (value === element.id) {
            isExist = true;
          }
          break;
        case 'email':
          if (value === element.email) {
            isExist = true;
          }
          break;
        default:
          break;
      }
    });

    if (isExist) {
      showError(errorId, mess);
      return false;
    }

    hideError(errorId);
    return true;
  };
}
