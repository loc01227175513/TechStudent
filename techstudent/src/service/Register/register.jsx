export const Register = async (formData) => {
    const url = 'http://127.0.0.1:8000/api/dangky';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to register');
        }

        return response.json();
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}