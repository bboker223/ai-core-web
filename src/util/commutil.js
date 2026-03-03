/**
 * 时间戳转换工具类 (JavaScript 版本)
 * 支持秒级（10位）和毫秒级（13位）时间戳自动识别
 * 支持本地时区和UTC时区转换
 */
const moment = {
    getDate () {
        const date = new Date()
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    },
    getTime () {
        const date = new Date()
        return `${this.padDate(date.getHours())}:${this.padDate(date.getMinutes())}`
    },
    padDate (value) {
        return value < 10 ? '0' + value : value
    },

    /**
     * 日期格式化
     * @param param 字符串
     * @returns {string}
     */
    timrRender(param) {
        const date = this.toDate(param);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },


    /**
     * 日期格式化
     * @param param 字符串
     * @returns {string}
     */
    timrRenderYear(param) {
        const date = this.toDate(param);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    },

    /**
     * 计算距离指定到期时间还有多少天
     * @param {number} expirationTimestamp - 后端传来的到期时间戳，单位为秒。
     * @returns {number} - 剩余天数，向上取整。如果已过期，则返回0。
     */
    getDaysUntilExpiration(expirationTimestamp) {
        const expirationTimeInMs = expirationTimestamp * 1000;

        const currentTimeInMs = Date.now();

        const timeDifferenceInMs = expirationTimeInMs - currentTimeInMs;

        // 如果时间差小于等于0，表示已经过期
        if (timeDifferenceInMs <= 0) {
            return 0;
        }
        const msInDay = 1000 * 60 * 60 * 24;

        const days = Math.ceil(timeDifferenceInMs / msInDay);

        return days;
    },

    /**
     * 时间戳转日期对象
     * @param {number} timestamp - 时间戳（秒级或毫秒级）
     * @returns {Date} 日期对象
     */
    toDate(timestamp) {
    const msTimestamp = timestamp < 1e12 ? timestamp * 1000 : timestamp;
    return new Date(msTimestamp);
    },


    formatCurrency(cents) {
        if (!cents) return cents
        return (cents / 100).toFixed(2)
    }


}


export default moment