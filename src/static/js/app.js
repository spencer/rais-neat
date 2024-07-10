function getEventDate(event) {
  date = new Date(event);
  return date;
}

function compareDates(comparableEvent){
  let today = new Date();
  let event = getEventDate(comparableEvent);

  switch(true) {
    case event >= today:
          return true;
          break;
    case event < today:
      return false;
      break;
  };
};

// If we're running under Node
if(typeof exports !== 'undefined') {
    exports.getEventDate = getEventDate;
    exports.compareDates = compareDates;
};
