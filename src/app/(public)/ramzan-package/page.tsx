import React from 'react';

interface PackageItem {
  name: string;
  weight: string;
  openMarket: number;
  discount: number;
}

const RamadanPackage: React.FC = () => {
  const packageData: PackageItem[] = [
    { name: 'Rice', weight: '2.00 kg', openMarket: 720, discount: 660 },
    { name: 'Suger', weight: '2.00 kg', openMarket: 360, discount: 300 },
    { name: 'Ghee', weight: '2.00 kg', openMarket: 810, discount: 770 },
    { name: 'Baisen', weight: '1.00 kg', openMarket: 300, discount: 250 },
    { name: 'Dal', weight: '1.00 kg', openMarket: 300, discount: 260 },
    { name: 'Tea', weight: '500 grm', openMarket: 650, discount: 500 },
    { name: 'Masala', weight: '250 grm', openMarket: 270, discount: 180 },
    { name: 'Khajur', weight: '1.00 kg', openMarket: 500, discount: 440 },
    { name: 'Roh e Afza', weight: '800ml Bottle', openMarket: 500, discount: 460 },
    { name: 'Pink Salt', weight: '3 Packs', openMarket: 300, discount: 190 },
  ];

  const totalMarket: number = 4710;
  const totalDiscounted: number = 4010;
  const savings: number = totalMarket - totalDiscounted;

  return (
    <div className="min-h-screen bg-[#F6F1E7] py-10 px-4 flex justify-center">
      <div className="max-w-2xl w-full bg-white border-4 border-[#1E1F1C] p-6 md:p-10 shadow-2xl">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2 text-[#1E1F1C]">
            سستا اور معیاری پیکیج
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-12 md:w-20 bg-[#C6A24A]"></div>
            <h2 className="text-2xl md:text-3xl font-bold whitespace-nowrap text-[#1F6B4F]">
              برائے رمضان کریم
            </h2>
            <div className="h-1 w-12 md:w-20 bg-[#C6A24A]"></div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-2 border-[#1E1F1C] text-center font-bold">
            <thead>
              <tr className="bg-[#F6F1E7] text-[#1E1F1C]">
                <th className="border-2 border-[#1E1F1C] p-2 text-sm md:text-base">Items Name</th>
                <th className="border-2 border-[#1E1F1C] p-2 text-sm md:text-base">Weight / Pack</th>
                <th className="border-2 border-[#1E1F1C] p-2 text-sm md:text-base">Open Market</th>
                <th className="border-2 border-[#1E1F1C] p-2 text-sm md:text-base bg-[#1F6B4F] text-white">
                  Discount Price
                </th>
              </tr>
            </thead>
            <tbody>
              {packageData.map((item, index) => (
                <tr key={index} className="hover:bg-[#F6F1E7] transition-colors">
                  <td className="border-2 border-[#1E1F1C] p-2 text-sm md:text-base text-[#1E1F1C]">
                    {item.name}
                  </td>
                  <td className="border-2 border-[#1E1F1C] p-2 text-sm md:text-base text-[#5A5E55]">
                    {item.weight}
                  </td>
                  <td className="border-2 border-[#1E1F1C] p-2 text-sm md:text-base text-[#1E1F1C]">
                    {item.openMarket}
                  </td>
                  <td className="border-2 border-[#1E1F1C] p-2 text-sm md:text-base font-black text-[#1F6B4F]">
                    {item.discount}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#1E1F1C] text-white">
                <td colSpan={2} className="border-2 border-[#1E1F1C] p-3 text-lg">TOTAL</td>
                <td className="border-2 border-[#1E1F1C] p-3 text-lg">{totalMarket}</td>
                <td className="border-2 border-[#1E1F1C] p-3 text-2xl font-black text-[#C6A24A]">
                  {totalDiscounted}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Price Banner */}
        <div className="mt-8 bg-[#1F6B4F] text-white p-4 text-center rounded-sm">
          <p className="text-lg md:text-xl font-bold flex flex-wrap justify-center gap-4">
            <span>Price: {totalMarket}/-</span>
            <span>Discount Price: {totalDiscounted}/-</span>
            <span className="text-[#C6A24A]">Discount: {savings}/-</span>
          </p>
        </div>

        {/* Buy Now Button */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <a 
            href="/collections/ramadan-packages"
            className="group relative inline-flex items-center justify-center px-12 py-4 font-bold text-white transition-all duration-200 bg-[#1F6B4F] rounded-xl hover:bg-[#17513D] w-full md:w-auto text-xl shadow-lg"
          >
            BUY NOW
            <svg className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {/* Shipping Icons */}
          <div className="grid grid-cols-4 gap-2 pt-6 border-t border-[#C6A24A] w-full opacity-80">
            {['HANDLE WITH CARE', 'THIS SIDE UP', 'FRAGILE', 'KEEP DRY'].map((label, i) => (
              <div key={label} className="flex flex-col items-center text-[8px] md:text-[10px] font-bold text-[#1E1F1C]">
                <div className="h-10 w-10 md:h-12 md:w-12 border-2 border-[#1E1F1C] rounded flex items-center justify-center mb-1 text-lg bg-[#F6F1E7]">
                  {['📦', '↑↑', '🍷', '☔'][i]}
                </div>
                <span className="text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RamadanPackage;

