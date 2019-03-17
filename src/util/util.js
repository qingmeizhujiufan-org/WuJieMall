/**
 * @param 使用js让数字的千分位用,分隔
 */
export function shiftThousands(val, precision) {
    if (typeof val !== "number") {
        return val;
    }
    let _val;
    /* 判断传入的小数点保留位数，没有则不截取 */
    if (arguments.length === 1) {
        _val = val.toString();
    } else {
        _val = val.toFixed(precision);
    }
    /* 判断传入的数值是否是整数，如果是，直接走原生千分位方法，不是，则通过正则处理为千分位 */
    if (_val.indexOf('.') === -1) {
        return val.toLocaleString();
    } else {
        return _val.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
}
