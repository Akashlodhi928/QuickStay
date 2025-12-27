import React, { useContext } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../context/ListingContext';

function ListingPage1() {
  const navigate = useNavigate();

  const {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landMark, setLandMark,
  } = useContext(listingDataContext);

  // ✅ Correct file handlers
  const handleImage1 = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackEndImage1(file);
      setFrontEndImage1(URL.createObjectURL(file));
    }
  };

  const handleImage2 = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackEndImage2(file);
      setFrontEndImage2(URL.createObjectURL(file));
    }
  };

  const handleImage3 = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackEndImage3(file);
      setFrontEndImage3(URL.createObjectURL(file));
    }
  };

  // ✅ Form submit moves to next page
  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: basic check before next step
    if (!frontEndImage1 || !frontEndImage2 || !frontEndImage3) {
      alert('Please upload all 3 images before continuing.');
      return;
    }

    navigate('/listingpage2');
  };

  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto">
      <div
        className="bg-red-200 absolute top-[20px] left-[30px] p-2 rounded-full items-center justify-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <FaArrowLeftLong className="text-3xl" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-start flex-col md:items-start gap-[10px] overflow-auto"
      >
        <div className="w-[180px] h-[40px] bg-red-500 font-bold text-white flex items-center justify-center rounded-[30px] absolute top-[20px] right-[30px] shadow-lg">
          SetUp Your Home
        </div>

        {/* ✅ Title */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="title" className="text-[20px]">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter Your Title"
            className="w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px]"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* ✅ Description */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="description" className="text-[20px]">Description</label>
          <textarea
            id="description"
            className="w-[90%] h-[80px] border-[2px] border-gray-400 rounded-md px-3 text-[18px]"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* ✅ Image 1 */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="image1" className="text-[20px]">Image 1</label>
          <input
            id="image1"
            type="file"
            accept="image/*"
            className="w-[90%] border border-gray-400 rounded-md px-3 text-[18px]"
            onChange={handleImage1}
            required
          />
        </div>

        {/* ✅ Image 2 */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="image2" className="text-[20px]">Image 2</label>
          <input
            id="image2"
            type="file"
            accept="image/*"
            className="w-[90%] border border-gray-400 rounded-md px-3 text-[18px]"
            onChange={handleImage2}
            required
          />
        </div>

        {/* ✅ Image 3 */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="image3" className="text-[20px]">Image 3</label>
          <input
            id="image3"
            type="file"
            accept="image/*"
            className="w-[90%] border border-gray-400 rounded-md px-3 text-[18px]"
            onChange={handleImage3}
            required
          />
        </div>

        {/* ✅ Rent */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="rent" className="text-[20px]">Rent</label>
          <input
            id="rent"
            type="number"
            placeholder="Enter Rent per day...."
            className="w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px]"
            required
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
        </div>

        {/* ✅ City */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="city" className="text-[20px]">City</label>
          <input
            id="city"
            type="text"
            placeholder="Enter Your City"
            className="w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px]"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* ✅ Landmark */}
        <div className="w-[90%] flex flex-col gap-[5px]">
          <label htmlFor="landmark" className="text-[20px]">Landmark</label>
          <input
            id="landmark"
            type="text"
            placeholder="Enter Your Landmark"
            className="w-[90%] h-[40px] border-[2px] border-gray-400 rounded-md px-3 text-[18px]"
            required
            value={landMark}
            onChange={(e) => setLandMark(e.target.value)}
          />
        </div>

        {/* ✅ Next Button */}
        <button
          type="submit"
          className="px-[50px] py-[8px] bg-red-500 text-white rounded-md font-bold md:px-[100px] mt-[8px]"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default ListingPage1;
