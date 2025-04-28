const hasThousandSeparator = (str) => {
    const regex = /[\.,]\d{3}/;
    return regex.test(str);
};
const RemoveThousandSeparator = (value, type) => {
    if (hasThousandSeparator(value)) {
        var _output = value?.replace(/,/g, '');
        if (type === "int") {
            return _output && parseInt(_output) || 0;
        }
        return _output || 0;
    }
    return value

}
export default RemoveThousandSeparator;