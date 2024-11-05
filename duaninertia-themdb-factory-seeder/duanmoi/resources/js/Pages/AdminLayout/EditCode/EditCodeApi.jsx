import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditCodeApi() {
    const [courses, setCourses] = useState('');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin-api/source/api');
                setCourses(response.data.data.fileContent);
                console.log(response.data.data.fileContent);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/admin-api/source/api', { content: courses });
            setCourses(response.data.fileContent);
            console.log(response.data.fileContent);
        } catch (error) {
            console.error('Error updating content:', error);
        }
    };

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="bg-red-500 text-white rounded-full p-2 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold">API</h2>
                </div>
                <div className="flex items-center">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                        </svg>
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12H6.75m12.75 0a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <div className="bg-gray-700 p-4 rounded-lg mt-4">
                    <form onSubmit={handleSubmit} className="mt-4">
                        <textarea
                            className="w-full h-64 bg-gray-800 text-red-400 p-4 rounded-lg"
                            value={courses}
                            onChange={(e) => setCourses(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4">
                         Cập nhật nội dung
                        </button>
                    </form>
                    <div className="text-right text-red-400 mt-2">
                        {courses.split('\n').length} lines
                    </div>
                    <div className="mt-4">
                        {courses.split('\n').map((line, index) => (
                            <div key={index} className="flex">
                                <span className="text-gray-500 mr-2">{index + 1}</span>
                                <span className="text-red-400">{line}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}