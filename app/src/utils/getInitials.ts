export function getInitials(firstname: string | undefined, lastname: string | undefined) {
    if (!firstname || !lastname) {
        return "";
    }
    return (firstname.charAt(0) + lastname.charAt(0)).toUpperCase();
}
