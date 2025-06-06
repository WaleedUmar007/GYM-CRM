import { FormInstance } from 'antd';
import moment from 'moment';

/**
 * Humanize coded text
 *
 * @param {string} str - str to humanize
 * @returns {string} - humanize string
 */
export const humanize = (str: string): string => {
  const zero = 0;
  const one = 1;
  const frags = str.split('_');
  for (let i = zero; i < frags.length; i++) {
    frags[i] = frags[i].charAt(zero).toUpperCase() + frags[i].slice(one);
  }
  return frags.join(' ');
};

/**
 * Search for Array of strings and objects
 * one by one
 *
 * @param {string} search - value to search for
 * @param {Array<string | Record<string, string>>} filter - scale range min
 * @returns {boolean} - boolean
 */
export const searchInArrayOfObjectsandStrings = (
  search: string,
  filter: Array<string | Record<string, string>> = []
) => {
  const minusOne = -1;
  return (obj: string | Record<string, unknown>): boolean => {
    /**
     * filter array can have string or objects, nothing else.
     * -----------------------------------------------------
     * This funcion can search in objects, arrays and strings
     */
    return filter.some((f) => {
      try {
        if (typeof obj === 'string') {
          return obj.toLowerCase().indexOf(search.toLowerCase()) > minusOne;
        }
        if (typeof f === 'string') {
          if (typeof obj[f] === 'string') {
            if (moment(obj[f] as string).isValid()) {
              return (
                moment(obj[f] as string)
                  .format('D MMM YYYY , h:mm:ss:A')
                  .toLowerCase()
                  .indexOf(search.toLowerCase()) > minusOne
              );
            }
            return (obj[f] as string).toLowerCase().indexOf(search.toLowerCase()) > minusOne;
          } else if (typeof obj[f] === 'number') {
            return (obj[f] as number).toString().indexOf(search) > minusOne;
          }
          return false;
        } else if (typeof f == 'object') {
          /**
           * Array is also an object
           */
          let found = false;
          const keys = Object.keys(f);
          for (let i = 0; i < keys.length; i++) {
            if (typeof obj[keys[i]] === 'object') {
              found = (
                Array.isArray(obj[keys[i]] as object)
                  ? (obj[keys[i]] as Array<string | Record<string, unknown>>)
                  : ([obj[keys[i]]] as Array<string | Record<string, unknown>>)
              ).some(
                searchInArrayOfObjectsandStrings(search, [f[keys[i]]] as Array<
                  string | Record<string, string>
                >)
              );
              if (found) {
                return true;
              }
            } else {
              return false;
            }
          }
          return false;
        }
        return false;
      } catch (e) {
        return false;
      }
    });
  };
};

/**
 * populate fields with data
 *
 * @param {Record<string, unknown>} data form data
 * @param {FormInstance<any>} form form data
 * @returns {void} void
 */
export const initFormFields = (data: Record<string, unknown>, form: FormInstance<any>): void => {
  Object.keys(data).forEach((key) => {
    form.setFieldValue(key, data[key]);
  });
};
