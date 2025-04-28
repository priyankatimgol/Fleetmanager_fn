
const regExpressionTextField = (e, name = "") => {
    var reg = /^[a-zA-Z0-9 ]*$/
    var space = /^\S*$/
    if (reg.test(e.key) === false) {
        e.preventDefault()
    }
    if (space.test(e.key) === false && name == "utr") {
        e.preventDefault()
    }

}

export const regExpressionRemark = (e) => {
    var reg = /^[a-zA-Z0-9 _,]*$/
    if (reg.test(e.key) === false) {
        e.preventDefault()
    }
}

export const isCrossWordLimit = (e, count) => {
    if (e.target.value?.split(" ")?.length > count) {
        return true
    } else {
        return false
    }
}

export const textFieldValidationOnPaste = (e) => {
    const pastedData = (e.originalEvent || e).clipboardData.getData('text/plain');
    // var regex = /^[a-zA-Z0-9 ]*$/
    var reg = /^[a-zA-Z0-9 _,]*$/
    if (!reg.test(pastedData)) {
        e.preventDefault();
        return false;
    } else {
        return true;
    }
}

export default regExpressionTextField;