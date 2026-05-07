import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { InputField } from "./CreateBooks";
import { API_URL } from "../config";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error fetching data", { variant: "error" });
        console.log(err);
      });
  }, []);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
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
      <header className="relative px-6 pt-8 pb-6 border-b border-hud/30 overflow-hidden">
        <div className="hud-coords mb-4">
          SYS://LIBRARY_DATABASE/EDIT/{id?.slice(-6).toUpperCase()}
        </div>
        <div className="flex justify-between items-end gap-4">
          <div>
            <h1 className="font-display text-5xl md:text-8xl leading-none tracking-tighter uppercase text-smoke">
              EDIT
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
            <div className="flex items-center gap-3 mb-8">
              <span className="hud-tag">MODIFY_ENTRY</span>
              <div className="flex-1 h-[1px] bg-hud/20" />
            </div>

            <InputField label="Title"        value={title}       onChange={setTitle} />
            <InputField label="Author"       value={author}      onChange={setAuthor} />
            <InputField label="Publish Year" value={publishYear} onChange={setPublishYear} />

            <div className="flex items-center gap-3 my-6">
              <div className="w-2 h-2 bg-hud rotate-45" />
              <div className="flex-1 h-[1px] bg-border" />
            </div>

            <button className="btn-hud w-fit" onClick={handleEditBook}>
              [*] UPDATE_ENTRY
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditBook;