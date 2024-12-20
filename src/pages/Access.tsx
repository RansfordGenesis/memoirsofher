import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface Memory {
  id: number;
  created_at: string;
  name: string;
  title: string;
  message: string;
  tags: string;
  imgUrl: string;
}

import { variable } from "@/utils";
const ACCESS_CODE = variable.access_code;

const AccessPage = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [accessCode, setAccessCode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authorized
    const authorized = sessionStorage.getItem("access_authorized");
    if (authorized === "true") {
      setIsAuthorized(true);
      fetchMemories();
    } else {
      setLoading(false);
    }
  }, []);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === ACCESS_CODE) {
      setIsAuthorized(true);
      sessionStorage.setItem("access_authorized", "true");
      fetchMemories();
    } else {
      toast.error("Invalid access code");
      navigate("/"); // Redirect to home on invalid code
    }
  };

  const fetchMemories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("memory")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMemories(data || []);
    } catch (error) {
      toast.error("Failed to fetch memories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (memory: Memory) => {
    try {
      setDeleting(memory.id);
      
      // Extract filename from URL
      const fileName = memory.imgUrl.split("/").pop();
      if (!fileName) throw new Error("Invalid image URL");

      // Delete from storage
      const { error: storageError } = await supabaseClient.storage
        .from("images")
        .remove([`public/${fileName}`]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabaseClient
        .from("memory")
        .delete()
        .eq("id", memory.id);

      if (dbError) throw dbError;

      setMemories(memories.filter(m => m.id !== memory.id));
      toast.success("Memory deleted successfully");
    } catch (error) {
      toast.error("Failed to delete memory");
    } finally {
      setDeleting(null);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background grid place-items-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="font-cursive text-3xl text-center mb-6">Access Required</h1>
          <form onSubmit={handleAccessSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-white rounded hover:bg-black/90 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="mt-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-cursive text-4xl lg:text-6xl">Memory Management</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem("access_authorized");
              navigate("/");
            }}
            className="px-4 py-2 bg-black text-white rounded hover:bg-black/90 transition-colors"
          >
            Exit
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-pulse text-lg">Loading memories...</div>
          </div>
        ) : (
          <div className="grid gap-4">
            {memories.map((memory) => (
              <div
                key={memory.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <img
                      src={memory.imgUrl}
                      alt={memory.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-lg">{memory.title}</h3>
                      <p className="text-sm text-gray-600">
                        By {memory.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Posted on {new Date(memory.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(memory)}
                  disabled={deleting === memory.id}
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition-colors disabled:opacity-50"
                >
                  {deleting === memory.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessPage;