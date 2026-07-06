import { useNavigate } from "react-router-dom";
import { CREATURES } from "../content/creatures";
import { useProgress } from "../store/progress";
import { speak } from "../lib/speech";
import { CreatureSprite } from "../components/ui/CreatureSprite";
import { BigButton } from "../components/ui/BigButton";

/** The Monster-dex: every creature/dino, locked until earned. */
export function CollectionScreen() {
  const navigate = useNavigate();
  const unlocked = new Set(useProgress((s) => s.unlockedCreatures));
  const hatched = new Set(useProgress((s) => s.hatchedDinos));
  const badges = useProgress((s) => s.badges);

  const pocketlings = CREATURES.filter((c) => c.kind === "pocketling");
  const dinos = CREATURES.filter((c) => c.kind === "dino");

  function grid(list: typeof CREATURES, has: Set<string>) {
    return (
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-6">
        {list.map((c) => {
          const owned = has.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => owned && speak(`${c.name}. ${c.funFact ?? ""}`)}
              className="flex flex-col items-center rounded-2xl bg-white/80 p-3 shadow"
            >
              <CreatureSprite creature={c} size="md" locked={!owned} />
              <span className="mt-1 text-sm font-bold text-brand-dark">
                {owned ? c.name : "???"}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="mb-4 flex items-center gap-3">
        <BigButton variant="soft" onClick={() => navigate("/")}>
          🏠
        </BigButton>
        <h1 className="font-reader text-3xl font-bold text-brand-dark">My Monsters</h1>
        <span className="ml-auto text-xl font-bold text-brand-dark">
          {unlocked.size}/{CREATURES.filter((c) => c.kind === "pocketling").length + dinos.length}
        </span>
      </div>

      <h2 className="mb-2 mt-2 font-reader text-2xl font-bold text-brand-dark">Pocketlings 🐾</h2>
      {grid(pocketlings, unlocked)}

      <h2 className="mb-2 mt-6 font-reader text-2xl font-bold text-brand-dark">Dinosaurs 🦖</h2>
      {grid(dinos, hatched)}

      {badges.length > 0 && (
        <>
          <h2 className="mb-2 mt-6 font-reader text-2xl font-bold text-brand-dark">Badges 🏅</h2>
          <div className="flex flex-wrap gap-3">
            {badges.map((b) => (
              <span key={b} className="rounded-full bg-yellow-200 px-4 py-2 text-lg font-bold text-brand-dark">
                🏅 {b}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
