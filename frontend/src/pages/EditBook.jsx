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
          <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-end">
            <div>
              <h1 className="font-display text-[clamp(2.4rem,10vw,6rem)] leading-none tracking-tight uppercase text-smoke">
                EDIT
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
          <form className="flex flex-col" onSubmit={handleEditBook}>
            <div className="flex items-center gap-3 mb-8">
              <span className="hud-tag">MODIFY_ENTRY</span>
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

            <div className="flex items-center gap-3 my-6">
              <div className="w-2 h-2 bg-hud rotate-45" />
              <div className="flex-1 h-[1px] bg-border" />
            </div>

            <button type="submit" className="btn-hud w-fit">
              [*] UPDATE_ENTRY
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default EditBook;
