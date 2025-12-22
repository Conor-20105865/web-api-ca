import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {    
    length: 400, // max 400 char
    separator: /,?\.* +/, 
  });
}
