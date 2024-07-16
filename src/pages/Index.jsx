import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl mb-4">Your Blank Canvas</h1>
      <p className="mb-6">Chat with the agent to start making edits.</p>
      <div className="space-x-4">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Primary Action
        </Button>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
          Secondary Action
        </Button>
      </div>
    </div>
  );
};

export default Index;