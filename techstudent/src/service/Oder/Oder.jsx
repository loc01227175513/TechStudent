export const Oder = async () => {
    const url = 'http://127.0.0.1:8000/api/lichsumuahang';

    // Retrieve data from local storage
    const data = JSON.parse(localStorage.getItem('data'));

    if (!data || !data.id) {
        throw new Error('No valid data found in local storage');
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_nguoidung: data.id }), // Ensure the body is an object
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Network error or server is down');
    }
};