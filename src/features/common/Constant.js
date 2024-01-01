export const generateRandomId = () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString().substring(2, 8);
    const id = timestamp + random;
    return id;
}
export const getTokenLocalStorage = () => {
    const token = localStorage.getItem("token")
    return token
}
export const token = localStorage.getItem("token");

export const formattedAmount = (amount) => {
    let result = amount?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return result;
}

export const listCategory = [
    {
        id: 1,
        name: "Thời trang Nam"
    },
    {
        id: 2,
        name: "Thời trang Nữ"
    },
    {
        id: 3,
        name: "Thời trang trẻ em"
    },
    {
        id: 4,
        name: "Phụ kiện"
    },
    {
        id: 5,
        name: "Làm đẹp"
    },
]

export const formattedDate = (dateString) => {
    var dateParts = dateString.split("-");
    var formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
    return formattedDate;
}

export const TextToHTML = (text) => {
    const lines = text.split("\n");
    return (
        <div>
            {lines.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    );
}

export const TextToHtmlVisable = (text) => {
    const paragraphs = text.split('\n').filter(Boolean);
    const htmlString = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join(' ');
    return htmlString;
}
