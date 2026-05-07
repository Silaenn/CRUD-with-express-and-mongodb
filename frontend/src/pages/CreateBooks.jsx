import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { API_URL } from "../config";

// Reusable InputField — extracted supaya nggak duplikat di Edit
export const InputField = ({ label, value, onChange, placeholder = "" }) => (
  <div className="mb-10 relative">
    {/* Label */}
    <label className="hud-label text-hud-dim mb-3 flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-hud rotate-45 inline-block" />
      {label}
    </label>

    {/* Input wrapper dengan corner brackets */}
    <div className="relative group">
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-hud/30 group-focus-within:border-hud transition-colors duration-200" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-hud/30 group-focus-within:border-hud transition-colors duration-200" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-hud px-4"
      />
    </div>

    {/* Bottom scan line */}
    <div className="h-[1px] w-full mt-1 bg-gradient-to-r from-hud/50 via-hud/10 to-transparent" />
  </div>
);

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
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
      <header className="relative px-6 pt-8 pb-6 border-b border-hud/30 overflow-hidden">
        <div className="hud-coords mb-4">SYS://LIBRARY_DATABASE/CREATE_NEW</div>
        <div className="flex justify-between items-end gap-4">
          <div>
            <h1 className="font-display text-5xl md:text-8xl leading-none tracking-tighter uppercase text-smoke">
              CREATE
            </h1>
            <div className="hazard-bar-sm w-full mt-2" />
          </div>
          <div className="mb-2">
            <BackButton />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-6 md:px-12 py-10 max-w-3xl">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col">
            {/* Form section label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="hud-tag">NEW_ENTRY</span>
              <div className="flex-1 h-[1px] bg-hud/20" />
              {/* Icon placeholder — diamond ornament */}
              {/* <img src="/icons/diamond-ornament.png" className="w-4 h-4 opacity-50" /> */}
            </div>

            <InputField label="Title"        value={title}       onChange={setTitle}       placeholder="ENTER_TITLE..." />
            <InputField label="Author"       value={author}      onChange={setAuthor}      placeholder="ENTER_AUTHOR..." />
            <InputField label="Publish Year" value={publishYear} onChange={setPublishYear} placeholder="YYYY" />

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="w-2 h-2 bg-hud rotate-45" />
              <div className="flex-1 h-[1px] bg-border" />
            </div>

            <button className="btn-hud w-fit" onClick={handleSaveBook}>
              [+] SAVE_ENTRY
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateBooks;