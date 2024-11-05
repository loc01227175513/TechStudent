export const MangXaHoiss = async (data) => {
    const url = 'http://127.0.0.1:8000/api/mangxahoi';
    const localData = JSON.parse(localStorage.getItem('data'));

    if (!localData || !localData.id) {
        throw new Error('No valid data found in local storage');
    }

    // Convert the URL object to a string
    const urlString = Object.values(data.url).join('');

    const requestBody = {
        id_nguoidung: localData.id,
        nentang: data.nentang,
        url: urlString
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error Response:', errorResponse);
            throw new Error('Failed to update user data');
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Network error or server is down');
    }
};
export const ShowMangXaHoi = async () => {
    const url = 'http://127.0.0.1:8000/api/showmangxahoi';
    const localData = JSON.parse(localStorage.getItem('data'));

    if (!localData || !localData.id) {
        throw new Error('No valid data found in local storage');
    }
    const requestBody = {
        id_nguoidung: localData.id,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error Response:', errorResponse);
            throw new Error('Failed to update user data');
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Network error or server is down');
    }
};