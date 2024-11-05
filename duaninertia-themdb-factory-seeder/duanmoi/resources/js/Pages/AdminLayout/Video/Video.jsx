import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
const Video = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [isEditVisible, setEditVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const [Video, setVideo] = useState([]);
    const [baihoc, setBaihoc] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [videoResponse, baihocResponse] = await Promise.all([
                fetch('http://127.0.0.1:8000/admin-api/showAllVideo'),
                fetch('http://127.0.0.1:8000/admin-api/showAllBaiHoc')
            ]);

            const videoData = await videoResponse.json();
            const baihocData = await baihocResponse.json();

            setVideo(videoData);
            setBaihoc(baihocData);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data.');
        }
    };

    const handleEditClick = (video) => {
        setSelectedVideo(video);
        setEditVisible(true);
    };

    const handleAddClick = () => {
        setSelectedVideo(null);
        setAddVisible(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin-api/deleteVideo/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            if (response.ok) {
                toast.success('Video deleted successfully');
                fetchData();
            } else {
                toast.error('Failed to delete Video');
            }
        } catch (error) {
            console.error('Error deleting Video:', error);
            toast.error('Failed to delete Video');
        }
    };

    return (
        <>
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Quản lý Video</h1>
                <p className="text-gray-400">Danh sách Video</p>
                <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded-lg">Thêm Video</button>
            </section>

            {/* Video List */}
            <section className="p-4 space-y-4">
                {Video.map((video) => (
                    <div key={video.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold">Mã Video: {video.id}</p>
                            <p className="text-gray-400">Tên Video: {video.ten}</p>
                            <p className="text-gray-400">Thời Lượng: {video.thoiluong}</p>
                            <p className="text-gray-400">Mô Tả: {video.mota}</p>
                            <p className="text-gray-400">URL: {video.url_link}</p>
                            {Array.isArray(baihoc) && baihoc
                                .filter(bh => bh.id === video.id_baihoc)
                                .map((bh) => (
                                    <p key={bh.id} className="text-gray-400">Bài Học: {bh.ten}</p>
                                ))}
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEditClick(video)} className="bg-blue-500 text-black px-4 py-2 rounded-lg">Chỉnh sửa</button>
                            <button onClick={() => handleDeleteClick(video.id)} className="bg-red-500 text-black px-4 py-2 rounded-lg">Xóa</button>
                        </div>
                    </div>
                ))}
            </section>
            {isEditVisible && selectedVideo && (
                <EditVideo
                    Video={selectedVideo}
                    onClose={() => {
                        setEditVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    baihoc={baihoc}
                />
            )}
            {isAddVisible && (
                <AddVideo
                    onClose={() => {
                        setAddVisible(false);
                        fetchData();
                    }}
                    csrfToken={csrfToken}
                    baihoc={baihoc}
                />
            )}
            <ToastContainer />
        </>
    );
};




const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const parseISO8601Duration = (duration) => {
    const regex = /P(?:([\d.]+)Y)?(?:([\d.]+)M)?(?:([\d.]+)D)?T(?:([\d.]+)H)?(?:([\d.]+)M)?(?:([\d.]+)S)?/;
    const matches = duration.match(regex);
    const hours = parseFloat(matches[4]) || 0;
    const minutes = parseFloat(matches[5]) || 0;
    const seconds = parseFloat(matches[6]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
};

const convertSecondsToHHMMSS = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
};

const EditVideo = ({ Video, onClose, csrfToken, baihoc }) => {
    const [formData, setFormData] = useState({ ...Video });
    const [videoId, setVideoId] = useState(extractVideoId(Video.url_link));

    useEffect(() => {
        if (videoId) {
            fetchVideoDuration(videoId);
        }
    }, [videoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'url_link') {
            const extractedVideoId = extractVideoId(value);
            setVideoId(extractedVideoId);
            fetchVideoDuration(extractedVideoId); // Fetch duration whenever URL changes
        }
    };

    const fetchVideoDuration = async (videoId) => {
        try {
            const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyBoFccofvQSQ5Y0l29SdeRD7hka5lL9-fk`;
            const response = await Axios.get(apiUrl);
            const isoDuration = response.data.items[0].contentDetails.duration;
            const durationInSeconds = parseISO8601Duration(isoDuration);
            const durationInHHMMSS = convertSecondsToHHMMSS(durationInSeconds);
            setFormData((prevFormData) => ({
                ...prevFormData,
                thoiluong: durationInHHMMSS,
            }));
        } catch (error) {
            console.error('Error fetching video duration:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (videoId) {
            try {
                const payload = {
                    ...formData,
                    url_link: videoId, // Store only the video ID
                    thoiluong: formData.thoiluong // Include the updated duration
                };

                const response = await fetch(`http://127.0.0.1:8000/admin-api/updateVideo/${Video.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    toast.success('Video updated successfully');
                    onClose();
                } else {
                    toast.error('Failed to update Video');
                }
            } catch (error) {
                console.error('Error updating Video:', error);
                toast.error('Failed to update Video');
            }
        } else {
            toast.error('Invalid YouTube URL');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tên</label>
                            <input
                                type="text"
                                name="ten"
                                value={formData.ten || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Mô Tả</label>
                            <input
                                type="text"
                                name="mota"
                                value={formData.mota || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">URL</label>
                            <input
                                type="text"
                                name="url_link"
                                value={formData.url_link || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        {videoId && (
                            <div className="p-4">
                                <iframe
                                    id="youtube-player"
                                    width="100%"
                                    height="400"
                                    src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                                    title="YouTube Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Bài Học</label>
                            <select
                                name="id_baihoc"
                                value={formData.id_baihoc}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Bài Học</option>
                                {Array.isArray(baihoc) && baihoc.map((baihoc) => (
                                    <option key={baihoc.id} value={baihoc.id}>{baihoc.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4 flex justify-end space-x-2">
                            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Hủy</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};












const AddVideo = ({ onClose, csrfToken, baihoc }) => {
    const [formData, setFormData] = useState({ ten: '', id_baihoc: '', mota: '', url_link: '' });
    const [videoId, setVideoId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'url_link') {
            const extractedVideoId = extractVideoId(value);
            setVideoId(extractedVideoId);
        }
    };

    const extractVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const parseISO8601Duration = (duration) => {
        const regex = /P(?:([\d.]+)Y)?(?:([\d.]+)M)?(?:([\d.]+)D)?T(?:([\d.]+)H)?(?:([\d.]+)M)?(?:([\d.]+)S)?/;
        const matches = duration.match(regex);
        const hours = parseFloat(matches[4]) || 0;
        const minutes = parseFloat(matches[5]) || 0;
        const seconds = parseFloat(matches[6]) || 0;
        return hours * 3600 + minutes * 60 + seconds;
    };

    const convertSecondsToHHMMSS = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (videoId) {
            try {
                const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyBoFccofvQSQ5Y0l29SdeRD7hka5lL9-fk`;
                const response = await Axios.get(apiUrl);
                const isoDuration = response.data.items[0].contentDetails.duration;
                const durationInSeconds = parseISO8601Duration(isoDuration);
                const durationInHHMMSS = convertSecondsToHHMMSS(durationInSeconds);

                const payload = {
                    ...formData,
                    thoiluong: durationInHHMMSS,
                    url_link: videoId // Store only the video ID
                };

                const addResponse = await fetch('http://127.0.0.1:8000/admin-api/addVideo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify(payload),
                });

                if (addResponse.ok) {
                    toast.success('Video added successfully');
                    onClose();
                } else {
                    toast.error('Failed to add Video');
                }
            } catch (error) {
                console.error('Error adding Video:', error);
                toast.error('Failed to add Video');
            }
        } else {
            toast.error('Invalid YouTube URL');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Tên</label>
                            <input
                                type="text"
                                name="ten"
                                value={formData.ten || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Mô Tả</label>
                            <input
                                type="text"
                                name="mota"
                                value={formData.mota || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">URL</label>
                            <input
                                type="text"
                                name="url_link"
                                value={formData.url_link || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            />
                        </div>
                        {videoId && (
                            <div className="p-4">
                                <iframe
                                    id="youtube-player"
                                    width="100%"
                                    height="400"
                                    src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                                    title="YouTube Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                        <div className="p-4">
                            <label className="block text-sm font-medium text-white">Bài Học</label>
                            <select
                                name="id_baihoc"
                                value={formData.id_baihoc}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white"
                                required
                            >
                                <option value="">Chọn Bài Học</option>
                                {Array.isArray(baihoc) && baihoc.map((baihoc) => (
                                    <option key={baihoc.id} value={baihoc.id}>{baihoc.ten}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4 flex justify-end space-x-2">
                            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Hủy</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};




export default Video;