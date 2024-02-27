import kodeBelanja from "../json/kodeBelanja.json";
import ReadMore from "./ReadMore";
import { useBelanja } from "../context/BelanjaContext";
import Pagination from "./Pagination";

const ItemsList = () => {
  const { startIndex, endIndex, handleNextPage, handlePreviousPage } =
    useBelanja();

  const { searchInput } = useBelanja();

  const filteredKodeBelanja =
    searchInput !== ""
      ? kodeBelanja.filter((item) =>
          Object.values(item).some((value) =>
            `${value}`.toLowerCase().includes(searchInput.toLowerCase())
          )
        )
      : kodeBelanja;

  const currentData = filteredKodeBelanja.slice(startIndex, endIndex);

  const formatString = (input) => {
    const strInput = `${input}`;
    const parts = [
      strInput.slice(0, 1),
      strInput.slice(1, 2),
      strInput.slice(2, 4),
      strInput.slice(4, 6),
      strInput.slice(6, 8),
      strInput.slice(8),
    ];
    const formattedString = parts.join(".").replace(/\.*$/, "");
    return formattedString;
  };

  return (
    <>
      <div className="divide-y-2 flex flex-col justify-between divide-slate-300">
        {currentData.map((e) => (
          <div key={e.kode} className="flex divide-x-2 divide-slate-300">
            <div className="min-w-36">
              <h2 className="font-bold flex-[2] text-sm p-2">
                {formatString(e.kode)}
              </h2>
            </div>
            <div className="p-2 flex-[3] min-w-40">
              <h3 className="font-bold text-sm">{e.nama}</h3>
              {e.deskripsi == "" ? (
                <p className="text-sm">Deskripsi belum ditambah.</p>
              ) : (
                <ReadMore>{e.deskripsi}</ReadMore>
              )}
            </div>
            <p className="p-2 flex-[3] text-sm min-w-40">
              {e.keterangan == "" ? "Keterangan Belum Ditambah" : e.keterangan}
            </p>
            <p className="p-2 flex-[3] text-sm min-w-40">
              {e.keterangan == "" ? "Ketentuan Belum Ditambah" : e.keterangan}
            </p>
          </div>
        ))}
        <Pagination totalItems={filteredKodeBelanja.length} />
      </div>
    </>
  );
};

export default ItemsList;
