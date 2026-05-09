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
  <div className="mb-6 sm:mb-8 md:mb-10 relative">
    {/* Label */}
    <label htmlFor={id} className="hud-label text-hud-dim text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-hud rotate-45 inline-block flex-shrink-0" />
      {label}
    </label>

    {/* Input wrapper dengan corner brackets */}
    <div className="relative group">
      <span className="absolute top-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-t border-l border-hud/30 group-focus-within:border-hud transition-colors duration-200" />
      <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-b border-r border-hud/30 group-focus-within:border-hud transition-colors duration-200" />

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
        className="input-hud px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
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
    const yearNumber = publishYear ? Number(publishYear.split('-')[0]) : 0;
    const isValidYear = Number.isInteger(yearNumber) && yearNumber >= 1000 && yearNumber <= currentYear;

    if (!normalizedTitle || !normalizedAuthor || !isValidYear) {
      enqueueSnackbar(`Please fill all fields and use a valid date`, { variant: "error" });
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
        <div className="lg:max-w-5xl md:max-w-4xl sm:max-w-3xl max-w-2xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 sm:pt-8 pb-6">
          <div className="lg:max-w-4xl md:max-w-3xl sm:max-w-2xl max-w-xl mx-auto">
            <MetaChip label="SYSTEM" value="LIBRARY DATABASE · CREATE NEW" className="mb-5" />
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Hazard bar kiri — tampil hanya di lg ke atas */}
                <div className="hidden lg:flex gap-1.5">
                  <div
                    className="w-[7px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0"
                    style={{ background: "repeating-linear-gradient(45deg, #FFB800 0px, #FFB800 4px, #0a0a0f 4px, #0a0a0f 8px)" }}
                  />
                  <div className="w-[3px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 bg-hud/40" />
                </div>

                <h1
                  className="font-display text-[clamp(2.4rem,10vw,6rem)] leading-none tracking-tight uppercase text-smoke animate-flicker"
                  style={{ textShadow: "0 0 40px rgba(255,184,0,0.4), 0 0 80px rgba(255,184,0,0.2)" }}
                >
                  CREATE
                </h1>

                {/* Hazard bar kanan — tampil hanya di bawah lg */}
                <div className="flex lg:hidden gap-1.5">
                  <div className="w-[3px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 bg-hud/40" />
                  <div
                    className="w-[7px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0"
                    style={{ background: "repeating-linear-gradient(45deg, #FFB800 0px, #FFB800 4px, #0a0a0f 4px, #0a0a0f 8px)" }}
                  />
                </div>
              </div>
              
              <div className="mt-auto lg:ml-auto">
                <BackButton />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="lg:max-w-5xl md:max-w-4xl sm:max-w-3xl max-w-2xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Spinner />
          </div>
        ) : (
          <form className="lg:max-w-4xl md:max-w-3xl sm:max-w-2xl max-w-xl mx-auto flex flex-col bg-void/90 py-4 sm:py-6" onSubmit={handleSaveBook}>
            {/* Form section label */}
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <span className="hud-tag text-sm sm:text-base">NEW_ENTRY</span>
              <div className="flex-1 h-[1px] bg-hud/20" />
              <div className="w-2 h-2 bg-hud rotate-45 shadow-hud-sm animate-pulse" />

            </div>

            <InputField id="title" label="Title" value={title} onChange={setTitle} placeholder="ENTER_TITLE..." />
            <InputField id="author" label="Author" value={author} onChange={setAuthor} placeholder="ENTER_AUTHOR..." />
            <InputField
              id="publishYear"
              label="Publish Date"
              value={publishYear}
              onChange={setPublishYear}
              placeholder="YYYY-MM-DD"
              type="date"
            />

            {/* Divider dengan chevron */}
            <div className="flex items-center gap-3 my-8 sm:my-10">
              <div className="w-2 h-2 bg-hud rotate-45 shadow-hud-sm animate-pulse" />
              <div className="flex-1 h-[1px] bg-hud/20" />
            </div>

             <button type="submit" className="btn-hud w-fit text-sm sm:text-base">
               [+] SAVE_ENTRY
             </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default CreateBooks;

