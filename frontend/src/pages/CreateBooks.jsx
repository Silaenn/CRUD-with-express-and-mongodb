import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { API_URL } from "../config";
import MetaChip from "../components/ui/MetaChip";

// Reusable InputField — extracted supaya nggak duplikat di Edit
export const InputField = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  min,
  max,
}) => (
  <div className="mb-10 relative">
    {/* Label */}
    <label htmlFor={id} className="hud-label text-hud-dim mb-3 flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-hud rotate-45 inline-block" />
      {label}
    </label>

    {/* Input wrapper dengan corner brackets */}
    <div className="relative group">
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-hud/30 group-focus-within:border-hud transition-colors duration-200" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-hud/30 group-focus-within:border-hud transition-colors duration-200" />

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        required
        className="input-hud px-4"
      />
    </div>

  </div>
);

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const currentYear = new Date().getFullYear();

  const handleSaveBook = (event) => {
    event.preventDefault();

    const normalizedTitle = title.trim();
    const normalizedAuthor = author.trim();
    const yearNumber = Number(publishYear);
    const isValidYear = Number.isInteger(yearNumber) && yearNumber >= 1000 && yearNumber <= currentYear;

    if (!normalizedTitle || !normalizedAuthor || !isValidYear) {
      enqueueSnackbar(`Please fill all fields and use a valid year (1000-${currentYear})`, { variant: "error" });
      return;
    }

    const data = { title: normalizedTitle, author: normalizedAuthor, publishYear: yearNumber };
    setLoading(true);
    axios
      .post(`${API_URL}/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        const errorMessage = err.response?.data?.message || "Error occurred";
        enqueueSnackbar(errorMessage, { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <header className="relative border-b border-hud/30 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 sm:pt-8 pb-6">
          <MetaChip label="SYSTEM" value="LIBRARY DATABASE · CREATE NEW" className="mb-5" />
          <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-end">
            <div>
              <h1 className="font-display text-[clamp(2.4rem,10vw,6rem)] leading-none tracking-tight uppercase text-smoke">
                CREATE
              </h1>
              <div className="hazard-bar-sm w-full mt-2" />
            </div>
            <div className="mb-1">
              <BackButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-10">
        {loading ? (
          <Spinner />
        ) : (
          <form className="flex flex-col" onSubmit={handleSaveBook}>
            {/* Form section label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="hud-tag">NEW_ENTRY</span>
              <div className="flex-1 h-[1px] bg-hud/20" />
              {/* Icon placeholder — diamond ornament */}
              {/* <img src="/icons/diamond-ornament.png" className="w-4 h-4 opacity-50" /> */}
            </div>

            <InputField id="title" label="Title" value={title} onChange={setTitle} placeholder="ENTER_TITLE..." />
            <InputField id="author" label="Author" value={author} onChange={setAuthor} placeholder="ENTER_AUTHOR..." />
            <InputField
              id="publishYear"
              label="Publish Year"
              value={publishYear}
              onChange={setPublishYear}
              placeholder="YYYY"
              type="number"
              min={1000}
              max={currentYear}
            />

            {/* Divider dengan chevron */}
            <div className="flex items-center gap-3 my-6">
              <img
                src="/icons/chevron-yellow.png"
                alt=""
                className="w-8 h-auto opacity-50"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="flex-1 h-[1px] bg-border" />
            </div>

             <button type="submit" className="btn-hud w-fit">
               [+] SAVE_ENTRY
             </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default CreateBooks;
