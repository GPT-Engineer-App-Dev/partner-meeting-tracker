import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl mb-4">Your Blank Canvas</h1>
      <p className="mb-6">Chat with the agent to start making edits.</p>
      <div className="space-x-4">
        <Button className="bg-red-500 hover:bg-red-600 text-white">
          Primary Action
        </Button>
        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-100">
          Secondary Action
        </Button>
      </div>
    </div>
  );
};

export default Index;