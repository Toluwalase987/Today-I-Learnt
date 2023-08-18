import "../src/styles.css";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import NewFactForm from "./components/NewFactForm";
import FactsList from "./components/FactsList";
import supabase from "./components/supabase";
import { useEffect, useState } from "react";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    const getFacts = async () => {
      setIsLoading(true);

      let query = supabase.from("facts").select("*");

      if (currentCategory !== "all")
        query = query.eq("category", currentCategory);

      let { data: facts, error } = await query
        .order("text", { ascending: true })
        .limit(1000);

      if (!error) {
        setFacts(facts);
      } else {
        alert("There was an error fetching data!");
      }
      setIsLoading(false);
    };
    getFacts();
  }, [currentCategory]);

  function Loader() {
    return <p className="message">Loading...</p>;
  }

  const displayForm = () => {
    setShowForm(!showForm);
  };

  const handleVote = async (votesInteresting, id) => {
    setIsUpdating(true);
    await supabase
      .from("facts")
      .update({ votesInteresting: votesInteresting + 1 })
      .eq("id", id);

    // After updating the vote, re-fetch the updated fact
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .select("*")
      .eq("id", id);

    if (!error) {
      setFacts((facts) =>
        facts.map((factos) => (factos.id === id ? updatedFact[0] : factos))
      );
      // You can update the facts array with the updated fact here
    } else {
      console.error("Error fetching updated fact:", error);
    }
    setIsUpdating(false);
  };

  const handleMindBlown = async (votesMindBlowing, id) => {
    setIsUpdating(true);
    await supabase
      .from("facts")
      .update({ votesMindBlowing: votesMindBlowing + 1 })
      .eq("id", id);

    // After updating the vote, re-fetch the updated fact
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .select("*")
      .eq("id", id);

    if (!error) {
      setFacts((facts) =>
        facts.map((factos) => (factos.id === id ? updatedFact[0] : factos))
      );
      // You can update the facts array with the updated fact here
    } else {
      console.error("Error fetching updated fact:", error);
    }
    setIsUpdating(false);
  };

  const handleDisapproval = async (votesFalse, id) => {
    setIsUpdating(true);
    await supabase
      .from("facts")
      .update({ votesFalse: votesFalse + 1 })
      .eq("id", id);

    // After updating the vote, re-fetch the updated fact
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .select("*")
      .eq("id", id);

    if (!error) {
      setFacts((facts) =>
        facts.map((factos) => (factos.id === id ? updatedFact[0] : factos))
      );
      // You can update the facts array with the updated fact here
    } else {
      console.error("Error fetching updated fact:", error);
    }
    setIsUpdating(false);
  };

  const eachFact = facts.map((fact) => {
    const isDisputed = fact.votesInteresting + fact.votesMindBlowing < fact.votesFalse
    return (
      <div key={fact.id}>
        <li className="fact">
          <p>
            {isDisputed ? <span className="disputed">[⛔️ DISPUTED]</span> : null}
            {fact.text}
            <a className="source" href={fact.source} target="_blank">
              (Source)
            </a>
          </p>
          <span
            className="tag"
            style={{
              backgroundColor: CATEGORIES.find(
                (cat) => cat.name === fact.category
              ).color,
            }}
          >
            {fact.category}
          </span>
          <div className="vote-buttons">
            <button
              onClick={() => handleVote(fact.votesInteresting, fact.id)}
              disabled={isUpdating}
            >
              👍🏼 {fact.votesInteresting}
            </button>
            <button
              onClick={() => handleMindBlown(fact.votesMindBlowing, fact.id)}
              disabled={isUpdating}
            >
              🤯 {fact.votesMindBlowing}
            </button>
            <button
              onClick={() => handleDisapproval(fact.votesFalse, fact.id)}
              disabled={isUpdating}
            >
              ⛔️ {fact.votesFalse}
            </button>
          </div>
        </li>
      </div>
    );
  });

  return (
    <div>
      <Header displayForm={displayForm} showForm={showForm} />
      {showForm ? (
        <NewFactForm
          categories={CATEGORIES}
          setFacts={setFacts}
          showForm={setShowForm}
        />
      ) : null}
      <main className="main">
        <CategoryFilter
          categories={CATEGORIES}
          setCurrentCategory={setCurrentCategory}
        />
        {isLoading ? <Loader /> : <FactsList facts={eachFact} />}
      </main>
    </div>
  );
}
