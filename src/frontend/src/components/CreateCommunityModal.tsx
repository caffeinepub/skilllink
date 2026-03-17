import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const TOPICS = [
  "Coding",
  "Music",
  "Photography",
  "Cooking",
  "Fitness",
  "Design",
];

const TOPIC_BANNERS: Record<string, string> = {
  Coding: "linear-gradient(135deg, #0B63D9 0%, #1E8BFF 100%)",
  Music: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
  Photography: "linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)",
  Cooking: "linear-gradient(135deg, #C2410C 0%, #F97316 100%)",
  Fitness: "linear-gradient(135deg, #065F46 0%, #10B981 100%)",
  Design: "linear-gradient(135deg, #9D174D 0%, #EC4899 100%)",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateCommunityModal({ open, onClose }: Props) {
  const { createCommunity } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !tagline.trim() || !description.trim() || !topic) {
      setError("Please fill in all required fields.");
      return;
    }
    const skills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const id = createCommunity({
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      topic,
      skills,
      banner:
        TOPIC_BANNERS[topic] ?? "linear-gradient(135deg, #0B63D9, #1E8BFF)",
    });
    onClose();
    navigate(`/communities/${id}`);
  };

  const handleClose = () => {
    setName("");
    setTagline("");
    setDescription("");
    setTopic("");
    setSkillsInput("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="sm:max-w-lg"
        data-ocid="create_community.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Create a Community
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="comm-name">Community Name *</Label>
            <Input
              id="comm-name"
              placeholder="e.g. Brooklyn Coders"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-ocid="create_community.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="comm-tagline">Tagline *</Label>
            <Input
              id="comm-tagline"
              placeholder="A short, catchy phrase"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              data-ocid="create_community.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="comm-description">Description *</Label>
            <Textarea
              id="comm-description"
              placeholder="What is your community about? What can members expect?"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-ocid="create_community.textarea"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Topic *</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger data-ocid="create_community.select">
                <SelectValue placeholder="Choose a topic" />
              </SelectTrigger>
              <SelectContent>
                {TOPICS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="comm-skills">Skills Focus</Label>
            <Input
              id="comm-skills"
              placeholder="e.g. Python, React, TypeScript (comma-separated)"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              data-ocid="create_community.input"
            />
          </div>
          {error && (
            <p
              className="text-sm text-red-500"
              data-ocid="create_community.error_state"
            >
              {error}
            </p>
          )}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              data-ocid="create_community.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              data-ocid="create_community.submit_button"
            >
              Create Community
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
