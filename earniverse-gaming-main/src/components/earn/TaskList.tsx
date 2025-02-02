import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Youtube, Copy, Share2, Instagram, Music2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface TaskListProps {
  onTaskComplete: (coins: number) => void;
}

export const TaskList = ({ onTaskComplete }: TaskListProps) => {
  const [subscribed, setSubscribed] = useState(false);
  const [watchedFullVideo, setWatchedFullVideo] = useState(false);
  const [followedInstagram, setFollowedInstagram] = useState(false);
  const [followedTiktok, setFollowedTiktok] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [videoStartTime, setVideoStartTime] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      const baseUrl = window.location.origin;
      const shortId = user.id.substring(0, 6);
      setReferralLink(`${baseUrl}/signup?ref=${shortId}`);
    }
  }, []);

  const handleSubscribe = () => {
    window.open("https://youtube.com", "_blank");
    setSubscribed(true);
    onTaskComplete(5);
    toast({
      title: "Success!",
      description: "You earned 5 coins for subscribing!",
    });
  };

  const handleWatchVideo = () => {
    setVideoStartTime(Date.now());
    window.open("https://youtube.com/watch?v=example", "_blank");
    
    // Check if user watched for at least 30 seconds (simulated full video watch)
    setTimeout(() => {
      const watchDuration = Date.now() - (videoStartTime || 0);
      if (watchDuration >= 30000) { // 30 seconds
        setWatchedFullVideo(true);
        onTaskComplete(30);
        toast({
          title: "Success!",
          description: "You earned 30 coins for watching the full video!",
        });
      } else {
        toast({
          title: "Warning",
          description: "You need to watch the full video to earn coins!",
          variant: "destructive",
        });
      }
    }, 30000); // Check after 30 seconds
  };

  const handleFollowInstagram = () => {
    window.open("https://instagram.com/yourprofile", "_blank");
    setFollowedInstagram(true);
    onTaskComplete(5);
    toast({
      title: "Success!",
      description: "You earned 5 coins for following on Instagram!",
    });
  };

  const handleFollowTiktok = () => {
    window.open("https://tiktok.com/@yourprofile", "_blank");
    setFollowedTiktok(true);
    onTaskComplete(5);
    toast({
      title: "Success!",
      description: "You earned 5 coins for following on TikTok!",
    });
  };

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Success!",
        description: "Referral link copied! Share it to earn 50 coins per signup!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy referral link",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="h-6 w-6" />
            Subscribe Task
          </CardTitle>
          <CardDescription>
            Subscribe to our channel and earn 5 coins instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={handleSubscribe}
            disabled={subscribed}
          >
            {subscribed ? "Subscribed ✓" : "Subscribe to earn 5 coins"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="h-6 w-6" />
            Watch Full Video
          </CardTitle>
          <CardDescription>
            Watch our full video to earn 30 coins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={handleWatchVideo}
            disabled={watchedFullVideo}
          >
            {watchedFullVideo ? "Video Watched ✓" : "Watch Video to earn 30 coins"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Instagram className="h-6 w-6" />
            Follow on Instagram
          </CardTitle>
          <CardDescription>
            Follow our Instagram account to earn 5 coins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={handleFollowInstagram}
            disabled={followedInstagram}
          >
            {followedInstagram ? "Followed ✓" : "Follow to earn 5 coins"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music2 className="h-6 w-6" />
            Follow on TikTok
          </CardTitle>
          <CardDescription>
            Follow our TikTok account to earn 5 coins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={handleFollowTiktok}
            disabled={followedTiktok}
          >
            {followedTiktok ? "Followed ✓" : "Follow to earn 5 coins"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-6 w-6" />
            Referral Program
          </CardTitle>
          <CardDescription>
            Share your referral link and earn 50 coins for each new signup!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="font-mono text-sm"
            />
            <Button onClick={copyReferralLink} variant="secondary">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};