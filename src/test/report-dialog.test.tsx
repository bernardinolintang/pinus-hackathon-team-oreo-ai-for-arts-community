import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReportDialog } from "@/components/ReportDialog";

describe("ReportDialog", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders report trigger button", () => {
    render(
      <ReportDialog context="artwork" targetId="test-1" targetLabel="Test Artwork" />
    );
    expect(screen.getByRole("button", { name: /report/i })).toBeInTheDocument();
  });

  it("opens dialog on trigger click and shows title", () => {
    render(
      <ReportDialog context="artwork" targetId="test-1" targetLabel="Test Artwork" />
    );
    fireEvent.click(screen.getByRole("button", { name: /report/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/report this artwork/i)).toBeInTheDocument();
  });

  it("shows reason select and submit button when open", () => {
    render(
      <ReportDialog context="artwork" targetId="test-1" targetLabel="Test Artwork" />
    );
    fireEvent.click(screen.getByRole("button", { name: /report/i }));
    expect(screen.getByLabelText(/reason/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit report/i })).toBeInTheDocument();
  });
});
