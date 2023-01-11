export const formatZipcode = function (zipcode: string): string {
    return zipcode.replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}

export const clearZipcode = function (zipcode: string): string {
    return zipcode.replace(/\.|\-/g, '');
}