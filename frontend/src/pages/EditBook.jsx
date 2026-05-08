import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { InputField } from "./CreateBooks";
import { API_URL } from "../config";
import MetaChip from "../components/ui/MetaChip";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setPublishYear(String(res.data.publishYear ?? ""));
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error fetching data", { variant: "error" });
        console.log(err);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = (event) => {
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
      .put(`${API_URL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <header className="relative border-b border-hud/30 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 sm:pt-8 pb-6">
          <MetaChip
            label="SYSTEM"
            value={`LIBRARY DATABASE · EDIT ${id?.slice(-6).toUpperCase()}`}
            className="mb-5"
          />
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

              <h1 className="font-display text-[clamp(2.4rem,10vw,6rem)] leading-none tracking-tight uppercase text-smoke animate-flicker"
                style={{ textShadow: "0 0 40px rgba(255,184,0,0.4), 0 0 80px rgba(255,184,0,0.2)" }}>
                EDIT
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
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-10">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Spinner />
          </div>
        ) : (
          <form className="flex flex-col bg-void/90 px-2 sm:px-4 md:px-6 py-4 sm:py-6" onSubmit={handleEditBook}>
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <span className="hud-tag text-xs sm:text-sm">MODIFY_ENTRY</span>
              <div className="flex-1 h-[1px] bg-hud/20" />
            </div>

            <InputField id="title" label="Title" value={title} onChange={setTitle} />
            <InputField id="author" label="Author" value={author} onChange={setAuthor} />
            <InputField
              id="publishYear"
              label="Publish Year"
              value={publishYear}
              onChange={setPublishYear}
              type="number"
              min={1000}
              max={currentYear}
            />

            <div className="flex items-center gap-2 sm:gap-3 my-4 sm:my-6">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-hud rotate-45" />
              <div className="flex-1 h-[1px] bg-border" />
            </div>

            <button type="submit" className="btn-hud w-fit text-xs sm:text-sm">
              [*] UPDATE_ENTRY
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default EditBook;
