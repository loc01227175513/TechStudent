import React, { useState, useEffect } from 'react';

function TrangGiaKhoaHoc() {
    const [currency, setCurrency] = useState('usd');
    const [priceTier, setPriceTier] = useState('');
    const [premiumAppWarning] = useState(true);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [discount, setDiscount] = useState('');
    const [message, setMessage] = useState('');
    const [id, setId] = useState(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
          const currentUrl = window.location.href;
          const url = new URL(currentUrl);
          const idFromUrl = url.searchParams.get("id");
          setId(idFromUrl);
        }
      }, []);
    useEffect(() => {
        const fetchCoursePrice = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/showgiaKhoaHoc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_khoahoc: id }),
                });

                if (response.ok) {
                    await response.json();
                    setPriceTier(data.gia);
                    setDiscount(data.giamgia);
                } else {
                    setMessage('Error fetching course price.');
                }
            } catch (error) {
                setMessage('Error fetching course price.');
            }
        };

        fetchCoursePrice();
    }, [id]);

    const currencies = [
        'USD', 'VND'
    ];

    const priceTiers = {
        usd: [
            { value: '0', label: 'Free', vndLabel: 'Free' },
            { value: '19.99', label: '$19.99 (tier 1)', vndLabel: '₫399,000 (tier 1)' },
            { value: '22.99', label: '$22.99 (tier 2)', vndLabel: '₫449,000 (tier 2)' },
            { value: '24.99', label: '$24.99 (tier 3)', vndLabel: '₫499,000 (tier 3)' },
            { value: '27.99', label: '$27.99 (tier 4)', vndLabel: '₫549,000 (tier 4)' },
            { value: '29.99', label: '$29.99 (tier 5)', vndLabel: '₫599,000 (tier 5)' },
            { value: '34.99', label: '$34.99 (tier 6)', vndLabel: '₫649,000 (tier 6)' },
            { value: '39.99', label: '$39.99 (tier 7)', vndLabel: '₫699,000 (tier 7)' },
            { value: '44.99', label: '$44.99 (tier 8)', vndLabel: '₫749,000 (tier 8)' },
            { value: '49.99', label: '$49.99 (tier 9)', vndLabel: '₫799,000 (tier 9)' },
            { value: '54.99', label: '$54.99 (tier 10)', vndLabel: '₫849,000 (tier 10)' },
            { value: '59.99', label: '$59.99 (tier 11)', vndLabel: '₫899,000 (tier 11)' },
            { value: '64.99', label: '$64.99 (tier 12)', vndLabel: '₫949,000 (tier 12)' },
            { value: '69.99', label: '$69.99 (tier 13)', vndLabel: '₫999,000 (tier 13)' },
            { value: '74.99', label: '$74.99 (tier 14)', vndLabel: '₫1,049,000 (tier 14)' },
            { value: '79.99', label: '$79.99 (tier 15)', vndLabel: '₫1,099,000 (tier 15)' },
            { value: '84.99', label: '$84.99 (tier 16)', vndLabel: '₫1,149,000 (tier 16)' },
            { value: '89.99', label: '$89.99 (tier 17)', vndLabel: '₫1,199,000 (tier 17)' },
            { value: '94.99', label: '$94.99 (tier 18)', vndLabel: '₫1,249,000 (tier 18)' },
            { value: '99.99', label: '$99.99 (tier 19)', vndLabel: '₫1,299,000 (tier 19)' },
            { value: '109.99', label: '$109.99 (tier 20)', vndLabel: '₫1,349,000 (tier 20)' },
            { value: '119.99', label: '$119.99 (tier 21)', vndLabel: '₫1,399,000 (tier 21)' },
            { value: '124.99', label: '$124.99 (tier 22)', vndLabel: '₫1,499,000 (tier 22)' },
            { value: '129.99', label: '$129.99 (tier 23)', vndLabel: '₫1,599,000 (tier 23)' },
            { value: '139.99', label: '$139.99 (tier 24)', vndLabel: '₫1,699,000 (tier 24)' },
            { value: '149.99', label: '$149.99 (tier 25)', vndLabel: '₫1,799,000 (tier 25)' },
            { value: '159.99', label: '$159.99 (tier 26)', vndLabel: '₫1,899,000 (tier 26)' },
            { value: '174.99', label: '$174.99 (tier 27)', vndLabel: '₫2,199,000 (tier 27)' },
            { value: '189.99', label: '$189.99 (tier 28)', vndLabel: '₫2,399,000 (tier 28)' },
            { value: '199.99', label: '$199.99 (tier 29)', vndLabel: '₫2,499,000 (tier 29)' },
        ],
        vnd: [
            { value: '0', label: 'Free', usdLabel: 'Free' },
            { value: '399000', label: '₫399,000 (tier 1)', usdLabel: '$19.99 (tier 1)' },
            { value: '449000', label: '₫449,000 (tier 2)', usdLabel: '$22.99 (tier 2)' },
            { value: '499000', label: '₫499,000 (tier 3)', usdLabel: '$24.99 (tier 3)' },
            { value: '549000', label: '₫549,000 (tier 4)', usdLabel: '$27.99 (tier 4)' },
            { value: '599000', label: '₫599,000 (tier 5)', usdLabel: '$29.99 (tier 5)' },
            { value: '649000', label: '₫649,000 (tier 6)', usdLabel: '$34.99 (tier 6)' },
            { value: '699000', label: '₫699,000 (tier 7)', usdLabel: '$39.99 (tier 7)' },
            { value: '749000', label: '₫749,000 (tier 8)', usdLabel: '$44.99 (tier 8)' },
            { value: '799000', label: '₫799,000 (tier 9)', usdLabel: '$49.99 (tier 9)' },
            { value: '849000', label: '₫849,000 (tier 10)', usdLabel: '$54.99 (tier 10)' },
            { value: '899000', label: '₫899,000 (tier 11)', usdLabel: '$59.99 (tier 11)' },
            { value: '949000', label: '₫949,000 (tier 12)', usdLabel: '$64.99 (tier 12)' },
            { value: '999000', label: '₫999,000 (tier 13)', usdLabel: '$69.99 (tier 13)' },
            { value: '1049000', label: '₫1,049,000 (tier 14)', usdLabel: '$74.99 (tier 14)' },
            { value: '1099000', label: '₫1,099,000 (tier 15)', usdLabel: '$79.99 (tier 15)' },
            { value: '1149000', label: '₫1,149,000 (tier 16)', usdLabel: '$84.99 (tier 16)' },
            { value: '1199000', label: '₫1,199,000 (tier 17)', usdLabel: '$89.99 (tier 17)' },
            { value: '1249000', label: '₫1,249,000 (tier 18)', usdLabel: '$94.99 (tier 18)' },
            { value: '1299000', label: '₫1,299,000 (tier 19)', usdLabel: '$99.99 (tier 19)' },
            { value: '1349000', label: '₫1,349,000 (tier 20)', usdLabel: '$109.99 (tier 20)' },
            { value: '1399000', label: '₫1,399,000 (tier 21)', usdLabel: '$119.99 (tier 21)' },
            { value: '1499000', label: '₫1,499,000 (tier 22)', usdLabel: '$124.99 (tier 22)' },
            { value: '1599000', label: '₫1,599,000 (tier 23)', usdLabel: '$129.99 (tier 23)' },
            { value: '1699000', label: '₫1,699,000 (tier 24)', usdLabel: '$139.99 (tier 24)' },
            { value: '1799000', label: '₫1,799,000 (tier 25)', usdLabel: '$149.99 (tier 25)' },
            { value: '1899000', label: '₫1,899,000 (tier 26)', usdLabel: '$159.99 (tier 26)' },
            { value: '2199000', label: '₫2,199,000 (tier 27)', usdLabel: '$174.99 (tier 27)' },
            { value: '2399000', label: '₫2,399,000 (tier 28)', usdLabel: '$189.99 (tier 28)' },
            { value: '2499000', label: '₫2,499,000 (tier 29)', usdLabel: '$199.99 (tier 29)' },
        ]
    };

    const generateDiscountTiers = (selectedPriceTier) => {
        const selectedTier = priceTiers[currency].find(tier => tier.value === selectedPriceTier);
        if (!selectedTier) return [];

        const selectedPrice = parseFloat(selectedTier.value);
        return priceTiers[currency]
            .filter(tier => parseFloat(tier.value) < selectedPrice)
            .map(tier => ({ value: tier.value, label: `${tier.label} (discount)` }));
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
        setPriceTier('');
        setDiscount('');
        setIsSaveDisabled(true);
    };

    const handlePriceTierChange = (e) => {
        const selectedPriceTier = e.target.value;
        setPriceTier(selectedPriceTier);
        setIsSaveDisabled(selectedPriceTier === '');

        if (selectedPriceTier === '0') {
            setDiscount('0');
        } else {
            setDiscount('');
        }
    };

    const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/capnhatgiaKhoaHoc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_khoahoc: id ,
                    gia: priceTier,
                    giamgia: discount,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('Course price updated successfully.');
            } else {
                setMessage('Error updating course price.');
            }
        } catch (error) {
            setMessage('Error updating course price.');
        }
    };

    return (
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Pricing</h2>

            {premiumAppWarning && (
                <div className="flex items-center p-4 mb-4 text-yellow-800 bg-yellow-200 border border-yellow-300 rounded-lg">
                    <svg className="w-6 h-6 mr-2 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.366-.446.997-.446 1.364 0l7.584 9.241c.522.636.068 1.66-.682 1.66H2.092c-.75 0-1.204-1.024-.682-1.66l7.584-9.24zM11 14a1 1 0 11-2 0 1 1 0 012 0zM10 11a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <h3 className="font-semibold">Please finish your premium application</h3>
                        <p>You'll be able to set your price once your payout method is approved.</p>
                        <a href="/instructor/user/edit-instructor-info/" className="mt-2 font-medium text-indigo-600">
                            Complete the premium application
                        </a>
                    </div>
                </div>
            )}

            <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Set a price for your course</h3>
                <p className="mb-4 text-gray-600">
                    Please select the currency and the price tier for your course. If you’d like to offer your course for free, it must have a total video length of less than 2 hours. Also, courses with practice tests cannot be free.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="currency" className="block mb-2 font-medium text-gray-700">Currency</label>
                        <select id="currency" value={currency} onChange={handleCurrencyChange}
                            className="w-full p-2 text-gray-900 bg-yellow-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                            {currencies.map((cur) => (
                                <option key={cur} value={cur.toLowerCase()}>{cur}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price-tier" className="block mb-2 font-medium text-gray-700">Price Tier</label>
                        <select id="price-tier" value={priceTier} onChange={handlePriceTierChange}
                            className="w-full p-2 text-gray-900 bg-yellow-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                            <option value="">Select</option>
                            {priceTiers[currency].map((tier) => (
                                <option key={tier.value} value={tier.value}>{tier.label} / {tier.vndLabel}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="discount" className="block mb-2 font-medium text-gray-700">Discount</label>
                        <select id="discount" value={discount} onChange={handleDiscountChange}
                            className="w-full p-2 text-gray-900 bg-yellow-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" disabled={priceTier === '0'}>
                            <option value="">Select</option>
                            {generateDiscountTiers(priceTier).map((tier) => (
                                <option key={tier.value} value={tier.value}>{tier.label}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className={`w-full p-2 bg-indigo-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSaveDisabled}>
                        Save
                    </button>
                </form>

                {message && <p className="mt-4 text-red-600">{message}</p>}
            </div>
        </div>
    );
}

export default TrangGiaKhoaHoc;