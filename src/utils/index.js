export const trimInput = (input) => {
    return input.replace(/^\s*|\s*$/g, '');
}

export const orderBy = (a, b) => {
    return a < b ? -1 : a > b ? 1 : 0
}

export function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
    return (res !== null)
};

export const isNumberInRange = (number, range) => {
    return number >= range[0] && number <= range[1]
}

export const uniq = (list) => {
    var seen = {};
    return list.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
