function isEmail(str: string): boolean {
    if (str.includes('@')) {
        return true;
    }
    return false;
}


export { isEmail }  