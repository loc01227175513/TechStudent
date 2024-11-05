import React, { useState, useEffect } from 'react';

const Lecturer = () => {
    const [checkedId, setCheckedId] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('data'));
        if (!storedData) {
            window.location.href = '/login';
        } else {
            setData(storedData);
        }
    }, []);

    const experiences = [
        { id: 'checkbox1', title: 'Giảng viên đại học', description: '5 năm giảng dạy tại trường ABC' },
        { id: 'checkbox2', title: 'Chuyên gia nghiên cứu', description: '3 năm nghiên cứu tại phòng thí nghiệm XYZ' },
        { id: 'checkbox3', title: 'Người hướng dẫn dự án', description: '2 năm hướng dẫn sinh viên tại trường DEF' },
        { id: 'checkbox4', title: 'Thực tập sinh', description: '1 năm thực tập tại công ty GHI' },
    ];

    const sortedExperiences = experiences.sort((a, b) => a.title.localeCompare(b.title));

    const handleCheckboxChange = (id) => {
        setCheckedId(checkedId === id ? null : id);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id_nguoidung', data.id);

        fetch('/api/chuyendoi', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                responseData.vaitro = 1;
                localStorage.setItem('data', JSON.stringify(responseData));
                window.location.href = '/';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Kinh nghiệm làm việc</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {sortedExperiences.map(({ id, title, description }) => (
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id={id}
                                    className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded"
                                    checked={checkedId === id}
                                    onChange={() => handleCheckboxChange(id)}
                                />
                                <label htmlFor={id} className="ml-3 text-gray-700 flex-1">
                                    <span className="font-medium">{title}</span>: {description}
                                </label>
                            </div>
                        ))}
                    </div>
                    {data && (
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
                            >
                                Save
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Lecturer;
