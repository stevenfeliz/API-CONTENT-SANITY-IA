

export const generateRandomDate = () => {
    const currentDate = new Date();
    const randomDays = Math.floor(Math.random() * 60);
    currentDate.setDate(currentDate.getDate() - randomDays);


    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedDate;

}