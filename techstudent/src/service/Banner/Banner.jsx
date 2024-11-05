export const Bannerdata = async () => {
    const url = 'http://127.0.0.1:8000/api/showbanner';
    
    try {
        console.log(`Fetching data from ${url}`);
        const response = await fetch(url); // Use fetch to call the API
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Return the data from the response

    } catch (error) {
        console.error('Error fetching category data:', error.message);
        throw error;
    }
};