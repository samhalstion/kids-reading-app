import type { Activity } from "../../content/types";

/** Every activity component receives its typed data and reports completion. */
export interface ActivityProps<A extends Activity = Activity> {
  activity: A;
  /** Call when the child has finished this activity; advances the lesson. */
  onComplete: () => void;
}
