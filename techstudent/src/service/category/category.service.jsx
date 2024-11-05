export const Categorydata = async () => {
    const url = 'http://127.0.0.1:8000/api/theloai';

    try {
        const response = await fetch(url); // Gọi API nội bộ
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        console.log('Fetched data:', data.data);

        return data.data.map((item) => {
            if (typeof item.hinh !== 'string') {
                console.error('Invalid image format:', item.hinh);
            }
            return {
                id: item.id,
                name: item.ten,
                image: typeof item.hinh === 'string' ? item.hinh : '',
            };
        });
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};