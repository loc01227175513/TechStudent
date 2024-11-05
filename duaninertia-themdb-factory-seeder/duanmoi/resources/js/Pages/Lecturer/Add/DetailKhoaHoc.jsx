import React, { useRef, useEffect, useState } from 'react';
import Sortable from 'sortablejs';
import Axios from 'axios';

const DetailKhoaHoc = () => {
    const id_khoahoc = localStorage.getItem('id_khoahoc');
    console.log('ID khóa học từ Local Storage:', id_khoahoc);

    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newSubItemName, setNewSubItemName] = useState('');
    const [newContentUrl, setNewContentUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);
    const [currentSubItemId, setCurrentSubItemId] = useState(null);
    const [expandedLessonId, setExpandedLessonId] = useState(null);
    const [duration, setDuration] = useState(null);
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        const fetchLessons = async () => {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);

            if (parsedData && id_khoahoc) {
                try {
                    const response = await Axios.post('/api/showBaiHoc', {
                        id_khoahoc: id_khoahoc,
                    });

                    const lessons = response.data.data.map(lesson => ({
                        id: lesson.id,
                        name: lesson.ten,
                        subItems: lesson.subItems || []
                    }));
                    setItems(lessons);
                } catch (error) {
                    console.error('Error fetching lessons:', error);
                }
            }
        };

        fetchLessons();
    }, [id_khoahoc]);

    useEffect(() => {
        const sortables = document.querySelectorAll(".nested-sortable");

        sortables.forEach((sortable) => {
            new Sortable(sortable, {
                group: 'nested',
                animation: 150,
                fallbackOnBody: true,
                swapThreshold: 0.65,
                onEnd: (event) => {
                    const oldParentId = parseInt(event.from.dataset.parentId);
                    const newParentId = parseInt(event.to.dataset.parentId);
                    const subItemId = parseInt(event.item.dataset.id);

                    if (oldParentId !== newParentId) {
                        updateSubItemParent(subItemId, newParentId);
                    } else {
                        updateSubItemOrder(newParentId, event.to);
                    }
                }
            });
        });

        const mainSortable = new Sortable(document.getElementById("hs-nested-sortable"), {
            animation: 150,
            onEnd: (event) => {
                const reorderedItems = [...items];
                const [movedItem] = reorderedItems.splice(event.oldIndex, 1);
                reorderedItems.splice(event.newIndex, 0, movedItem);
                setItems(reorderedItems);

                updateLessonOrder(reorderedItems);
            },
        });

        return () => {
            sortables.forEach((sortable) => {
                sortable && Sortable.get(sortable).destroy();
            });
            mainSortable && mainSortable.destroy();
        };
    }, [items]);

    const updateLessonOrder = async (reorderedItems) => {
        try {
            const lessons = reorderedItems
                .filter(item => item && item.id)
                .map((item, index) => ({
                    id_baihoc: item.id,
                    id_khoahoc: id_khoahoc,
                    order: index + 1
                }));

            console.log('Dữ liệu gửi lên:', {
                baihocs: lessons,
                id_khoahoc: id_khoahoc
            });

            await Axios.post('/api/keoThaBaiHoc', {
                baihocs: lessons
            });

            console.log("Cập nhật thứ tự thành công!");
        } catch (error) {
            if (error.response) {
                console.error('Error response from server:', error.response.data);
            } else {
                console.error('Error updating lesson order:', error);
            }
        }
    };

    const updateSubItemParent = async (subItemId, newParentId) => {
        try {
            await Axios.post('/api/diChuyenVideo', {
                video_id: subItemId,
                new_baihoc_id: newParentId
            });

            setItems(prevItems => {
                const updatedItems = prevItems.map(item => {
                    if (item.id === newParentId) {
                        const movedSubItem = prevItems
                            .find(i => i.subItems.some(sub => sub.id === subItemId))
                            .subItems.find(sub => sub.id === subItemId);
                        return {
                            ...item,
                            subItems: [...item.subItems, movedSubItem]
                        };
                    } else if (item.subItems.some(sub => sub.id === subItemId)) {
                        return {
                            ...item,
                            subItems: item.subItems.filter(sub => sub.id !== subItemId)
                        };
                    }
                    return item;
                });

                return updatedItems;
            });

            console.log('Sub item đã được di chuyển thành công');
            window.location.href = '/DetailKhoaHoc'; // Redirect to /DetailKhoaHoc
        } catch (error) {
            console.error('Error moving sub item:', error);
        }
    };

    const updateSubItemOrder = async (parentId, container) => {
        const subItems = Array.from(container.children).map((child, index) => ({
            id_video: parseInt(child.dataset.id),
            order: index + 1, // Order is incremented by 1
            id_baihoc: parentId
        }));

        try {
            await Axios.post('/api/sapXepThuTuVideo', {
                videos: subItems
            });

            console.log("Cập nhật thứ tự sub item thành công!");
        } catch (error) {
            console.error('Error updating sub item order:', error);
        }
    };

    const handleAddItem = () => {
        if (newItemName.trim()) {
            setItems([...items, { id: items.length + 1, name: newItemName, subItems: [] }]);
            setNewItemName('');
            setIsModalOpen(false);

            addLessonToCourse(newItemName);
            window.location.href = '/DetailKhoaHoc';
        }
    };

    const addLessonToCourse = async (lessonName) => {
        const userData = localStorage.getItem('data');
        const parsedData = JSON.parse(userData);

        if (parsedData && id_khoahoc) {
            try {
                const response = await Axios.post('/api/themBaiHoc', {
                    id_khoahoc: id_khoahoc,
                    ten: lessonName
                });

                const isCourseRegistered = response.data.data.some(item =>
                    item.khoahocs.some(khoahoc => khoahoc.id === parseInt(id_khoahoc))
                );
                setIsCourseRegistered(isCourseRegistered);

                // Reload the page after successfully adding the lesson

            } catch (error) {
                console.error('Error adding lesson:', error);
            }
        }
    };

    const handleAddSubItem = async (itemId) => {
        if (newSubItemName.trim()) {
            try {
                const response = await Axios.post('/api/themSubBaiHoc', {
                    ten: newSubItemName,
                    id_baihoc: itemId
                });

                const newSubItem = response.data.data;
                setItems(items.map(item => {
                    if (item && item.id === itemId) {
                        return {
                            ...item,
                            subItems: [...item.subItems, { id: newSubItem.id, name: newSubItem.ten }]
                        };
                    }
                    return item;
                }));
                setNewSubItemName('');
                setIsSubModalOpen(false);
            } catch (error) {
                console.error('Error adding sub item:', error);
            }
        }
    };

    const parseISO8601Duration = (isoDuration) => {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
        const matches = regex.exec(isoDuration);

        const hours = parseInt(matches[1] || 0, 10);
        const minutes = parseInt(matches[2] || 0, 10);
        const seconds = parseInt(matches[3] || 0, 10);

        return hours * 3600 + minutes * 60 + seconds;
    };

    // Function to convert seconds to HH:MM:SS format
    const convertSecondsToHHMMSS = (seconds) => {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');

        return `${hours}:${minutes}:${remainingSeconds}`;
    };

    const handleAddContent = async (subItemId) => {
        if (newContentUrl.trim()) { // Ensure URL is not empty
            const videoId = extractVideoId(newContentUrl);
            if (videoId) {
                try {
                    console.log('Extracted videoId:', videoId); // Log the videoId
                    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyBoFccofvQSQ5Y0l29SdeRD7hka5lL9-fk`;
                    console.log('API URL:', apiUrl); // Log the full API URL
                    const response = await Axios.get(apiUrl);
                    const isoDuration = response.data.items[0].contentDetails.duration;
                    const durationInSeconds = parseISO8601Duration(isoDuration);
                    const durationInHHMMSS = convertSecondsToHHMMSS(durationInSeconds);
                    setDuration(durationInHHMMSS);

                    const payload = {
                        id_video: subItemId,
                        thoiluong: durationInHHMMSS,
                        url: videoId // Store only the video ID
                    };

                    console.log('Payload:', payload); // Log the payload

                    await Axios.post('http://127.0.0.1:8000/api/taonoidungsub', payload);

                    console.log(`Adding content to sub-item ID ${subItemId}`);
                    setNewContentUrl('');
                    setIsContentModalOpen(false);
                } catch (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.error('Error response data:', error.response.data);
                        console.error('Error response status:', error.response.status);
                        console.error('Error response headers:', error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.error('Error request:', error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.error('Error message:', error.message);
                    }
                    console.error('Error config:', error.config);
                }
            } else {
                console.error('Invalid YouTube URL:', newContentUrl); // Log the invalid URL
            }
        } else {
            console.error('Content URL is invalid');
        }
    };

    const handleRemoveSubItem = async (itemId, subItemId) => {
        try {
            await Axios.post('/api/Xoasub', {
                id_video: subItemId
            });
            setItems(items.map(item => {
                if (item && item.id === itemId) {
                    return {
                        ...item,
                        subItems: item.subItems.filter(subItem => subItem.id !== subItemId)
                    };
                }
                return item;
            }));
            console.log('Sub item đã được xóa thành công');
        } catch (error) {
            console.error('Error deleting sub item:', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        const itemToRemove = items.find(item => item && item.id === itemId);

        if (itemToRemove && itemToRemove.subItems.length > 0) {
            alert('Vui lòng xóa các mục con trước khi xóa mục chính.');
        } else {
            try {
                await Axios.post('/api/xoabaihoc', {
                    id_baihoc: itemId
                });
                setItems(items.filter(item => item && item.id !== itemId));
                console.log('Bài học đã được xóa thành công');
            } catch (error) {
                console.error('Error deleting lesson:', error);
            }
        }
    };

    const fetchSubItems = async (id_baihoc) => {
        try {
            const response = await Axios.post('/api/ShowSubBaiHoc', {
                id_baihoc: id_baihoc
            });

            const subItems = response.data.data.map(subItem => ({
                id: subItem.id,
                name: subItem.ten
            }));

            setItems(items.map(item => {
                if (item && item.id === id_baihoc) {
                    return {
                        ...item,
                        subItems: subItems
                    };
                }
                return item;
            }));
        } catch (error) {
            console.error('Error fetching sub items:', error);
        }
    };

    const handleExpandLesson = (itemId) => {
        setExpandedLessonId(itemId);
        fetchSubItems(itemId);
    };

    const extractVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    useEffect(() => {
        // Load YouTube Player API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Initialize player
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '400',
                width: '100%',
                videoId: extractVideoId(newContentUrl),
                events: {
                    'onReady': handlePlayerReady,
                }
            });
        };
    }, [newContentUrl]);

    const handlePlayerReady = (event) => {
        // Get video duration when player is ready
        const duration = event.target.getDuration();
        setDuration(duration);
    };

    return (
        <div id="hs-nested-sortable" className="p-5 bg-white">
            {items?.map((item, index) => (
                item && item.name ? (
                    <div key={item.id || index} className="border-b border-black mb-4">
                        <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                            <span className="font-semibold text-black">{item.name}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => { setIsSubModalOpen(true); setCurrentItemId(item.id); }}
                                    className="p-1 bg-blue-500 text-white rounded"
                                >
                                    Thêm Sub Item
                                </button>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="p-1 bg-red-500 text-white rounded"
                                >
                                    Xóa Phần
                                </button>
                                <button
                                    onClick={() => handleExpandLesson(item.id)}
                                    className="p-1 bg-green-500 text-white rounded"
                                >
                                    Mở rộng
                                </button>
                            </div>
                        </div>
                        <div className="nested-sortable space-y-2 ps-5" data-parent-id={item.id}>
                            {item.subItems?.map((subItem) => (
                                subItem && subItem.name ? (
                                    <div key={subItem.id} data-id={subItem.id} className="p-2 flex items-center gap-x-3 cursor-grab bg-white border border-black rounded-lg">
                                        <span className="text-black">{subItem.name}</span>
                                        <button
                                            onClick={() => handleRemoveSubItem(item.id, subItem.id)}
                                            className="p-1 bg-red-500 text-white rounded"
                                        >
                                            Xóa
                                        </button>
                                        <button
                                            onClick={() => { setIsContentModalOpen(true); setCurrentSubItemId(subItem.id); }}
                                            className="p-1 bg-yellow-500 text-white rounded"
                                        >
                                            Tạo Nội Dung
                                        </button>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>
                ) : null
            ))}

            <button onClick={() => setIsModalOpen(true)} className="mt-4 p-2 bg-green-500 text-white rounded">
                Thêm Phần
            </button>

            {isModalOpen && (
                <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-5 rounded-lg">
                        <h2 className="text-xl mb-4 text-black">Nhập tên phần mới</h2>
                        <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            className="border border-black p-2 w-full bg-red-500"
                            placeholder="Tên phần"
                        />
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setIsModalOpen(false)} className="mr-2 p-2 bg-gray-300 rounded">Hủy</button>
                            <button onClick={handleAddItem} className="p-2 bg-blue-500 text-white rounded">Thêm</button>
                        </div>
                    </div>
                </div>
            )}

            {isSubModalOpen && (
                <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-5 rounded-lg">
                        <h2 className="text-xl mb-4 text-black">Nhập tên Sub Item mới</h2>
                        <input
                            type="text"
                            value={newSubItemName}
                            onChange={(e) => setNewSubItemName(e.target.value)}
                            className="border border-black p-2 w-full bg-red-500"
                            placeholder="Tên Sub Item"
                        />
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setIsSubModalOpen(false)} className="mr-2 p-2 bg-gray-300 rounded">Hủy</button>
                            <button onClick={() => handleAddSubItem(currentItemId)} className="p-2 bg-blue-500 text-white rounded">Thêm</button>
                        </div>
                    </div>
                </div>
            )}

            {isContentModalOpen && (
                <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-5 rounded-lg">
                        <h2 className="text-xl mb-4 text-black">Nhập URL nội dung mới</h2>
                        <input
                            type="text"
                            value={newContentUrl}
                            onChange={(e) => setNewContentUrl(e.target.value)}
                            className="border border-black p-2 w-full bg-red-500 mt-2"
                            placeholder="URL"
                        />
                        {newContentUrl && (
                            <iframe id="youtube-player"
                                width="100%"
                                height="400"
                                src={`https://www.youtube.com/embed/${extractVideoId(newContentUrl)}?enablejsapi=1`}
                                title="YouTube Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}

                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setIsContentModalOpen(false)} className="mr-2 p-2 bg-gray-300 rounded">Hủy</button>
                            <button onClick={() => handleAddContent(currentSubItemId)} className="p-2 bg-blue-500 text-white rounded">Thêm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailKhoaHoc;