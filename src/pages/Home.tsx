import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import GitHubCalendar from "react-github-calendar";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GitHubProfile {
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
  login: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  language: string;
  created_at: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

const Home = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formSchema = z.object({
    username: z.string().min(2, { message: "Username is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    try {
      const [profileRes, reposRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${data.username}`),
        axios.get(`https://api.github.com/users/${data.username}/repos`),
      ]);

      setProfile(profileRes.data);
      setRepos(reposRes.data);
    } catch (err) {
      setError(
        "Failed to fetch GitHub data. Please check the username and try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 ">
      <header className="py-6 text-center ">
        <div className="flex flex-col items-center mt-4">
          <div className="bg-white rounded-full shadow-lg">
            <img src="/Logo.png" width={120}/>
          </div>
          <p className="text-gray-400 mt-2">
            Search and explore GitHub profiles
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-white">
                      GitHub Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter GitHub username..."
                        {...field}
                        className="w-full text-white bg-gray-700 border-gray-600 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Enter a GitHub username to view their profile
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Search Profile"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4 max-w-md mx-auto">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {profile && (
          <div className="mt-8 max-w-6xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={profile.avatar_url}
                  alt={`${profile.name}'s avatar`}
                  className="w-32 h-32 rounded-full border-4 border-blue-500"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white">
                    {profile.name}
                  </h2>
                  <p className="text-gray-400 mt-2">{profile.bio}</p>
                  <div className="flex gap-4 mt-4 justify-center md:justify-start">
                    <div className="text-center">
                      <span className="text-white font-bold">
                        {profile.public_repos}
                      </span>
                      <p className="text-gray-400 text-sm">Repositories</p>
                    </div>
                    <div className="text-center">
                      <span className="text-white font-bold">
                        {profile.followers}
                      </span>
                      <p className="text-gray-400 text-sm">Followers</p>
                    </div>
                    <div className="text-center">
                      <span className="text-white font-bold">
                        {profile.following}
                      </span>
                      <p className="text-gray-400 text-sm">Following</p>
                    </div>
                  </div>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    View GitHub Profile →
                  </a>
                </div>
              </div>

              {repos && (
                <div className="mt-8 p-4">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Repositories :
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={repo.owner.avatar_url}
                            alt={`${repo.owner.login}'s avatar`}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-400">
                            {repo.owner.login}
                          </span>
                        </div>
                        <h4 className="text-white font-medium">{repo.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          {repo.language && (
                            <span className="text-sm text-gray-400">
                              {repo.language}
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            {new Date(repo.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Activity Calendar
                </h3>
                <div className="bg-gray-700 p-4 rounded-lg text-white ">
                  <div>
                    <GitHubCalendar
                      username={profile.login}
                      blockSize={15}
                      blockMargin={5}
                      fontSize={16}
                      colorScheme="dark"
                      theme={{
                        dark: [
                          "#1a1a1a",
                          "#0e4429",
                          "#006d32",
                          "#26a641",
                          "#39d353",
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
