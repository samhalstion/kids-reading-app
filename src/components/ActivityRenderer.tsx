import type { Activity } from "../content/types";
import type { ActivityResult } from "./activities/types";
import { SoundTap } from "./activities/SoundTap";
import { PictureSound } from "./activities/PictureSound";
import { Blend } from "./activities/Blend";
import { WordBuild } from "./activities/WordBuild";
import { WordTap } from "./activities/WordTap";
import { MinimalPair } from "./activities/MinimalPair";
import { SightFlash } from "./activities/SightFlash";
import { StoryRead } from "./activities/StoryRead";
import { ComprehendMC } from "./activities/ComprehendMC";
import { MatchPairs } from "./activities/MatchPairs";

interface Props {
  activity: Activity;
  onComplete: (result: ActivityResult) => void;
}

/** The lesson engine: maps an activity's `type` to its component. */
export function ActivityRenderer({ activity, onComplete }: Props) {
  switch (activity.type) {
    case "soundTap":
      return <SoundTap activity={activity} onComplete={onComplete} />;
    case "pictureSound":
      return <PictureSound activity={activity} onComplete={onComplete} />;
    case "blend":
      return <Blend activity={activity} onComplete={onComplete} />;
    case "wordBuild":
      return <WordBuild activity={activity} onComplete={onComplete} />;
    case "wordTap":
      return <WordTap activity={activity} onComplete={onComplete} />;
    case "minimalPair":
      return <MinimalPair activity={activity} onComplete={onComplete} />;
    case "sightFlash":
      return <SightFlash activity={activity} onComplete={onComplete} />;
    case "sentenceRead":
    case "storyRead":
      return <StoryRead activity={activity} onComplete={onComplete} />;
    case "comprehendMC":
      return <ComprehendMC activity={activity} onComplete={onComplete} />;
    case "matchPairs":
      return <MatchPairs activity={activity} onComplete={onComplete} />;
    default: {
      // Exhaustiveness guard — a new activity type without a case is a type error.
      const _never: never = activity;
      return _never;
    }
  }
}
