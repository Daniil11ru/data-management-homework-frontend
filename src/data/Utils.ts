export const capitalizeKeys = (obj: any): any => {
  const newObj: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      newObj[capitalizedKey] = obj[key];
    }
  }

  return newObj;
};
