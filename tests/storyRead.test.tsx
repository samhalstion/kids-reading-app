import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StoryRead } from "../src/components/activities/StoryRead";
import { STORY_BY_ID } from "../src/content/stories";
import type { StoryReadActivity } from "../src/content/types";

// ---------------------------------------------------------------------------
// The repeated-reading fluency loop: finishing a story should NOT immediately
// end the activity. It celebrates, nudges toward a second read (the core
// fluency mechanic), and only completes when the child chooses "I'm done".
// ---------------------------------------------------------------------------

const activity: StoryReadActivity = { type: "storyRead", storyId: "story-sam" };
const pageCount = STORY_BY_ID["story-sam"].pages.length;

/** Turn pages to the last one, then tap "The End". */
async function readThrough() {
  for (let i = 0; i < pageCount - 1; i++) {
    fireEvent.click(screen.getByRole("button", { name: "➡️" }));
  }
  fireEvent.click(await screen.findByRole("button", { name: /The End/ }));
}

describe("StoryRead repeated-reading loop", () => {
  it("does not complete after a single read — it invites a re-read", async () => {
    const onComplete = vi.fn();
    render(<StoryRead activity={activity} onComplete={onComplete} />);

    await readThrough();

    expect(await screen.findByText(/Great reading/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Read it again/ })).toBeInTheDocument();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("'Read it again' restarts the story at page 1", async () => {
    render(<StoryRead activity={activity} onComplete={vi.fn()} />);

    await readThrough();
    fireEvent.click(await screen.findByRole("button", { name: /Read it again/ }));

    // Back to the first page of the story.
    expect(await screen.findByText(`1 / ${pageCount}`)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText(/Great reading/)).not.toBeInTheDocument(),
    );
  });

  it("completes only after the child taps 'I'm done'", async () => {
    const onComplete = vi.fn();
    render(<StoryRead activity={activity} onComplete={onComplete} />);

    // First read → re-read → second read reaches the fluency goal.
    await readThrough();
    fireEvent.click(await screen.findByRole("button", { name: /Read it again/ }));
    await readThrough();

    // Two stars earned; "I'm done" is now the primary choice.
    const done = await screen.findByRole("button", { name: /I'm done/ });
    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.click(done);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ graded: false }));
  });
});
