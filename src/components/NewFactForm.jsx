import { useState } from "react";
import supabase from "./supabase";

export default function NewFactForm({ categories, setFacts, showForm }) {
  const [formData, setFormData] = useState({
    firstInput: "",
    secondInput: "",
    selected: "",
  });
  const [isUploading, setIsUpLoading] = useState(false)
  const textLength = formData.firstInput.length;

  function formChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function isValidUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  async function formSubmit(e) {
    e.preventDefault();
    if (
      formData.firstInput &&
      isValidUrl(formData.secondInput) &&
      formData.selected
    ) {
      // const newFact = {
      //         id: Math.trunc(Math.random()* 1000),
      //         text: formData.firstInput,
      //         source: formData.secondInput,
      //         category: formData.selected,
      //         votesInteresting: 0,
      //         votesMindblowing: 0,
      //         votesFalse: 0,
      //         createdIn: new Date().getFullYear()
      // }
      setIsUpLoading(true)
      const {data: newFact, error} = await supabase
        .from("facts")
        .insert([
          {
            text: formData.firstInput,
            source: formData.secondInput,
            category: formData.selected,
          },
        ]).select();
        setIsUpLoading(false)

        if(!error){
            setFacts((prevData) => [newFact[0], ...prevData]);
        }

      formData.firstInput = "";
      formData.secondInput = "";
      formData.selected = "";

      showForm(false);
    }
  }
  return (
    <>
      <form className="fact-form" onSubmit={formSubmit}>
        <input
          type="text"
          disabled={isUploading}
          onChange={formChange}
          name="firstInput"
          value={formData.firstInput}
          placeholder="Share a fact with the world..."
        />
        <span>{200 - textLength}</span>
        <input
          type="text"
          disabled={isUploading}
          onChange={formChange}
          name="secondInput"
          value={formData.secondInput}
          placeholder="Trustworthy source..."
        />
        <select
          onChange={formChange}
          disabled={isUploading}
          value={formData.selected}
          name="selected"
          id=""
        >
          <option>Choose category</option>
          {categories.map((cat) => {
            return (
              <option value={cat.name} key={cat.name}>
                {cat.name.toUpperCase()}
              </option>
            );
          })}
        </select>
        <button className="btn btn-large" disabled={isUploading}>Post</button>
      </form>
    </>
  );
}
