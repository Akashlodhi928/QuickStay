import React, { useContext } from 'react';
import { FaArrowLeftLong, FaImage } from 'react-icons/fa6';
import { HiOutlineCurrencyRupee, HiOutlineHomeModern, HiOutlineMapPin } from 'react-icons/hi2';
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
    setBackEndImage1,
    setBackEndImage2,
    setBackEndImage3,
    rent, setRent,
    city, setCity,
    landMark, setLandMark,
  } = useContext(listingDataContext);

  const handleImage = (e, setBackEndImage, setFrontEndImage) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackEndImage(file);
      setFrontEndImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!frontEndImage1 || !frontEndImage2 || !frontEndImage3) {
      alert('Please upload all 3 images before continuing.');
      return;
    }
    navigate('/listingpage2');
  };

  const inputClass = "h-12 rounded-2xl border border-stone-200 bg-white px-4 text-base text-stone-900 shadow-sm";

  return (
    <div className="page-shell px-4 py-8">
      <button className="fixed left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white shadow-lg" onClick={() => navigate('/')}>
        <FaArrowLeftLong className="text-xl text-stone-800" />
      </button>

      <form onSubmit={handleSubmit} className="mx-auto grid w-full max-w-6xl gap-8 pt-14 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="soft-card sticky top-8 h-fit rounded-[2rem] p-6">
          <div className="primary-gradient mb-5 flex h-14 w-14 items-center justify-center rounded-3xl text-white">
            <HiOutlineHomeModern className="text-3xl" />
          </div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-600">Step 1 of 3</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-stone-950">Tell guests about your home.</h1>
          <p className="mt-4 text-sm leading-6 text-stone-500">Add the basics, pricing, location, and three strong photos. Your backend upload flow stays exactly the same.</p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[frontEndImage1, frontEndImage2, frontEndImage3].map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-2xl bg-stone-100">
                {image ? <img src={image} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-stone-300"><FaImage /></div>}
              </div>
            ))}
          </div>
        </aside>

        <div className="soft-card rounded-[2rem] p-5 sm:p-8">
          <div className="grid gap-5">
            <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="title">
              Title
              <input id="title" type="text" placeholder="Modern villa with private pool" className={inputClass} required value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="description">
              Description
              <textarea id="description" className="min-h-[130px] rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 shadow-sm" required placeholder="Describe the stay, nearby places, and what makes it special." value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['image1', 'Hero Image', setBackEndImage1, setFrontEndImage1],
                ['image2', 'Gallery Image', setBackEndImage2, setFrontEndImage2],
                ['image3', 'Detail Image', setBackEndImage3, setFrontEndImage3],
              ].map(([id, label, setBack, setFront]) => (
                <label key={id} className="flex min-h-[118px] cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-4 text-center text-sm font-bold text-stone-600 hover:border-orange-300 hover:bg-orange-50" htmlFor={id}>
                  <FaImage className="text-2xl text-orange-500" />
                  {label}
                  <input id={id} type="file" accept="image/*" className="hidden" onChange={(e) => handleImage(e, setBack, setFront)} required />
                </label>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="rent">
                Rent per day
                <div className="relative">
                  <HiOutlineCurrencyRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-stone-400" />
                  <input id="rent" type="number" placeholder="2500" className={`${inputClass} w-full pl-11`} required value={rent} onChange={(e) => setRent(e.target.value)} />
                </div>
              </label>

              <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="city">
                City
                <input id="city" type="text" placeholder="Mumbai" className={inputClass} required value={city} onChange={(e) => setCity(e.target.value)} />
              </label>

              <label className="flex flex-col gap-2 text-sm font-bold text-stone-700" htmlFor="landmark">
                Landmark
                <div className="relative">
                  <HiOutlineMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-stone-400" />
                  <input id="landmark" type="text" placeholder="Bandra West" className={`${inputClass} w-full pl-11`} required value={landMark} onChange={(e) => setLandMark(e.target.value)} />
                </div>
              </label>
            </div>

            <button type="submit" className="primary-gradient mt-4 h-12 rounded-2xl text-base font-black text-white shadow-lg shadow-red-500/20 hover:-translate-y-0.5">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ListingPage1;
