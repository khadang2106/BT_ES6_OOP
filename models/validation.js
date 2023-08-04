export class Validation {
  checkSelc = (selcID, errorID, mess) => {
    if (domId(selcID).selectedIndex !== 0) {
      hideError(errorID);
      return true;
    }
    showError(errorID, mess);
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

  checkLimit = (value, errorID, mess, max, min) => {
    if (min <= value && value <= max) {
      hideError(errorID);
      return true;
    }

    showError(errorID, mess);
    return false;
  };

  checkLength = (value, errorID, mess, max, min = 1) => {
    if (
      min <= value.trim().replace(/\s/g, '').length &&
      value.trim().replace(/\s/g, '').length <= max
    ) {
      hideError(errorID);
      return true;
    }

    showError(errorID, mess);
    return false;
  };
}
