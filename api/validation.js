module.exports = (app) => {
  function existsOrError(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value === "string" && !value.trim()) throw msg;
  }

  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg);
    } catch (msg) {
      return;
    }
    throw msg;
  }

  function equalsOrError(valueA, valueB, msg) {
    if (valueA !== valueB) throw msg;
  }

  function minMaxLength(value, min, max, msg) {
    let decimal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!value.match(decimal)) throw msg;
  }

  function isEmpty(value, msg) {
    if (value.isArray || value.length === 0) throw msg;
  }

  return {
    existsOrError,
    notExistsOrError,
    equalsOrError,
    minMaxLength,
    isEmpty,
  };
};
