/**
 * https://stackoverflow.com/a/46181
 */
export const validateEmail = (email) => {
  return String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

/**
 * https://dev.to/rajnishkatharotiya/get-byte-size-of-the-string-in-javascript-20jm
 */
export const byteSize = str => new Blob([str]).size;
