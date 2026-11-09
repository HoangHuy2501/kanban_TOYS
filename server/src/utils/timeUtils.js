
/**
 * Lấy thời gian hiện tại theo múi giờ chỉ định
 */
function getCurrentTime(timeZone = "Asia/Ho_Chi_Minh") {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    }).formatToParts(new Date());

    const hour = Number(
        parts.find(p => p.type === "hour").value
    );

    const minute = Number(
        parts.find(p => p.type === "minute").value
    );

    return hour * 60 + minute;
}

/**
 * Chuyển HH:mm thành số phút
 */
function toMinutes(time) {
    const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);

    if (!match) {
        throw new Error(`Thời gian không hợp lệ: ${time}`);
    }

    return Number(match[1]) * 60 + Number(match[2]);
}

/**
 * Kiểm tra thời gian có nằm trong khoảng không
 * Bao gồm giờ bắt đầu, không bao gồm giờ kết thúc
 */
function isTimeBetween(start, end, timeZone) {
    const current = getCurrentTime(timeZone);
    const startMin = toMinutes(start);
    const endMin = toMinutes(end);

    // Khoảng thông thường, ví dụ 06:00 - 14:00
    if (startMin < endMin) {
        return current >= startMin && current < endMin;
    }

    // Khoảng qua ngày, ví dụ 22:00 - 06:00
    if (startMin > endMin) {
        return current >= startMin || current < endMin;
    }

    // Hai thời điểm bằng nhau được coi là khoảng rỗng
    return false;
}

/**
 * Trả về giá trị tương ứng với khoảng thời gian
 */
function getValueByTime(rules, defaultValue = null, timeZone = "Asia/Ho_Chi_Minh") {
    for (const rule of rules) {
        if (isTimeBetween(rule.start, rule.end, timeZone)) {
            return rule.value;
        }
    }

    return defaultValue;
}

module.exports = {
    getCurrentTime,
    isTimeBetween,
    getValueByTime
};
