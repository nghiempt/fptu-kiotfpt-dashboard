export const capitalizeString = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatNumber = (num: number): string => {
    if (!num) return "0";
    return num.toLocaleString();
};

export const formatDate = (date: Date): string => {
    if (!date) return "";
    return date.toLocaleDateString();
};

export const formatTime = (timestamp: any): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatFollower = (num: number): string => {
    if (num > 999) return (num / 1000).toFixed(0) + "k";
    return num + "";
};

export const checkIsPhoneNumber = (phoneNumber: any) => {
    if (phoneNumber.startsWith('0') && phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
        return true;
    } else {
        return false;
    }
}

export const checkIsEmail = (email: any) => {
    const emailFormatRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailFormatRegex.test(email);
}

export const checkSignIned = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return true;
    } else {
        return false;
    }
};

export const Helper = {
    capitalizeString,
    formatNumber,
    formatDate,
    formatFollower,
    checkIsPhoneNumber,
    checkIsEmail,
    checkSignIned,
    formatTime
};

export default Helper;
