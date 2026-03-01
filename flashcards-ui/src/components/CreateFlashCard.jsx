import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { API_BASE_URL } from "../config";

export default function CreateFlashCard({ onSubmit }) {
  const { id, cardId, mode } = useParams();
  const isEdit = mode == "edit";
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    tagIds: [],
  });
  const [tags, setTags] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const url = isEdit
    ? `${API_BASE_URL}/api/flashcards/${formData.id}`
    : `${API_BASE_URL}/api/decks/${id}/flashcards`;

  useEffect(() => {
    if (isEdit) {
      fetch(`${API_BASE_URL}/api/flashcards/${cardId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            ...data,
            tagIds: data.tagIds ? data.tagIds : []
          });
        })
        .catch((err) => console.error("Fetch failed:", err));
    }

    fetch(`${API_BASE_URL}/api/tags`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, [cardId, isEdit]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok)
          console.error("Database didn't create/edit flashcard");
        isEdit ? onSubmit(formData) : onSubmit();
      })
      .catch((error) => console.error("Connection error", error));
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleTagChange(tag) {
    const tagId = Number(tag);

    setFormData((prev) => ({
      ...prev,
      tagIds: (prev.tagIds || []).includes(tagId)
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...(prev.tagIds || []), tagId],
    }));
  }

  return (
    <div className="max-w-md mx-auto md:max-w-5xl h-full">
      <form
        onSubmit={handleSubmit}
        className="h-full w-full flex flex-col items-center  gap-4 pt-8 "
      >
        <div
          className=" h-full border-gray-200          
            rounded-3xl               
            shadow-2xl                 
            border  p-4
            bg-main
            lg:aspect-4/3 aspect-8/11
            "
        >
          <div className="flex flex-col gap-2">
            <label className="text-black font-bold text-lg leading-tight ">
              Front
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              rows={4}
              className="text-black leading-tight outline-none border-none resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className=" text-black font-bold text-lg leading-tight">
              Back
            </label>
            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              rows={4}
              className="text-black leading-tight outline-none border-none resize-none"
            />
          </div>

          <div className="grow">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className=""
            >
              <span className="truncate font-bold text-lg leading-tight">
                {formData.tagIds?.length > 0
                  ? `${formData.tagIds.length} tags selected`
                  : "Tags "}
              </span>
              <span
                className={`transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {isDropdownOpen && (
              <>
                <div
                  onClick={() => setIsDropdownOpen(false)}
                ></div>

                <div className="p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700" >
                  {(tags || []).length > 0 ? (
                    tags.map((tag) => (
                      <label
                        key={tag.id}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-orange-500 rounded border-slate-600 bg-slate-700"
                          checked={(formData.tagIds || []).includes(tag.id)}
                          onChange={() => handleTagChange(tag.id)}
                        />
                        <span className="text-black text-sm">
                          {tag.name}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-white/50 p-2 text-sm italic">
                      No tags found
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <button
          className="absolute right-4.5 top-4.5 p-1 cursor-pointer transition-all hover:scale-[1.05] active:scale-95 "
          type="submit"
        >
          <FaCheck className="text-white" size={20} />
        </button>
      </form>
    </div>
  );
}
