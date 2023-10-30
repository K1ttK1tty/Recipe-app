const getTodayDate = () => {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();
    const currentMonth = dateObj.getMonth() + 1;
    return day + '-' + currentMonth + '-' + year;
};
module.exports = {
    getTodayDate,
};
